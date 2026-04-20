import { Metadata } from 'next';
import Link from 'next/link';
import { getSharehouseArticles } from '@/libs/microcms';
import { NewsCard } from '@/components/sharehouse/NewsCard';

export const metadata: Metadata = {
  title: 'お知らせ | ハチソラハウス',
  description: 'ハチソラハウスの最新情報、イベント情報、大切なお知らせをお届けします。',
};

export default async function NewsListPage() {
  const data = await getSharehouseArticles('news');
  const articles = data?.contents || [];

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <div className="max-w-4xl mx-auto">
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
              Latest News
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface">
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
          >
            ホームへ戻る
          </Link>
        </footer>
      </div>
    </div>
  );
}
