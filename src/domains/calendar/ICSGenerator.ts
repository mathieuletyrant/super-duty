import { format } from 'date-fns';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ICSGenerator {
  static generateICS(
    maintainer: string,
    startDate: Date,
    endDate: Date,
  ): string {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Support Duty for ${maintainer}
DTSTART:${format(startDate, "yyyyMMdd'T'HHmmss'Z'")}
DTEND:${format(endDate, "yyyyMMdd'T'HHmmss'Z'")}
DESCRIPTION:Support duty period for ${maintainer}
END:VEVENT
END:VCALENDAR
    `.trim();

    return icsContent;
  }
}
