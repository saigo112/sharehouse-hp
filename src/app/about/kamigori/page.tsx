import type { Metadata } from "next";
import Link from "next/link";
import { FarmBreadcrumbs, FarmPageHero, FarmPageShell } from "@/components/farm/FarmPageChrome";

export const metadata: Metadata = {
  title: "上郡町について",
  description: "千種川と里山、歴史、交通、暮らしの支援から、兵庫県上郡町をご紹介します。",
};

const sections = [
  {
    number: "01",
    title: "千種川と里山の風景",
    body: "町の中央を流れる千種川と、連なる山々。その間に集落や田畑が広がっています。上郡町は町全体が「水の郷」に指定され、町の移住定住サイトでは、蛍が飛び交う水のきれいな町として紹介されています。ALDEL FARMで行う米づくり、畑仕事、川遊び、竹林や水路の手入れも、この地形と水のつながりの中にあります。",
  },
  {
    number: "02",
    title: "外とつながる町",
    body: "上郡駅はJR山陽本線と智頭急行智頭線の分岐点です。町の公式案内では、JR山陽本線で姫路駅から約35分と紹介されています。里山の環境を持ちながら、京阪神、山陽、山陰へつながる交通の結節点でもあります。",
  },
  {
    number: "03",
    title: "土地に残る歴史",
    body: "上郡町は、鎌倉時代末から南北朝時代に活躍した武将・赤松円心ゆかりの地です。円心が築いた白旗城跡は、赤松氏城跡の一つとして国の史跡に指定されています。今の風景の中には、農や暮らしだけでなく、街道や山城、人々の営みが重なってきた時間も残っています。",
  },
  {
    number: "04",
    title: "暮らしを考えている方へ",
    body: "上郡町には、移住体験住宅、空き家バンク、移住相談、移住を目的とした調査滞在への支援制度があります。制度の対象や条件は変わる場合があるため、利用を検討する際は上郡町の公式サイトで最新情報をご確認ください。",
  },
];

export default function KamigoriPage() {
  return (
    <FarmPageShell>
      <FarmPageHero
        eyebrow="About Kamigori"
        title="山と川のあいだで、暮らしが続く町。"
        lead="上郡町は、兵庫県の南西部、西播磨にある町です。町域の多くを山地や丘陵地が占め、その中央を清流・千種川が南北に流れています。"
      />

      <section className="px-5 py-10 md:px-10">
        <div className="mx-auto max-w-7xl"><FarmBreadcrumbs items={[{ label: "知る・相談する", href: "/about" }, { label: "上郡町について" }]} /></div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <p className="max-w-3xl font-headline text-xl font-bold leading-9 md:text-2xl">大きな観光地を急いで巡るよりも、川の流れや田畑、集落の道、季節の色をゆっくり感じることが似合う場所です。</p>
          <div className="mt-16 border-t border-stone-300 md:mt-24">
            {sections.map((section) => (
              <article key={section.number} className="grid gap-5 border-b border-stone-300 py-10 md:grid-cols-12 md:gap-10 md:py-14">
                <p className="font-hand text-primary md:col-span-2">{section.number}</p>
                <h2 className="font-headline text-2xl font-black leading-tight md:col-span-4 md:text-3xl">{section.title}</h2>
                <p className="text-sm leading-8 text-on-surface-variant md:col-span-6 md:text-base">{section.body}</p>
              </article>
            ))}
          </div>

          <aside className="mt-14 rounded-3xl bg-surface-container-low p-7 md:p-10">
            <h2 className="font-headline text-xl font-black">上郡町の公式情報</h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">制度や交通情報は更新されるため、最新情報は町の公式サイトでご確認ください。</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.town.kamigori.hyogo.jp/soshiki/somuka/gyoumuannnai/10/1/1304.html" target="_blank" rel="noopener noreferrer" className="rounded-full border border-outline-variant px-5 py-3 text-sm font-bold hover:bg-white">上郡町の紹介 ↗</a>
              <a href="https://iju.town.kamigori.hyogo.jp/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-outline-variant px-5 py-3 text-sm font-bold hover:bg-white">移住・定住サイト ↗</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#433d35] px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div><p className="font-hand text-[#febe4e]">Next</p><h2 className="mt-2 font-headline text-3xl font-black">町を知ったら、暮らしの現場へ。</h2></div>
          <div className="flex flex-wrap gap-3"><Link href="/about/aldel-farm" className="rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container">ALDEL FARMについて</Link><Link href="/programs" className="rounded-full border border-white/60 px-6 py-3.5 text-sm font-black">体験を見る</Link></div>
        </div>
      </section>
    </FarmPageShell>
  );
}
