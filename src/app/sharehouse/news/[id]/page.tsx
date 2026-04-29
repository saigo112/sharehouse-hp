import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { getSharehouseArticleById, getSiteGlobals } from '@/libs/microcms';

export const revalidate = 0;

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();

  const [article, globalsData] = await Promise.all([
    getSharehouseArticleById(params.id, { preview: isEnabled }),
    getSiteGlobals()
  ]);

  // 記事タイプの判定を頑健にする（日本語/英語、大文字小文字に対応）
  const isNews = article && (
    Array.isArray(article.article_type) 
      ? article.article_type.some(t => ['news', 'お知らせ'].includes(t.toLowerCase()))
      : ['news', 'お知らせ'].includes(String(article.article_type).toLowerCase())
  );

  if (!article || !isNews) {
    notFound();
  }

  // 公開日のフォーマット
  const publishedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : '';

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

      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/sharehouse/news"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand" style={{ fontSize: 'var(--caption-text-size)' }}>一覧に戻る</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span 
              className="font-hand text-primary"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >{publishedDate}</span>
            <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-xs font-bold">News</span>
          </div>
          <h1 
            className="font-headline font-black text-on-surface leading-tight"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            {article.title}
          </h1>
        </header>

        <main>
          {article.mainVisual?.url && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl bg-surface-container-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.mainVisual.url} alt={article.title} className="w-full h-auto" />
            </div>
          )}
          
          <article 
            className="concept-rich-text" 
            dangerouslySetInnerHTML={{ __html: article.body || '' }} 
          />
        </main>

        <footer className="mt-24 pt-12 border-t border-surface-container text-center">
          <Link
            href="/sharehouse/news"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
          >
            お知らせ一覧へ
          </Link>
        </footer>
      </div>
    </div>
  );
}
