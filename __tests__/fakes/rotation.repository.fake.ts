import type { RotationRepository } from '../../src/domains/support/rotation.repository';

export class FakeRotationRepository implements RotationRepository {
  private currentMaintainer: string;
  private nextMaintainer: string;
  private team: string[];
  private currentIndex: number;
  private rotationPeriod: Date;

  constructor(
    options: {
      team?: string[];
      currentIndex?: number;
      rotationPeriod?: Date;
    } = {},
  ) {
    this.team = options.team || ['User1', 'User2', 'User3'];
    this.currentIndex = options.currentIndex || 0;
    this.currentMaintainer = this.team[this.currentIndex];
    this.nextMaintainer = this.team[(this.currentIndex + 1) % this.team.length];
    this.rotationPeriod = options.rotationPeriod || new Date();
  }

  getCurrentMaintainer(): string {
    return this.currentMaintainer;
  }

  getNextMaintainer(): string {
    return this.nextMaintainer;
  }

  rotate(): void {
    this.currentIndex = (this.currentIndex + 1) % this.team.length;
    this.currentMaintainer = this.team[this.currentIndex];
    this.nextMaintainer = this.team[(this.currentIndex + 1) % this.team.length];
    this.rotationPeriod = new Date();
  }

  getCurrentRotationPeriod(): Date {
    return this.rotationPeriod;
  }

  getNextRotationPeriod(): Date {
    const nextPeriod = new Date(this.rotationPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + 7); // Assuming weekly rotation
    return nextPeriod;
  }
}
