import type { Metadata } from "next";
import Link from "next/link";
import { SharehouseEntryForm } from "@/components/sharehouse/SharehouseEntryForm";
import { getFarmSiteGlobals } from "@/libs/farm-microcms";

export const metadata: Metadata = {
  title: "入居・内覧について相談する | アルデルハウス",
  description: "アルデルハウスへの入居・内覧について、希望内容をまとめてLINE公式アカウントへ相談できます。",
};

export const revalidate = 60;

export default async function SharehouseEntryPage() {
  const globals = await getFarmSiteGlobals();
  const lineOfficialId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || globals?.lineOfficialId || "@844kyxqq";
  const normalizedLineId = lineOfficialId.startsWith("@") ? lineOfficialId : `@${lineOfficialId}`;
  const lineFriendUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || globals?.lineOfficialUrl || `https://line.me/R/ti/p/${encodeURIComponent(normalizedLineId)}`;

  return (
    <div className="min-h-screen bg-[#f6f2ec] text-on-surface">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f6f2ec]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/sharehouse" className="font-headline text-lg font-black text-primary md:text-xl">アルデルハウス</Link>
          <Link href="/sharehouse" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined text-lg" aria-hidden>arrow_back</span>
            シェアハウスへ戻る
          </Link>
        </div>
      </header>

      <main>
        <section className="px-5 pb-12 pt-14 md:px-8 md:pb-16 md:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-hand text-primary">Entry & viewing</p>
            <h1 className="mt-4 font-headline text-3xl font-black leading-tight md:text-5xl">アルデルハウスへの<br className="sm:hidden" />入居・内覧を相談する</h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-on-surface-variant md:text-base">必要事項を入力すると、相談内容をLINE公式アカウントのメッセージへ引き継げます。この画面だけでは送信されません。</p>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-4xl">
            <SharehouseEntryForm lineOfficialId={normalizedLineId} lineFriendUrl={lineFriendUrl} />
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-stone-500 md:flex-row">
          <span>アルデルハウス - Al Del House</span>
          <div className="flex gap-6">
            <Link href="/sharehouse/privacy" className="hover:text-primary">Privacy Policy</Link>
            <a href={lineFriendUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LINE</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
