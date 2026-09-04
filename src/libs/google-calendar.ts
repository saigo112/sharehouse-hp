export type FarmCalendarEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: string;
  end?: string;
  allDay: boolean;
};

export type FarmScheduleKind = "availability" | "event" | "workstay";

export type FarmScheduleEntry = FarmCalendarEvent & {
  kind: FarmScheduleKind;
  closed: boolean;
  featured: boolean;
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

const TITLE_MARKERS = {
  availability: [/【受付可】/g, /\[受付可\]/gi],
  event: [/【イベント】/g, /\[イベント\]/gi],
  workstay: [/【住み込み募集】/g, /\[住み込み募集\]/gi],
  closed: [/【受付終了】/g, /\[受付終了\]/gi],
  featured: [/【トップ掲載】/g, /\[トップ掲載\]/gi],
} as const;

const DESCRIPTION_MARKER = /(^|\n)\s*#(?:受付可|イベント|住み込み募集|受付終了|トップ掲載)\s*(?=\n|$)/g;

function hasTitleMarker(title: string, markers: readonly RegExp[]) {
  return markers.some((marker) => {
    marker.lastIndex = 0;
    return marker.test(title);
  });
}

function hasDescriptionMarker(description: string | undefined, marker: string) {
  return description?.split("\n").some((line) => line.trim() === `#${marker}`) || false;
}

function cleanPublicCalendarText(event: FarmCalendarEvent) {
  const title = Object.values(TITLE_MARKERS)
    .flat()
    .reduce((value, marker) => value.replace(marker, ""), event.title)
    .replace(/\s{2,}/g, " ")
    .trim();
  const description = event.description?.replace(DESCRIPTION_MARKER, "$1").trim();

  return {
    title: title || "ALDEL FARMの予定",
    description: description || undefined,
  };
}

/** Selects public schedule entries while leaving untagged private bookings out. */
export function selectPublicScheduleEntries(events: FarmCalendarEvent[]) {
  return events
    .map((event): FarmScheduleEntry | null => {
      const availability = hasTitleMarker(event.title, TITLE_MARKERS.availability) || hasDescriptionMarker(event.description, "受付可");
      const eventMarked = hasTitleMarker(event.title, TITLE_MARKERS.event) || hasDescriptionMarker(event.description, "イベント");
      const workstay = hasTitleMarker(event.title, TITLE_MARKERS.workstay) || hasDescriptionMarker(event.description, "住み込み募集");
      const kind: FarmScheduleKind | null = workstay ? "workstay" : eventMarked ? "event" : availability ? "availability" : null;
      if (!kind) return null;

      const cleaned = cleanPublicCalendarText(event);
      return {
        ...event,
        ...cleaned,
        kind,
        closed: hasTitleMarker(event.title, TITLE_MARKERS.closed) || hasDescriptionMarker(event.description, "受付終了"),
        featured: hasTitleMarker(event.title, TITLE_MARKERS.featured) || hasDescriptionMarker(event.description, "トップ掲載"),
      };
    })
    .filter((event): event is FarmScheduleEntry => event !== null);
}

/** Keeps only events explicitly selected for the homepage in Google Calendar. */
export function selectFeaturedCalendarEvents(events: FarmCalendarEvent[], limit = 3) {
  return events
    .map((event): FarmCalendarEvent | null => {
      const titleMarked = hasTitleMarker(event.title, TITLE_MARKERS.featured);
      const descriptionMarked = hasDescriptionMarker(event.description, "トップ掲載");
      if (!titleMarked && !descriptionMarked) return null;

      const { title, description } = cleanPublicCalendarText(event);

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

async function fetchPublicCalendarEvents(calendarEmbedUrl: string) {
  const calendarId = calendarIdFromEmbedUrl(calendarEmbedUrl);
  if (!calendarId) return [];

  const feedUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
  try {
    const response = await fetch(feedUrl, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    return parsePublicCalendarIcs(await response.text());
  } catch {
    return [];
  }
}

export async function getUpcomingCalendarEvents(calendarEmbedUrl: string, limit = 3) {
  const events = await fetchPublicCalendarEvents(calendarEmbedUrl);
  return selectFeaturedCalendarEvents(events, limit);
}

export async function getPublicScheduleEntries(calendarEmbedUrl: string) {
  const events = await fetchPublicCalendarEvents(calendarEmbedUrl);
  return selectPublicScheduleEntries(events);
}
