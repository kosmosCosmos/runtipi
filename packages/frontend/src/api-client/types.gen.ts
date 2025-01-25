// This file is auto-generated by @hey-api/openapi-ts

export type UserContextDto = {
  version: {
    current: string;
    latest: string;
    body: string;
  };
  /**
   * Indicates if the user is logged in
   */
  isLoggedIn: boolean;
  /**
   * Indicates if the app is already configured
   */
  isConfigured: boolean;
  /**
   * Indicates if the guest dashboard is enabled
   */
  isGuestDashboardEnabled: boolean;
  /**
   * Indicates if the app allows auto themes
   */
  allowAutoThemes: boolean;
  /**
   * Indicates if the app allows anonymous error monitoring
   */
  allowErrorMonitoring: boolean;
};

export type AppContextDto = {
  version: {
    current: string;
    latest: string;
    body: string;
  };
  userSettings: {
    dnsIp: string;
    internalIp: string;
    postgresPort: number;
    appsRepoUrl: string;
    domain: string;
    appDataPath: string;
    localDomain: string;
    demoMode: boolean;
    guestDashboard: boolean;
    allowAutoThemes: boolean;
    allowErrorMonitoring: boolean;
    persistTraefikConfig: boolean;
    port: number;
    sslPort: number;
    listenIp: string;
    timeZone: string;
    eventsTimeout: number;
  };
  user: {
    id: number;
    username: string;
    totpEnabled: boolean;
    locale: string;
    operator: boolean;
    hasSeenWelcome: boolean;
  };
  apps: Array<{
    id: string;
    name: string;
    short_desc: string;
    categories?: Array<
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai'
    >;
    deprecated?: boolean;
    created_at?: number;
    supported_architectures?: Array<'arm64' | 'amd64'>;
    available: boolean;
  }>;
  updatesAvailable: number;
};

export type PartialUserSettingsDto = {
  dnsIp?: string;
  internalIp?: string;
  postgresPort?: number;
  appsRepoUrl?: string;
  domain?: string;
  appDataPath?: string;
  localDomain?: string;
  demoMode?: boolean;
  guestDashboard?: boolean;
  allowAutoThemes?: boolean;
  allowErrorMonitoring?: boolean;
  persistTraefikConfig?: boolean;
  port?: number;
  sslPort?: number;
  listenIp?: string;
  timeZone?: string;
  eventsTimeout?: number;
};

export type AcknowledgeWelcomeBody = {
  allowErrorMonitoring: boolean;
};

export type LoadDto = {
  diskUsed?: number | null;
  diskSize?: number | null;
  percentUsed?: number | null;
  cpuLoad?: number | null;
  memoryTotal?: number | null;
  percentUsedMemory?: number | null;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginDto = {
  success: boolean;
  totpSessionId?: string;
};

export type VerifyTotpBody = {
  totpCode: string;
  totpSessionId: string;
};

export type RegisterBody = {
  username: string;
  password: string;
};

export type RegisterDto = {
  success: boolean;
};

export type ChangeUsernameBody = {
  newUsername: string;
  password: string;
};

export type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
};

export type GetTotpUriBody = {
  password: string;
};

export type GetTotpUriDto = {
  key: string;
  uri: string;
};

export type SetupTotpBody = {
  code: string;
};

export type DisableTotpBody = {
  password: string;
};

export type ResetPasswordBody = {
  newPassword: string;
};

export type ResetPasswordDto = {
  success: boolean;
  email: string;
};

export type CheckResetPasswordRequestDto = {
  isRequestPending: boolean;
};

export type MyAppsDto = {
  installed: Array<{
    app: {
      id: string;
      status:
        | 'running'
        | 'stopped'
        | 'installing'
        | 'uninstalling'
        | 'stopping'
        | 'starting'
        | 'missing'
        | 'updating'
        | 'resetting'
        | 'restarting'
        | 'backing_up'
        | 'restoring';
      lastOpened: string | null;
      numOpened?: number;
      createdAt?: string;
      updatedAt?: string;
      version: number;
      exposed: boolean;
      openPort: boolean;
      exposedLocal: boolean;
      domain: string | null;
      isVisibleOnGuestDashboard: boolean;
      config?: {};
    };
    info: {
      id: string;
      name: string;
      short_desc: string;
      categories?: Array<
        | 'network'
        | 'media'
        | 'development'
        | 'automation'
        | 'social'
        | 'utilities'
        | 'photography'
        | 'security'
        | 'featured'
        | 'books'
        | 'data'
        | 'music'
        | 'finance'
        | 'gaming'
        | 'ai'
      >;
      deprecated?: boolean;
      created_at?: number;
      supported_architectures?: Array<'arm64' | 'amd64'>;
      available: boolean;
    };
    updateInfo: {
      latestVersion: number;
      minTipiVersion?: string;
      latestDockerVersion?: string;
    };
  }>;
};

