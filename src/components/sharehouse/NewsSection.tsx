import React from 'react';
import Link from 'next/link';
import { SharehouseArticle } from '@/types/sharehouse-cms';

interface NewsSectionProps {
  articles: SharehouseArticle[];
}

/**
 * トップページ用のお知らせ（News）セクション (リスト形式)
 * 画像を使用せず、テキストベースで最新の情報を伝える
 */
export const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  // 0件の場合は非表示にする
  if (!articles || articles.length === 0) return null;

  return (
    <section id="news" className="py-10 md:py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 md:mb-16 gap-6">
          <div className="relative">
            <span 
              className="font-hand text-primary block mb-1"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              Updates
            </span>
            <h2 
              className="font-headline font-black text-on-surface tracking-tight"
              style={{ fontSize: 'var(--section-title-size)' }}
            >
              Latest <span className="marker-underline-terracotta">News</span>
            </h2>
          </div>

          <Link
            href="/sharehouse/news"
            className="group flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-xs md:text-sm font-bold border-b border-outline-variant/30 pb-1"
          >
            <span>すべてのお知らせを見る</span>
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>

        <div className="border-t border-outline-variant/30">
          {articles.map((article) => {
            const date = article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })
              : '';

            return (
              <Link
                key={article.id}
                href={`/sharehouse/news/${article.id}`}
                className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6 border-b border-outline-variant/30 hover:bg-primary/5 transition-all px-4 -mx-4 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span 
                    className="font-hand text-primary/60"
                    style={{ fontSize: 'var(--caption-text-size)' }}
                  >{date}</span>
                  <span className="bg-primary-container/30 text-primary px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                    News
                  </span>
                </div>

                <h3 
                  className="flex-1 font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
                  style={{ fontSize: 'var(--body-text-size)' }}
                >
                  {article.title}
                </h3>

                <span className="material-symbols-outlined text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 hidden md:block">
                  chevron_right
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
