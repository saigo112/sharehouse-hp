import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SharehouseArticle } from '@/types/sharehouse-cms';

interface NewsCardProps {
  article: SharehouseArticle;
}

/**
 * お知らせ（News）用カードコンポーネント
 */
export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const publishedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : '';

  return (
    <Link href={`/sharehouse/news/${article.id}`} className="block group">
      <div className="flex gap-6 items-start p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all hover:shadow-md">
        {/* Thumbnail */}
        <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-low">
          {article.mainVisual?.url ? (
            <Image
              src={article.mainVisual.url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/30">
              <span className="material-symbols-outlined text-3xl">notifications</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 py-1">
          <span className="text-sm font-hand text-primary mb-1 block">{publishedDate}</span>
          <h3 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};