export type GuestAppsDto = {
  installed: Array<{
    app: {
      id: string;
      status:
        | 'running'
        | 'stopped'
        | 'installing'
        | 'uninstalling'
        | 'stopping'
        | 'starting'
        | 'missing'
        | 'updating'
        | 'resetting'
        | 'restarting'
        | 'backing_up'
        | 'restoring';
      lastOpened: string | null;
      numOpened?: number;
      createdAt?: string;
      updatedAt?: string;
      version: number;
      exposed: boolean;
      openPort: boolean;
      exposedLocal: boolean;
      domain: string | null;
      isVisibleOnGuestDashboard: boolean;
      config?: {};
    };
    info: {
      id: string;
      available: boolean;
      deprecated?: boolean;
      port?: number;
      name: string;
      description?: string;
      version?: string;
      tipi_version: number;
      short_desc: string;
      author: string;
      source: string;
      website?: string;
      force_expose?: boolean;
      generate_vapid_keys?: boolean;
      categories?: Array<
        | 'network'
        | 'media'
        | 'development'
        | 'automation'
        | 'social'
        | 'utilities'
        | 'photography'
        | 'security'
        | 'featured'
        | 'books'
        | 'data'
        | 'music'
        | 'finance'
        | 'gaming'
        | 'ai'
      >;
      url_suffix?: string;
      form_fields?: Array<{
        type: 'text' | 'password' | 'email' | 'number' | 'fqdn' | 'ip' | 'fqdnip' | 'url' | 'random' | 'boolean';
        label: string;
        placeholder?: string;
        max?: number;
        min?: number;
        hint?: string;
        options?: Array<{
          label: string;
          value: string;
        }>;
        required?: boolean;
        default?: boolean | string | number;
        regex?: string;
        pattern_error?: string;
        env_variable: string;
        encoding?: 'hex' | 'base64';
      }>;
      https?: boolean;
      exposable?: boolean;
      no_gui?: boolean;
      supported_architectures?: Array<'arm64' | 'amd64'>;
      uid?: number;
      gid?: number;
      dynamic_config?: boolean;
      min_tipi_version?: string;
      created_at?: number;
      updated_at?: number;
    };
    updateInfo: {
      latestVersion: number;
      minTipiVersion?: string;
      latestDockerVersion?: string;
    };
  }>;
};

export type SearchAppsDto = {
  data: Array<{
    id: string;
    name: string;
    short_desc: string;
    categories?: Array<
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai'
    >;
    deprecated?: boolean;
    created_at?: number;
    supported_architectures?: Array<'arm64' | 'amd64'>;
    available: boolean;
  }>;
  nextCursor?: string;
  total: number;
};

export type AppDetailsDto = {
  info: {
    id: string;
    available: boolean;
    deprecated?: boolean;
    port?: number;
    name: string;
    description?: string;
    version?: string;
    tipi_version: number;
    short_desc: string;
    author: string;
    source: string;
    website?: string;
    force_expose?: boolean;
    generate_vapid_keys?: boolean;
    categories?: Array<
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai'
    >;
    url_suffix?: string;
    form_fields?: Array<{
      type: 'text' | 'password' | 'email' | 'number' | 'fqdn' | 'ip' | 'fqdnip' | 'url' | 'random' | 'boolean';
      label: string;
      placeholder?: string;
      max?: number;
      min?: number;
      hint?: string;
      options?: Array<{
        label: string;
        value: string;
      }>;
      required?: boolean;
      default?: boolean | string | number;
      regex?: string;
      pattern_error?: string;
      env_variable: string;
      encoding?: 'hex' | 'base64';
    }>;
    https?: boolean;
    exposable?: boolean;
    no_gui?: boolean;
    supported_architectures?: Array<'arm64' | 'amd64'>;
    uid?: number;
    gid?: number;
    dynamic_config?: boolean;
    min_tipi_version?: string;
    created_at?: number;
    updated_at?: number;
  };
  app: {
    id: string;
    status:
      | 'running'
      | 'stopped'
      | 'installing'
      | 'uninstalling'
      | 'stopping'
      | 'starting'
      | 'missing'
      | 'updating'
      | 'resetting'
      | 'restarting'
      | 'backing_up'
      | 'restoring';
    lastOpened: string | null;
    numOpened?: number;
    createdAt?: string;
    updatedAt?: string;
    version: number;
    exposed: boolean;
    openPort: boolean;
    exposedLocal: boolean;
    domain: string | null;
    isVisibleOnGuestDashboard: boolean;
    config?: {};
  };
  updateInfo: {
    latestVersion: number;
    minTipiVersion?: string;
    latestDockerVersion?: string;
  };
};

