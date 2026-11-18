/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { FarmArticle, FarmSiteGlobals } from "@/types/farm-cms";
import { getLineOfficialUrl } from "@/libs/line-official";
import { FarmHomeInteractions, MobileFarmMenu } from "./FarmHomeInteractions";
import "./farm-home.css";

const HERO_FALLBACK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWYB1nuktR8iDjjUe-4cm8jAxzBtTp6yZt3qolxR9AOwa6WRTlqCQkej7rozeAJd1OQEssx0giUbC1WQ0LsmfJ2mvOqP8K42aTrXJKGPTT2YrH_iS51bRYmrONcBeZJW4iBLqUJkRn-y9lq10rrg1QrByhhdjYUWXjLXpNcxonW4dHMq2s-ui3fgrKql4xFTtEkT4bzDRBMoqzFHMGL816vpg8qVJnD93hF76GnwCrW0RaDXTMAmxAqhc-LphS0I1nFhtenMa5MyF";

function FarmHeader({ lineUrl }: { lineUrl: string }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="アルデルファーム トップへ">
          <span className="brand-seal">稲</span>
          <span>
            <span className="brand-english">ALDEL FARM</span>
            <span className="brand-sub">暮らしをつくる、里山の農園</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="メインナビゲーション">
          <a href="#philosophy">私の原点</a>
          <a href="#story">私とお米の物語</a>
          <a href="#kanahe">金瓮米</a>
          <a href="#life">日々の記録</a>
          <a href="#community">暮らしと仲間</a>
          <a
            className="nav-cta"
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            お米を注文する ↗
          </a>
        </nav>
        <MobileFarmMenu lineUrl={lineUrl} />
      </div>
    </header>
  );
}

function FarmHero({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-kicker">ALDEL FARM / OUR LIFE & RICE</div>
        <h1 id="hero-title" className="serif">
          <span>生きることを、</span>
          <span>もっと</span>
          <span>味わい深く。</span>
        </h1>
        <p className="hero-lead">
          自分の手で暮らしをつくることから、世界の見え方が変わりはじめた。兵庫県上郡町の里山で、お米とともに歩む私の物語です。
        </p>
        <div className="hero-actions">
          <a className="arrow-link" href="#story">
            <span>私とお米の物語を読む</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="arrow-link" href="#kanahe">
            <span>金瓮米について</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <img src={imageUrl} alt="" />
        <div className="hero-caption">
          <span>暮らしをつくる、という選択。</span>
          <strong>KANAE / HARIMA</strong>
        </div>
      </div>
    </section>
  );
}

