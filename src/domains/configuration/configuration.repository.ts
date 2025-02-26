import { z } from 'zod';

export const configurationSchema = z.object({
  GITHUB_TOKEN: z.string().min(1),
  GIT_USER_NAME: z.string().min(1),
  GIT_USER_EMAIL: z.string().min(1),
});

export type Configuration = z.infer<typeof configurationSchema>;

export interface ConfigurationRepository {
  getConfig(): Configuration;
}
