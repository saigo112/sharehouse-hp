import Link from "next/link";
import type { FarmScheduleEntry } from "@/libs/google-calendar";

function dateParts(value: string) {
  const date = new Date(value);
  return {
    date,
    query: new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Tokyo",
    }).format(date),
    day: new Intl.DateTimeFormat("ja-JP", { day: "2-digit", timeZone: "Asia/Tokyo" }).format(date),
    month: new Intl.DateTimeFormat("ja-JP", { month: "short", timeZone: "Asia/Tokyo" }).format(date),
    weekday: new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(date),
  };
}

function visibleEnd(entry: FarmScheduleEntry) {
  if (!entry.end) return null;
  const end = new Date(entry.end);
  if (entry.allDay) end.setUTCDate(end.getUTCDate() - 1);
  return end;
}

function timeLabel(entry: FarmScheduleEntry) {
  if (entry.allDay) return "終日";
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
  const start = formatter.format(new Date(entry.start));
  return entry.end ? `${start}〜${formatter.format(new Date(entry.end))}` : start;
}

function periodLabel(entry: FarmScheduleEntry) {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Tokyo",
  });
  const start = new Date(entry.start);
  const end = visibleEnd(entry);
  if (!end || formatter.format(start) === formatter.format(end)) {
    return `${formatter.format(start)}${entry.allDay ? "" : ` ${timeLabel(entry)}`}`;
  }
  return `${formatter.format(start)}〜${formatter.format(end)}`;
}

function inquiryHref(entry: FarmScheduleEntry, program?: string) {
  const start = dateParts(entry.start);
  const params = new URLSearchParams({ date: start.query, activity: entry.title });
  if (program) params.set("program", program);
  return `/schedule?${params.toString()}#inquiry`;
}

function EmptyState({ children }: { children: string }) {
  return <p className="mt-7 rounded-2xl border border-dashed border-stone-400 bg-surface-container-low p-6 text-sm leading-7 text-on-surface-variant">{children}</p>;
}

export function ScheduleBoard({ entries }: { entries: FarmScheduleEntry[] }) {
  const availability = entries.filter((entry) => entry.kind === "availability" && !entry.closed).slice(0, 12);
  const events = entries.filter((entry) => entry.kind === "event").slice(0, 12);
  const workstays = entries.filter((entry) => entry.kind === "workstay" && !entry.closed).slice(0, 8);

  return (
    <div className="space-y-20">
      <section aria-labelledby="availability-heading">
        <p className="font-hand text-primary">Available dates</p>
        <div className="mt-3 grid gap-5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 id="availability-heading" className="font-headline text-3xl font-black md:text-5xl">予約できる日。</h2>
            <p className="mt-5 text-sm leading-8 text-on-surface-variant">見学や体験について相談できる日です。希望日を選ぶと、下のLINE相談フォームへ内容を引き継げます。</p>
          </div>
          <p className="text-xs leading-6 text-on-surface-variant md:col-span-4 md:text-right">表示時刻：日本時間<br />日程はLINEでの返信後に確定します。</p>
        </div>

        {availability.length ? (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availability.map((entry) => {
              const date = dateParts(entry.start);
              return (
                <Link key={entry.id} href={inquiryHref(entry)} className="group rounded-2xl border border-stone-300 bg-white p-6 transition-colors hover:border-primary">
                  <div className="flex items-end gap-3 text-primary">
                    <span className="font-headline text-5xl font-black leading-none">{date.day}</span>
                    <span className="pb-1 text-xs font-bold leading-5">{date.month}<br />{date.weekday}・{timeLabel(entry)}</span>
                  </div>
                  <h3 className="mt-6 font-headline text-xl font-black group-hover:text-primary">{entry.title}</h3>
                  {entry.description && <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-7 text-on-surface-variant">{entry.description}</p>}
                  <span className="mt-6 inline-flex text-xs font-black text-primary">この日を希望する →</span>
                </Link>
              );
            })}
          </div>
        ) : <EmptyState>現在、公開中の予約可能日はありません。個別に調整できる場合もあるため、下のフォームから希望日をご相談ください。</EmptyState>}
      </section>

      <section aria-labelledby="events-heading" className="border-t border-stone-300 pt-16">
        <p className="font-hand text-primary">Events</p>
        <h2 id="events-heading" className="mt-3 font-headline text-3xl font-black md:text-5xl">近日のイベント。</h2>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-on-surface-variant">季節の手しごとや、みんなで集まる日のご案内です。詳細を開いて、参加方法をご確認ください。</p>

        {events.length ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {events.map((entry) => (
              <details key={entry.id} className="group rounded-2xl border border-stone-300 bg-white p-6 open:border-primary md:p-7">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${entry.closed ? "bg-stone-200 text-stone-600" : "bg-secondary-container text-on-secondary-container"}`}>{entry.closed ? "受付終了" : "参加相談可"}</span>
                      <p className="mt-4 text-xs font-bold text-primary">{periodLabel(entry)}</p>
                      <h3 className="mt-3 font-headline text-2xl font-black leading-tight">{entry.title}</h3>
                    </div>
                    <span className="text-2xl text-primary transition-transform group-open:rotate-45" aria-hidden>＋</span>
                  </div>
                </summary>
                <div className="mt-6 border-t border-stone-200 pt-6">
                  {entry.location && <p className="text-xs font-bold text-primary">場所：{entry.location}</p>}
                  <p className="mt-4 whitespace-pre-line text-sm leading-8 text-on-surface-variant">{entry.description || "詳しい内容はLINEでお問い合わせください。"}</p>
                  {!entry.closed && <Link href={inquiryHref(entry)} className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-black text-white">このイベントについて相談する →</Link>}
                </div>
              </details>
            ))}
          </div>
        ) : <EmptyState>現在、公開中のイベントはありません。開催が決まり次第、こちらでお知らせします。</EmptyState>}
      </section>

      <section aria-labelledby="workstay-heading" className="border-t border-stone-300 pt-16">
        <p className="font-hand text-primary">Live-in help</p>
        <h2 id="workstay-heading" className="mt-3 font-headline text-3xl font-black md:text-5xl">住み込みで手伝う。</h2>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-on-surface-variant">田植えや収穫など、まとまった人手が必要な期間の募集です。作業内容と滞在期間を確認し、LINEでご相談ください。</p>

        {workstays.length ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {workstays.map((entry) => (
              <article key={entry.id} className="rounded-2xl bg-[#433d35] p-7 text-white">
                <span className="inline-flex rounded-full bg-[#febe4e] px-3 py-1 text-[11px] font-black text-[#433d35]">募集中</span>
                <p className="mt-5 text-xs font-bold text-[#febe4e]">募集期間：{periodLabel(entry)}</p>
                <h3 className="mt-3 font-headline text-2xl font-black leading-tight">{entry.title}</h3>
                {entry.location && <p className="mt-3 text-xs font-bold text-[#febe4e]">場所：{entry.location}</p>}
                <p className="mt-5 whitespace-pre-line text-sm leading-8 text-white/75">{entry.description || "作業内容や受け入れ条件については、LINEでお問い合わせください。"}</p>
                <Link href={inquiryHref(entry, "live-in-help")} className="mt-7 inline-flex rounded-full bg-secondary-container px-5 py-3 text-xs font-black text-on-secondary-container">この募集について相談する →</Link>
              </article>
            ))}
          </div>
        ) : <EmptyState>現在、公開中の住み込み募集はありません。募集開始時に、このページとトップページでお知らせします。</EmptyState>}
      </section>
    </div>
  );
}