function FarmStory() {
  return (
    <>
      <section className="philosophy" id="philosophy">
        <div className="container philosophy-inner">
          <div>
            <div className="philosophy-label">THE WAY WE LIVE</div>
            <h2 className="serif">
              あるもんで、つくる。
              <br />
              でるもんで、まわす。
            </h2>
          </div>
          <div className="philosophy-copy">
            <p>
              私が探していたのは、便利さを捨てた暮らしではありません。
              <br />
              当たり前に手にしていたものを、自ら生み出す経験のなかで、生きることをもっと深く味わってみたかったのです。
            </p>
            <p>
              この土地で受け取った知恵や道具、人とのご縁を生かしながら、今あるものから暮らしをつくっていく。その営みがお米づくりにつながっています。
            </p>
            <div className="philosophy-row">
              <span>受け取る</span>
              <span>つくる</span>
              <span>分かち合う</span>
              <span>次へ渡す</span>
            </div>
          </div>
        </div>
      </section>
      <section className="story-wrap container" id="story">
        <div className="section-heading">
          <div>
            <div className="eyebrow">MY STORY / FOUR CHAPTERS</div>
            <h2>私と、田んぼの物語。</h2>
          </div>
          <p className="section-aside">
            都会で感じた小さな違和感から、季節に暮らしを委ねる毎日へ。なぜ私が米づくりをするのか、その理由を綴りました。
          </p>
        </div>
        <div className="chapter">
          <div className="chapter-number">01</div>
          <div className="chapter-body">
            <div className="eyebrow">ORIGIN / 原点</div>
            <h3>
              便利な暮らしのなかで、
              <br />
              何かが足りなかった。
            </h3>
            <p>
              都会で暮らしていた頃、現代の暮らしは、私にはあまりにも便利すぎると感じていました。何もかもが当たり前に手に入り、生きていることまで当たり前になっていく。その便利さのなかに、どこか空虚さがありました。
            </p>
            <p>
              だからといって、昔の暮らしに戻りたかったわけではありません。食べ物や暮らしに必要なものを、自分の手で生み出してみたら、私の内側の世界はどう変わるのだろう。そんな純粋な好奇心が、すべての始まりでした。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">A QUESTION I HAD</span>
            当たり前に受け取っているものを、
            <br />
            自分で生み出したら、
            <br />
            世界はどう見えるのだろう。
          </blockquote>
        </div>
        <div className="chapter">
          <div className="chapter-number">02</div>
          <div className="chapter-body">
            <div className="eyebrow">ENCOUNTER / 出会い</div>
            <h3>
              この土地には、すでに
              <br />
              豊かさがあった。
            </h3>
            <p>
              導かれるようにしてたどり着いた上郡町の集落で、私は本当にたくさんのものを受け取りました。家、車、土地、機械。そして何より、暮らしの知識や技術、人の手を借りることのありがたさを教えてもらいました。
            </p>
            <p>
              ここで気づいたのは、豊かさは新しく生み出すばかりではないということ。長い時間をかけて守られてきた田んぼや風景、人のつながり。失われかけている豊かさを、私も受け継いでいきたいと思うようになりました。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">WHAT THE LAND TAUGHT ME</span>
            豊かさは、生み出すだけでなく、
            <br />
            受け継いでいくものでもある。
          </blockquote>
        </div>
        <div className="chapter">
          <div className="chapter-number">03</div>
          <div className="chapter-body">
            <div className="eyebrow">PRACTICE / 実践</div>
            <h3>
              自然の都合で、
              <br />
              一日が決まっていく。
            </h3>
            <p>
              2026年、仲間とともに約1.7町の田んぼで本格的な米づくりを始めました。朝から晩まで、頭のどこかに稲のことがあります。土、水、太陽、草、そして稲。毎日、目の前の自然と対話するような日々です。
            </p>
            <p>
              季節が進めば、今すべき仕事が自然と決まっていきます。雨が降れば予定を変え、草が生えれば田んぼへ入る。人間の都合で動く暮らしから、自然の都合に自分の暮らしを合わせる毎日へ。気づけば、里山に来た頃とは世界の見え方がずいぶん変わっていました。
            </p>
            <p>
              自分が育てたお米を毎日食べられること。そのお米を「おいしい」と言ってもらえること。そんなひとつひとつが、私の暮らしを深く満たしてくれています。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">LIVING WITH THE SEASONS</span>
            私が季節を動かすのではなく、
            <br />
            季節が私の暮らしを動かしていく。
          </blockquote>
        </div>
        <div className="chapter">
          <div className="chapter-number">04</div>
          <div className="chapter-body">
            <div className="eyebrow">FUTURE / 未来</div>
            <h3>
              この暮らしを、
              <br />
              次の世代へ。
            </h3>
            <p>
              今、アルデルファームでは、お米だけでなく、野菜や卵、肉も仲間とともに自給していく暮らしを目指しています。でも、私が残したいのは、食べ物をつくる技術だけではありません。
            </p>
            <p>
              集落の人たちとの関係も、里山の自然環境も、この暮らしの大切な一部です。一人では成り立たないからこそ、助け合い、つくったものを分かち合う。そのなかに、私が求めていた生きる充実感があります。
            </p>
            <p>
              私が受け取った豊かさを、今度は誰かへ。そして次の世代へ。いつかこの土地で、また新しい誰かが自分の暮らしをつくっていけるように。田んぼを耕すことは、その未来につながる小さな一歩だと思っています。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">PASSING IT ON</span>受け取った豊かさを、
            <br />
            ここで終わらせたくない。
          </blockquote>
        </div>
      </section>
    </>
  );
}

