import { GitProvider } from './providers/git.js';

import { MaintenanceRotation } from './rotation.js';

const init = async () => {
	const maintenance = new MaintenanceRotation();

	console.log('Current Maintainer:', maintenance.getCurrentMaintainer());

	maintenance.rotate();
	console.log('Rotated');

	console.log('New Maintainer:', maintenance.getCurrentMaintainer());

	GitProvider.add('./database.json');
	GitProvider.commit('Update maintainer');
};

init();
