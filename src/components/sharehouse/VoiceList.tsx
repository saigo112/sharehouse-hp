import React from 'react';
import { Voice } from '@/types/microcms';
import { VoiceCard } from './VoiceCard';

interface VoiceListProps {
  voices: Voice[];
}

/**
 * 住人の声セクション全体のコンテナコンポーネント
 * スクラップブック風の配置（高さずらし）でカードをグリッド表示
 */
export const VoiceList: React.FC<VoiceListProps> = ({ voices }) => {
  // カードごとの装飾スタイル設定
  const cardStyles = [
    { rotate: '-rotate-2', margin: '' },
    { rotate: 'rotate-3', margin: 'mt-8 lg:mt-16' },
    { rotate: '-rotate-1', margin: 'mt-0 lg:mt-4' },
  ];

  return (
    <section id="voices" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 relative">
          <span 
            className="font-hand text-primary font-bold block mb-2"
            style={{ fontSize: 'var(--caption-text-size)' }}
          >
            Voices of Villagers
          </span>
          <h2 
            className="font-headline font-black text-on-surface"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            住人の声
          </h2>
          <div className="w-24 h-1.5 bg-secondary-container mx-auto mt-4 rounded-full" />
        </div>

        {/* Cards grid with staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {voices.map((voice, index) => {
            const style = cardStyles[index % cardStyles.length];
            return (
              <VoiceCard
                key={voice.id || index}
                voice={voice}
                rotate={style.rotate}
                marginClass={style.margin}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