export type PullDto = {
  success: boolean;
};

export type AppFormBody = {
  exposed?: boolean;
  exposedLocal?: boolean;
  openPort?: boolean;
  domain?: string;
  isVisibleOnGuestDashboard?: boolean;
};

export type UninstallAppBody = {
  removeBackups: boolean;
};

export type UpdateAppBody = {
  performBackup: boolean;
};

export type RestoreAppBackupDto = {
  filename: string;
};

export type GetAppBackupsDto = {
  data: Array<{
    id: string;
    size: number;
    date: number;
  }>;
  total: number;
  currentPage: number;
  lastPage: number;
};

export type DeleteAppBackupBodyDto = {
  filename: string;
};

export type LinksDto = {
  links: Array<{
    id: number;
    title: string;
    description: string | null;
    url: string;
    iconUrl: string | null;
    userId: number;
  }>;
};

export type LinkBodyDto = {
  title: string;
  url: string;
  description?: string;
  iconUrl?: string;
};

export type EditLinkBodyDto = {
  title: string;
  url: string;
  description?: string;
  iconUrl?: string;
};

export type UserContextData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/user-context';
};

export type UserContextResponses = {
  200: UserContextDto;
};

export type UserContextResponse = UserContextResponses[keyof UserContextResponses];

export type AppContextData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/app-context';
};

export type AppContextResponses = {
  200: AppContextDto;
};

export type AppContextResponse = AppContextResponses[keyof AppContextResponses];

export type UpdateUserSettingsData = {
  body: PartialUserSettingsDto;
  path?: never;
  query?: never;
  url: '/api/user-settings';
};

export type UpdateUserSettingsResponses = {
  200: unknown;
};

export type AcknowledgeWelcomeData = {
  body: AcknowledgeWelcomeBody;
  path?: never;
  query?: never;
  url: '/api/acknowledge-welcome';
};

export type AcknowledgeWelcomeResponses = {
  200: unknown;
};

export type SystemLoadData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/system/load';
};

export type SystemLoadResponses = {
  200: LoadDto;
};

export type SystemLoadResponse = SystemLoadResponses[keyof SystemLoadResponses];

export type DownloadLocalCertificateData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/system/certificate';
};

export type DownloadLocalCertificateResponses = {
  200: unknown;
};

export type GetTranslationData = {
  body?: never;
  path: {
    ns: string;
    lng: string;
  };
  query?: never;
  url: '/api/i18n/locales/{ns}/{lng}.json';
};

export type GetTranslationResponses = {
  200: {
    [key: string]: unknown;
  };
};

export type GetTranslationResponse = GetTranslationResponses[keyof GetTranslationResponses];

export type LoginData = {
  body: LoginBody;
  path?: never;
  query?: never;
  url: '/api/auth/login';
};

export type LoginResponses = {
  201: LoginDto;
};

export type LoginResponse = LoginResponses[keyof LoginResponses];

export type VerifyTotpData = {
  body: VerifyTotpBody;
  path?: never;
  query?: never;
  url: '/api/auth/verify-totp';
};

export type VerifyTotpResponses = {
  201: LoginDto;
};

export type VerifyTotpResponse = VerifyTotpResponses[keyof VerifyTotpResponses];

export type RegisterData = {
  body: RegisterBody;
  path?: never;
  query?: never;
  url: '/api/auth/register';
};

