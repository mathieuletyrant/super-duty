import { validateEnv } from './env';
import { MaintenanceRotation } from './services/rotation';

const init = async () => {
  const env = validateEnv();
  const maintenance = new MaintenanceRotation();

  console.log('Current Maintainer:', maintenance.getCurrentMaintainer());

  console.log('Rotating...');
  maintenance.rotate();
  console.log('Rotated');

  console.log('New Maintainer:', maintenance.getCurrentMaintainer());

  // GitProvider.SetupWhoami(env.GIT_USER_NAME, env.GIT_USER_EMAIL);
  // GitProvider.Add('./database.json');
  // GitProvider.Commit('Update maintainer');
  // GitProvider.Push();
};

init().catch((error) => {
  console.error(error);
  process.exit(1);
});
