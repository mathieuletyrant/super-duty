"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeDatabaseRepository = void 0;
class FakeDatabaseRepository {
    constructor(initialData = {}) {
        this.data = {
            team: initialData.team || [],
            currentIndex: initialData.currentIndex || 0,
            history: initialData.history || [],
        };
    }
    getTeam() {
        return this.data.team;
    }
    getCurrentIndex() {
        return this.data.currentIndex;
    }
    getHistory() {
        return this.data.history;
    }
    setCurrentIndex(index) {
        this.data.currentIndex = index;
    }
    addHistoryEntry(entry) {
        this.data.history.push(entry);
    }
    setInitialData(data) {
        this.data = {
            team: data.team || [],
            currentIndex: data.currentIndex || 0,
            history: data.history || [],
        };
    }
    write() {
        // No-op for testing
    }
}
exports.FakeDatabaseRepository = FakeDatabaseRepository;
