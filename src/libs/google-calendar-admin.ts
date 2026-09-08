import { createSign } from "node:crypto";
import {
  DEFAULT_GOOGLE_CALENDAR_EMBED_URL,
  selectPublicScheduleEntries,
  type FarmCalendarEvent,
  type FarmScheduleKind,
} from "@/libs/google-calendar";

const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const TOKYO_TIME_ZONE = "Asia/Tokyo";

export type ScheduleAdminInput = {
  kind: FarmScheduleKind;
  title: string;
  description?: string;
  location?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
  closed: boolean;
  featured: boolean;
};

export type ScheduleAdminEvent = ScheduleAdminInput & {
  id: string;
  htmlLink?: string;
};

type GoogleCalendarEvent = {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function base64url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function calendarIdFromEmbedUrl(embedUrl: string) {
  try {
    return new URL(embedUrl).searchParams.get("src") || "";
  } catch {
    return "";
  }
}

export function scheduleCalendarAdminConfig() {
  const email = process.env.GOOGLE_CALENDAR_SERVICE_ACCOUNT_EMAIL || "";
  const privateKey = (process.env.GOOGLE_CALENDAR_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const embedUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL || DEFAULT_GOOGLE_CALENDAR_EMBED_URL;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || calendarIdFromEmbedUrl(embedUrl);
  return { email, privateKey, calendarId, ready: Boolean(email && privateKey && calendarId) };
}

async function accessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const { email, privateKey, ready } = scheduleCalendarAdminConfig();
  if (!ready) throw new Error("Googleカレンダーの更新設定が未完了です。");

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: email,
    scope: GOOGLE_CALENDAR_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  }));
  const unsignedJwt = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedJwt);
  const assertion = `${unsignedJwt}.${signer.sign(privateKey, "base64url")}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  const body = await response.json() as { access_token?: string; expires_in?: number; error_description?: string };
  if (!response.ok || !body.access_token) throw new Error(body.error_description || "Googleの認証に失敗しました。");
  cachedToken = { value: body.access_token, expiresAt: Date.now() + (body.expires_in || 3600) * 1000 };
  return cachedToken.value;
}

async function googleCalendarRequest(path: string, init?: RequestInit) {
  const { calendarId } = scheduleCalendarAdminConfig();
  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (response.status === 204) return null;
  const body = await response.json() as { error?: { message?: string } };
  if (!response.ok) throw new Error(body.error?.message || "Googleカレンダーの更新に失敗しました。");
  return body;
}

const KIND_MARKER: Record<FarmScheduleKind, string> = {
  availability: "【受付可】",
  event: "【イベント】",
  workstay: "【住み込み募集】",
};

function addDays(date: string, amount: number) {
  const parsed = new Date(`${date}T00:00:00Z`);
  parsed.setUTCDate(parsed.getUTCDate() + amount);
  return parsed.toISOString().slice(0, 10);
}

function dateInTokyo(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: TOKYO_TIME_ZONE,
  }).format(new Date(value));
}

function timeInTokyo(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TOKYO_TIME_ZONE,
  }).format(new Date(value));
}

function googleEventBody(input: ScheduleAdminInput) {
  const markers = `${input.featured ? "【トップ掲載】" : ""}${input.closed ? "【受付終了】" : ""}${KIND_MARKER[input.kind]}`;
  const summary = `${markers}${input.title.trim()}`;
  const start = input.allDay
    ? { date: input.startDate }
    : { dateTime: `${input.startDate}T${input.startTime}:00+09:00`, timeZone: TOKYO_TIME_ZONE };
  const end = input.allDay
    ? { date: addDays(input.endDate, 1) }
    : { dateTime: `${input.endDate}T${input.endTime}:00+09:00`, timeZone: TOKYO_TIME_ZONE };
  return {
    summary,
    description: input.description?.trim() || "",
    location: input.location?.trim() || "",
    start,
    end,
  };
}

function normalizeInput(value: unknown): ScheduleAdminInput {
  const input = value as Partial<ScheduleAdminInput>;
  if (!input || !["availability", "event", "workstay"].includes(input.kind || "")) throw new Error("予定の種類を選んでください。");
  if (!input.title?.trim()) throw new Error("予定名を入力してください。");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.startDate || "") || !/^\d{4}-\d{2}-\d{2}$/.test(input.endDate || "")) throw new Error("日付を入力してください。");
  if (input.startDate! > input.endDate!) throw new Error("終了日は開始日以降にしてください。");
  const allDay = input.allDay !== false;
  if (!allDay && (!/^\d{2}:\d{2}$/.test(input.startTime || "") || !/^\d{2}:\d{2}$/.test(input.endTime || ""))) throw new Error("開始時刻と終了時刻を入力してください。");
  if (!allDay && input.startDate === input.endDate && input.startTime! >= input.endTime!) throw new Error("終了時刻は開始時刻より後にしてください。");
  return {
    kind: input.kind as FarmScheduleKind,
    title: input.title.trim(),
    description: input.description?.trim(),
    location: input.location?.trim(),
    startDate: input.startDate!,
    endDate: input.endDate!,
    allDay,
    startTime: allDay ? undefined : input.startTime,
    endTime: allDay ? undefined : input.endTime,
    closed: Boolean(input.closed),
    featured: Boolean(input.featured),
  };
}

function toAdminEvent(item: GoogleCalendarEvent): ScheduleAdminEvent | null {
  if (!item.start || !item.end) return null;
  const calendarEvent: FarmCalendarEvent = {
    id: item.id,
    title: item.summary || "",
    description: item.description,
    location: item.location,
    start: item.start.date ? `${item.start.date}T00:00:00+09:00` : item.start.dateTime || "",
    end: item.end.date ? `${item.end.date}T00:00:00+09:00` : item.end.dateTime,
    allDay: Boolean(item.start.date),
  };
  const publicEntry = selectPublicScheduleEntries([calendarEvent])[0];
  if (!publicEntry) return null;
  return {
    id: item.id,
    htmlLink: item.htmlLink,
    kind: publicEntry.kind,
    title: publicEntry.title,
    description: publicEntry.description,
    location: publicEntry.location,
    startDate: item.start.date || dateInTokyo(item.start.dateTime!),
    endDate: item.end.date ? addDays(item.end.date, -1) : dateInTokyo(item.end.dateTime!),
    allDay: Boolean(item.start.date),
    startTime: item.start.dateTime ? timeInTokyo(item.start.dateTime) : undefined,
    endTime: item.end.dateTime ? timeInTokyo(item.end.dateTime) : undefined,
    closed: publicEntry.closed,
    featured: publicEntry.featured,
  };
}

export async function listScheduleAdminEvents() {
  const today = dateInTokyo(new Date().toISOString());
  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "250",
    timeMin: `${today}T00:00:00+09:00`,
  });
  const body = await googleCalendarRequest(`/events?${params.toString()}`) as { items?: GoogleCalendarEvent[] };
  return (body.items || []).map(toAdminEvent).filter((item): item is ScheduleAdminEvent => Boolean(item));
}

export async function createScheduleAdminEvent(value: unknown) {
  const input = normalizeInput(value);
  const item = await googleCalendarRequest("/events", { method: "POST", body: JSON.stringify(googleEventBody(input)) }) as GoogleCalendarEvent;
  return toAdminEvent(item);
}

export async function updateScheduleAdminEvent(id: string, value: unknown) {
  const existing = await googleCalendarRequest(`/events/${encodeURIComponent(id)}`) as GoogleCalendarEvent;
  if (!toAdminEvent(existing)) throw new Error("HP掲載対象ではない予定は、この画面から変更できません。");
  const input = normalizeInput(value);
  const item = await googleCalendarRequest(`/events/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(googleEventBody(input)) }) as GoogleCalendarEvent;
  return toAdminEvent(item);
}

export async function deleteScheduleAdminEvent(id: string) {
  const existing = await googleCalendarRequest(`/events/${encodeURIComponent(id)}`) as GoogleCalendarEvent;
  if (!toAdminEvent(existing)) throw new Error("HP掲載対象ではない予定は、この画面から削除できません。");
  await googleCalendarRequest(`/events/${encodeURIComponent(id)}`, { method: "DELETE" });
}
