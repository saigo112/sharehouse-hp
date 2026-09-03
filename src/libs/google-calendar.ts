export type FarmCalendarEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: string;
  end?: string;
  allDay: boolean;
};

/** Public calendar used when neither microCMS nor the deployment environment overrides it. */
export const DEFAULT_GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=9836fda29c1b85a36e66e5e4ca553b460cbe746a10a0e0d519ed4b7482411d50%40group.calendar.google.com&ctz=Asia%2FTokyo";

function unescapeIcsText(value: string) {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function propertyValue(lines: string[], property: string) {
  const line = lines.find((item) => item === property || item.startsWith(`${property}:`) || item.startsWith(`${property};`));
  if (!line) return "";
  const separator = line.indexOf(":");
  return separator >= 0 ? unescapeIcsText(line.slice(separator + 1)) : "";
}

function parseIcsDate(line?: string) {
  if (!line) return null;
  const separator = line.indexOf(":");
  if (separator < 0) return null;
  const options = line.slice(0, separator);
  const value = line.slice(separator + 1).trim();
  const allDay = options.includes("VALUE=DATE") || /^\d{8}$/.test(value);

  if (allDay) {
    const match = value.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (!match) return null;
    return { date: new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00+09:00`), allDay: true };
  }

  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!match) return null;
  const suffix = match[7] === "Z" ? "Z" : "+09:00";
  return {
    date: new Date(`${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}${suffix}`),
    allDay: false,
  };
}

function eventDateLine(lines: string[], property: "DTSTART" | "DTEND") {
  return lines.find((line) => line.startsWith(`${property}:`) || line.startsWith(`${property};`));
}

/** Parses the public iCalendar feed returned by Google Calendar. */
export function parsePublicCalendarIcs(ics: string, now = new Date()) {
  const unfolded = ics.replace(/\r?\n[ \t]/g, "");
  const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  const beginningOfToday = new Date(now);
  beginningOfToday.setHours(0, 0, 0, 0);

  return blocks
    .map((block): FarmCalendarEvent | null => {
      const lines = block.split(/\r?\n/);
      const start = parseIcsDate(eventDateLine(lines, "DTSTART"));
      if (!start || Number.isNaN(start.date.getTime())) return null;
      const parsedEnd = parseIcsDate(eventDateLine(lines, "DTEND"));
      const title = propertyValue(lines, "SUMMARY") || "ALDEL FARMの予定";
      const uid = propertyValue(lines, "UID") || `${title}-${start.date.toISOString()}`;

      return {
        id: uid,
        title,
        description: propertyValue(lines, "DESCRIPTION") || undefined,
        location: propertyValue(lines, "LOCATION") || undefined,
        start: start.date.toISOString(),
        end: parsedEnd?.date.toISOString(),
        allDay: start.allDay,
      };
    })
    .filter((event): event is FarmCalendarEvent => {
      if (!event) return false;
      const eventEnd = event.end ? new Date(event.end) : new Date(event.start);
      return eventEnd >= beginningOfToday;
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

const FEATURED_TITLE_MARKERS = [/^【トップ掲載】\s*/, /^\[トップ掲載\]\s*/];
const FEATURED_DESCRIPTION_MARKER = /(^|\n)\s*#トップ掲載\s*(?=\n|$)/g;

/** Keeps only events explicitly selected for the homepage in Google Calendar. */
export function selectFeaturedCalendarEvents(events: FarmCalendarEvent[], limit = 3) {
  return events
    .map((event): FarmCalendarEvent | null => {
      const titleMarker = FEATURED_TITLE_MARKERS.find((marker) => marker.test(event.title));
      const descriptionMarked = event.description?.includes("#トップ掲載") || false;
      if (!titleMarker && !descriptionMarked) return null;

      const title = titleMarker ? event.title.replace(titleMarker, "").trim() : event.title;
      const description = event.description
        ?.replace(FEATURED_DESCRIPTION_MARKER, "$1")
        .trim();

      return {
        ...event,
        title: title || "ALDEL FARMの予定",
        description: description || undefined,
      };
    })
    .filter((event): event is FarmCalendarEvent => event !== null)
    .slice(0, limit);
}

function calendarIdFromEmbedUrl(embedUrl: string) {
  try {
    return new URL(embedUrl).searchParams.get("src") || "";
  } catch {
    return "";
  }
}

export async function getUpcomingCalendarEvents(calendarEmbedUrl: string, limit = 3) {
  const calendarId = calendarIdFromEmbedUrl(calendarEmbedUrl);
  if (!calendarId) return [];

  const feedUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
  try {
    const response = await fetch(feedUrl, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    const events = parsePublicCalendarIcs(await response.text());
    return selectFeaturedCalendarEvents(events, limit);
  } catch {
    return [];
  }
}