export type RegisterResponses = {
  201: RegisterDto;
};

export type RegisterResponse = RegisterResponses[keyof RegisterResponses];

export type LogoutData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/auth/logout';
};

export type LogoutResponses = {
  201: unknown;
};

export type ChangeUsernameData = {
  body: ChangeUsernameBody;
  path?: never;
  query?: never;
  url: '/api/auth/username';
};

export type ChangeUsernameResponses = {
  200: unknown;
};

export type ChangePasswordData = {
  body: ChangePasswordBody;
  path?: never;
  query?: never;
  url: '/api/auth/password';
};

export type ChangePasswordResponses = {
  200: unknown;
};

export type GetTotpUriData = {
  body: GetTotpUriBody;
  path?: never;
  query?: never;
  url: '/api/auth/totp/get-uri';
};

export type GetTotpUriResponses = {
  200: GetTotpUriDto;
};

export type GetTotpUriResponse = GetTotpUriResponses[keyof GetTotpUriResponses];

export type SetupTotpData = {
  body: SetupTotpBody;
  path?: never;
  query?: never;
  url: '/api/auth/totp/setup';
};

export type SetupTotpResponses = {
  200: unknown;
};

export type DisableTotpData = {
  body: DisableTotpBody;
  path?: never;
  query?: never;
  url: '/api/auth/totp/disable';
};

export type DisableTotpResponses = {
  200: unknown;
};

export type CancelResetPasswordData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/auth/reset-password';
};

export type CancelResetPasswordResponses = {
  200: unknown;
};

export type CheckResetPasswordRequestData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/auth/reset-password';
};

export type CheckResetPasswordRequestResponses = {
  200: CheckResetPasswordRequestDto;
};

export type CheckResetPasswordRequestResponse = CheckResetPasswordRequestResponses[keyof CheckResetPasswordRequestResponses];

export type ResetPasswordData = {
  body: ResetPasswordBody;
  path?: never;
  query?: never;
  url: '/api/auth/reset-password';
};

export type ResetPasswordResponses = {
  201: ResetPasswordDto;
};

export type ResetPasswordResponse = ResetPasswordResponses[keyof ResetPasswordResponses];

export type GetInstalledAppsData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/apps/installed';
};

export type GetInstalledAppsResponses = {
  200: MyAppsDto;
};

export type GetInstalledAppsResponse = GetInstalledAppsResponses[keyof GetInstalledAppsResponses];

export type GetGuestAppsData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/apps/guest';
};

export type GetGuestAppsResponses = {
  200: GuestAppsDto;
};

export type GetGuestAppsResponse = GetGuestAppsResponses[keyof GetGuestAppsResponses];

export type SearchAppsData = {
  body?: never;
  path?: never;
  query?: {
    category?:
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai';
    cursor?: string;
    pageSize?: number;
    search?: string;
  };
  url: '/api/apps/search';
};

export type SearchAppsResponses = {
  200: SearchAppsDto;
};

export type SearchAppsResponse = SearchAppsResponses[keyof SearchAppsResponses];

export type GetAppDetailsData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/apps/{id}';
};

export type GetAppDetailsResponses = {
  200: AppDetailsDto;
};

export type GetAppDetailsResponse = GetAppDetailsResponses[keyof GetAppDetailsResponses];

export type GetImageData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/apps/{id}/image';
};

export type GetImageResponses = {
  200: unknown;
};

export type PullData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/repos/pull';
};

export type PullResponses = {
  201: PullDto;
};

export type PullResponse = PullResponses[keyof PullResponses];

export type InstallAppData = {
  body: AppFormBody;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/install';
};

export type InstallAppResponses = {
  201: unknown;
};

export type StartAppData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/start';
};

export type StartAppResponses = {
  201: unknown;
};

export type StopAppData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/stop';
};

export type StopAppResponses = {
  201: unknown;
};

export type RestartAppData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/restart';
};

export type RestartAppResponses = {
  201: unknown;
};

export type UninstallAppData = {
  body: UninstallAppBody;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/uninstall';
};

export type UninstallAppResponses = {
  200: unknown;
};

export type ResetAppData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/reset';
};

export type ResetAppResponses = {
  201: unknown;
};

export type UpdateAppData = {
  body: UpdateAppBody;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/update';
};

export type UpdateAppResponses = {
  200: unknown;
};

