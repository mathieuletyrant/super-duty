import 'dotenv/config';
import {
  type Configuration,
  type ConfigurationRepository,
  configurationSchema,
} from '../../domains/configuration';

export class Config implements ConfigurationRepository {
  private config: Configuration;

  constructor() {
    try {
      this.config = configurationSchema.parse(process.env);
    } catch (error) {
      console.error('❌ Invalid environment variables:', error);
      process.exit(1);
    }
  }

  getConfig(): Configuration {
    return this.config;
  }
}
