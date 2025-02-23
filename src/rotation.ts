import { type Database, getDatabase } from './database';

export class MaintenanceRotation {
	private database: Database;

	constructor({ database }: { database?: Database } = {}) {
		this.database = database ?? getDatabase();
	}

	public rotate() {
		const currentIndex = this.database.data.currentIndex;
		const nextIndex =
			currentIndex + 1 >= this.database.data.team.length ? 0 : currentIndex + 1;

		this.database.data.currentIndex = nextIndex;

		this.database.data.history.push({
			maintainer: this.getCurrentMaintainer(),
			date: new Date().toISOString(),
		});

		this.database.write();
	}

	public getCurrentMaintainer() {
		return this.database.data.team[this.database.data.currentIndex];
	}
}
