"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeCodeRepository = void 0;
class FakeCodeRepository {
    constructor() {
        this.gitConfig = { name: '', email: '' };
        this.stagedFiles = new Set();
        this.commits = [];
        this.pushCount = 0;
    }
    setupWhoami({ name, email }) {
        this.gitConfig = { name, email };
    }
    add(filePattern) {
        this.stagedFiles.add(filePattern);
    }
    commit(message) {
        this.commits.push({
            message,
            files: Array.from(this.stagedFiles),
        });
        this.stagedFiles.clear();
    }
    push() {
        this.pushCount++;
    }
    // Helper methods for testing
    getGitConfig() {
        return this.gitConfig;
    }
    getStagedFiles() {
        return Array.from(this.stagedFiles);
    }
    getCommits() {
        return this.commits;
    }
    getPushCount() {
        return this.pushCount;
    }
}
exports.FakeCodeRepository = FakeCodeRepository;
