import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FarmBreadcrumbs, FarmPageShell } from "@/components/farm/FarmPageChrome";
import { getFarmStoryById } from "@/libs/farm-microcms";
import type { FarmArticle } from "@/types/farm-cms";

export const revalidate = 60;

type StoryPageProps = { params: { id: string } };

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

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const story = await getFarmStoryById(params.id);
  if (!story) return { title: "記事が見つかりません" };
  return {
    title: story.title,
    description: story.summary || `${story.title}｜ALDEL FARMの日々の暮らし`,
    openGraph: story.mainVisual?.url ? { images: [{ url: story.mainVisual.url }] } : undefined,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getFarmStoryById(params.id);
  if (!story) notFound();

  return (
    <FarmPageShell>
      <article>
        <header className="border-b border-stone-200 bg-[#f1eee7] px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-4xl">
            <FarmBreadcrumbs items={[{ label: "知る・相談する", href: "/about" }, { label: "日々の暮らし", href: "/stories" }, { label: story.title }]} />
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold tracking-widest text-primary">{getTypeLabel(story)}</span>
              <span className="text-on-surface-variant">{formatDate(story.publishedAt)}</span>
            </div>
            <h1 className="mt-5 font-headline text-3xl font-black leading-tight tracking-[-0.025em] md:text-5xl">{story.title}</h1>
            {story.summary && <p className="mt-7 max-w-3xl text-sm leading-8 text-on-surface-variant md:text-base">{story.summary}</p>}
          </div>
        </header>

        <div className="px-5 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-4xl">
            {story.mainVisual?.url && (
              <div className="mb-12 aspect-[16/9] overflow-hidden bg-stone-200 md:mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.mainVisual.url} alt="" className="h-full w-full object-cover" />
              </div>
            )}

            {story.body ? (
              <div className="farm-rich-text" dangerouslySetInnerHTML={{ __html: story.body }} />
            ) : (
              <p className="text-sm leading-8 text-on-surface-variant">{story.summary || "本文は準備中です。"}</p>
            )}

            <div className="mt-16 border-t border-stone-300 pt-8">
              <Link href="/stories" className="inline-flex items-center gap-3 text-sm font-bold text-primary"><span aria-hidden>←</span> 日々の暮らしへ戻る</Link>
            </div>
          </div>
        </div>
      </article>
    </FarmPageShell>
  );
}
