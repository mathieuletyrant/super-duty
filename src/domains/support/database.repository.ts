export type MaintenanceHistorySchema = {
  maintainer: string;
  date: string;
};

export type DatabaseSchema = {
  team: string[];
  currentIndex: number;
  history: MaintenanceHistorySchema[];
};

export interface DatabaseRepository {
  getTeam(): string[];
  getCurrentIndex(): number;
  getHistory(): MaintenanceHistorySchema[];
  setCurrentIndex(index: number): void;
  addHistoryEntry(entry: MaintenanceHistorySchema): void;
  write(): void;
}
