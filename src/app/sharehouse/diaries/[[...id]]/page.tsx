// src/app/sharehouse/diaries/[[...id]]/page.tsx
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getLPData } from '@/libs/microcms';
import type { Diary } from '@/types/microcms';

/**
 * 日記詳細ページ
 * - プレビュー時は microCMS の下書きデータ（draftKey）を取得
 * - 本番時は公開データのみ取得
 */
export default async function DiaryDetail({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode(); // プレビューモードか判定
  const data = await getLPData({ preview: isEnabled });

  if (!data) {
    notFound();
    return null;
  }

  const diary: Diary | undefined = (data.diaries || []).find((d: Diary) => d.id === params.id);

  if (!diary) {
    notFound();
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto py-12">
      {diary.image?.url && (
        <img src={diary.image.url} alt={diary.caption} className="w-full h-auto mb-6" />
      )}
      <h1 className="text-3xl font-bold mb-4">{diary.caption}</h1>
      {/* ここに本文があれば表示（例: diary.content） */}
    </section>
  );
}
