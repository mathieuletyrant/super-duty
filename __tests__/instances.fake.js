"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakeInstances = void 0;
const code_repository_fake_1 = require("./fakes/code.repository.fake");
const configuration_repository_fake_1 = require("./fakes/configuration.repository.fake");
const database_repository_fake_1 = require("./fakes/database.repository.fake");
const rotation_repository_fake_1 = require("./fakes/rotation.repository.fake");
const vacation_repository_fake_1 = require("./fakes/vacation.repository.fake");
let fakeInstances;
const buildFakeInstances = () => {
    const databaseRepository = new database_repository_fake_1.FakeDatabaseRepository();
    const config = new configuration_repository_fake_1.FakeConfigurationRepository();
    const codeRepository = new code_repository_fake_1.FakeCodeRepository();
    const vacationRepository = new vacation_repository_fake_1.FakeVacationRepository();
    const rotation = new rotation_repository_fake_1.FakeRotationRepository();
    return {
        databaseRepository,
        rotation,
        codeRepository,
        vacationRepository,
        config,
    };
};
const getFakeInstances = () => {
    if (!fakeInstances) {
        fakeInstances = buildFakeInstances();
    }
    return fakeInstances;
};
exports.getFakeInstances = getFakeInstances;
