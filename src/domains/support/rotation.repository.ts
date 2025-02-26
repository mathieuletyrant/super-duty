export interface RotationRepository {
  getCurrentMaintainer(): string;
  getNextMaintainer(): string;
  rotate(): void;
  getCurrentRotationPeriod(): Date;
  getNextRotationPeriod(): Date;
}
