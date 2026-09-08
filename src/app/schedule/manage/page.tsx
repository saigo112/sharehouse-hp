import type { Metadata } from "next";
import { FarmBreadcrumbs, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { ScheduleManager } from "@/components/farm/ScheduleManager";

export const metadata: Metadata = {
  title: "日程管理｜運営スタッフ用",
  description: "ALDEL FARM運営スタッフ向けの日程管理画面です。",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default function ScheduleManagementPage() {
  return (
    <FarmPageShell>
      <header className="border-b border-stone-200 bg-[#f1eee7] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FarmBreadcrumbs items={[{ label: "日程を見る", href: "/schedule" }, { label: "運営スタッフ用" }]} />
          <p className="mt-8 font-hand text-primary">For ALDEL FARM staff</p>
          <h1 className="mt-3 font-headline text-4xl font-black leading-tight md:text-6xl">HPの日程を、<br />かんたんに更新。</h1>
          <p className="mt-6 max-w-3xl text-sm leading-8 text-on-surface-variant">種類、日付、内容を入力すると、GoogleカレンダーとHPの予定が更新されます。Googleカレンダー用のタグを覚える必要はありません。</p>
        </div>
      </header>

      <section className="bg-[#faf9f6] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <ScheduleManager />
        </div>
      </section>
    </FarmPageShell>
  );
}
