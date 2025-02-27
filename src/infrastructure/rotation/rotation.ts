import type { DatabaseRepository } from '../../domains/support/database.repository';

export class MaintenanceRotation {
  private databaseRepository: DatabaseRepository;

  constructor({
    databaseRepository,
  }: { databaseRepository: DatabaseRepository }) {
    this.databaseRepository = databaseRepository;
  }

  public rotate() {
    this.databaseRepository.setCurrentIndex(this.getNextIndex());

    this.databaseRepository.addHistoryEntry({
      maintainer: this.getCurrentMaintainer(),
      date: new Date().toISOString(),
    });

    this.databaseRepository.write();
  }

  public getCurrentMaintainer() {
    return this.databaseRepository.getTeam()[
      this.databaseRepository.getCurrentIndex()
    ];
  }

  private getNextIndex() {
    const currentIndex = this.databaseRepository.getCurrentIndex();

    return currentIndex + 1 >= this.databaseRepository.getTeam().length
      ? 0
      : currentIndex + 1;
  }
}
