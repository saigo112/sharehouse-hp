import type { Metadata } from "next";
import { FarmBreadcrumbs, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { ScheduleBoard } from "@/components/farm/ScheduleBoard";
import { ScheduleInquiry } from "@/components/farm/ScheduleInquiry";
import { getFarmSiteGlobals } from "@/libs/farm-microcms";
import { DEFAULT_GOOGLE_CALENDAR_EMBED_URL, getPublicScheduleEntries } from "@/libs/google-calendar";

export const metadata: Metadata = {
  title: "日程を見る・相談する",
  description: "ALDEL FARMの見学、体験、滞在、住み込み、移住相談の日程を確認し、LINEで相談できます。",
};

export const revalidate = 60;

type SchedulePageProps = {
  searchParams: { program?: string; activity?: string | string[]; date?: string };
};

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const globals = await getFarmSiteGlobals();
  const calendarUrl =
    globals?.scheduleCalendarEmbedUrl ||
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL ||
    DEFAULT_GOOGLE_CALENDAR_EMBED_URL;
  const scheduleEntries = await getPublicScheduleEntries(calendarUrl);
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
          <ScheduleBoard entries={scheduleEntries} />
        </div>
      </section>

      <ScheduleInquiry initialProgram={searchParams.program} initialActivities={activities} initialFirstChoice={searchParams.date} lineOfficialId={lineOfficialId} lineFriendUrl={lineFriendUrl} />
    </FarmPageShell>
  );
}
