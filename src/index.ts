import { validateEnv } from './env';
import { CalendarService } from './services/calendar';
import { MaintenanceRotation } from './services/rotation';

const init = async () => {
  const env = validateEnv();
  const maintenance = new MaintenanceRotation();

  console.log('Current Maintainer:', maintenance.getCurrentMaintainer());

  console.log('Rotating...');
  maintenance.rotate();
  console.log('Rotated');

  console.log('New Maintainer:', maintenance.getCurrentMaintainer());

  if (env.GOOGLE_API_KEY && env.GOOGLE_CALENDAR_ID) {
    const calendar = new CalendarService(
      env.GOOGLE_API_KEY,
      env.GOOGLE_CALENDAR_ID,
    );

    await calendar.clearAllEvents();
    await calendar.createRecurringEvent('Maintenance', new Date());

    console.log('Successfully managed calendar events.');
  }

  // GitProvider.SetupWhoami(env.GIT_USER_NAME, env.GIT_USER_EMAIL);
  // GitProvider.Add('./database.json');
  // GitProvider.Commit('Update maintainer');
  // GitProvider.Push();
};

init().catch((error) => {
  console.error(error);
  process.exit(1);
});
