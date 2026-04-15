/**
 * シェアハウス募集ランディングページ（「ハチソラハウス」）
 * 各セクションはsrc/components/sharehouse/以下に切り出し済み
 * データはmicroCMSから取得し、未設定時はフォールバック値を使用する
 */

import { getLPData } from "@/libs/microcms";
import { LPData } from "@/types/microcms";
import { HeroSection } from "@/components/sharehouse/HeroSection";
import { ConceptSection } from "@/components/sharehouse/ConceptSection";
import { ProjectList } from "@/components/sharehouse/ProjectList";
import { DiaryList } from "@/components/sharehouse/DiaryList";
import { VoiceList } from "@/components/sharehouse/VoiceList";
import { RecruitmentSection } from "@/components/sharehouse/RecruitmentSection";
import { CTASection } from "@/components/sharehouse/CTASection";

export default async function SharehousePage() {
  const data = await getLPData() as LPData | null;

  // --- フォールバックデータ ---
  const hero = {
    title: data?.heroTitle || "消費ベースから自給ベースへ、\n「生きる力」を育む里山シェアハウス。",
    backgroundImage: data?.heroImage || { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWYB1nuktR8iDjjUe-4cm8jAxzBtTp6yZt3qolxR9AOwa6WRTlqCQkej7rozeAJd1OQEssx0giUbC1WQ0LsmfJ2mvOqP8K42aTrXJKGPTT2YrH_iS51bRYmrONcBeZJW4iBLqUJkRn_y9lq10rrg1QrByhhdjYUWXjLXpNcxonW4dHMq2s-ui3fgrKql4xFTtEkT4bzDRBMoqzFHMGL816vpg8qVJnD93hF76GnwCrW0RaDXTMAmxAqhc-LphS0I1nFhtenMa5MyF" }
  };

  const concept = {
    handwrittenText: data?.conceptHandText || "Secret Base for Outsiders",
    title: data?.conceptTitle || "ここは、<br />消費者をやめる秘密基地。",
    description1: data?.conceptDesc1 || "私たちの暮らしは, いつの間にか「買うこと」に依存しすぎてしまいました。食べるもの、住む場所、エネルギー。すべてを市場に委ねるのではなく、自分たちの手で生み出す手触りを取り戻す。",
    description2: data?.conceptDesc2 || "兵庫県上郡町の豊かな里山で、私たちは「自給」をベースにした新しい共同生活のカタチを実験しています。泥にまみれ、火を焚き、命をいただく。そんな当たり前の営みの中にこそ、真の豊かさがあると信じています。",
    polaroidImage: data?.conceptImage || { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd0Wjqu3S2vx9G95TC2WDXk7d4cgiOyOPKPat91UPLFh9fcuSbtYKOaTQns9-hfgCwFk3M9RTTmL_kCEX5b1H-XxXR4O4smzzNkA-XurUKhVoNOxj3nz17w9O2BFhiZdCxJzmn_8WbTEoc-1fwbd3NmIOzEmDortSGADDKjvYvW-cuS_7r4CI9iOXKSgQBcp_bjlP2TboOTXRPOnI-V51o95q9KWqfvzmYKZjPIbM13MHA65K3jYEOjtnatFThrfcPSSyfn6v2S9-o" },
    polaroidCaption: data?.conceptCaption || "Dinner at the Kominka",
    stickerText: data?.conceptSticker || "Handmade Life!"
  };

  const projects = (data?.projects || [
    { id: "1", title: "完全無農薬「ぴかまる」の栽培（笹山式メソッド）", description: "自然のサイクルを壊さない、不耕起草生栽培への挑戦。", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMxA3l02CEP-oDrPMBSctO9pBYpSYFrDxn-z8qo0uA3a6fEc5VmgguAgGLpyTrWkwvekgeew9XcP3DJ1IFGd5lS_as_shKSPpcTPdjzYzx-dQwNPBZZBPRR39LP6eGqa82XtxZSQTV6aO2xM4sglOdAOZAOpiebwYWzuzR0OmJDsBY3ARkmkU0ICLIs3qVNEP-Q9eWU6jAdo5Iv_A6R667QUEMuJoa_4_jsxGCs5LgLgczczYKXy55tU3OyRfUYOEZz3FlDyJE-Fu5" }, status: "進行中" },
    { id: "2", title: "狩猟と命の解体・精肉", description: "里山の生態系を守り、尊い命を最後までいただく学び。", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPJBRHMNfOlwpU8lvcTNyb_GRRHWahaKR7SGImPg_Nna6-PevgoGwN5Ci17QrngRDZQ5_QqPy88G3aeNXO0Q3hcUA5creLCLQwaRl1VeY9G840GbKNHAiPTA9FFEPd0LJaM7hWsFahv-83rSdgpaPeaUqX07UCJ6lIuVWGEhZEAtNBeyVtiOh883SWGbs-_3vT3CkQ9nU4phIC-Qi6Zx0BlE3Mz9DDfhYy86ICEdkapsU2EZDPPFdl-1PPRmqRp5JH1PHug74kAoWk" }, status: "進行中" },
    { id: "3", title: "獣害対策の本格鶏小屋と野菜作り", description: "鶏を家族に迎え、循環する庭園デザインを実践中。", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1sH5Vw-uwUW3RoTP21GLlg4NiQOuUTrd_Bo0Hs0Sshcs11Y7Ds3hXEHmTuryT4IX4QO3bfDY0Lx0vxtKVYXfy9tJRRfDd3Zls9BWd_cSJsoX8cYb97sGoR2py2nLxFf41QB_5iqu0Xsn4d4fiooqzYD9kHUqZ9BKCH1tGNw66TrlgMilLdOLUUuQ8ucerrGlxj6CzDhknuwLMz4a2Om5Hrk6qt2DuVFBCTGUTu8-jRdgNRUe9KiX0EqhUu7mhAsH_mdBizmvtNjh3" }, status: "進行中" }
  ]).map((p, index) => ({ ...p, id: p.id || String(index + 1) }));

  const diaries = (data?.diaries || [
    { id: "1", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcu15G0ACV0UrXttF_aI4u91aV5oX5nfi_yhevzts6Mte-ZsRlMqnDQ9BvLvWKJ_7aDQdPSPVHOefMrjee-60t-si3vG_1jf4vO6lkq01QaLmKQdJ_kGwE4GOR4zE1fXeV9SOFFgmtpKb1AixnUhLTKQfd8XCL7sz3sqBrWW8eTZDZIoABzhyVCaq0_QR8j2rX-4PTLVYnS5Q0W0zgs8PcyDih_APskTWxSM43FYp7zRGiBMbtXzBvWoFOCz9AJe2meQjaf2imW7rs" }, caption: "Cement day! Hard work." },
    { id: "2", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeVGdfbcM7rWQeBO4ePjgV9bqOlq1fgL9cDKp7QvknZeKcIhFKUJRuSjd7RvD83pL8YDKFjxGou7hGqJXUsmP3EazfZSQAqEPi_n6VK2zancMgraycUxArMAN1hPi0oATtxSN8k-oABA1f7vcU2BUIufkWmSsX2WrtPXrxrszcQGwqlW3OwSijm0juCaMf3tTxPkxz_LnaagIY4uRnvkKfurYoJs_gSmCCqrGWKI-Ki8uZBKgbVeX6AxpPhoAMzMYArxmk0Rp2AY8B" }, caption: "Summer was tough..." },
    { id: "3", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBNKoaHe7k8nJxOvG3E-dQ9BNCfOYmjvnbmWxHlIPHVs2MeCX_rtlRlifllW5sHPndPhK_xGktD4pDBpT_UuG-QIuGYd6jVKZaCXeCp3hBBDI2N3uwhhtDKSO2BLlec1lM5ci99HFZu0QaT26IrVwyEOD_i0jIHQ9lDU-baqkYn7KvmlvPLo8-Ln36WXzMZJM4Zzza4FnZBbveb4CA52Wfr_hrqtpitHJSEOfwRLo2PahtOu07j3stGVh-d5Jr4Ti29xoDmcX1OuJC" }, caption: "The gift of the mountain." },
    { id: "4", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHWCINeNQQJhEWAeQ0VCmoG07Eigi4V5sghHoRVn-q_7Zq0biiIZKy1wi2__ZWwpC0M7CQo3oXQLyP6gDkxjkzOrpmHIeLll53MdRBokKGROh9SG0h3fbo9er8HVQUxdczCEW3PxEwTVoxIkZ7Uvx08Th5CjCMP6ATyWrsGcfEwjj8uEPtSSsGNA-T2MZcmXblpbkCUkapGBxstnoAjtS_u-0TCs5kkanNtQrrdbpjDpCbXnYMNY_9ZrW-YYvTkvHE6RwHnmTzptur" }, caption: "Dirty hands, full heart." },
    { id: "5", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuChm1-_COMtWiyfgs0MFXMjiF_xPvJEtX094ZIynv7EDyJi_MRWhugnu4s_zmBtuIJLOJ3PjeRJx2Vo3ofYnQEaQAn2c_gOzaIKQpS_KmEgV7hSXpkuDScjE_yXdoJ_xV_3oLfWeJUfocOyFvDpWCeMHYH1hsKSh_DQKg26T5Qiqlgd8udBJQG-pvg2IqninC7FuaQ5WfplZR9gBPz_FQHi_a0AU-cGBNtyRbVFX70ybpHlAGm2GgKxdQCv1bG3Ext90nsavAJETjwV" }, caption: "Morning mist in Hyogo." }
  ]).map((d, index) => ({ ...d, id: d.id || String(index + 1) }));

  const voices = data?.voices || [
    { id: "1", name: "Kenji", profession: "IT worker turned farmer", quote: "「スーパーの米より、自分で育てた<span class=\"marker-underline-terracotta\">泥だらけの米の方が100倍旨い。</span>」", image: { url: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400&h=400&fit=crop" } },
    { id: "2", name: "Mio", profession: "City girl turned chicken keeper", quote: "「命をいただく重みを知って、毎日の食卓に<span class=\"marker-underline\">感謝が溢れる</span>ようになりました。」", image: { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=400&fit=crop" } },
    { id: "3", name: "Riku", profession: "Artist turned hunter", quote: "「森に入ると、研ぎ澄まされる感覚。消費するだけでは得られない<span class=\"marker-underline-terracotta\">『生きる実感』</span>があります。」", image: { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" } }
  ];

  const recruitment = data?.recruitment || [
    { id: "1", label: "所在地", value: "兵庫県赤穂郡上郡町 八保地区金内" },
    { id: "2", label: "家賃・諸経費", value: "月額 3.5万円〜（光熱費・共益費込 / 自給米支給あり）" },
    { id: "3", label: "共有設備", value: "薪風呂、共同キッチン、畑、鶏小屋、工作スペース" },
    { id: "4", label: "募集対象", value: "自給自足に興味がある方、DIYが好きな方、コミュニティを共に作れる方" }
  ];

  // エントリーフォームURL: microCMS > 環境変数 > ハードコードの優先順位
  const entryFormUrl =
    data?.entryFormUrl ||
    process.env.NEXT_PUBLIC_ENTRY_FORM_URL ||
    'https://forms.gle/K6DDGNf2BxNEGZLH9';

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <HeroSection title={hero.title} backgroundImage={hero.backgroundImage} />
      <ConceptSection {...concept} />
      <ProjectList projects={projects} />
      <DiaryList diaries={diaries} />
      <VoiceList voices={voices} />
      <RecruitmentSection items={recruitment} />
      <CTASection entryFormUrl={entryFormUrl} />
    </div>
  );
}
