import { execSync } from 'node:child_process';

import type { ConfigurationRepository } from '@/domains/configuration';
import type { GitRepository } from '@/domains/vcs';

export class GitShellRepository implements GitRepository {
  constructor(private readonly config: ConfigurationRepository) {
    this.setupWhoami({
      name: this.config.getConfig().GIT_USER_NAME,
      email: this.config.getConfig().GIT_USER_EMAIL,
    });
  }

  /**
   * Add a file to the git staging area
   */
  add(filePattern: string): void {
    const command = `git add ${filePattern}`;

    execSync(command);
    return;
  }

  /**
   * Create a git commit with the given message
   */
  commit(message: string): void {
    const command = `git commit -m "${message}"`;

    execSync(command);
    return;
  }

  /**
   * Setup the user name and email for git
   */
  setupWhoami({ name, email }: { name: string; email: string }): void {
    const command = `git config user.name "${name}" && git config user.email "${email}"`;

    execSync(command);
    return;
  }

  /**
   * Push the changes to the remote repository
   */
  push(): void {
    execSync('git push');
    return;
  }
}
