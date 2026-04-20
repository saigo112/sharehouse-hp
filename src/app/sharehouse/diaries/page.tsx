import { Metadata } from "next";
import Link from "next/link";
import { getSharehouseArticles } from "@/libs/microcms";
import { SharehouseArticle } from "@/types/sharehouse-cms";
import { DiaryCard } from "@/components/sharehouse/DiaryCard";

export const metadata: Metadata = {
  title: "日記一覧 | ハチソラハウス",
  description: "ハチソラハウスの日々の暮らしや活動の記録です。",
};

export default async function DiaryListPage() {
  const data = await getSharehouseArticles('diary');
  const diaries = (data?.contents || []).map((d: SharehouseArticle, index: number) => ({
    id: d.id || String(index + 1),
    image: d.mainVisual || { url: "" },
    caption: d.title || "",
    content: d.body || "",
    instagramUrl: d.instagramUrl || ""
  }));

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand text-lg">ホームに戻る</span>
          </Link>
          <div className="relative">
            <div className="inline-block font-hand text-primary text-2xl -rotate-2 mb-2">
              Life Log
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface">
              日記<span className="marker-underline-terracotta">一覧</span>
            </h1>
          </div>
        </header>

        {diaries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {diaries.map((diary) => (
              <DiaryCard key={diary.id} diary={diary} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant">
            <p className="text-on-surface-variant text-lg">日記の投稿はまだありません。</p>
          </div>
        )}
      </div>
    </div>
  );
}
