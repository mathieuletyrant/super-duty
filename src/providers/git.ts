import { execSync } from 'node:child_process';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class GitProvider {
	/**
	 * Add a file to the git staging area
	 */
	static Add(file: string): void {
		const command = `git add ${file}`;

		execSync(command);
		return;
	}

	/**
	 * Create a git commit with the given message
	 */
	static Commit(message: string): void {
		const command = `git commit -m "${message}"`;

		execSync(command);
		return;
	}

	/**
	 * Setup the user name and email for git
	 */
	static SetupWhoami(name: string, email: string): void {
		const command = `git config user.name "${name}" && git config user.email "${email}"`;

		execSync(command);
		return;
	}

	/**
	 * Push the changes to the remote repository
	 */
	static Push(): void {
		execSync('git push');
		return;
	}
}