export type UpdateAllAppsData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/app-lifecycle/update-all';
};

export type UpdateAllAppsResponses = {
  200: unknown;
};

export type UpdateAppConfigData = {
  body: AppFormBody;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/app-lifecycle/{id}/update-config';
};

export type UpdateAppConfigResponses = {
  200: unknown;
};

export type BackupAppData = {
  body?: never;
  path: {
    appid: string;
  };
  query?: never;
  url: '/api/backups/{appid}/backup';
};

export type BackupAppResponses = {
  201: unknown;
};

export type RestoreAppBackupData = {
  body: RestoreAppBackupDto;
  path: {
    appid: string;
  };
  query?: never;
  url: '/api/backups/{appid}/restore';
};

export type RestoreAppBackupResponses = {
  201: unknown;
};

export type GetAppBackupsData = {
  body?: never;
  path: {
    id: string;
  };
  query?: {
    page?: number;
    pageSize?: number;
  };
  url: '/api/backups/{id}';
};

export type GetAppBackupsResponses = {
  200: GetAppBackupsDto;
};

export type GetAppBackupsResponse = GetAppBackupsResponses[keyof GetAppBackupsResponses];

export type DeleteAppBackupData = {
  body: DeleteAppBackupBodyDto;
  path: {
    appid: string;
  };
  query?: never;
  url: '/api/backups/{appid}';
};

export type DeleteAppBackupResponses = {
  200: unknown;
};

export type AppEventsData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/sse/app';
};

export type AppEventsResponses = {
  200: {
    [key: string]: unknown;
  };
};

export type AppEventsResponse = AppEventsResponses[keyof AppEventsResponses];

export type AppLogsEventsData = {
  body?: never;
  path?: never;
  query: {
    appId: string;
    maxLines?: number;
  };
  url: '/api/sse/app-logs';
};

export type AppLogsEventsResponses = {
  200: {
    [key: string]: unknown;
  };
};

export type AppLogsEventsResponse = AppLogsEventsResponses[keyof AppLogsEventsResponses];

export type RuntipiLogsEventsData = {
  body?: never;
  path?: never;
  query?: {
    maxLines?: number;
  };
  url: '/api/sse/runtipi-logs';
};

export type RuntipiLogsEventsResponses = {
  200: {
    [key: string]: unknown;
  };
};

export type RuntipiLogsEventsResponse = RuntipiLogsEventsResponses[keyof RuntipiLogsEventsResponses];

export type GetLinksData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/links';
};

export type GetLinksResponses = {
  200: LinksDto;
};

export type GetLinksResponse = GetLinksResponses[keyof GetLinksResponses];

export type CreateLinkData = {
  body: LinkBodyDto;
  path?: never;
  query?: never;
  url: '/api/links';
};

export type CreateLinkResponses = {
  201: unknown;
};

export type DeleteLinkData = {
  body?: never;
  path: {
    id: number;
  };
  query?: never;
  url: '/api/links/{id}';
};

export type DeleteLinkResponses = {
  200: unknown;
};

export type EditLinkData = {
  body: EditLinkBodyDto;
  path: {
    id: number;
  };
  query?: never;
  url: '/api/links/{id}';
};

export type EditLinkResponses = {
  200: unknown;
};

export type CheckData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/health';
};

export type CheckErrors = {
  /**
   * The Health Check is not successful
   */
  503: {
    status?: string;
    info?: {
      [key: string]: {
        status: string;
        [key: string]: unknown | string;
      };
    } | null;
    error?: {
      [key: string]: {
        status: string;
        [key: string]: unknown | string;
      };
    } | null;
    details?: {
      [key: string]: {
        status: string;
        [key: string]: unknown | string;
      };
    };
  };
};

export type CheckError = CheckErrors[keyof CheckErrors];

export type CheckResponses = {
  /**
   * The Health Check is successful
   */
  200: {
    status?: string;
    info?: {
      [key: string]: {
        status: string;
        [key: string]: unknown | string;
      };
    } | null;
    error?: {
      [key: string]: {
        status: string;
        [key: string]: unknown | string;
      };
    } | null;
    details?: {
      [key: string]: {
        status: string;
        [key: string]: unknown | string;
      };
    };
  };
};

export type CheckResponse = CheckResponses[keyof CheckResponses];
