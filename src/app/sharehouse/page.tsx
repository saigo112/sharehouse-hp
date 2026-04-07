/**
 * シェアハウス１/src/App.tsx を Next.js (App Router) 用に移植したLPページ
 * 変更点:
 * - export default function App() → export default function SharehousePage()
 * - 画像読み込みはGoogleの外部URLをそのまま使用（将来的にNext.js Imageコンポーネントへ移行を検討）
 * - font-headline / font-hand等のカスタムフォントはtailwind.config.tsで定義済み
 */

import { getLPData } from "@/libs/microcms";
import { LPData } from "@/types/microcms";

export default async function SharehousePage() {
  const data = await getLPData() as LPData | null;

  // 各セクションのデフォルト値（フォールバック）
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

  const projects = data?.projects || [
    {
      id: "1",
      title: "完全無農薬「ぴかまる」の栽培（笹山式メソッド）",
      description: "自然のサイクルを壊さない、不耕起草生栽培への挑戦。",
      image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMxA3l02CEP-oDrPMBSctO9pBYpSYFrDxn-z8qo0uA3a6fEc5VmgguAgGLpyTrWkwvekgeew9XcP3DJ1IFGd5lS_as_shKSPpcTPdjzYzx-dQwNPBZZBPRR39LP6eGqa82XtxZSQTV6aO2xM4sglOdAOZAOpiebwYWzuzR0OmJDsBY3ARkmkU0ICLIs3qVNEP-Q9eWU6jAdo5Iv_A6R667QUEMuJoa_4_jsxGCs5LgLgczczYKXy55tU3OyRfUYOEZz3FlDyJE-Fu5" },
      status: "進行中"
    },
    {
      id: "2",
      title: "狩猟と命の解体・精肉",
      description: "里山の生態系を守り、尊い命を最後までいただく学び。",
      image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPJBRHMNfOlwpU8lvcTNyb_GRRHWahaKR7SGImPg_Nna6-PevgoGwN5Ci17QrngRDZQ5_QqPy88G3aeNXO0Q3hcUA5creLCLQwaRl1VeY9G840GbKNHAiPTA9FFEPd0LJaM7hWsFahv-83rSdgpaPeaUqX07UCJ6lIuVWGEhZEAtNBeyVtiOh883SWGbs-_3vT3CkQ9nU4phIC-Qi6Zx0BlE3Mz9DDfhYy86ICEdkapsU2EZDPPFdl-1PPRmqRp5JH1PHug74kAoWk" },
      status: "進行中"
    },
    {
      id: "3",
      title: "獣害対策の本格鶏小屋と野菜作り",
      description: "鶏を家族に迎え、循環する庭園デザインを実践中。",
      image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1sH5Vw-uwUW3RoTP21GLlg4NiQOuUTrd_Bo0Hs0Sshcs11Y7Ds3hXEHmTuryT4IX4QO3bfDY0Lx0vxtKVYXfy9tJRRfDd3Zls9BWd_cSJsoX8cYb97sGoR2py2nLxFf41QB_5iqu0Xsn4d4fiooqzYD9kHUqZ9BKCH1tGNw66TrlgMilLdOLUUuQ8ucerrGlxj6CzDhknuwLMz4a2Om5Hrk6qt2DuVFBCTGUTu8-jRdgNRUe9KiX0EqhUu7mhAsH_mdBizmvtNjh3" },
      status: "進行中"
    }
  ];

  const diaries = data?.diaries || [
    { id: "1", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcu15G0ACV0UrXttF_aI4u91aV5oX5nfi_yhevzts6Mte-ZsRlMqnDQ9BvLvWKJ_7aDQdPSPVHOefMrjee-60t-si3vG_1jf4vO6lkq01QaLmKQdJ_kGwE4GOR4zE1fXeV9SOFFgmtpKb1AixnUhLTKQfd8XCL7sz3sqBrWW8eTZDZIoABzhyVCaq0_QR8j2rX-4PTLVYnS5Q0W0zgs8PcyDih_APskTWxSM43FYp7zRGiBMbtXzBvWoFOCz9AJe2meQjaf2imW7rs" }, caption: "Cement day! Hard work." },
    { id: "2", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeVGdfbcM7rWQeBO4ePjgV9bqOlq1fgL9cDKp7QvknZeKcIhFKUJRuSjd7RvD83pL8YDKFjxGou7hGqJXUsmP3EazfZSQAqEPi_n6VK2zancMgraycUxArMAN1hPi0oATtxSN8k-oABA1f7vcU2BUIufkWmSsX2WrtPXrxrszcQGwqlW3OwSijm0juCaMf3tTxPkxz_LnaagIY4uRnvkKfurYoJs_gSmCCqrGWKI-Ki8uZBKgbVeX6AxpPhoAMzMYArxmk0Rp2AY8B" }, caption: "Summer was tough..." },
    { id: "3", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBNKoaHe7k8nJxOvG3E-dQ9BNCfOYmjvnbmWxHlIPHVs2MeCX_rtlRlifllW5sHPndPhK_xGktD4pDBpT_UuG-QIuGYd6jVKZaCXeCp3hBBDI2N3uwhhtDKSO2BLlec1lM5ci99HFZu0QaT26IrVwyEOD_i0jIHQ9lDU-baqkYn7KvmlvPLo8-Ln36WXzMZJM4Zzza4FnZBbveb4CA52Wfr_hrqtpitHJSEOfwRLo2PahtOu07j3stGVh-d5Jr4Ti29xoDmcX1OuJC" }, caption: "The gift of the mountain." },
    { id: "4", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHWCINeNQQJhEWAeQ0VCmoG07Eigi4V5sghHoRVn-q_7Zq0biiIZKy1wi2__ZWwpC0M7CQo3oXQLyP6gDkxjkzOrpmHIeLll53MdRBokKGROh9SG0h3fbo9er8HVQUxdczCEW3PxEwTVoxIkZ7Uvx08Th5CjCMP6ATyWrsGcfEwjj8uEPtSSsGNA-T2MZcmXblpbkCUkapGBxstnoAjtS_u-0TCs5kkanNtQrrdbpjDpCbXnYMNY_9ZrW-YYvTkvHE6RwHnmTzptur" }, caption: "Dirty hands, full heart." },
    { id: "5", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuChm1-_COMtWiyfgs0MFXMjiF_xPvJEtX094ZIynv7EDyJi_MRWhugnu4s_zmBtuIJLOJ3PjeRJx2Vo3ofYnQEaQAn2c_gOzaIKQpS_KmEgV7hSXpkuDScjE_yXdoJ_xV_3oLfWeJUfocOyFvDpWCeMHYH1hsKSh_DQKg26T5Qiqlgd8udBJQG-pvg2IqninC7FuaQ5WfplZR9gBPz_FQHi_a0AU-cGBNtyRbVFX70ybpHlAGm2GgKxdQCv1bG3Ext90nsavAJETjwV" }, caption: "Morning mist in Hyogo." }
  ];

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

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      {/* TopNavBar */}
      <header className="docked full-width top-0 sticky z-50 bg-[#fbf9f6]/80 dark:bg-stone-900/80 backdrop-blur-md shadow-[0_2px_15px_rgba(86,66,62,0.05)]">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-[#9b3f2b] dark:text-[#c05a44] tracking-tighter font-headline">ハチソラハウス</div>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold text-sm tracking-tight">
            <a href="#concept" className="text-stone-600 dark:text-stone-400 hover:text-[#9b3f2b] transition-colors">Concept</a>
            <a href="#projects" className="text-stone-600 dark:text-stone-400 hover:text-[#9b3f2b] transition-colors">Projects</a>
            <a href="#diaries" className="text-stone-600 dark:text-stone-400 hover:text-[#9b3f2b] transition-colors">Diaries</a>
            <a href="#voices" className="text-stone-600 dark:text-stone-400 hover:text-[#9b3f2b] transition-colors">Voices</a>
            <a href="#access" className="text-stone-600 dark:text-stone-400 hover:text-[#9b3f2b] transition-colors">Access</a>
            <a href="#join" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 duration-200">
              Join Us
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.backgroundImage.url} alt="田んぼで稲を植えている若者たちの温かみのある写真" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white font-headline text-4xl md:text-6xl lg:text-7xl leading-tight font-black max-w-5xl whitespace-pre-wrap">
            {hero.title}
          </h1>
          <div className="mt-12 md:mt-20 animate-bounce">
            <span className="material-symbols-outlined text-white text-4xl">keyboard_double_arrow_down</span>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {concept.handwrittenText && (
              <div className="inline-block font-hand text-primary text-xl -rotate-3 mb-4">{concept.handwrittenText}</div>
            )}
            <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: concept.title }}>
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
              <p>{concept.description1}</p>
              <p>{concept.description2}</p>
            </div>
          </div>
              <div className="relative z-10 w-full max-w-sm md:max-w-md animate-float">
                <div className="relative aspect-[3/4] rotate-2 bg-surface-container-lowest p-4 pb-16 shadow-2xl transition-transform duration-500 hover:rotate-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={concept.polaroidImage?.url} alt={concept.polaroidCaption} className="w-full h-full object-cover rounded-sm grayscale-[0.2] sepia-[0.1]" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="font-hand text-on-surface text-lg">{concept.polaroidCaption}</p>
                  </div>
            </div>
            {/* Accent Sticker */}
            {concept.stickerText && (
              <div className="absolute -bottom-4 -left-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-hand font-bold -rotate-6 shadow-sm">
                {concept.stickerText}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Self-Sufficient Projects Section */}
      <section id="projects" className="py-24 bg-surface-container-low px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-headline font-black text-on-surface">Projects</h2>
              <p className="text-on-surface-variant mt-2">現在進行中の自給自足プロジェクト</p>
            </div>
            <div className="text-primary font-hand text-xl">Work with your hands...</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div key={project.id} className={`bg-surface-container-lowest p-4 pb-12 rounded-sm shadow-[0_5px_15px_rgba(86,66,62,0.05)] ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 transition-transform duration-300`}>
                <div className="relative mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image?.url} alt={project.title} className="w-full aspect-square object-cover rounded-sm" />
                  <span className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-hand text-sm font-bold shadow-sm">{project.status}</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface px-2">{project.title}</h3>
                <p className="mt-4 text-on-surface-variant px-2 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story & Diaries Section */}
      <section id="diaries" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl font-headline font-black text-on-surface text-center">Daily Diaries</h2>
          <p className="text-center font-hand text-primary mt-2 text-xl">The real, unedited life...</p>
        </div>
        
        <div className="flex overflow-x-auto pb-12 px-12 gap-8 no-scrollbar scroll-smooth">
          {diaries.map((diary, index) => {
            const rotations = ['-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1', '-rotate-3'];
            const rotation = rotations[index % rotations.length];
            return (
              <div key={diary.id} className={`flex-shrink-0 w-64 bg-surface-container-lowest p-3 pb-8 rounded-sm shadow-sm transition-transform duration-300 hover:scale-105 ${index % 2 === 0 ? 'rotate-2' : '-rotate-1'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={diary.image?.url} alt={diary.caption} className="w-full aspect-square object-cover mb-4 rounded-sm border-[10px] border-surface-container-lowest shadow-inner" />
                <p className="font-hand text-on-surface text-center px-2 line-clamp-2">{diary.caption}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Voices of Residents Section */}
      <section id="voices" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary-container/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 relative">
            <span className="inline-block font-hand text-primary text-2xl mb-2 rotate-2">Voices of Villagers</span>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface">住人の声</h2>
            <div className="w-24 h-1.5 bg-secondary-container mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-12 items-start">
            {voices.map((voice, index) => {
              const styles = [
                { rotate: '-rotate-2', margin: '', tape: 'absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 washi-tape -rotate-3 z-20' },
                { rotate: 'rotate-3', margin: 'mt-8 lg:mt-16', tape: 'absolute top-2 left-1/3 -translate-y-1/2 w-20 h-8 washi-tape rotate-6 z-20 opacity-80' },
                { rotate: '-rotate-1', margin: 'mt-0 lg:mt-4', tape: 'absolute bottom-10 right-2 w-24 h-8 washi-tape rotate-45 z-20 opacity-60' }
              ];
              const style = styles[index % styles.length];
              return (
                <div key={voice.id} className={`relative group ${style.margin}`}>
                  <div className={`bg-white p-4 pb-20 shadow-xl ${style.rotate} group-hover:rotate-0 transition-transform duration-500 relative z-10`}>
                    <div className="flex-shrink-0 w-24 h-24 mb-6 md:mb-0 md:mr-8 md:-rotate-3 translate-x-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={voice.image?.url} alt={voice.name} className="w-full h-full object-cover rounded-sm border-4 border-surface shadow-md" />
                  </div>
                  <div className="px-2">
                      <span className="font-hand text-primary text-sm font-bold block mb-1">{voice.name} ({voice.profession})</span>
                      <p className="font-bold text-lg leading-snug mb-4" dangerouslySetInnerHTML={{ __html: voice.quote }}>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recruitment Info Section */}
      <section id="access" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-headline font-black text-on-surface mb-12 text-center">Recruitment Info</h2>
          
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-[rgba(220,192,186,0.15)]">
            <div className="grid grid-cols-1 divide-y divide-[rgba(220,192,186,0.15)]">
              {recruitment.map((item, index) => (
                <div key={item.id} className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'bg-surface-container-low' : ''}`}>
                  <div className="md:w-1/3 bg-surface-container px-8 py-6 font-headline font-bold text-primary flex items-center">{item.label}</div>
                  <div className="md:w-2/3 px-8 py-6 text-on-surface-variant">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="font-hand text-primary text-lg italic">&quot;We are waiting for you, fellow villager.&quot;</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="join" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyYKHcRfDIXuE-y03ZplImevO5CjsqB093TLKRVURstpztDpk6-ZlEZWM-NJazzFwkEUUtq7Cq0MHf-UVO9e_IOoTRXKQKy8nIJWl39x8erJQ7Dk8hIbmP0r-F0vhMXYqHDd6GIRl7hz7KVZOS5DiOy71j5bfQAnK4X8hy69-KwmnicNdlnVaCLkaOAEw6p1_o_AtpI-VmBtPqobRj0O22cwHPsP9Y0FhuNq2LmAiACQBYIMQVjbvoUcKzApBBMljJsfIBR5C9niwP" alt="夕暮れの農地と山のパノラマビュー" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-white text-3xl md:text-5xl font-headline font-black mb-12 leading-tight">
            一緒に自給自足の里山を再生する<br />「村人」になりませんか？
          </h2>
          <a href="#" className="inline-flex items-center gap-4 bg-secondary-container text-on-secondary-container px-12 py-6 rounded-xl font-headline font-black text-2xl hover:scale-105 transition-transform duration-300 shadow-xl group">
            エントリーフォームへ進む
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f3f0] py-12 border-t border-[rgba(220,192,186,0.15)]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-6 max-w-7xl mx-auto">
          <div className="text-on-surface-variant font-hand text-lg">ハチソラハウス - Hachisora House</div>
          <div className="flex gap-8 font-body text-xs uppercase tracking-widest text-stone-500">
            <a href="#" className="hover:text-[#9b3f2b] hover:underline decoration-[#9b3f2b] underline-offset-4">Privacy Policy</a>
            <a href="#" className="hover:text-[#9b3f2b] hover:underline decoration-[#9b3f2b] underline-offset-4">Contact</a>
            <a href="#" className="hover:text-[#9b3f2b] hover:underline decoration-[#9b3f2b] underline-offset-4">Instagram</a>
          </div>
          <p className="font-body text-xs uppercase tracking-widest text-stone-500">© 2024 Hachisora House. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
}
