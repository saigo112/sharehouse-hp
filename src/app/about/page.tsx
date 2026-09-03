import type { Metadata } from "next";
import Link from "next/link";
import { FarmPageHero, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { getFarmSiteGlobals } from "@/libs/farm-microcms";

export const metadata: Metadata = {
  title: "知る・相談する",
  description: "上郡町、ALDEL FARM、そこで続く日々の暮らしを知り、見学や体験、滞在について相談できます。",
};

export const revalidate = 60;

const knowledgeCards = [
  {
    number: "01",
    title: "上郡町について",
    subtitle: "山と川、歴史がつながる町。",
    description: "上郡町の自然、交通、歴史、農の風景をご紹介します。",
    href: "/about/kamigori",
    accent: "千種川・里山・白旗城",
  },
  {
    number: "02",
    title: "ALDEL FARMについて",
    subtitle: "農・食・住まいを、ひとつの暮らしとして。",
    description: "私たちが育てているもの、手入れしている場所、人を迎える理由をご紹介します。",
    href: "/about/aldel-farm",
    accent: "田畑・鶏・古民家・人",
  },
  {
    number: "03",
    title: "日々の暮らし",
    subtitle: "完成された体験ではない、いつもの一日。",
    description: "田畑、鶏、古民家、山、食。季節とともに変わる日々の様子を記録します。",
    href: "/stories",
    accent: "DIARY・STORY・REPORT",
  },
];

export default async function AboutPage() {
  const globals = await getFarmSiteGlobals();
  const lineOfficialId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || globals?.lineOfficialId || "@844kyxqq";
  const normalizedLineId = lineOfficialId.startsWith("@") ? lineOfficialId : `@${lineOfficialId}`;
  const lineFriendUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || globals?.lineOfficialUrl || `https://line.me/R/ti/p/${encodeURIComponent(normalizedLineId)}`;
  const formUrl = globals?.farmContactUrl || process.env.NEXT_PUBLIC_ENTRY_FORM_URL;
  const phoneHref = globals?.representativePhone ? `tel:${globals.representativePhone.replace(/[^\d+]/g, "")}` : "";

  return (
    <FarmPageShell>
      <FarmPageHero
        eyebrow="Know & ask"
        title="この土地と暮らしを知り、気になることを相談する。"
        lead="ALDEL FARMがある上郡町のこと、私たちのこと、そこで続いている日々の営みのこと。3つの入口から知り、見学、体験、滞在や暮らしについて気になったことを相談できます。"
      />

      <section className="px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-stone-300 bg-stone-300 md:grid-cols-3">
            {knowledgeCards.map((card) => (
              <Link key={card.href} href={card.href} className="group flex min-h-[380px] flex-col bg-[#fbf9f6] p-7 transition-colors hover:bg-white md:p-9">
                <div className="flex items-start justify-between">
                  <span className="font-hand text-primary">{card.number}</span>
                  <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1" aria-hidden>arrow_forward</span>
                </div>
                <div className="mt-auto pt-20">
                  <p className="text-xs font-bold tracking-wide text-primary">{card.accent}</p>
                  <h2 className="mt-4 font-headline text-2xl font-black">{card.title}</h2>
                  <p className="mt-4 font-headline text-lg font-bold leading-7">{card.subtitle}</p>
                  <p className="mt-4 text-sm leading-7 text-on-surface-variant">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-6 bg-[#433d35] px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-hand text-[#febe4e]">Ask us</p>
              <h2 className="mt-3 font-headline text-3xl font-black leading-tight md:text-5xl">知ったことから、<br />次の一歩を相談する。</h2>
            </div>
            <p className="text-sm leading-8 text-white/75 md:col-span-5">{globals?.contactIntroduction || "見学、体験、滞在、上郡町での暮らしについて、まだ具体的に決まっていない段階から相談できます。"}</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/20 bg-white/20 md:grid-cols-2">
            <article className="bg-[#433d35] p-7 md:p-9">
              <p className="text-xs font-bold text-[#febe4e]">LINE</p>
              <h3 className="mt-4 font-headline text-2xl font-black">日程と内容を相談する</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">カレンダーを確認し、希望日、人数、気になることをまとめてLINEで送れます。</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/schedule" className="inline-flex rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container">日程を見て相談する <span className="ml-3">→</span></Link>
                <a href={lineFriendUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-white/50 px-6 py-3.5 text-sm font-black">友だち追加</a>
              </div>
              {globals?.lineQrCode?.url && (
                <div className="mt-7 flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={globals.lineQrCode.url} alt="ALDEL FARM LINE公式アカウントのQRコード" className="h-24 w-24 bg-white object-contain p-1" />
                  <p className="text-xs leading-6 text-white/70">スマートフォンのカメラで読み取って、友だち追加できます。</p>
                </div>
              )}
              <p className="mt-5 text-xs text-white/60">LINE公式アカウント {normalizedLineId}</p>
            </article>

            <article className="bg-[#433d35] p-7 md:p-9">
              <p className="text-xs font-bold text-[#febe4e]">OTHER CONTACT</p>
              <h3 className="mt-4 font-headline text-2xl font-black">{phoneHref ? "電話・フォームで相談する" : "フォームで相談する"}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{phoneHref ? "LINEを利用していない方は、電話または問い合わせフォームをご利用ください。" : "LINEを利用していない方は、問い合わせフォームをご利用ください。"}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {phoneHref && <a href={phoneHref} className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#433d35]">{globals?.representativePhone}</a>}
                {formUrl && <a href={formUrl} target={formUrl.startsWith("http") ? "_blank" : undefined} rel={formUrl.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex rounded-full border border-white/50 px-6 py-3.5 text-sm font-black">問い合わせフォーム</a>}
              </div>
              {globals?.contactNotice && <p className="mt-5 text-xs leading-6 text-white/60">{globals.contactNotice}</p>}
            </article>
          </div>
        </div>
      </section>
    </FarmPageShell>
  );
}
