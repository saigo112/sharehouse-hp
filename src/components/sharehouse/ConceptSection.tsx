'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicroCMSImage } from '@/types/microcms';
import Link from 'next/link';

interface ConceptSectionProps {
  handwrittenText?: string;
  title: string;
  description1: string;
  description2: string;
  polaroidImages: MicroCMSImage[];
  polaroidCaption?: string;
  stickerText?: string;
  titleFontSize?: number;
}

/**
 * コンセプトセクションコンポーネント (カルーセル対応)
 * ポラロイド写真部分をスライドショー表示にする
 */
export const ConceptSection: React.FC<ConceptSectionProps> = ({
  handwrittenText,
  title,
  description1,
  description2,
  polaroidImages = [],
  polaroidCaption,
  stickerText,
  titleFontSize,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // コンセプト画像の自動再生
  useEffect(() => {
    if (polaroidImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % polaroidImages.length);
    }, 4500); // ヒーローとは少しずらして4.5秒

    return () => clearInterval(timer);
  }, [polaroidImages.length]);

  return (
    <section id="concept" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div className="relative">
          {handwrittenText && (
            <div 
              className="inline-block font-hand text-primary -rotate-3 mb-4"
              style={{ fontSize: '12px' }}
            >
              {handwrittenText}
            </div>
          )}
          <h2
            className="font-headline font-black text-on-surface mb-8 leading-tight"
            style={{ fontSize: 'var(--section-title-size)' }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div 
            className="space-y-6 text-on-surface-variant leading-relaxed font-body"
            style={{ fontSize: 'var(--body-text-size)' }}
          >
            <p>{description1}</p>
            <p>{description2}</p>
          </div>
          <div className="mt-10">
            <Link
              href="/sharehouse/concept"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
              style={{ fontSize: 'var(--body-text-size)' }}
            >
              <span>コンセプトを詳しく見る</span>
              <span className="material-symbols-outlined text-base md:text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Polaroid side with Carousel */}
        <div className="relative z-10 w-full max-w-sm md:max-w-md mx-auto md:mx-0">
          <div className="relative aspect-[3/4] rotate-2 bg-surface-container-lowest p-4 pb-16 shadow-2xl transition-transform duration-500 hover:rotate-0">
            <AnimatePresence mode="wait">
              {polaroidImages.length > 0 ? (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={polaroidImages[currentIndex].url}
                    alt={polaroidCaption ?? `コンセプト画像 ${currentIndex + 1}`}
                    className="w-full h-full object-cover rounded-sm grayscale-[0.2] sepia-[0.1] hover:grayscale-0 hover:sepia-0 transition-all duration-700"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/20">photo</span>
                </div>
              )}
            </AnimatePresence>

            {polaroidCaption && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p 
                  className="font-hand text-on-surface"
                  style={{ fontSize: '12px' }}
                >
                  {polaroidCaption}
                </p>
              </div>
            )}

            {/* Pagination dots for polaroid */}
            {polaroidImages.length > 1 && (
              <div className="absolute bottom-1 right-4 flex gap-1.5 pb-2">
                {polaroidImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Accent sticker */}
          {stickerText && (
            <div 
              className="absolute -bottom-4 -left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg font-hand font-bold -rotate-6 shadow-sm z-20"
              style={{ fontSize: '12px' }}
            >
              {stickerText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
