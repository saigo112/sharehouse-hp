import React from 'react';
import Link from 'next/link';
import { getSiteGlobals } from '@/libs/microcms';

export default async function PrivacyPolicyPage() {
  const globalsData = await getSiteGlobals();
  const lineOfficialId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || globalsData?.lineOfficialId || '@844kyxqq';
  const normalizedLineId = lineOfficialId.startsWith('@') ? lineOfficialId : `@${lineOfficialId}`;
  const lineFriendUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || globalsData?.lineOfficialUrl || `https://line.me/R/ti/p/${encodeURIComponent(normalizedLineId)}`;

  // フォント設定の構築 (他のページと同様の仕組み)
  const fontStyles = {
    '--base-font-size': globalsData?.baseFontSize ? `${globalsData.baseFontSize}px` : '16px',
    '--hero-size': globalsData?.pcFontSize?.heroTitleSizePc ? `${globalsData.pcFontSize.heroTitleSizePc}px` : '3rem',
    '--section-title-size': globalsData?.pcFontSize?.sectionTitleSizePc ? `${globalsData.pcFontSize.sectionTitleSizePc}px` : '2.25rem',
    '--body-text-size': globalsData?.pcFontSize?.bodyTextSizePc ? `${globalsData.pcFontSize.bodyTextSizePc}px` : '1rem',
    '--caption-text-size': globalsData?.pcFontSize?.captionTextSizePc ? `${globalsData.pcFontSize.captionTextSizePc}px` : '0.875rem',
  } as Record<string, string | undefined>;

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --base-font-size: ${fontStyles['--base-font-size']} !important;
          --section-title-size: ${fontStyles['--section-title-size']} !important;
          --body-text-size: ${fontStyles['--body-text-size']} !important;
        }
      `}} />

      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand">トップに戻る</span>
          </Link>
          <h1 
            className="font-headline font-black text-on-surface leading-tight"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            プライバシーポリシー
          </h1>
        </header>

        <main className="prose prose-stone max-w-none text-on-surface-variant leading-relaxed space-y-8" style={{ fontSize: 'var(--body-text-size)' }}>
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">1. 個人情報の収集について</h2>
            <p>
              アルデルハウス（以下「当ハウス」）は、お問い合わせや入居申し込み、イベントへの参加申し込みの際、氏名、メールアドレス、電話番号などの個人情報を収集する場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">2. 個人情報の利用目的</h2>
            <p>
              収集した個人情報は、以下の目的でのみ利用いたします。
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>お問い合わせへの回答および資料の送付</li>
              <li>入居に関する審査および連絡</li>
              <li>当ハウスが主催するイベントや活動に関する案内の送付</li>
              <li>当ハウスの運営・管理に必要な事務手続き</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">3. 個人情報の第三者提供について</h2>
            <p>
              当ハウスは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">4. 個人情報の管理について</h2>
            <p>
              当ハウスは、お預かりした個人情報を適切かつ安全に管理し、不正アクセス、紛失、改ざん、漏えいなどの防止に努めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">5. 個人情報の照会・訂正・削除について</h2>
            <p>
              ご本人から個人情報の照会、訂正、削除などの依頼があった場合は、ご本人であることを確認した上で、速やかに対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">6. プライバシーポリシーの変更</h2>
            <p>
              当ハウスは、必要に応じて本ポリシーの内容を変更することがあります。変更した内容は、当ウェブサイト上で速やかに公表いたします。
            </p>
          </section>

          <section className="pt-8 border-t border-outline-variant/30">
            <h2 className="text-xl font-bold text-on-surface mb-4">お問い合わせ先</h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、<a href={lineFriendUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline underline-offset-4">ALDEL FARM LINE公式アカウント</a>よりご連絡ください。
            </p>
          </section>
        </main>

        <footer className="mt-20 pt-12 border-t border-surface-container text-center">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
          >
            トップページへ
          </Link>
        </footer>
      </div>
    </div>
  );
}
