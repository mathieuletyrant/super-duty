import { type Database, getDatabase } from './database';

export class MaintenanceRotation {
	private database: Database;

	constructor({ database }: { database?: Database } = {}) {
		this.database = database ?? getDatabase();
	}

	public rotate() {
		this.database.data.currentIndex = this.getNextIndex();

		this.database.data.history.push({
			maintainer: this.getCurrentMaintainer(),
			date: new Date().toISOString(),
		});

		this.database.write();
	}

	public getCurrentMaintainer() {
		return this.database.data.team[this.database.data.currentIndex];
	}

	private getNextIndex() {
		const currentIndex = this.database.data.currentIndex;

		return currentIndex + 1 >= this.database.data.team.length
			? 0
			: currentIndex + 1;
	}
}
