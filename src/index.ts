import { MaintenanceRotation } from './rotation';

const init = async () => {
	const maintenance = new MaintenanceRotation();

	console.log('Current Maintainer:', maintenance.getCurrentMaintainer());

	maintenance.rotate();
	console.log('Rotated');

	console.log('New Maintainer:', maintenance.getCurrentMaintainer());
};

init();
