import { createHmac, timingSafeEqual } from "node:crypto";

export const SCHEDULE_ADMIN_COOKIE = "aldel_schedule_admin";
const SESSION_LENGTH_SECONDS = 60 * 60 * 12;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret() {
  return process.env.SCHEDULE_ADMIN_SESSION_SECRET || process.env.SCHEDULE_ADMIN_PASSWORD || "";
}

function signature(expiresAt: string) {
  return createHmac("sha256", sessionSecret()).update(expiresAt).digest("base64url");
}

export function scheduleAdminIsConfigured() {
  return Boolean(process.env.SCHEDULE_ADMIN_PASSWORD && sessionSecret());
}

export function passwordIsValid(password: string) {
  const expected = process.env.SCHEDULE_ADMIN_PASSWORD;
  return Boolean(expected && safeEqual(password, expected));
}

export function createScheduleAdminSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_LENGTH_SECONDS);
  return `${expiresAt}.${signature(expiresAt)}`;
}

export function scheduleAdminSessionIsValid(value?: string) {
  if (!value || !scheduleAdminIsConfigured()) return false;
  const [expiresAt, suppliedSignature, extra] = value.split(".");
  if (!expiresAt || !suppliedSignature || extra) return false;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(suppliedSignature, signature(expiresAt));
}

export const scheduleAdminCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_LENGTH_SECONDS,
};
