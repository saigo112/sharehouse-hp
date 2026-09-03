import { Metadata } from 'next';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { getSiteGlobals } from '@/libs/microcms';
import { SharehouseSiteGlobals } from '@/types/sharehouse-cms';

export const metadata: Metadata = {
  title: 'コンセプト詳細 | アルデルハウス',
  description: 'アルデルハウスが大切にしている想いや、暮らしのコンセプトを詳しくご紹介します。',
};

export default async function ConceptDetailPage() {
  const { isEnabled } = draftMode();
  const data = await getSiteGlobals({ preview: isEnabled });

  const richText = data?.conceptDetail || '';

  return (
    <div className="min-h-screen bg-background text-on-surface font-body px-6 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 md:mb-20">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand text-lg">ホームに戻る</span>
          </Link>
          
          <div className="relative">
            <div className="inline-block font-hand text-primary text-2xl -rotate-2 mb-4">
              Detailed Story
            </div>
            <h1 
              className="text-4xl md:text-6xl font-headline font-black text-on-surface leading-tight"
              dangerouslySetInnerHTML={{ 
                __html: data?.conceptDetailTitle || '' 
              }}
            />
          </div>
        </header>

        <main className="concept-rich-text">
          <div dangerouslySetInnerHTML={{ __html: richText }} />
        </main>

        <footer className="mt-24 pt-12 border-t border-surface-container text-center">
          <p className="font-hand text-2xl text-primary -rotate-2 mb-8">
            Let's build a handmade life together!
          </p>
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
          >
            ホームへ戻る
          </Link>
        </footer>
      </div>
    </div>
  );
}
