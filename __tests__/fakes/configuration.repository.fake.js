"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeConfigurationRepository = void 0;
class FakeConfigurationRepository {
    constructor(initialConfig = {}) {
        this.config = {
            GITHUB_TOKEN: initialConfig.GITHUB_TOKEN || 'fake-github-token',
            GIT_USER_NAME: initialConfig.GIT_USER_NAME || 'Test User',
            GIT_USER_EMAIL: initialConfig.GIT_USER_EMAIL || 'test@example.com',
            GITHUB_OWNER: initialConfig.GITHUB_OWNER || 'test-owner',
            GITHUB_REPO: initialConfig.GITHUB_REPO || 'test-repo',
        };
    }
    getConfig() {
        return this.config;
    }
    // Helper method for testing
    setConfig(updates) {
        this.config = { ...this.config, ...updates };
    }
}
exports.FakeConfigurationRepository = FakeConfigurationRepository;
