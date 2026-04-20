/**
 * シェアハウス募集ランディングページ（「ハチソラハウス」）
 * 各セクションはsrc/components/sharehouse/以下に切り出し済み
 * データはmicroCMSから取得し、未設定時はフォールバック値を使用する
 */

import { 
  getSiteGlobals,
  getSharehouseProjects, 
  getSharehouseArticles
} from "@/libs/microcms";
import { 
  SharehouseProject, 
  SharehouseArticle 
} from "@/types/sharehouse-cms";
import { HeroSection } from "@/components/sharehouse/HeroSection";
import { ConceptSection } from "@/components/sharehouse/ConceptSection";
import { NewsSection } from "@/components/sharehouse/NewsSection";
import { ProjectList } from "@/components/sharehouse/ProjectList";
import { DiaryList } from "@/components/sharehouse/DiaryList";
import { VoiceList } from "@/components/sharehouse/VoiceList";
import { RecruitmentSection } from "@/components/sharehouse/RecruitmentSection";
import { CTASection } from "@/components/sharehouse/CTASection";

export default async function SharehousePage() {
  // 1. 各種データの取得（並列実行）
  const [globalsData, projectsData, diariesData, newsData] = await Promise.all([
    getSiteGlobals(),
    getSharehouseProjects({ limit: 3 }),
    getSharehouseArticles('diary', { limit: 5 }),
    getSharehouseArticles('news', { limit: 3 })
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

  const menuItems = globalsData?.menuItems || [
    { label: "Concept", href: "#concept" },
    { label: "News", href: "#news" },
    { label: "Projects", href: "#projects" },
    { label: "Diaries", href: "#diaries" },
    { label: "Voices", href: "#voices" },
    { label: "Access", href: "#recruitment" },
  ];

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

  const projects = (projectsData?.contents || []).map((p: SharehouseProject, index: number) => ({
    id: p.id || String(index + 1),
    title: p.title,
    description: p.summary || p.body || "",
    image: p.mainVisual || { url: "" },
    status: p.status || "進行中",
    content: p.body || ""
  }));

  const diaries = (diariesData?.contents || []).map((d: SharehouseArticle, index: number) => ({
    id: d.id || String(index + 1),
    image: d.mainVisual || { url: "" },
    caption: d.title || "",
    content: d.body || "",
    instagramUrl: d.instagramUrl || ""
  }));

  const news = (newsData?.contents || []);

  const voices = (globalsData?.voices || []).map((v: any, index: number) => ({
    ...v, 
    id: v.id || String(index + 1)
  }));

  const recruitment = (globalsData?.recruitmentInfos || []).map((r: any, index: number) => ({
    ...r, 
    id: r.id || String(index + 1)
  }));

  // エントリーフォームURL
  const entryFormUrl =
    globalsData?.entryFormUrl ||
    process.env.NEXT_PUBLIC_ENTRY_FORM_URL ||
    'https://forms.gle/K6DDGNf2BxNEGZLH9';

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <HeroSection title={hero.title} backgroundImages={hero.backgroundImages} menuItems={menuItems} joinUsHref={entryFormUrl} />
      <ConceptSection {...concept} />
      <NewsSection articles={news} />
      <ProjectList projects={projects} limit={3} />
      <DiaryList diaries={diaries} limit={5} />
      <VoiceList voices={voices} />
      <RecruitmentSection items={recruitment} />
      <CTASection entryFormUrl={entryFormUrl} />
    </div>
  );
}
