import path from 'node:path';
import { JSONFileSyncPreset } from 'lowdb/node';

type MaintenanceHistorySchema = {
	maintainer: string;
	date: string;
};

type DatabaseSchema = {
	team: string[];
	currentIndex: number;
	history: MaintenanceHistorySchema[];
};

export type Database = ReturnType<typeof getDatabase>;

export const getDatabase = (defaultDatabase?: DatabaseSchema) => {
	return JSONFileSyncPreset<DatabaseSchema>(
		path.join(__dirname, '..', 'database.json'),
		defaultDatabase ?? {
			team: [],
			currentIndex: 0,
			history: [],
		},
	);
};
