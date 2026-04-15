import React from 'react';
import { MicroCMSImage } from '@/types/microcms';

interface HeroSectionProps {
  title: string;
  backgroundImage: MicroCMSImage;
}

/**
 * ヒーローセクション & ナビゲーションヘッダーコンポーネント
 * サイト全体のファーストインプレッションを担う
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
  return (
    <>
      {/* Sticky Navigation */}
      <header className="top-0 sticky z-50 bg-background/80 backdrop-blur-md shadow-[0_2px_15px_rgba(86,66,62,0.05)]">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-primary tracking-tighter font-headline">
            ハチソラハウス
          </div>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold text-sm tracking-tight">
            <a href="#concept" className="text-stone-600 hover:text-primary transition-colors">Concept</a>
            <a href="#projects" className="text-stone-600 hover:text-primary transition-colors">Projects</a>
            <a href="#diaries"  className="text-stone-600 hover:text-primary transition-colors">Diaries</a>
            <a href="#voices"  className="text-stone-600 hover:text-primary transition-colors">Voices</a>
            <a href="#access"  className="text-stone-600 hover:text-primary transition-colors">Access</a>
            <a
              href="#join"
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-200"
            >
              Join Us
            </a>
          </div>
          {/* Mobile menu hint */}
          <div className="md:hidden">
            <a
              href="#join"
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-headline font-bold text-sm"
            >
              Join Us
            </a>
          </div>
        </nav>
      </header>

      {/* Full-screen Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage.url}
            alt="里山シェアハウス・ハチソラハウスの風景"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white font-headline text-4xl md:text-6xl lg:text-7xl leading-tight font-black max-w-5xl whitespace-pre-wrap drop-shadow-lg">
            {title}
          </h1>
          <div className="mt-12 md:mt-20 animate-bounce">
            <span className="material-symbols-outlined text-white text-4xl">keyboard_double_arrow_down</span>
          </div>
        </div>
      </section>
    </>
  );
};
