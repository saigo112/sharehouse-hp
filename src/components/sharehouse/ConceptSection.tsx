import React from 'react';
import { MicroCMSImage } from '@/types/microcms';

interface ConceptSectionProps {
  handwrittenText?: string;
  title: string;
  description1: string;
  description2: string;
  polaroidImage: MicroCMSImage;
  polaroidCaption?: string;
  stickerText?: string;
}

/**
 * コンセプトセクションコンポーネント
 * ポラロイド写真とテキストを組み合わせた2カラムレイアウト
 */
export const ConceptSection: React.FC<ConceptSectionProps> = ({
  handwrittenText,
  title,
  description1,
  description2,
  polaroidImage,
  polaroidCaption,
  stickerText,
}) => {
  return (
    <section id="concept" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div className="relative">
          {handwrittenText && (
            <div className="inline-block font-hand text-primary text-xl -rotate-3 mb-4">
              {handwrittenText}
            </div>
          )}
          <h2
            className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-8 leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
            <p>{description1}</p>
            <p>{description2}</p>
          </div>
        </div>

        {/* Polaroid side */}
        <div className="relative z-10 w-full max-w-sm md:max-w-md mx-auto md:mx-0">
          <div className="relative aspect-[3/4] rotate-2 bg-surface-container-lowest p-4 pb-16 shadow-2xl transition-transform duration-500 hover:rotate-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={polaroidImage?.url}
              alt={polaroidCaption ?? 'コンセプト画像'}
              className="w-full h-full object-cover rounded-sm grayscale-[0.2] sepia-[0.1] hover:grayscale-0 hover:sepia-0 transition-all duration-700"
            />
            {polaroidCaption && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="font-hand text-on-surface text-lg">{polaroidCaption}</p>
              </div>
            )}
          </div>
          {/* Accent sticker */}
          {stickerText && (
            <div className="absolute -bottom-4 -left-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-hand font-bold -rotate-6 shadow-sm z-20">
              {stickerText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
