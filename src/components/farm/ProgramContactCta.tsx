import type { FarmSiteGlobals } from "@/types/farm-cms";

export function ProgramSafetyNote() {
  return (
    <aside className="border-l-4 border-secondary-container bg-surface-container-low p-6 md:p-8">
      <p className="font-hand text-primary">Safety first</p>
      <h2 className="mt-2 font-headline text-xl font-black">安全を優先して内容を調整します。</h2>
      <p className="mt-4 text-sm leading-8 text-on-surface-variant">
        刃物、火、農機具、草刈り機、山林、水辺、野生動物を扱う活動は、年齢、経験、天候、現場の状況に応じて、見学または補助作業になる場合があります。実施内容は事前相談後にご案内します。
      </p>
    </aside>
  );
}

export function ProgramContactCta({ globals, programKey }: { globals: FarmSiteGlobals | null; programKey?: string }) {
  const href = programKey ? `/schedule?program=${encodeURIComponent(programKey)}` : "/schedule";

  return (
    <section className="bg-[#433d35] px-5 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <p className="font-hand text-[#febe4e]">Ask what is possible now</p>
          <h2 className="mt-3 font-headline text-3xl font-black leading-tight md:text-5xl">今できることを、<br />まず相談する。</h2>
        </div>
        <div className="md:col-span-5">
          <p className="text-sm leading-8 text-white/75">希望する日程、参加人数、気になるプログラム、年齢や経験などをお知らせください。季節や現場の状況を確認してご案内します。</p>
          {globals?.contactNotice && <p className="mt-4 text-xs leading-6 text-white/60">{globals.contactNotice}</p>}
          <a href={href} className="mt-7 inline-flex rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container">
            空き状況を確認して相談する <span className="ml-3">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
