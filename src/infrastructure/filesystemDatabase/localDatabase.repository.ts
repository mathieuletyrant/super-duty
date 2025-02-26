import type { LowSync } from 'lowdb/lib/core/Low';
import { JSONFileSyncPreset } from 'lowdb/node';
import type {
  DatabaseRepository,
  DatabaseSchema,
  MaintenanceHistorySchema,
} from '../../domains/support/database.repository';

export class LocalDatabaseRepository implements DatabaseRepository {
  private db: LowSync<DatabaseSchema>;

  constructor({ defaultDatabase }: { defaultDatabase?: DatabaseSchema } = {}) {
    this.db = JSONFileSyncPreset<DatabaseSchema>(
      'database.json',
      defaultDatabase ?? {
        team: [],
        currentIndex: 0,
        history: [],
      },
    );

    this.db.read();
  }

  getTeam(): string[] {
    return this.db.data?.team || [];
  }

  getCurrentIndex(): number {
    return this.db.data?.currentIndex || 0;
  }

  getHistory(): MaintenanceHistorySchema[] {
    return this.db.data?.history || [];
  }

  setCurrentIndex(index: number): void {
    if (this.db.data) {
      this.db.data.currentIndex = index;
    }
  }

  addHistoryEntry(entry: MaintenanceHistorySchema): void {
    if (this.db.data) {
      this.db.data.history.push(entry);
    }
  }

  write(): void {
    this.db.write();
  }
}
