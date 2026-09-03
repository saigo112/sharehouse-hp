import { Metadata } from 'next';
import Link from 'next/link';
import { getSharehouseArticles, getSiteGlobals } from '@/libs/microcms';
import { NewsCard } from '@/components/sharehouse/NewsCard';

export const metadata: Metadata = {
  title: 'お知らせ | アルデルハウス',
  description: 'アルデルハウスの最新情報、イベント情報、大切なお知らせをお届けします。',
};

export const revalidate = 0;

export default async function NewsListPage() {
  const [data, globalsData] = await Promise.all([
    getSharehouseArticles('news'),
    getSiteGlobals()
  ]);
  const articles = data?.contents || [];

  // フォント設定の構築
  const fontStyles = {
    '--base-font-size': globalsData?.baseFontSize ? `${globalsData.baseFontSize}px` : undefined,
    '--font-family-body': globalsData?.fontFamilyBody ? (globalsData.fontFamilyBody.includes(',') ? globalsData.fontFamilyBody : `'${globalsData.fontFamilyBody}', sans-serif`) : undefined,
    '--font-family-headline': globalsData?.fontFamilyHeadline ? (globalsData.fontFamilyHeadline.includes(',') ? globalsData.fontFamilyHeadline : `'${globalsData.fontFamilyHeadline}', sans-serif`) : undefined,

    '--hero-size': globalsData?.pcFontSize?.heroTitleSizePc ? `${globalsData.pcFontSize.heroTitleSizePc}px` : undefined,
    '--hero-size-sp': globalsData?.mobileFontSize?.heroTitleSizeSp ? `${globalsData.mobileFontSize.heroTitleSizeSp}px` : undefined,
    
    '--section-title-size': globalsData?.pcFontSize?.sectionTitleSizePc ? `${globalsData.pcFontSize.sectionTitleSizePc}px` : undefined,
    '--section-title-size-sp': globalsData?.mobileFontSize?.sectionTitleSizeSp ? `${globalsData.mobileFontSize.sectionTitleSizeSp}px` : undefined,
    
    '--body-text-size': globalsData?.pcFontSize?.bodyTextSizePc ? `${globalsData.pcFontSize.bodyTextSizePc}px` : undefined,
    '--body-text-size-sp': globalsData?.mobileFontSize?.bodyTextSizeSp ? `${globalsData.mobileFontSize.bodyTextSizeSp}px` : undefined,
    
    '--caption-text-size': globalsData?.pcFontSize?.captionTextSizePc ? `${globalsData.pcFontSize.captionTextSizePc}px` : undefined,
    '--caption-text-size-sp': globalsData?.mobileFontSize?.captionTextSizeSp ? `${globalsData.mobileFontSize.captionTextSizeSp}px` : undefined,
  } as Record<string, string | undefined>;

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --base-font-size: ${fontStyles['--base-font-size'] || '16px'} !important;
          ${fontStyles['--font-family-body'] ? `--font-family-body: ${fontStyles['--font-family-body']} !important;` : ''}
          ${fontStyles['--font-family-headline'] ? `--font-family-headline: ${fontStyles['--font-family-headline']} !important;` : ''}
          
          --hero-size: ${fontStyles['--hero-size'] || '3rem'} !important;
          --section-title-size: ${fontStyles['--section-title-size'] || '2.25rem'} !important;
          --body-text-size: ${fontStyles['--body-text-size'] || '1rem'} !important;
          --caption-text-size: ${fontStyles['--caption-text-size'] || '0.875rem'} !important;
        }

        @media (max-width: 1023px) {
          :root {
            --hero-size: ${fontStyles['--hero-size-sp'] || '1.75rem'} !important;
            --section-title-size: ${fontStyles['--section-title-size-sp'] || '1.5rem'} !important;
            --body-text-size: ${fontStyles['--body-text-size-sp'] || '0.9375rem'} !important;
            --caption-text-size: ${fontStyles['--caption-text-size-sp'] || '0.8125rem'} !important;
          }
        }
      `}} />

      <div className="max-w-4xl mx-auto">
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
              Latest News
            </div>
            <h1 
              className="font-headline font-black text-on-surface"
              style={{ fontSize: 'var(--section-title-size)' }}
            >
              お知らせ<span className="marker-underline-terracotta">一覧</span>
            </h1>
          </div>
        </header>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant">
            <p className="text-on-surface-variant text-lg">お知らせはまだありません。</p>
          </div>
        )}

        <footer className="mt-20 pt-12 border-t border-surface-container text-center">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
            style={{ fontSize: 'var(--body-text-size)' }}
          >
            ホームへ戻る
          </Link>
        </footer>
      </div>
    </div>
  );
}
