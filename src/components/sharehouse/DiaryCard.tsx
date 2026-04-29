import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Diary } from '@/types/microcms';

interface DiaryCardProps {
  diary: Diary;
  rotate?: string;
  className?: string;
}

/**
 * 日記セクション用のポラロイド風カードコンポーネント
 * グレースケールからの色の復元や、手書きのキャプションを実装
 */
export const DiaryCard: React.FC<DiaryCardProps> = ({
  diary,
  rotate = 'rotate-0',
  className = '',
}) => {
  return (
    <Link href={`/sharehouse/diaries/${diary.id}`} className={`block group flex-shrink-0 w-64 ${className}`}>
      <div className={`bg-surface-container-lowest p-3 pb-8 rounded-sm shadow-sm transition-transform duration-300 hover:scale-105 hover:z-10 ${rotate}`}>
        {/* Tape Decoration */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-secondary/10 backdrop-blur-[2px] -rotate-3 z-20 pointer-events-none"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        />

        {/* Polaroid Image */}
        <div className="relative aspect-square w-full mb-4 bg-surface-container-low border-8 border-surface-container-lowest shadow-inner overflow-hidden">
          {diary.image?.url ? (
            <Image
              src={diary.image.url}
              alt={diary.caption}
              fill
              className="object-cover grayscale-[0.3] sepia-[0.1] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
              <span className="material-symbols-outlined text-4xl">photo</span>
            </div>
          )}
        </div>

        {/* Handwritten Caption */}
        <p 
          className="font-hand text-on-surface text-center px-2 line-clamp-2 group-hover:text-primary transition-colors"
          style={{ fontSize: 'var(--caption-text-size)' }}
        >
          {diary.caption}
        </p>
      </div>
    </Link>
  );
};
