import path from 'node:path';

import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { LATEST_RELEASE_URL } from './common/constants';
import { execAsync } from './common/helpers/exec-helpers';
import { CacheService, ONE_DAY_IN_SECONDS } from './core/cache/cache.service';
import { ConfigurationService } from './core/config/configuration.service';
import { DatabaseService } from './core/database/database.service';
import { FilesystemService } from './core/filesystem/filesystem.service';
import { LoggerService } from './core/logger/logger.service';
import { AppLifecycleService } from './modules/app-lifecycle/app-lifecycle.service';
import { RepoEventsQueue } from './modules/queue/entities/repo-events';
import { ReposService } from './modules/repos/repos.service';

@Injectable()
export class AppService {
  constructor(
    private readonly cache: CacheService,
    private readonly configuration: ConfigurationService,
    private readonly logger: LoggerService,
    private readonly repos: ReposService,
    private readonly repoQueue: RepoEventsQueue,
    private readonly filesystem: FilesystemService,
    private readonly databaseService: DatabaseService,
    private readonly appLifecycleService: AppLifecycleService,
  ) {}

  public async bootstrap() {
    await this.databaseService.migrate();

    const config = this.configuration.getConfig();
    this.logger.info('Log level', config.userSettings.logLevel);
    this.logger.debug('Starting with configuration', config);

    const { version, appsRepoUrl, userSettings } = config;

    this.configuration.initSentry({ release: version, allowSentry: userSettings.allowErrorMonitoring });

    await this.logger.flush();

    this.logger.info(`Running version: ${process.env.TIPI_VERSION}`);
    this.logger.info('Generating system env file...');

    const buster = this.cache.get('buster');
    if (buster !== version) {
      this.logger.info('Clearing cache...');
      this.cache.clear();
      this.cache.set('buster', version, ONE_DAY_IN_SECONDS * 365);
    }

    const clone = await this.repos.cloneRepo(appsRepoUrl);
    if (!clone.success) {
      this.logger.error(`Failed to clone repo ${appsRepoUrl}`);
    }

    if (this.configuration.get('isProduction')) {
      const pull = await this.repos.pullRepo(appsRepoUrl);
      if (!pull.success) {
        this.logger.error(`Failed to pull repo ${appsRepoUrl}`);
      }
    }

    // Every 15 minutes, check for updates to the apps repo
    this.repoQueue.publishRepeatable({ command: 'update', url: appsRepoUrl }, '*/15 * * * *');

    await this.copyAssets();
    await this.generateTlsCertificates({ localDomain: userSettings.localDomain });

    if (this.configuration.get('isProduction')) {
      this.appLifecycleService.startAllApps();
    }
  }

  public async getVersion() {
    const { version: currentVersion } = this.configuration.getConfig();

    try {
      let version = this.cache.get('latestVersion') ?? '';
      let body = this.cache.get('latestVersionBody') ?? '';

      if (!version) {
        version = currentVersion;
        // Fetch the latest version in the background
        fetch(LATEST_RELEASE_URL).then(async (response) => {
          if (!response.ok) {
            this.logger.error(`Failed to fetch latest version from GitHub: ${response.statusText}`);
            return;
          }
          const data = await response.json();

          const res = z.object({ tag_name: z.string(), body: z.string() }).parse(data);

          version = res.tag_name;
          body = res.body;

          this.cache.set('latestVersion', version, 60 * 60);
          this.cache.set('latestVersionBody', body, 60 * 60);
        });
      }

      return { current: currentVersion, latest: version, body };
    } catch (e) {
      this.logger.error(e);
      return {
        current: currentVersion,
        latest: currentVersion,
        body: '',
      };
    }
  }

