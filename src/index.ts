import { GitProvider } from './providers/git.js';

import { MaintenanceRotation } from './rotation.js';

const init = async () => {
	const maintenance = new MaintenanceRotation();

	console.log('Current Maintainer:', maintenance.getCurrentMaintainer());

	maintenance.rotate();
	console.log('Rotated');

	console.log('New Maintainer:', maintenance.getCurrentMaintainer());

	GitProvider.SetupWhoami('Maintainer', 'mathieu.letyrant@gmail.com');
	GitProvider.Add('./database.json');
	GitProvider.Commit('Update maintainer');
	GitProvider.Push();
};

init();
