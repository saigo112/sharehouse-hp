import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { getSharehouseDiaryById } from '@/libs/microcms';
import type { SharehouseDiary } from '@/types/sharehouse-cms';
import type { Diary } from '@/types/microcms';
import { InstagramPreview } from '@/components/sharehouse/InstagramPreview';

export default async function DiaryDetailPage({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();

  // 新しい日記専用APIからIDで取得
  const newDiary = await getSharehouseDiaryById(params.id, { preview: isEnabled }) as SharehouseDiary | null;
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

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/sharehouse/diaries"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand text-lg">一覧に戻る</span>
          </Link>
          <p className="font-hand text-primary text-xl mb-4 text-center md:text-left">{diary.caption}</p>
        </header>

        <main>
          {/* Instagram URLがある場合は埋め込みを表示 */}
          {diary.instagramUrl ? (
            <div className="mb-12">
              <InstagramPreview url={diary.instagramUrl} />
              {diary.content && (
                <div 
                  className="mt-8 concept-rich-text" 
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
          >
            日記一覧へ
          </Link>
        </footer>
      </div>
    </div>
  );
}
