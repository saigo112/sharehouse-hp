import type { Metadata } from "next";
import { FarmBreadcrumbs, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { ScheduleInquiry } from "@/components/farm/ScheduleInquiry";
import { getFarmSiteGlobals } from "@/libs/farm-microcms";

export const metadata: Metadata = {
  title: "日程を見る・相談する",
  description: "ALDEL FARMの見学、体験、滞在、住み込み、移住相談の日程を確認し、LINEで相談できます。",
};

export const revalidate = 60;

type SchedulePageProps = {
  searchParams: { program?: string; activity?: string | string[]; date?: string };
};

function calendarUrlForMode(source: string, mode: "AGENDA" | "MONTH") {
  if (!source) return "";
  try {
    const url = new URL(source);
    url.searchParams.set("mode", mode);
    url.searchParams.set("showTitle", "0");
    url.searchParams.set("showPrint", "0");
    url.searchParams.set("showTabs", "0");
    url.searchParams.set("showCalendars", "0");
    return url.toString();
  } catch {
    return source;
  }
}

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const globals = await getFarmSiteGlobals();
  const calendarUrl = globals?.scheduleCalendarEmbedUrl || process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL || "";
  const mobileCalendarUrl = calendarUrlForMode(calendarUrl, "AGENDA");
  const desktopCalendarUrl = calendarUrlForMode(calendarUrl, "MONTH");
  const lineOfficialId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || globals?.lineOfficialId || "@844kyxqq";
  const lineFriendUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || globals?.lineOfficialUrl || `https://line.me/R/ti/p/${encodeURIComponent(lineOfficialId)}`;
  const activities = Array.isArray(searchParams.activity) ? searchParams.activity : searchParams.activity ? [searchParams.activity] : [];

  return (
    <FarmPageShell>
      <header className="border-b border-stone-200 bg-[#f1eee7] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <FarmBreadcrumbs items={[{ label: "日程を見る・相談する" }]} />
          <p className="mt-10 font-hand text-primary">Check the calendar</p>
          <h1 className="mt-4 max-w-4xl font-headline text-4xl font-black leading-tight tracking-[-0.03em] md:text-6xl">日程を見て、<br />できることを相談する。</h1>
          <p className="mt-7 max-w-3xl text-sm leading-8 text-on-surface-variant md:text-base">カレンダーで受け入れ状況を確認し、希望日と内容をLINEでお知らせください。季節、天候、作業、宿泊場所の状況を確認して日程を決めます。</p>
        </div>
      </header>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="font-hand text-primary">Availability</p>
              <h2 className="mt-3 font-headline text-3xl font-black">受け入れ状況カレンダー</h2>
              <p className="mt-5 text-sm leading-8 text-on-surface-variant">予定が入っている日でも、内容や時間によって受け入れられる場合があります。反対に、空欄の日も現場の状況によって調整が必要です。候補日を2つほど選んでください。</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <span className="inline-flex rounded-full bg-secondary-container px-4 py-2 text-xs font-black text-on-secondary-container">表示時刻：日本時間</span>
            </div>
          </div>

          {calendarUrl ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-sm">
              <iframe src={mobileCalendarUrl} title="ALDEL FARM 受け入れ状況カレンダー（予定リスト）" className="block h-[620px] w-full sm:hidden" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <iframe src={desktopCalendarUrl} title="ALDEL FARM 受け入れ状況カレンダー（月表示）" className="hidden h-[700px] w-full sm:block" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-stone-400 bg-surface-container-low p-8 text-sm leading-7 text-on-surface-variant">カレンダーを準備しています。下のフォームから希望日をお知らせください。</div>
          )}

          <aside className="mt-6 border-l-4 border-secondary-container bg-surface-container-low p-5 text-xs leading-6 text-on-surface-variant">
            カレンダーは空き状況の目安です。ここでは予約は確定しません。LINEでご相談いただいた後、ALDEL FARMからの返信をもって日程確定となります。
          </aside>
        </div>
      </section>

      <ScheduleInquiry initialProgram={searchParams.program} initialActivities={activities} initialFirstChoice={searchParams.date} lineOfficialId={lineOfficialId} lineFriendUrl={lineFriendUrl} />
    </FarmPageShell>
  );
}
