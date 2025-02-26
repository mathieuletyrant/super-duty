import { calendar, type calendar_v3 } from '@googleapis/calendar';

export class CalendarService {
  private calendar: calendar_v3.Calendar;
  private calendarId: string;

  constructor(apiKey: string, calendarId: string) {
    this.calendar = calendar({
      version: 'v3',
      auth: apiKey,
    });
    this.calendarId = calendarId;
  }

  async clearAllEvents(): Promise<void> {
    const events = await this.calendar.events.list({
      calendarId: this.calendarId,
    });

    if (events.data.items) {
      for (const event of events.data.items) {
        if (event.id) {
          await this.calendar.events.delete({
            calendarId: this.calendarId,
            eventId: event.id,
          });
        }
      }
    }
  }

  async createRecurringEvent(title: string, startDate: Date): Promise<void> {
    await this.calendar.events.insert({
      calendarId: this.calendarId,
      requestBody: {
        summary: title,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: 'UTC',
        },
        recurrence: ['RRULE:FREQ=WEEKLY'],
      },
    });
  }
}
