import type { ConfigurationRepository } from '@/domains/configuration';
import type {
  DatabaseRepository,
  RotationRepository,
  VacationRepository,
} from '@/domains/support';
import type { CodeRepository } from '@/domains/vcs';
import { Octokit } from '@octokit/rest';
import { Config } from './config';
import { LocalDatabaseRepository } from './filesystemDatabase/localDatabase.repository';
import { GitCodeRepository } from './git/gitCode.repository';
import { GitHubIssuesRepository } from './github/githubIssues.repository';
import { MaintenanceRotation } from './rotation/rotation';

export interface InfrastructureInstances {
  databaseRepository: DatabaseRepository;
  rotation: RotationRepository;
  codeRepository: CodeRepository;
  config: ConfigurationRepository;
  vacationRepository: VacationRepository;
}

let infrastructureInstances: InfrastructureInstances | undefined;

const buildInfrastructureInstances = (): InfrastructureInstances => {
  const databaseRepository = new LocalDatabaseRepository();
  const config = new Config();
  const codeRepository = new GitCodeRepository(config);
  const githubClient = new Octokit({ auth: config.getConfig().GITHUB_TOKEN });
  const vacationRepository = new GitHubIssuesRepository(githubClient, config);

  return {
    databaseRepository,
    rotation: new MaintenanceRotation({ databaseRepository }),
    config,
    codeRepository,
    vacationRepository,
  };
};

export const getInfrastructureInstances = (): InfrastructureInstances => {
  if (!infrastructureInstances) {
    infrastructureInstances = buildInfrastructureInstances();
  }

  return infrastructureInstances;
};
