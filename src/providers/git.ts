import { execSync } from 'node:child_process';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class GitProvider {
	/**
	 * Add a file to the git staging area
	 */
	static add(file: string): void {
		const command = `git add ${file}`;

		execSync(command);
		return;
	}

	/**
	 * Create a git commit with the given message
	 */
	static commit(message: string): void {
		const command = `git commit -m "${message}"`;

		execSync(command);
		return;
	}

	/**
	 * Push the changes to the remote repository
	 */
	static push(): void {
		execSync('git push');
		return;
	}
}
