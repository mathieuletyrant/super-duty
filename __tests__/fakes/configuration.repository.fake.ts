import type {
  Configuration,
  ConfigurationRepository,
} from '../../src/domains/configuration/configuration.repository';

export class FakeConfigurationRepository implements ConfigurationRepository {
  private config: Configuration;

  constructor(initialConfig: Partial<Configuration> = {}) {
    this.config = {
      GITHUB_TOKEN: initialConfig.GITHUB_TOKEN || 'fake-github-token',
      GIT_USER_NAME: initialConfig.GIT_USER_NAME || 'Test User',
      GIT_USER_EMAIL: initialConfig.GIT_USER_EMAIL || 'test@example.com',
      GITHUB_OWNER: initialConfig.GITHUB_OWNER || 'test-owner',
      GITHUB_REPO: initialConfig.GITHUB_REPO || 'test-repo',
    };
  }

  getConfig(): Configuration {
    return this.config;
  }

  // Helper method for testing
  setConfig(updates: Partial<Configuration>): void {
    this.config = { ...this.config, ...updates };
  }
}
