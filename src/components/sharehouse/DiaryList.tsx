import React from 'react';
import { Diary } from '@/types/microcms';
import { DiaryCard } from './DiaryCard';

interface DiaryListProps {
  diaries: Diary[];
}

/**
 * 日記セクションのコンテナコンポーネント
 * ポラロイド風カードを横スクロールで表示
 */
export const DiaryList: React.FC<DiaryListProps> = ({ diaries }) => {
  return (
    <section id="diaries" className="py-24 overflow-hidden relative bg-[#f9f8f6]">
      {/* Background visual elements */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-outline-variant/30 -z-10" />
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-outline-variant/30 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 relative">
        {/* Header content */}
        <div className="flex flex-col items-center justify-center relative">
          <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface text-center mb-4 relative z-10">
            Daily Diaries
          </h2>
          <div className="w-32 h-1.5 bg-primary/20 rounded-full mt-2 absolute bottom-2 z-0" />
          <p className="text-center font-hand text-primary mt-4 text-xl -rotate-1">
            The real, unedited life...
          </p>
        </div>
        
        {/* Scroll indicator for mobile focus */}
        <div className="md:hidden absolute right-6 bottom-4 animate-pulse flex items-center gap-2 text-on-surface-variant font-hand text-sm">
          <span>Swipe</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      </div>
      
      {/* Scrollable Container */}
      {/* no-scrollbar utility class requires Tailwind plugin or custom css, assuming global setup handles it or we rely on standard css */}
      <div className="flex overflow-x-auto pb-16 pt-8 px-6 md:px-12 gap-8 lg:gap-12 no-scrollbar scroll-smooth snap-x snap-mandatory">
        {diaries.map((diary, index) => {
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
        {/* Padding element for the end of the scroll array */}
        <div className="shrink-0 w-6 md:w-12 h-1"></div>
      </div>
    </section>
  );
};
