import type { InfrastructureInstances } from '../src/infrastructure';

import { FakeCodeRepository } from './fakes/code.repository.fake';
import { FakeConfigurationRepository } from './fakes/configuration.repository.fake';
import { FakeDatabaseRepository } from './fakes/database.repository.fake';
import { FakeRotationRepository } from './fakes/rotation.repository.fake';
import { FakeVacationRepository } from './fakes/vacation.repository.fake';

export interface FakeInstances extends InfrastructureInstances {
  databaseRepository: FakeDatabaseRepository;
  rotation: FakeRotationRepository;
  codeRepository: FakeCodeRepository;
  vacationRepository: FakeVacationRepository;
  config: FakeConfigurationRepository;
}

let fakeInstances: FakeInstances | undefined;

const buildFakeInstances = (): FakeInstances => {
  const databaseRepository = new FakeDatabaseRepository();
  const config = new FakeConfigurationRepository();
  const codeRepository = new FakeCodeRepository();
  const vacationRepository = new FakeVacationRepository();
  const rotation = new FakeRotationRepository();

  return {
    databaseRepository,
    rotation,
    codeRepository,
    vacationRepository,
    config,
  };
};

export const getFakeInstances = (): FakeInstances => {
  if (!fakeInstances) {
    fakeInstances = buildFakeInstances();
  }

  return fakeInstances;
};
