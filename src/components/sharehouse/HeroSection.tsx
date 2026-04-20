'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicroCMSImage, MenuItem } from '@/types/microcms';

interface HeroSectionProps {
  title: string;
  backgroundImages: MicroCMSImage[];
  menuItems?: MenuItem[];
  joinUsHref?: string;
}

/**
 * ヒーローセクション & ナビゲーションヘッダーコンポーネント (カルーセル対応)
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ title, backgroundImages = [], menuItems = [], joinUsHref = "#join" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // カルーセルの自動再生
  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // 5秒ごとに切り替え
    
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  // Join Usボタンがメニュー項目に含まれているか確認
  const hasJoinUs = menuItems.some(item => item.label.toLowerCase().includes('join') || item.href === joinUsHref);

  return (
    <>
      {/* Sticky Navigation */}
      <header className="top-0 sticky z-50 bg-background/80 backdrop-blur-md shadow-[0_2px_15px_rgba(86,66,62,0.05)]">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-primary tracking-tighter font-headline">
            ハチソラハウス
          </div>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold text-sm tracking-tight">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="text-stone-600 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            {!hasJoinUs && (
              <a
                href={joinUsHref}
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-200"
              >
                Join Us
              </a>
            )}
          </div>
          <div className="md:hidden">
            <a
              href={joinUsHref}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-headline font-bold text-sm"
            >
              Join Us
            </a>
          </div>
        </nav>
      </header>

      {/* Full-screen Hero with Carousel */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-stone-900">
        <AnimatePresence mode="wait">
          {backgroundImages.length > 0 ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backgroundImages[currentIndex].url}
                alt={`里山シェアハウスの風景 ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            </motion.div>
          ) : (
             <div className="absolute inset-0 bg-stone-800" />
          )}
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white font-headline text-4xl md:text-6xl lg:text-7xl leading-tight font-black max-w-5xl whitespace-pre-wrap drop-shadow-2xl"
          >
            {title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 md:mt-20 animate-bounce"
          >
            <span className="material-symbols-outlined text-white text-4xl">keyboard_double_arrow_down</span>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        {backgroundImages.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {backgroundImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