function FarmRice({ lineUrl }: { lineUrl: string }) {
  return (
    <>
      <section className="rice-brand" id="kanahe">
        <div className="container rice-inner">
          <div className="rice-title">
            <div className="eyebrow">RICE FROM OUR LAND</div>
            <h2 className="rice-big">金瓮</h2>
            <div className="rice-hiragana">かなへ</div>
            <div className="rice-subtitle">
              土地から受け取った実りを、暮らしへ。
            </div>
          </div>
          <div className="rice-explainer">
            <h3>
              かつての地名と、
              <br />
              忘れられた暮らしの言葉を重ねて。
            </h3>
            <p>
              この土地には、かつて「金内（かなえ）」という名がありました。いまの住所からは姿を消しても、人の記憶や土地に残っている名前です。
            </p>
            <p>
              「かなへ」は、金属の器を意味した古い日本語。そこに、土地の恵みを受け取り、次の暮らしへ手渡す「器」でありたいという私の想いを重ねました。
            </p>
            <div className="mini-rule"></div>
            <div className="rice-line">
              受け継がれてきた土地の実りを、
              <br />
              次世代の暮らしへ。
            </div>
            <p>
              金瓮は、単なるお米の名前ではなく、私がこの土地で受け取ってきたものを、食卓へ届けるための名前です。
            </p>
          </div>
        </div>
      </section>
      <section className="process container" id="cultivation">
        <div className="process-top">
          <div>
            <div className="eyebrow">OUR RICE / THE WORK BEHIND EACH BOWL</div>
            <h2>
              一杯のごはんの向こうに、
              <br />
              一年の暮らしがある。
            </h2>
          </div>
          <p>
            農薬に頼らず育てる金瓮のお米。苗を育て、田植えをし、夏の草取りを重ね、秋には収穫から乾燥・籾摺りまで。仲間に助けられながら、その年の自然に合わせて進めてきた米づくりです。
          </p>
        </div>
        <div className="fact-row">
          <div className="fact">
            <small>SPRING / 05—06</small>
            <strong>苗から田植えへ</strong>
            <p>
              籾をまいて苗を育て、田んぼに植える。はじまりの季節。仲間と手を動かす喜びも、初めて知りました。
            </p>
          </div>
          <div className="fact">
            <small>SUMMER / 07—08</small>
            <strong>稲と草と向き合う</strong>
            <p>
              田んぼを見回り、草の勢いに合わせて道具や手作業を使い分ける。稲の変化に目が離せない夏。
            </p>
          </div>
          <div className="fact">
            <small>AUTUMN / 09—10</small>
            <strong>収穫を食卓へ</strong>
            <p>
              稲を刈り、乾燥させ、籾殻を取り除く。はじめて、一袋のお米の向こうにある仕事の多さを知りました。
            </p>
          </div>
        </div>
        <p className="process-note">
          <strong>金瓮米について：</strong>
          一般向けにお届けする金瓮ブランドのお米は、すべて栽培期間中農薬不使用です。なお、約1.7町は2026年に仲間と取り組んだ米づくり全体の規模であり、すべてが金瓮ブランドの田んぼという意味ではありません。
        </p>
      </section>
      <section className="shop" id="order">
        <div className="container shop-inner">
          <div>
            <div className="eyebrow" style={{ color: "#d4b27a" }}>
              FROM OUR FIELD TO YOUR TABLE
            </div>
            <h2>
              この物語のつづきを、
              <br />
              あなたの食卓へ。
            </h2>
            <p>
              毎日のごはんに、土地の実りと、そこに暮らす人たちの営みを。金瓮米はアルデルファームの公式LINEからご注文いただけます。
            </p>
          </div>
          <div className="shop-action">
            <a
              className="shop-button"
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              お米を注文する（公式LINE） <span aria-hidden="true">↗</span>
            </a>
            <p>
              友だち追加後、トーク画面下の「お米を買う」からご注文ください。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function FarmJournal({ articles }: { articles: FarmArticle[] }) {
  return (
    <>
      <section className="life container" id="life">
        <div className="life-heading">
          <div>
            <div className="eyebrow">JOURNAL / THE EVERYDAY</div>
            <h2>私たちの、日々の記録。</h2>
          </div>
          <p className="life-intro">
            米づくりだけではありません。鶏や畑、古い家の手入れ。暮らしをつくる現場には、いつも新しい発見があります。
          </p>
        </div>
        <div className="life-cards">
          <a className="life-card" href="#aldel-rice-year">
            <div className="eyebrow">01 — RICE</div>
            <h3>
              籾から食卓へ。
              <br />
              アルデルファームの米づくり
            </h3>
            <p>
              種まき、夏の除草、機械の引き取り、秋の収穫。一年の手仕事をたどる記録。
            </p>
            <div className="read">記録を読む ↗</div>
          </a>
          <a className="life-card" href="#aldel-chicken-life">
            <div className="eyebrow">02 — CHICKENS</div>
            <h3>
              鶏小屋を建てて、
              <br />
              鶏と暮らす
            </h3>
            <p>
              仲間と小屋をつくり、小さなひよこを迎え、暮らしの循環を少しずつつくる。
            </p>
            <div className="read">記録を読む ↗</div>
          </a>
          <a className="life-card" href="#aldel-shared-field">
            <div className="eyebrow">03 — FIELDS</div>
            <h3>
              みんなの畑は、
              <br />
              自然とのキャッチボール
            </h3>
            <p>
              育てたいものを持ち寄り、試して、失敗して、時々思いがけない収穫に笑う。
            </p>
            <div className="read">記録を読む ↗</div>
          </a>
        </div>
      </section>
      <section className="journal" id="journal">
        <div className="container">
          <div className="eyebrow">FIELD NOTES / MORE STORIES</div>
          <h2 className="journal-titlemain">もう少し、暮らしの中へ。</h2>
          {articles.map((article) => (
            <details key={article.id} className="journal-entry" id={article.id}>
              <summary>
                <span className="journal-label">活動記録</span>
                <span className="journal-title">{article.title}</span>
                <span className="journal-open">
                  <span className="journal-closed-label">続きを読む</span>
                  <span className="journal-expanded-label">閉じる</span>
                </span>
              </summary>
              {article.body && (
                <div
                  className="journal-text"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />
              )}
              <Link
                className="journal-permalink"
                href={`/stories/${article.id}`}
              >
                記事ページを開く
              </Link>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function FarmCommunity({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="community" id="community">
      <div className="container community-inner">
        <div>
          <div className="community-image">
            <img src={imageUrl} loading="lazy" alt="" />
            <div className="image-stamp">LIVING TOGETHER / HYŌGO</div>
          </div>
        </div>
        <div className="community-copy">
          <div className="eyebrow">THE NEXT CHAPTER / COMMUNITY</div>
          <h2>
            一人では、
            <br />
            つくれない暮らしがある。
          </h2>
          <p>
            土地を耕すことも、家を直すことも、食べ物を育てることも。私一人ではできないことばかりでした。だからこそ、誰かと力を合わせ、できたものを分け合う時間が、何より豊かに感じられます。
          </p>
          <p>
            アルデルファームと岩上邸を拠点に、暮らしをともにつくる共同サロンの準備も進めています。一緒に考え、企画し、手を動かす人の輪を少しずつ広げていきます。
          </p>
          <div className="community-status">共同サロンは開設準備中です</div>
          <div className="community-links">
            <Link href="/programs">見学・体験 ↗</Link>
            <Link href="/sharehouse">アルデルハウスで暮らす ↗</Link>
            <Link href="/schedule">活動予定 ↗</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FarmFooter({ lineUrl }: { lineUrl: string }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">ALDEL FARM</div>
            <div className="footer-copy">
              あるもんで、つくる。
              <br />
              でるもんで、まわす。
            </div>
          </div>
          <div className="footer-links">
            <div>
              <a href="#story">私とお米の物語</a>
              <a href="#kanahe">金瓮米</a>
              <a href="#cultivation">米づくり</a>
              <a href="#life">日々の記録</a>
            </div>
            <div>
              <a href={lineUrl} target="_blank" rel="noopener noreferrer">
                お米を注文する
              </a>
              <Link href="/about">知る・相談する</Link>
              <Link href="/sharehouse">アルデルハウス</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ALDEL FARM</span>
          <span>HYOGO, JAPAN / 暮らしと実りを次の世代へ</span>
        </div>
      </div>
    </footer>
  );
}

export function FarmHome({
  globals,
  articles,
}: {
  globals: FarmSiteGlobals | null;
  articles: FarmArticle[];
}) {
  const lineUrl = getLineOfficialUrl(globals);
  const hero = globals?.farmHeroImage;
  const life = globals?.farmLifeImage;
  return (
    <div className="aldel-home" id="top">
      <FarmHomeInteractions />
      <FarmHeader lineUrl={lineUrl} />
      <main>
        <FarmHero
          imageUrl={
            (Array.isArray(hero) ? hero[0]?.url : hero?.url) || HERO_FALLBACK
          }
        />
        <FarmStory />
        <FarmRice lineUrl={lineUrl} />
        <FarmJournal articles={articles} />
        <FarmCommunity
          imageUrl={
            (Array.isArray(life) ? life[0]?.url : life?.url) ||
            "/images/life-made-by-many-hands.jpg"
          }
        />
      </main>
      <FarmFooter lineUrl={lineUrl} />
    </div>
  );
}
