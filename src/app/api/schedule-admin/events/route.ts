import { NextRequest, NextResponse } from "next/server";
import {
  createScheduleAdminEvent,
  deleteScheduleAdminEvent,
  listScheduleAdminEvents,
  scheduleCalendarAdminConfig,
  updateScheduleAdminEvent,
} from "@/libs/google-calendar-admin";
import { SCHEDULE_ADMIN_COOKIE, scheduleAdminSessionIsValid } from "@/libs/schedule-admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: NextRequest) {
  return scheduleAdminSessionIsValid(request.cookies.get(SCHEDULE_ADMIN_COOKIE)?.value);
}

function errorResponse(error: unknown, status = 500) {
  const message = error instanceof Error ? error.message : "処理に失敗しました。";
  return NextResponse.json({ message }, { status });
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return errorResponse(new Error("ログインしてください。"), 401);
  if (!scheduleCalendarAdminConfig().ready) return errorResponse(new Error("Googleカレンダーの更新設定が未完了です。"), 503);
  try {
    return NextResponse.json({ events: await listScheduleAdminEvents() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return errorResponse(new Error("ログインしてください。"), 401);
  try {
    const event = await createScheduleAdminEvent(await request.json());
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    return errorResponse(error, 400);
  }
}

export async function PATCH(request: NextRequest) {
  if (!authorized(request)) return errorResponse(new Error("ログインしてください。"), 401);
  try {
    const body = await request.json() as { id?: string; event?: unknown };
    if (!body.id) return errorResponse(new Error("更新する予定を選んでください。"), 400);
    const event = await updateScheduleAdminEvent(body.id, body.event);
    return NextResponse.json({ event });
  } catch (error) {
    return errorResponse(error, 400);
  }
}

export async function DELETE(request: NextRequest) {
  if (!authorized(request)) return errorResponse(new Error("ログインしてください。"), 401);
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return errorResponse(new Error("削除する予定を選んでください。"), 400);
    await deleteScheduleAdminEvent(id);
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return errorResponse(error, 400);
  }
}
