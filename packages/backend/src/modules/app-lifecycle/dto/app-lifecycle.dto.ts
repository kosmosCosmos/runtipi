import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const appFormSchema = z
  .object({
    exposed: z.boolean().optional(),
    exposedLocal: z.boolean().optional(),
    openPort: z.boolean().optional().default(true),
    domain: z.string().optional(),
    isVisibleOnGuestDashboard: z.boolean().optional(),
    enableAuth: z.boolean().optional(),
  })
  .extend({})
  .catchall(z.unknown());

export class AppFormBody extends createZodDto(appFormSchema) {}

export class UninstallAppBody extends createZodDto(z.object({ removeBackups: z.boolean() })) {}

export class UpdateAppBody extends createZodDto(z.object({ performBackup: z.boolean() })) {}
