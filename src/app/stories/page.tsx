import type { Metadata } from "next";
import Link from "next/link";
import { FarmPageHero, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { getFarmStories } from "@/libs/farm-microcms";
import type { FarmArticle } from "@/types/farm-cms";

export const metadata: Metadata = {
  title: "日々の暮らし",
  description: "田んぼ、畑、鶏、古民家、山、食。ALDEL FARMで続く日々の営みを記録します。",
};

export const revalidate = 60;

function formatDate(value?: string) {
  if (!value) return "日付未設定";
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

function getTypeLabel(article: FarmArticle) {
  const types = Array.isArray(article.article_type) ? article.article_type : [article.article_type];
  const normalized = types.map((type) => String(type).toLowerCase());
  if (normalized.some((type) => ["report", "活動報告", "レポート"].includes(type))) return "REPORT";
  if (normalized.some((type) => ["story", "物語"].includes(type))) return "STORY";
  return "DIARY";
}

export default async function StoriesPage() {
  const { contents: stories } = await getFarmStories();

  return (
    <FarmPageShell>
      <FarmPageHero
        eyebrow="Stories from everyday life"
        title="季節と相談しながら、今日の仕事を決める。"
        lead="田んぼの水や草を見る日。鶏の餌を仕込む日。古民家を掃除する日。ALDEL FARMの日常は、季節、天候、生き物、集落の予定によって変わります。"
      />

      <section className="px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-stone-300 pb-12 md:grid-cols-12 md:gap-12">
            <p className="font-hand text-primary md:col-span-3">What we keep here</p>
            <div className="md:col-span-9">
              <h2 className="font-headline text-2xl font-black leading-tight md:text-4xl">特別な行事だけでなく、暮らしを支える小さな作業も。</h2>
              <p className="mt-6 max-w-3xl text-sm leading-8 text-on-surface-variant md:text-base">うまくいったことだけでなく、手間がかかったこと、やり直したこと、誰かに教わったことも含めて、土地で暮らす実感を伝えていきます。</p>
            </div>
          </div>

          {stories.length > 0 ? (
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <Link key={story.id} href={`/stories/${story.id}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-[#e4dfd5]">
                    {story.mainVisual?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={story.mainVisual.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-end bg-gradient-to-br from-[#d9d0bf] to-[#9a8c79] p-6 text-white/80"><span className="font-hand text-xl">ALDEL FARM</span></div>
                    )}
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-xs">
                    <span className="font-bold tracking-widest text-primary">{getTypeLabel(story)}</span>
                    <span className="text-on-surface-variant">{formatDate(story.publishedAt)}</span>
                  </div>
                  <h2 className="mt-4 font-headline text-xl font-black leading-snug transition-colors group-hover:text-primary">{story.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-on-surface-variant">{story.summary || "この土地で続く、日々の営みを記録しています。"}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-primary">続きを読む <span aria-hidden>→</span></span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl bg-surface-container-low px-7 py-14 text-center md:px-12">
              <p className="font-hand text-primary">Stories are coming</p>
              <h2 className="mt-3 font-headline text-2xl font-black">これから、日々の記録を積み重ねていきます。</h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-on-surface-variant">microCMSの articles APIに、種類を diary・story・report のいずれかで公開すると、このページに表示されます。</p>
              <Link href="/about/aldel-farm" className="mt-7 inline-flex rounded-full border border-outline-variant px-6 py-3 text-sm font-bold">ALDEL FARMについて</Link>
            </div>
          )}
        </div>
      </section>
    </FarmPageShell>
  );
}
