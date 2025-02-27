import type { CodeRepository } from '../../src/domains/vcs/code.repository';

export class FakeCodeRepository implements CodeRepository {
  private gitConfig: { name: string; email: string } = { name: '', email: '' };
  private stagedFiles: Set<string> = new Set();
  private commits: Array<{ message: string; files: string[] }> = [];
  private pushCount = 0;

  setupWhoami({ name, email }: { name: string; email: string }): void {
    this.gitConfig = { name, email };
  }

  add(filePattern: string): void {
    this.stagedFiles.add(filePattern);
  }

  commit(message: string): void {
    this.commits.push({
      message,
      files: Array.from(this.stagedFiles),
    });
    this.stagedFiles.clear();
  }

  push(): void {
    this.pushCount++;
  }

  // Helper methods for testing
  getGitConfig(): { name: string; email: string } {
    return this.gitConfig;
  }

  getStagedFiles(): string[] {
    return Array.from(this.stagedFiles);
  }

  getCommits(): Array<{ message: string; files: string[] }> {
    return this.commits;
  }

  getPushCount(): number {
    return this.pushCount;
  }
}
