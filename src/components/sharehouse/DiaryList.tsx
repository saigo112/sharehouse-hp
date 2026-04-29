import React from 'react';
import Link from 'next/link';
import { Diary } from '@/types/microcms';
import { DiaryCard } from './DiaryCard';

interface DiaryListProps {
  diaries: Diary[];
  limit?: number;
}

/**
 * 日記セクションのコンテナコンポーネント
 * ポラロイド風カードを横スクロールで表示
 */
export const DiaryList: React.FC<DiaryListProps> = ({ diaries, limit }) => {
  // 表示する日記を制限
  const displayedDiaries = limit ? diaries.slice(0, limit) : diaries;
  return (
    <section id="diaries" className="py-24 overflow-hidden relative bg-[#f9f8f6]">
      {/* Background visual elements */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-outline-variant/30 -z-10" />
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-outline-variant/30 -z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative">
        {/* Header content */}
        <div className="flex flex-col items-center justify-center relative">
          <h2 
            className="font-headline font-black text-on-surface text-center mb-4 relative z-10"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            Daily Diaries
          </h2>
          <div className="w-32 h-1.5 bg-primary/20 rounded-full mt-2 absolute bottom-2 z-0" />
          <p 
            className="text-center font-hand text-primary mt-4 -rotate-1"
            style={{ fontSize: 'var(--caption-text-size)' }}
          >
            The real, unedited life...
          </p>
        </div>
      </div>

      {/* Scroll indicator for mobile focus - Moved for better placement above cards */}
      <div className="md:hidden flex justify-end px-10 -mt-12 mb-4 animate-pulse items-center gap-2 text-on-surface-variant font-hand text-base">
        <span>Swipe</span>
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </div>

      {/* Scrollable Container - 画面幅に合わせて制限 */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex overflow-x-auto pb-16 pt-8 gap-8 lg:gap-12 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {displayedDiaries.map((diary, index) => {
            const rotations = ['-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1', '-rotate-3'];
            const rotation = rotations[index % rotations.length];
            return (
              <div key={diary.id || index} className="snap-center lg:snap-align-none shrink-0">
                <DiaryCard
                  diary={diary}
                  rotate={rotation}
                />
              </div>
            );
          })}

          {limit && diaries.length > 0 && (
            <div className="snap-center lg:snap-align-none shrink-0 flex items-center pr-12">
              <Link
                href="/sharehouse/diaries"
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">arrow_forward</span>
                </div>
                <span className="font-hand text-xl text-primary font-bold">See all...</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
