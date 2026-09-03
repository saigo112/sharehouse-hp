import type { Metadata } from "next";
import Link from "next/link";
import { FarmPageHero, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { ProgramContactCta, ProgramSafetyNote } from "@/components/farm/ProgramContactCta";
import { getFarmPrograms, getFarmSiteGlobals } from "@/libs/farm-microcms";
import type { FarmProgram } from "@/types/farm-cms";

export const metadata: Metadata = {
  title: "体験プログラム",
  description: "田畑、鶏、山、古民家、食。ALDEL FARMの季節と現場に加わる体験プログラムをご案内します。",
};

export const revalidate = 60;

function statusText(program: FarmProgram) {
  return Array.isArray(program.status) ? program.status.join("・") : program.status || "まずは相談から";
}

export default async function ProgramsPage() {
  const [{ contents: programs }, globals] = await Promise.all([getFarmPrograms(), getFarmSiteGlobals()]);

  return (
    <FarmPageShell>
      <FarmPageHero
        eyebrow="Experience the everyday"
        title="その季節の暮らしに、少し混ざってみる。"
        lead="ALDEL FARMの体験は、決まった内容を一年中提供する固定メニューではありません。季節、天候、作物の生育、地域の予定によって、その日に必要な仕事が変わります。"
      />

      <section className="px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-stone-300 pb-12 md:grid-cols-12 md:gap-12">
            <p className="font-hand text-primary md:col-span-3">Programs</p>
            <div className="md:col-span-9">
              <h2 className="font-headline text-2xl font-black leading-tight md:text-4xl">気になる入口を選んでください。</h2>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-on-surface-variant md:text-base">希望する日程や人数、やってみたいことを伺い、その時の現場に合う内容を一緒に考えます。カードを選ぶと、詳しい内容と参加時の注意を確認できます。</p>
            </div>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {programs.map((program, index) => (
              <Link href={`/programs/${program.slug || program.id}`} key={program.id} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#d8d0c3]">
                  {program.mainVisual?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={program.mainVisual.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-end bg-gradient-to-br from-[#d9d0bf] via-[#afa18c] to-[#665c4f] p-7 text-white">
                      <span className="font-hand text-xl">A day at ALDEL FARM</span>
                    </div>
                  )}
                  <span className="absolute left-5 top-5 rounded-full bg-[#fbf9f6]/90 px-3 py-1.5 font-hand text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-xs font-bold text-primary">{statusText(program)}</p>
                  <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1" aria-hidden>arrow_forward</span>
                </div>
                <h2 className="mt-3 font-headline text-2xl font-black leading-tight transition-colors group-hover:text-primary md:text-3xl">{program.title}</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{program.summary || "その時の季節と現場に合わせて、できることをご案内します。"}</p>
              </Link>
            ))}
          </div>

          <div className="mt-20 md:mt-28">
            <ProgramSafetyNote />
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f1eee7] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-hand text-primary">How it works</p>
          <h2 className="mt-3 font-headline text-3xl font-black md:text-4xl">体験までの流れ</h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-stone-300 bg-stone-300 md:grid-cols-3">
            {[
              ["01", "気になる体験を選ぶ", "興味のある分野や、やってみたいことを見つけます。"],
              ["02", "日程と希望を相談する", "参加人数、年齢、経験などもあわせてお知らせください。"],
              ["03", "当日の内容を決める", "季節、天候、現場の状況を確認して、実施内容をご案内します。"],
            ].map(([number, title, body]) => (
              <article key={number} className="bg-[#fbf9f6] p-7 md:p-9">
                <p className="font-hand text-primary">{number}</p>
                <h3 className="mt-5 font-headline text-xl font-black">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProgramContactCta globals={globals} />
    </FarmPageShell>
  );
}
