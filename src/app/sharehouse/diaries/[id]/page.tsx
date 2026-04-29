import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { getSharehouseDiaryById, getSiteGlobals } from '@/libs/microcms';
import type { SharehouseDiary } from '@/types/sharehouse-cms';
import type { Diary } from '@/types/microcms';
import { InstagramPreview } from '@/components/sharehouse/InstagramPreview';

export const revalidate = 0;

export default async function DiaryDetailPage({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();

  // データの取得
  const [newDiary, globalsData] = await Promise.all([
    getSharehouseDiaryById(params.id, { preview: isEnabled }) as Promise<SharehouseDiary | null>,
    getSiteGlobals()
  ]);

  let diary: Diary | undefined;

  // 記事タイプの判定を頑健にする（日本語/英語、大文字小文字に対応）
  const isDiary = newDiary && (
    Array.isArray(newDiary.article_type) 
      ? newDiary.article_type.some(t => ['diary', '日記'].includes(t.toLowerCase()))
      : ['diary', '日記'].includes(String(newDiary.article_type).toLowerCase())
  );

  if (newDiary && isDiary) {
    diary = {
      id: newDiary.id,
      image: newDiary.mainVisual || { url: "" },
      caption: newDiary.title || "",
      content: newDiary.body || "",
      instagramUrl: newDiary.instagramUrl || ""
    };
  }

  if (!diary) {
    notFound();
  }

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
            href="/sharehouse/diaries"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand" style={{ fontSize: 'var(--caption-text-size)' }}>一覧に戻る</span>
          </Link>
          <p 
            className="font-hand text-primary mb-4 text-center md:text-left"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            {diary.caption}
          </p>
        </header>

        <main>
          {/* Instagram URLがある場合は埋め込みを表示 */}
          {diary.instagramUrl ? (
            <div className="mb-12">
              <InstagramPreview url={diary.instagramUrl} />
              {diary.content && (
                <div 
                  className="mt-8 concept-rich-text" 
                  style={{ fontSize: 'var(--body-text-size)' }}
                  dangerouslySetInnerHTML={{ __html: diary.content }} 
                />
              )}
            </div>
          ) : (
            <>
              {diary.image?.url && (
                <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={diary.image.url} alt={diary.caption} className="w-full h-auto" />
                </div>
              )}
              {diary.content && (
                <div 
                  className="mt-8 concept-rich-text" 
                  style={{ fontSize: 'var(--body-text-size)' }}
                  dangerouslySetInnerHTML={{ __html: diary.content }} 
                />
              )}
            </>
          )}
        </main>

        <footer className="mt-20 pt-12 border-t border-surface-container text-center">
          <Link
            href="/sharehouse/diaries"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
            style={{ fontSize: 'var(--body-text-size)' }}
          >
            日記一覧へ
          </Link>
        </footer>
      </div>
    </div>
  );
}
