import type { Metadata } from "next";
import { FarmBreadcrumbs, FarmPageShell } from "@/components/farm/FarmPageChrome";

export const metadata: Metadata = {
  title: "スケジュール登録ガイド｜運営スタッフ用",
  description: "ALDEL FARM運営スタッフ向けのGoogleカレンダー登録ルールです。",
  robots: { index: false, follow: false },
};

const rules = [
  { tag: "【受付可】", purpose: "見学や体験を相談できる日", example: "【受付可】見学・体験相談" },
  { tag: "【イベント】", purpose: "味噌作りや収穫体験などの開催日", example: "【イベント】味噌づくりの日" },
  { tag: "【住み込み募集】", purpose: "住み込みで手伝ってもらう募集期間", example: "【住み込み募集】田植えの手伝い" },
  { tag: "【受付終了】", purpose: "受付を止めた予定に追加", example: "【受付終了】【イベント】味噌づくりの日" },
  { tag: "【トップ掲載】", purpose: "トップページにも表示したい予定に追加", example: "【トップ掲載】【イベント】味噌づくりの日" },
];

export default function ScheduleManagementGuidePage() {
  return (
    <FarmPageShell>
      <header className="border-b border-stone-200 bg-[#f1eee7] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <FarmBreadcrumbs items={[{ label: "日程を見る", href: "/schedule" }, { label: "運営スタッフ用ガイド" }]} />
          <p className="mt-10 font-hand text-primary">For ALDEL FARM staff</p>
          <h1 className="mt-4 font-headline text-4xl font-black leading-tight md:text-6xl">Googleカレンダー<br />登録ガイド。</h1>
          <p className="mt-7 max-w-3xl text-sm leading-8 text-on-surface-variant">予定名に決められたタグを付けると、HPの「予約できる日」「イベント」「住み込み募集」へ自動的に振り分けられます。反映には最大5分ほどかかります。</p>
        </div>
      </header>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-headline text-3xl font-black">使用するタグ</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-300 bg-white">
            {rules.map((rule) => (
              <div key={rule.tag} className="grid gap-3 border-b border-stone-200 p-5 last:border-b-0 md:grid-cols-[10rem_1fr_1.4fr] md:items-center md:p-6">
                <code className="font-black text-primary">{rule.tag}</code>
                <p className="text-sm leading-7">{rule.purpose}</p>
                <p className="rounded-lg bg-surface-container-low px-3 py-2 text-xs leading-6 text-on-surface-variant">例：{rule.example}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <section>
              <h2 className="font-headline text-2xl font-black">通常の受付可能日</h2>
              <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#433d35] p-6 font-body text-xs leading-7 text-white/80">{`予定名：\n【受付可】見学・体験相談\n\n日時：\n受付できる日と時間を設定\n\n説明：\n見学、畑仕事、鶏の世話について相談できます。\n#受付可`}</pre>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-black">イベント</h2>
              <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#433d35] p-6 font-body text-xs leading-7 text-white/80">{`予定名：\n【イベント】味噌づくりの日\n\n説明：\nイベントの概要\n定員：6名\n参加費：未定\n持ち物：エプロン、タオル\n申込期限：11月10日\n#イベント`}</pre>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-black">住み込み募集期間</h2>
              <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#433d35] p-6 font-body text-xs leading-7 text-white/80">{`予定名：\n【住み込み募集】田植えの手伝い\n\n日程：\n募集期間の初日から最終日まで\n\n説明：\n主な作業：田植え、苗運び\n宿泊・食事：無料\n募集人数：3名\n参加条件や注意事項\n#住み込み募集`}</pre>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-black">公開時の注意</h2>
              <div className="mt-5 rounded-2xl border-l-4 border-secondary-container bg-surface-container-low p-6 text-sm leading-8 text-on-surface-variant">
                <p>このカレンダーは公開情報としてHPに表示されます。</p>
                <p className="mt-3 font-black text-on-surface">予約者の氏名、電話番号、住所、LINEの相談内容は入力しないでください。</p>
                <p className="mt-3">確定した予約の個人情報はLINEまたは非公開の管理用カレンダーで扱います。タグのない予定はHPの日程一覧には表示されません。</p>
              </div>
            </section>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-primary px-6 py-3.5 text-sm font-black text-white">Googleカレンダーを開く →</a>
            <a href="/schedule" className="inline-flex rounded-full border border-stone-400 px-6 py-3.5 text-sm font-black">公開ページを確認する</a>
          </div>
        </div>
      </section>
    </FarmPageShell>
  );
}
