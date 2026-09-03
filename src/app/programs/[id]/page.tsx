import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FarmBreadcrumbs, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { ProgramContactCta, ProgramSafetyNote } from "@/components/farm/ProgramContactCta";
import { ProgramChoiceBuilder } from "@/components/farm/ProgramChoiceBuilder";
import { getFarmProgramById, getFarmSiteGlobals } from "@/libs/farm-microcms";
import type { FarmProgram } from "@/types/farm-cms";

export const revalidate = 60;

type ProgramPageProps = { params: { id: string } };

function statusText(program: FarmProgram) {
  return Array.isArray(program.status) ? program.status.join("・") : program.status || "まずは相談から";
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const program = await getFarmProgramById(params.id);
  if (!program) return { title: "プログラムが見つかりません" };
  return {
    title: program.title,
    description: program.summary || `${program.title}｜ALDEL FARMの体験プログラム`,
    openGraph: program.mainVisual?.url ? { images: [{ url: program.mainVisual.url }] } : undefined,
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const [program, globals] = await Promise.all([getFarmProgramById(params.id), getFarmSiteGlobals()]);
  if (!program) notFound();

  const facts = [
    ["季節", program.season],
    ["所要時間", program.duration],
    ["定員", program.capacity],
    ["料金", program.price],
    ["対象", program.target],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  const heroImage = program.mainVisual?.url || program.gallery?.[0]?.url;

  return (
    <FarmPageShell>
      <article>
        <header className="border-b border-stone-200 bg-[#f1eee7] px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            <FarmBreadcrumbs items={[{ label: "体験プログラム", href: "/programs" }, { label: program.title }]} />
            <p className="mt-10 text-xs font-bold tracking-wide text-primary">{statusText(program)}</p>
            <h1 className="mt-5 max-w-4xl font-headline text-4xl font-black leading-tight tracking-[-0.03em] md:text-6xl">{program.title}</h1>
            <p className="mt-7 max-w-3xl text-sm leading-8 text-on-surface-variant md:text-base">{program.summary || "その時の季節と現場に合わせて、できる内容をご案内します。"}</p>
          </div>
        </header>

        <div className="px-5 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            {heroImage ? (
              <div className="mb-12 aspect-[16/9] overflow-hidden bg-stone-200 md:mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImage} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="mb-12 flex aspect-[16/7] items-end bg-gradient-to-br from-[#d9d0bf] via-[#afa18c] to-[#665c4f] p-8 text-white md:mb-16"><p className="font-hand text-xl">A day at ALDEL FARM</p></div>
            )}

            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-8">
                <p className="font-hand text-primary">About this program</p>
                <h2 className="mt-3 font-headline text-2xl font-black md:text-3xl">この体験について</h2>
                {program.body ? (
                  <div className="farm-rich-text mt-7" dangerouslySetInnerHTML={{ __html: program.body }} />
                ) : (
                  <p className="mt-7 text-sm leading-8 text-on-surface-variant md:text-base">体験内容は、季節、天候、作物や生き物の状態によって変わります。希望することを伺い、その時にできる作業や見学内容をご案内します。</p>
                )}

                {program.scheduleNote && (
                  <section className="mt-10">
                    <h2 className="font-headline text-xl font-black">当日の流れについて</h2>
                    <p className="mt-4 whitespace-pre-line text-sm leading-8 text-on-surface-variant">{program.scheduleNote}</p>
                  </section>
                )}

                {program.participationNotes && (
                  <section className="mt-10 rounded-2xl bg-surface-container-low p-6">
                    <h2 className="font-headline text-xl font-black">参加時の注意</h2>
                    <p className="mt-4 whitespace-pre-line text-sm leading-8 text-on-surface-variant">{program.participationNotes}</p>
                  </section>
                )}
              </div>

              <aside className="md:col-span-4">
                <div className="border-t border-stone-300">
                  <div className="border-b border-stone-300 py-5">
                    <p className="text-xs font-bold text-primary">実施状況</p>
                    <p className="mt-2 text-sm leading-7">{statusText(program)}</p>
                  </div>
                  {facts.map(([label, value]) => (
                    <div key={label} className="border-b border-stone-300 py-5">
                      <p className="text-xs font-bold text-primary">{label}</p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-7">{value}</p>
                    </div>
                  ))}
                  {facts.length === 0 && <p className="py-5 text-xs leading-6 text-on-surface-variant">日程、所要時間、料金、対象などは、内容の相談後にご案内します。</p>}
                </div>
              </aside>
            </div>

            <ProgramChoiceBuilder programKey={program.slug || program.id} />

            {program.gallery && program.gallery.length > 1 && (
              <section className="mt-16 md:mt-24">
                <h2 className="font-headline text-2xl font-black">体験の風景</h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {program.gallery.map((image, index) => (
                    <div key={`${image.url}-${index}`} className="aspect-[4/3] overflow-hidden bg-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.url} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-16 md:mt-24"><ProgramSafetyNote /></div>
            <div className="mt-10 border-t border-stone-300 pt-8"><Link href="/programs" className="inline-flex items-center gap-3 text-sm font-bold text-primary"><span aria-hidden>←</span> 体験プログラム一覧へ戻る</Link></div>
          </div>
        </div>
      </article>

      <ProgramContactCta globals={globals} programKey={program.slug || program.id} />
    </FarmPageShell>
  );
}
