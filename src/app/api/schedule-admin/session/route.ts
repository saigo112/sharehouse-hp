import { NextRequest, NextResponse } from "next/server";
import {
  SCHEDULE_ADMIN_COOKIE,
  createScheduleAdminSession,
  passwordIsValid,
  scheduleAdminCookieOptions,
  scheduleAdminIsConfigured,
  scheduleAdminSessionIsValid,
} from "@/libs/schedule-admin-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    authenticated: scheduleAdminSessionIsValid(request.cookies.get(SCHEDULE_ADMIN_COOKIE)?.value),
    configured: scheduleAdminIsConfigured(),
  });
}

export async function POST(request: NextRequest) {
  if (!scheduleAdminIsConfigured()) {
    return NextResponse.json({ message: "スタッフ用パスワードが未設定です。" }, { status: 503 });
  }
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!passwordIsValid(body.password || "")) {
    return NextResponse.json({ message: "パスワードが違います。" }, { status: 401 });
  }
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(SCHEDULE_ADMIN_COOKIE, createScheduleAdminSession(), scheduleAdminCookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(SCHEDULE_ADMIN_COOKIE, "", { ...scheduleAdminCookieOptions, maxAge: 0 });
  return response;
}
