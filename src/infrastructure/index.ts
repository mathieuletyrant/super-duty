import type { ConfigurationRepository } from '@/domains/configuration';
import type { DatabaseRepository } from '@/domains/support';
import type { GitRepository } from '@/domains/vcs';
import { Config } from './config';
import { LocalDatabaseRepository } from './filesystemDatabase/localDatabase.repository';
import { GitShellRepository } from './git/gitShell.repository';
import { MaintenanceRotation } from './rotation/rotation';

export interface InfrastructureInstances {
  databaseRepository: DatabaseRepository;
  rotation: MaintenanceRotation;
  gitRepository: GitRepository;
  config: ConfigurationRepository;
}

let infrastructureInstances: InfrastructureInstances | undefined;

const buildInfrastructureInstances = (): InfrastructureInstances => {
  const databaseRepository = new LocalDatabaseRepository();
  const config = new Config();
  const gitRepository = new GitShellRepository(config);
  return {
    databaseRepository,
    rotation: new MaintenanceRotation({ databaseRepository }),
    config,
    gitRepository,
  };
};

export const getInfrastructureInstances = (): InfrastructureInstances => {
  if (!infrastructureInstances) {
    infrastructureInstances = buildInfrastructureInstances();
  }

  return infrastructureInstances;
};