  public async copyAssets() {
    const { directories, userSettings } = this.configuration.getConfig();
    const { appDir, dataDir, appDataDir } = directories;

    const assetsFolder = path.join(appDir, 'assets');

    this.logger.info('Creating traefik folders');

    await this.filesystem.createDirectories([
      path.join(dataDir, 'traefik', 'dynamic'),
      path.join(dataDir, 'traefik', 'shared'),
      path.join(dataDir, 'traefik', 'tls'),
    ]);

    if (userSettings.persistTraefikConfig) {
      this.logger.warn('Skipping the copy of traefik files because persistTraefikConfig is set to true');
    } else {
      this.logger.info('Copying traefik files');
      await this.filesystem.copyFile(path.join(assetsFolder, 'traefik', 'traefik.yml'), path.join(dataDir, 'traefik', 'traefik.yml'));
      await this.filesystem.copyFile(
        path.join(assetsFolder, 'traefik', 'dynamic', 'dynamic.yml'),
        path.join(dataDir, 'traefik', 'dynamic', 'dynamic.yml'),
      );
    }

    // Create base folders
    this.logger.info('Creating base folders');
    await this.filesystem.createDirectories([
      path.join(dataDir, 'apps'),
      path.join(dataDir, 'state'),
      path.join(dataDir, 'repos'),
      path.join(dataDir, 'backups'),
      path.join(appDataDir),
    ]);

    // Create media folders
    this.logger.info('Creating media folders');
    await this.filesystem.createDirectories([
      path.join(dataDir, 'media', 'torrents', 'watch'),
      path.join(dataDir, 'media', 'torrents', 'complete'),
      path.join(dataDir, 'media', 'torrents', 'incomplete'),
      path.join(dataDir, 'media', 'usenet', 'watch'),
      path.join(dataDir, 'media', 'usenet', 'complete'),
      path.join(dataDir, 'media', 'usenet', 'incomplete'),
      path.join(dataDir, 'media', 'downloads', 'watch'),
      path.join(dataDir, 'media', 'downloads', 'complete'),
      path.join(dataDir, 'media', 'downloads', 'incomplete'),
      path.join(dataDir, 'media', 'data', 'books'),
      path.join(dataDir, 'media', 'data', 'comics'),
      path.join(dataDir, 'media', 'data', 'movies'),
      path.join(dataDir, 'media', 'data', 'music'),
      path.join(dataDir, 'media', 'data', 'tv'),
      path.join(dataDir, 'media', 'data', 'podcasts'),
      path.join(dataDir, 'media', 'data', 'images'),
      path.join(dataDir, 'media', 'data', 'roms'),
    ]);
  }

  /**
   * Given a domain, generates the TLS certificates for it to be used with Traefik
   *
   * @param {string} data.domain The domain to generate the certificates for
   */
  public generateTlsCertificates = async (data: { localDomain?: string }) => {
    if (!data.localDomain) {
      return;
    }

    const { dataDir } = this.configuration.get('directories');

    const tlsFolder = path.join(dataDir, 'traefik', 'tls');

    // If the certificate already exists, don't generate it again
    if (
      (await this.filesystem.pathExists(path.join(tlsFolder, `${data.localDomain}.txt`))) &&
      (await this.filesystem.pathExists(path.join(tlsFolder, 'cert.pem'))) &&
      (await this.filesystem.pathExists(path.join(tlsFolder, 'key.pem')))
    ) {
      // Check if the certificate is still valid
      const { stdout } = await execAsync(`openssl x509 -checkend 86400 -noout -in ${tlsFolder}/cert.pem`);
      if (stdout.includes('Certificate will not expire')) {
        this.logger.info(`TLS certificate for ${data.localDomain} already exists`);
        return;
      }

      this.logger.warn(`TLS certificate for ${data.localDomain} is expired or will expire soon. Regenerating a new one...`);
    }

    // Empty out the folder
    const files = await this.filesystem.listFiles(tlsFolder);
    await Promise.all(
      files.map(async (file) => {
        this.logger.info(`Removing file ${file}`);
        await this.filesystem.removeFile(path.join(tlsFolder, file));
      }),
    );

    const subject = `/O=runtipi.io/OU=IT/CN=*.${data.localDomain}/emailAddress=webmaster@${data.localDomain}`;
    const subjectAltName = `DNS:*.${data.localDomain},DNS:${data.localDomain}`;

    try {
      this.logger.info(`Generating TLS certificate for ${data.localDomain}`);
      const { stderr } = await execAsync(
        `openssl req -x509 -newkey rsa:4096 -keyout ${dataDir}/traefik/tls/key.pem -out ${dataDir}/traefik/tls/cert.pem -days 365 -subj "${subject}" -addext "subjectAltName = ${subjectAltName}" -nodes`,
      );
      if (
        !(await this.filesystem.pathExists(path.join(tlsFolder, 'cert.pem'))) ||
        !(await this.filesystem.pathExists(path.join(tlsFolder, 'key.pem')))
      ) {
        this.logger.error(`Failed to generate TLS certificate for ${data.localDomain}`);
        this.logger.error(stderr);
      } else {
        this.logger.info(`Writing txt file for ${data.localDomain}`);
      }
      await this.filesystem.writeTextFile(path.join(tlsFolder, `${data.localDomain}.txt`), '');
    } catch (error) {
      this.logger.error(error);
    }
  };
}
