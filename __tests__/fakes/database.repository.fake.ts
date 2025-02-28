import type {
  DatabaseRepository,
  DatabaseSchema,
  MaintenanceHistorySchema,
} from '../../src/domains/support/database.repository';

export class FakeDatabaseRepository implements DatabaseRepository {
  private data: DatabaseSchema;

  constructor(initialData: Partial<DatabaseSchema> = {}) {
    this.data = {
      team: initialData.team || [],
      currentIndex: initialData.currentIndex || 0,
      history: initialData.history || [],
    };
  }

  getTeam(): string[] {
    return this.data.team;
  }

  getCurrentIndex(): number {
    return this.data.currentIndex;
  }

  getHistory(): MaintenanceHistorySchema[] {
    return this.data.history;
  }

  setCurrentIndex(index: number): void {
    this.data.currentIndex = index;
  }

  addHistoryEntry(entry: MaintenanceHistorySchema): void {
    this.data.history.push(entry);
  }

  setInitialData(data: Partial<DatabaseSchema>): void {
    this.data = {
      team: data.team || [],
      currentIndex: data.currentIndex || 0,
      history: data.history || [],
    };
  }

  write(): void {
    // No-op for testing
  }
}
