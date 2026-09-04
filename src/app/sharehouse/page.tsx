/**
 * ALDEL FARM内のシェアハウス紹介ページ（「アルデルハウス」）
 * 各セクションはsrc/components/sharehouse/以下に切り出し済み
 * データはmicroCMSから取得し、未設定時はフォールバック値を使用する
 */

import { 
  getSiteGlobals,
  getSharehouseArticles
} from "@/libs/microcms";
import { SharehouseArticle } from "@/types/sharehouse-cms";
import { HeroSection } from "@/components/sharehouse/HeroSection";
import { ConceptSection } from "@/components/sharehouse/ConceptSection";
import { InstagramFeed } from "@/components/sharehouse/InstagramFeed";
import { VoiceList } from "@/components/sharehouse/VoiceList";
import { RecruitmentSection } from "@/components/sharehouse/RecruitmentSection";
import { CTASection } from "@/components/sharehouse/CTASection";

export const revalidate = 0; // キャッシュを無効化して常に最新のCMSデータを取得

export default async function SharehousePage() {
  // 1. 各種データの取得（並列実行）
  // 削除されたAPIが含まれる可能性があるため、個別にエラーハンドリングされている関数を使用
  const [globalsData, diariesData] = await Promise.all([
    getSiteGlobals(),
    getSharehouseArticles('diary', { limit: 5 })
  ]);

  // --- データのマッピングとフォールバック ---
  
  // ヒーロー画像の配列化
  const heroImages = Array.isArray(globalsData?.heroImage) 
    ? globalsData.heroImage 
    : (globalsData?.heroImage ? [globalsData.heroImage] : [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWYB1nuktR8iDjjUe-4cm8jAxzBtTp6yZt3qolxR9AOwa6WRTlqCQkej7rozeAJd1OQEssx0giUbC1WQ0LsmfJ2mvOqP8K42aTrXJKGPTT2YrH_iS51bRYmrONcBeZJW4iBLqUJkRn_y9lq10rrg1QrByhhdjYUWXjLXpNcxonW4dHMq2s-ui3fgrKql4xFTtEkT4bzDRBMoqzFHMGL816vpg8qVJnD93hF76GnwCrW0RaDXTMAmxAqhc-LphS0I1nFhtenMa5MyF" }
      ]);

  const hero = {
    title: globalsData?.heroTitle || "消費ベースから自給ベースへ、\n「生きる力」を育む里山シェアハウス。",
    backgroundImages: heroImages
  };

  const rawMenuItems = globalsData?.menuItems || [
    { label: "Concept", href: "#concept" },
    { label: "News", href: "#news" },
    { label: "Projects", href: "#projects" },
    { label: "Diaries", href: "#diaries" },
    { label: "Voices", href: "#voices" },
    { label: "Access", href: "#recruitment" },
  ];
  const menuItems = rawMenuItems
    .filter((item) => {
      const label = item.label.toLowerCase();
      const href = item.href.toLowerCase();
      return !(
        label.includes('news') || label.includes('latest') || label.includes('project') ||
        label.includes('join') || href.includes('/news') || href.includes('/projects') ||
        item.href === globalsData?.entryFormUrl || /(?:forms\.gle|docs\.google\.com\/forms)/i.test(item.href)
      );
    })
    .map((item) => {
      const label = item.label.toLowerCase();
      const href = item.href.toLowerCase();
      if (label.includes('diar') || href.includes('/diaries')) return { ...item, href: '#diaries' };
      if (label.includes('voice')) return { ...item, href: '#voices' };
      if (label.includes('information') || label.includes('access')) return { ...item, href: '#recruitment' };
      return item;
    });

  // コンセプト画像の配列化
  const polaroidImages = Array.isArray(globalsData?.conceptImage)
    ? globalsData.conceptImage
    : (globalsData?.conceptImage ? [globalsData.conceptImage] : [
        { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd0Wjqu3S2vx9G95TC2WDXk7d4cgiOyOPKPat91UPLFh9fcuSbtYKOaTQns9-hfgCwFk3M9RTTmL_kCEX5b1H-XxXR4O4smzzNkA-XurUKhVoNOxj3nz17w9O2BFhiZdCxJzmn_8WbTEoc-1fwbd3NmIOzEmDortSGADDKjvYvW-cuS_7r4CI9iOXKSgQBcp_bjlP2TboOTXRPOnI-V51o95q9KWqfvzmYKZjPIbM13MHA65K3jYEOjtnatFThrfcPSSyfn6v2S9-o" }
      ]);

  const concept = {
    handwrittenText: globalsData?.conceptHandText || "Secret Base for Outsiders",
    title: globalsData?.conceptTitle || "ここは、<br />消費者をやめる秘密基地。",
    description1: globalsData?.conceptDesc1 || "私たちの暮らしは, いつの間にか「買うこと」に依存しすぎてしまいました。食べるもの、住む場所、エネルギー。すべてを市場に委ねるのではなく、自分たちの手で生み出す手触りを取り戻す。",
    description2: globalsData?.conceptDesc2 || "兵庫県上郡町の豊かな里山で、私たちは「自給」をベースにした新しい共同生活のカタチを実験しています。泥にまみれ、火を焚き、命をいただく。そんな当たり前の営みの中にこそ、真の豊かさがあると信じています。",
    polaroidImages: polaroidImages,
    polaroidCaption: globalsData?.conceptCaption || "Dinner at the Kominka",
    stickerText: globalsData?.conceptSticker || "Handmade Life!"
  };

  // 日記APIを再利用し、instagramUrlを持つアイテムだけを抽出
  const instagramPosts = (diariesData?.contents || [])
    .filter((d: SharehouseArticle) => d.instagramUrl)
    .map((d: SharehouseArticle, index: number) => ({
      id: d.id || String(index + 1),
      instagramUrl: d.instagramUrl || "",
      title: d.title || ""
    }));

  const voices = (globalsData?.voices || []).map((v: any, index: number) => ({
    ...v, 
    id: v.id || String(index + 1)
  }));

  const recruitment = (globalsData?.recruitmentInfos || []).map((r: any, index: number) => ({
    ...r, 
    id: r.id || String(index + 1)
  }));

  // お問い合わせ窓口をLINEへ統一するため、サイト内の入力ページを使用
  const entryFormUrl = '/sharehouse/entry';

  // フォント設定の構築
  const fontStyles = {
    '--base-font-size': globalsData?.baseFontSize ? `${globalsData.baseFontSize}px` : '16px',
    '--font-family-body': globalsData?.fontFamilyBody ? (globalsData.fontFamilyBody.includes(',') ? globalsData.fontFamilyBody : `'${globalsData.fontFamilyBody}', sans-serif`) : undefined,
    '--font-family-headline': globalsData?.fontFamilyHeadline ? (globalsData.fontFamilyHeadline.includes(',') ? globalsData.fontFamilyHeadline : `'${globalsData.fontFamilyHeadline}', sans-serif`) : undefined,
    
    '--hero-size': globalsData?.pcFontSize?.heroTitleSizePc ? `${globalsData.pcFontSize.heroTitleSizePc}px` : '3rem',
    '--section-title-size': globalsData?.pcFontSize?.sectionTitleSizePc ? `${globalsData.pcFontSize.sectionTitleSizePc}px` : '2.25rem',
    '--body-text-size': globalsData?.pcFontSize?.bodyTextSizePc ? `${globalsData.pcFontSize.bodyTextSizePc}px` : '1rem',
    '--caption-text-size': globalsData?.pcFontSize?.captionTextSizePc ? `${globalsData.pcFontSize.captionTextSizePc}px` : '0.875rem',
    
    '--hero-size-sp': globalsData?.mobileFontSize?.heroTitleSizeSp ? `${globalsData.mobileFontSize.heroTitleSizeSp}px` : '1.75rem',
    '--section-title-size-sp': globalsData?.mobileFontSize?.sectionTitleSizeSp ? `${globalsData.mobileFontSize.sectionTitleSizeSp}px` : '1.5rem',
    '--body-text-size-sp': globalsData?.mobileFontSize?.bodyTextSizeSp ? `${globalsData.mobileFontSize.bodyTextSizeSp}px` : '0.9375rem',
    '--caption-text-size-sp': globalsData?.mobileFontSize?.captionTextSizeSp ? `${globalsData.mobileFontSize.captionTextSizeSp}px` : '0.8125rem',
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      {/* 
          microCMSからの設定を最優先で反映させるためのスタイル注入 
          !important を付与することで、既存のTailwindクラスやブラウザの最小フォント制限を上書きしやすくします。
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --base-font-size: ${fontStyles['--base-font-size']} !important;
          ${fontStyles['--font-family-body'] ? `--font-family-body: ${fontStyles['--font-family-body']} !important;` : ''}
          ${fontStyles['--font-family-headline'] ? `--font-family-headline: ${fontStyles['--font-family-headline']} !important;` : ''}
          
          --hero-size: ${fontStyles['--hero-size']} !important;
          --section-title-size: ${fontStyles['--section-title-size']} !important;
          --body-text-size: ${fontStyles['--body-text-size']} !important;
          --caption-text-size: ${fontStyles['--caption-text-size']} !important;
        }

        @media (max-width: 1023px) {
          :root {
            --hero-size: ${fontStyles['--hero-size-sp']} !important;
            --section-title-size: ${fontStyles['--section-title-size-sp']} !important;
            --body-text-size: ${fontStyles['--body-text-size-sp']} !important;
            --caption-text-size: ${fontStyles['--caption-text-size-sp']} !important;
          }
        }
      `}} />

      <HeroSection 
        title={hero.title} 
        backgroundImages={hero.backgroundImages} 
        menuItems={menuItems} 
        joinUsHref={entryFormUrl}
      />
      <ConceptSection {...concept} />
      <InstagramFeed posts={instagramPosts} limit={5} />
      <VoiceList voices={voices} />
      <RecruitmentSection items={recruitment} />
      <CTASection entryFormUrl={entryFormUrl} instagramUrl={globalsData?.instagramUrl} />
    </div>
  );
}
