import timekeeper from 'timekeeper';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getDatabase } from '../providers/database';
import { MaintenanceRotation } from '../services/rotation';

describe('rotation', () => {
  const today = new Date('2021-01-01T01:00:00.000Z');

  beforeEach(() => {
    timekeeper.freeze(today);
  });

  afterEach(() => {
    timekeeper.reset();
  });

  it('should update the current maintainer and push new history', () => {
    // GIVEN
    const database = getDatabase({
      team: ['Mathieu', 'John', 'Jane'],
      currentIndex: 0,
      history: [],
    });

    const rotation = new MaintenanceRotation({ database });
    expect(rotation.getCurrentMaintainer()).toBe('Mathieu');

    // WHEN
    rotation.rotate();

    // THEN
    expect(rotation.getCurrentMaintainer()).toBe('John');
    expect(database.data.history[0]).toEqual({
      maintainer: 'John',
      date: today.toISOString(),
    });
  });

  it('should reset the maintainer to the first one after the last one', () => {
    // GIVEN
    const database = getDatabase({
      team: ['Mathieu', 'John'],
      currentIndex: 1,
      history: [],
    });

    const rotation = new MaintenanceRotation({ database });
    expect(rotation.getCurrentMaintainer()).toBe('John');

    // WHEN
    rotation.rotate();

    // THEN
    expect(rotation.getCurrentMaintainer()).toBe('Mathieu');
    expect(database.data.history[0]).toEqual({
      maintainer: 'Mathieu',
      date: today.toISOString(),
    });
  });
});
