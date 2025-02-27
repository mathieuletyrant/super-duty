"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeRotationRepository = void 0;
class FakeRotationRepository {
    constructor(options = {}) {
        this.team = options.team || ['User1', 'User2', 'User3'];
        this.currentIndex = options.currentIndex || 0;
        this.currentMaintainer = this.team[this.currentIndex];
        this.nextMaintainer = this.team[(this.currentIndex + 1) % this.team.length];
        this.rotationPeriod = options.rotationPeriod || new Date();
    }
    getCurrentMaintainer() {
        return this.currentMaintainer;
    }
    getNextMaintainer() {
        return this.nextMaintainer;
    }
    rotate() {
        this.currentIndex = (this.currentIndex + 1) % this.team.length;
        this.currentMaintainer = this.team[this.currentIndex];
        this.nextMaintainer = this.team[(this.currentIndex + 1) % this.team.length];
        this.rotationPeriod = new Date();
    }
    getCurrentRotationPeriod() {
        return this.rotationPeriod;
    }
    getNextRotationPeriod() {
        const nextPeriod = new Date(this.rotationPeriod);
        nextPeriod.setDate(nextPeriod.getDate() + 7); // Assuming weekly rotation
        return nextPeriod;
    }
}
exports.FakeRotationRepository = FakeRotationRepository;
