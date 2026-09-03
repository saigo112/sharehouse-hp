import type { Metadata } from "next";
import Link from "next/link";
import { FarmBreadcrumbs, FarmPageHero, FarmPageShell } from "@/components/farm/FarmPageChrome";

export const metadata: Metadata = {
  title: "ALDEL FARMについて",
  description: "米、卵、住まい、食、山や集落の手入れを、ひとつの暮らしとして育てるALDEL FARMをご紹介します。",
};

const activities = [
  {
    label: "育てる",
    title: "田畑と鶏に、日々手をかける。",
    body: "田んぼでは、種まき、田植え、見回り、草取りなど、季節と稲の生育に合わせた作業があります。畑では、土づくり、畝づくり、苗の植え付け、柵づくり、収穫へと手をつないでいきます。鶏の世話や鶏小屋の手入れも、卵が食卓に届くまでの大切な仕事です。",
  },
  {
    label: "手入れする",
    title: "場所は、使いながら守っていく。",
    body: "古民家の掃除やペンキ塗り、庭づくり、集落の草刈り、水路の泥上げ、竹林整備。暮らしの場所は、一度つくったら完成するものではありません。誰かが手をかけることで保たれ、その手入れ自体が人と土地の関係をつくります。",
  },
  {
    label: "活かし、味わう",
    title: "得たものを、暮らしの中へつなぐ。",
    body: "米や卵を育てるだけでなく、味噌、ジャム、ジャーキーなどを仕込み、山や畑から得たものを暮らしの中で活かします。鹿肉の精肉や罠の見回りでは、野生動物と農地の関係、命をいただくことにも向き合います。",
  },
  {
    label: "人を迎える",
    title: "外から来る人と、途中の暮らしをつくる。",
    body: "ALDEL FARMでは、シェアハウスや民泊、ふるさとワーキングホリデーなどを通して、地域の外から来る人を迎えてきました。用意された観光体験を消費するのではなく、その時に必要な仕事に加わり、地域の人と出会い、自分なりの関わり方を探す。そんな時間を一緒につくりたいと考えています。",
  },
];

export default function AldelFarmPage() {
  return (
    <FarmPageShell>
      <FarmPageHero
        eyebrow="About ALDEL FARM"
        title="農・食・住まいを、ひとつの暮らしとして育てる。"
        lead="ALDEL FARMは、兵庫県上郡町で、米や卵の生産・販売、シェアハウスや民泊、人を迎える体験づくりに取り組んでいます。"
      />

      <section className="px-5 py-10 md:px-10">
        <div className="mx-auto max-w-7xl"><FarmBreadcrumbs items={[{ label: "知る・相談する", href: "/about" }, { label: "ALDEL FARMについて" }]} /></div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 py-8 md:grid-cols-12 md:py-16">
            <p className="font-hand text-primary md:col-span-3">One connected life</p>
            <p className="font-headline text-xl font-bold leading-9 md:col-span-9 md:text-3xl md:leading-relaxed">田畑、鶏、食、古民家、山や集落の手入れは、それぞれ別のものではありません。土地で暮らし続けるためにつながっている、ひとつひとつの営みです。</p>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-stone-300 bg-stone-300 md:grid-cols-2">
            {activities.map((activity) => (
              <article key={activity.label} className="bg-[#fbf9f6] p-7 md:p-10">
                <p className="font-hand text-primary">{activity.label}</p>
                <h2 className="mt-5 font-headline text-2xl font-black leading-tight">{activity.title}</h2>
                <p className="mt-6 text-sm leading-8 text-on-surface-variant">{activity.body}</p>
              </article>
            ))}
          </div>

          <section className="mt-16 border-l-4 border-secondary-container bg-surface-container-low p-7 md:mt-24 md:p-10">
            <p className="font-hand text-primary">Before you visit</p>
            <h2 className="mt-3 font-headline text-2xl font-black">完成されたメニューを、いつでも同じ形で提供する場所ではありません。</h2>
            <p className="mt-5 text-sm leading-8 text-on-surface-variant md:text-base">できることは、季節、天候、作物の生育、地域の予定によって変わります。まずは希望や関心を聞き、その時の現場に合う過ごし方を一緒に考えます。</p>
          </section>
        </div>
      </section>

      <section className="bg-[#433d35] px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div><p className="font-hand text-[#febe4e]">Take part</p><h2 className="mt-2 font-headline text-3xl font-black">手を動かしてみたいと思ったら。</h2></div>
          <div className="flex flex-wrap gap-3"><Link href="/programs" className="rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container">体験を見る</Link><Link href="/about#contact" className="rounded-full border border-white/60 px-6 py-3.5 text-sm font-black">まずは相談する</Link></div>
        </div>
      </section>
    </FarmPageShell>
  );
}
