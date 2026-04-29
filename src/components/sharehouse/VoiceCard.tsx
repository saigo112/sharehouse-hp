import React from 'react';
import Image from 'next/image';
import { Voice } from '@/types/microcms';

interface VoiceCardProps {
  voice: Voice;
  rotate?: string;
  marginClass?: string;
}

/**
 * 住人の声カードコンポーネント
 * スクラップブック風の傾き・テープ装飾・色褪せた写真表現を実装
 */
export const VoiceCard: React.FC<VoiceCardProps> = ({
  voice,
  rotate = '',
  marginClass = '',
}) => {
  return (
    <div className={`relative group ${marginClass}`}>
      {/* Washi tape decoration */}
      <div
        className="absolute -top-3 left-1/3 w-20 h-7 bg-secondary/15 z-20 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      />

      <div
        className={`bg-white p-5 pb-16 shadow-xl ${rotate} transition-transform duration-500 relative z-10`}
      >
        {/* Portrait photo */}
        <div className="relative w-24 h-24 mb-5 flex-shrink-0">
          {voice.image?.url ? (
            <Image
              src={voice.image.url}
              alt={voice.name}
              fill
              className="object-cover rounded-sm border-4 border-surface shadow-md grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full bg-surface-container rounded-sm border-4 border-surface flex items-center justify-center text-on-surface-variant/30">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
          )}
        </div>

        {/* Quote content */}
        <div className="px-1">
          <span 
            className="font-hand text-primary font-bold block mb-2"
            style={{ fontSize: 'var(--caption-text-size)' }}
          >
            {voice.name}
            <span 
              className="text-on-surface-variant font-body font-normal ml-2"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              ({voice.profession})
            </span>
          </span>
          <p
            className="font-body font-bold leading-snug text-on-surface"
            style={{ fontSize: 'var(--body-text-size)' }}
            dangerouslySetInnerHTML={{ __html: voice.quote }}
          />
        </div>

        {/* Handwriting accent at bottom */}
        <div className="absolute bottom-5 right-5 font-hand text-primary/20 group-hover:text-primary/50 transition-colors text-xs italic">
          — real talk
        </div>
      </div>
    </div>
  );
};
