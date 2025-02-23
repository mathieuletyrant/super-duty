import { MaintenanceRotation } from './rotation.js';

const init = async () => {
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
