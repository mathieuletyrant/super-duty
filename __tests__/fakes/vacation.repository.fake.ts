import type {
  Vacation,
  VacationRepository,
} from '../../src/domains/support/vacation.repository';
import type { User } from '../../src/domains/user/user.model';

export class FakeVacationRepository implements VacationRepository {
  private vacations: Map<string, Vacation[]> = new Map();
  private vacationIds: Map<string, Vacation> = new Map();
  private nextId = 1;

  constructor(initialVacations: Vacation[] = []) {
    initialVacations.forEach((vacation) => {
      this.addVacation(vacation);
    });
  }

  private addVacation(vacation: Vacation): void {
    const username = vacation.user.username;
    if (!this.vacations.has(username)) {
      this.vacations.set(username, []);
    }
    this.vacations.get(username)?.push(vacation);

    const id = `vacation-${this.nextId++}`;
    this.vacationIds.set(id, vacation);
  }

  async getUserVacations(user: User): Promise<Vacation[]> {
    return this.vacations.get(user.username) || [];
  }

  async getAllVacations(): Promise<Vacation[]> {
    return Array.from(this.vacationIds.values());
  }

  async isUserOnVacation(user: User, date: Date): Promise<boolean> {
    const userVacations = this.vacations.get(user.username) || [];
    return userVacations.some(
      (vacation) => date >= vacation.startDate && date <= vacation.endDate,
    );
  }

  async createVacation(vacation: Vacation): Promise<Vacation> {
    this.addVacation(vacation);
    return vacation;
  }

  async updateVacation(
    id: string,
    updates: Partial<Vacation>,
  ): Promise<Vacation> {
    const vacation = this.vacationIds.get(id);
    if (!vacation) {
      throw new Error(`Vacation with ID ${id} not found`);
    }

    const updatedVacation = { ...vacation, ...updates };
    this.vacationIds.set(id, updatedVacation);

    // Update in user's vacations list
    const username = vacation.user.username;
    const userVacations = this.vacations.get(username) || [];
    const index = userVacations.findIndex((v) => v === vacation);
    if (index !== -1) {
      userVacations[index] = updatedVacation;
    }

    return updatedVacation;
  }

  async deleteVacation(id: string): Promise<boolean> {
    const vacation = this.vacationIds.get(id);
    if (!vacation) {
      return false;
    }

    this.vacationIds.delete(id);

    const username = vacation.user.username;
    const userVacations = this.vacations.get(username) || [];
    const index = userVacations.findIndex((v) => v === vacation);
    if (index !== -1) {
      userVacations.splice(index, 1);
    }

    return true;
  }
}
