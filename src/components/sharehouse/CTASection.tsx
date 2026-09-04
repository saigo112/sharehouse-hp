import React from 'react';
import Link from 'next/link';

const CTA_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDyYKHcRfDIXuE-y03ZplImevO5CjsqB093TLKRVURstpztDpk6-ZlEZWM-NJazzFwkEUUtq7Cq0MHf-UVO9e_IOoTRXKQKy8nIJWl39x8erJQ7Dk8hIbmP0r-F0vhMXYqHDd6GIRl7hz7KVZOS5DiOy71j5bfQAnK4X8hy69-KwmnicNdlnVaCLkaOAEw6p1_o_AtpI-VmBtPqobRj0O22cwHPsP9Y0FhuNq2LmAiACQBYIMQVjbvoUcKzApBBMljJsfIBR5C9niwP';

interface CTASectionProps {
  entryFormUrl: string;
}

/**
 * CTAセクションとフッターの複合コンポーネント
 * - サイト内の入力ページからLINE公式アカウントへ相談内容を引き継ぐ
 */
export const CTASection: React.FC<CTASectionProps> = ({ entryFormUrl }) => {
  return (
    <>
      {/* CTA Section */}
      <section id="join" className="relative py-12 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CTA_IMAGE_URL}
            alt="夕暮れの農地と山のパノラマビュー"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-white text-base md:text-4xl font-headline font-black mb-12 leading-tight drop-shadow-md">
            一緒に自給自足の里山を再生する<br />「村人」になりませんか？
          </h2>

          <Link
            href={entryFormUrl}
            className="inline-flex items-center gap-3 bg-secondary-container text-on-secondary-container px-6 py-4 md:px-12 md:py-6 rounded-xl font-headline font-black text-sm md:text-base hover:scale-105 transition-transform duration-300 shadow-xl group whitespace-nowrap"
          >
            エントリーフォームへ進む
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low py-12 border-t border-outline-variant/15">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-6 max-w-7xl mx-auto">
          <div className="text-on-surface-variant font-hand text-lg">
            アルデルハウス - Al Del House
          </div>
          <div className="flex gap-8 font-body text-xs uppercase tracking-widest text-stone-500">
            <Link href="/sharehouse/privacy" className="hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about#contact" className="hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors">
              Contact / LINE
            </Link>
            <a href="#" className="hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors">
              Instagram
            </a>
          </div>
          <p className="font-body text-xs uppercase tracking-widest text-stone-500">
            © 2025 Al Del House. Crafted with care.
          </p>
        </div>
      </footer>
    </>
  );
};
