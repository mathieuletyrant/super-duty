import { ICSGenerator } from './domains/calendar/ICSGenerator';
import { validateEnv } from './env';
import { getInfrastructureInstances } from './infrastructure';

const init = async () => {
  const { rotation: maintenance, gitRepository } = getInfrastructureInstances();

  console.log('Current Maintainer:', maintenance.getCurrentMaintainer());

  console.log('Rotating...');
  maintenance.rotate();
  console.log('Rotated');

  const currentMaintainer = maintenance.getCurrentMaintainer();
  console.log('New Maintainer:', currentMaintainer);

  // Générer un fichier ICS pour la période de support
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7); // Exemple : période de 7 jours
  ICSGenerator.generateICS(currentMaintainer, startDate, endDate);

  // GitProvider.SetupWhoami(env.GIT_USER_NAME, env.GIT_USER_EMAIL);
  // GitProvider.Add('./database.json');
  // GitProvider.Commit('Update maintainer');
  // GitProvider.Push();
};

init().catch((error) => {
  console.error(error);
  process.exit(1);
});
