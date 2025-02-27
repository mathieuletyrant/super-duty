"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeVacationRepository = void 0;
class FakeVacationRepository {
    constructor(initialVacations = []) {
        this.vacations = new Map();
        this.vacationIds = new Map();
        this.nextId = 1;
        initialVacations.forEach((vacation) => {
            this.addVacation(vacation);
        });
    }
    addVacation(vacation) {
        const username = vacation.user.username;
        if (!this.vacations.has(username)) {
            this.vacations.set(username, []);
        }
        this.vacations.get(username)?.push(vacation);
        const id = `vacation-${this.nextId++}`;
        this.vacationIds.set(id, vacation);
    }
    async getUserVacations(user) {
        return this.vacations.get(user.username) || [];
    }
    async getAllVacations() {
        return Array.from(this.vacationIds.values());
    }
    async isUserOnVacation(user, date) {
        const userVacations = this.vacations.get(user.username) || [];
        return userVacations.some((vacation) => date >= vacation.startDate && date <= vacation.endDate);
    }
    async createVacation(vacation) {
        this.addVacation(vacation);
        return vacation;
    }
    async updateVacation(id, updates) {
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
    async deleteVacation(id) {
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
exports.FakeVacationRepository = FakeVacationRepository;
