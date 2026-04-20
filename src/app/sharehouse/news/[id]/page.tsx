import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { getSharehouseArticleById } from '@/libs/microcms';

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();

  const article = await getSharehouseArticleById(params.id, { preview: isEnabled });

  // 記事タイプの判定を頑健にする（日本語/英語、大文字小文字に対応）
  const isNews = article && (
    Array.isArray(article.article_type) 
      ? article.article_type.some(t => ['news', 'お知らせ'].includes(t.toLowerCase()))
      : ['news', 'お知らせ'].includes(String(article.article_type).toLowerCase())
  );

  if (!article || !isNews) {
    notFound();
  }

  const publishedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : '';

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/sharehouse/news"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand text-lg">一覧に戻る</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-hand text-primary">{publishedDate}</span>
            <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-xs font-bold">News</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface leading-tight">
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
