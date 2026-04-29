import { Metadata } from "next";
import Link from "next/link";
import { getSharehouseArticles, getSiteGlobals } from "@/libs/microcms";
import { SharehouseArticle } from "@/types/sharehouse-cms";
import { DiaryCard } from "@/components/sharehouse/DiaryCard";

export const metadata: Metadata = {
  title: "日記一覧 | ハチソラハウス",
  description: "ハチソラハウスの日々の暮らしや活動の記録です。",
};

export const revalidate = 0;

export default async function DiaryListPage() {
  const [data, globalsData] = await Promise.all([
    getSharehouseArticles('diary'),
    getSiteGlobals()
  ]);

  const diaries = (data?.contents || []).map((d: SharehouseArticle, index: number) => ({
    id: d.id || String(index + 1),
    image: d.mainVisual || { url: "" },
    caption: d.title || "",
    content: d.body || "",
    instagramUrl: d.instagramUrl || ""
  }));

  // フォント設定の構築
  const fontStyles = {
    '--base-font-size': globalsData?.baseFontSize ? `${globalsData.baseFontSize}px` : '16px',
    '--hero-size': globalsData?.pcFontSize?.heroTitleSizePc ? `${globalsData.pcFontSize.heroTitleSizePc}px` : '3rem',
    '--section-title-size': globalsData?.pcFontSize?.sectionTitleSizePc ? `${globalsData.pcFontSize.sectionTitleSizePc}px` : '2.25rem',
    '--body-text-size': globalsData?.pcFontSize?.bodyTextSizePc ? `${globalsData.pcFontSize.bodyTextSizePc}px` : '1rem',
    '--caption-text-size': globalsData?.pcFontSize?.captionTextSizePc ? `${globalsData.pcFontSize.captionTextSizePc}px` : '0.875rem',
    
    // スマホ用設定
    '--hero-size-sp': globalsData?.mobileFontSize?.heroTitleSizeSp ? `${globalsData.mobileFontSize.heroTitleSizeSp}px` : '1.75rem',
    '--section-title-size-sp': globalsData?.mobileFontSize?.sectionTitleSizeSp ? `${globalsData.mobileFontSize.sectionTitleSizeSp}px` : '1.5rem',
    '--body-text-size-sp': globalsData?.mobileFontSize?.bodyTextSizeSp ? `${globalsData.mobileFontSize.bodyTextSizeSp}px` : '0.9375rem',
    '--caption-text-size-sp': globalsData?.mobileFontSize?.captionTextSizeSp ? `${globalsData.mobileFontSize.captionTextSizeSp}px` : '0.8125rem',
  };

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --base-font-size: ${fontStyles['--base-font-size']} !important;
          --hero-size: ${fontStyles['--hero-size']} !important;
          --section-title-size: ${fontStyles['--section-title-size']} !important;
          --body-text-size: ${fontStyles['--body-text-size']} !important;
          --caption-text-size: ${fontStyles['--caption-text-size']} !important;
        }

        @media (max-width: 1023px) {
          :root {
            --hero-size: ${fontStyles['--hero-size-sp']} !important;
            --section-title-size: ${fontStyles['--section-title-size-sp']} !important;
            --body-text-size: ${fontStyles['--body-text-size-sp']} !important;
            --caption-text-size: ${fontStyles['--caption-text-size-sp']} !important;
          }
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand" style={{ fontSize: 'var(--caption-text-size)' }}>ホームに戻る</span>
          </Link>
          <div className="relative">
            <div 
              className="inline-block font-hand text-primary -rotate-2 mb-2"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              Life Log
            </div>
            <h1 
              className="font-headline font-black text-on-surface"
              style={{ fontSize: 'var(--section-title-size)' }}
            >
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
