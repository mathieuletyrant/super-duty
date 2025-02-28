import timekeeper from 'timekeeper';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { DatabaseRepository } from '@/domains/support';
import type { FakeDatabaseRepository } from '../../../__tests__/fakes/database.repository.fake';
import { getFakeInstances } from '../../../__tests__/instances.fake';
import { MaintenanceRotation } from './rotation';

describe('rotation', () => {
  const today = new Date('2021-01-01T01:00:00.000Z');

  let databaseRepository: FakeDatabaseRepository;

  beforeEach(() => {
    timekeeper.freeze(today);
    databaseRepository = getFakeInstances().databaseRepository;
  });

  afterEach(() => {
    timekeeper.reset();
  });

  it('should update the current maintainer and push new history', () => {
    // GIVEN
    databaseRepository.setInitialData({
      team: ['Mathieu', 'John'],
      currentIndex: 0,
      history: [],
    });

    const rotation = new MaintenanceRotation({ databaseRepository });
    expect(rotation.getCurrentMaintainer()).toBe('Mathieu');

    // WHEN
    rotation.rotate();

    // THEN
    expect(rotation.getCurrentMaintainer()).toBe('John');
    expect(databaseRepository.getHistory()[0]).toEqual({
      maintainer: 'John',
      date: today.toISOString(),
    });
  });

  it('should reset the maintainer to the first one after the last one', () => {
    // GIVEN
    databaseRepository.setInitialData({
      team: ['Mathieu', 'John'],
      currentIndex: 1,
      history: [],
    });

    const rotation = new MaintenanceRotation({ databaseRepository });
    expect(rotation.getCurrentMaintainer()).toBe('John');

    // WHEN
    rotation.rotate();

    // THEN
    expect(rotation.getCurrentMaintainer()).toBe('Mathieu');
    expect(databaseRepository.getHistory()[0]).toEqual({
      maintainer: 'Mathieu',
      date: today.toISOString(),
    });
  });
});
