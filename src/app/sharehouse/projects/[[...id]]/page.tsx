// src/app/sharehouse/projects/[[...id]]/page.tsx
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getLPData } from '@/libs/microcms';
import type { Project } from '@/types/microcms';

/**
 * プロジェクト詳細ページ
 * - プレビュー時は microCMS の下書きデータ（draftKey）を取得
 * - 本番時は公開データのみ取得
 */
export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode(); // プレビューモードか判定
  const data = await getLPData({ preview: isEnabled });

  if (!data) {
    // データ取得失敗時は 404
    notFound();
    return null;
  }

  const project: Project | undefined = (data.projects || []).find((p: Project) => p.id === params.id);

  if (!project) {
    // 該当プロジェクトが無い場合は 404
    notFound();
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      {project.image?.url && (
        <img src={project.image.url} alt={project.title} className="w-full h-auto mb-6" />
      )}
      <p className="text-lg mb-4">{project.description}</p>
      {/* 追加のコンテンツがあればここに表示 */}
    </section>
  );
}
