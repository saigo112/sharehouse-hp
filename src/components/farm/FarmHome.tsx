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
          <a href="#philosophy">私たちの原点</a>
          <a href="#story">私たちとお米の物語</a>
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
          当たり前に手に入るものを、自分たちの手で生み出してみたら、世界はどんなふうに見えるのだろう。そんな好奇心から始まった、兵庫県上郡町での私たちの里山暮らしです。
        </p>
        <div className="hero-actions">
          <a className="arrow-link" href="#story">
            <span>私たちとお米の物語を読む</span>
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
              当たり前に手に入るものを、自分たちの手で生み出してみる。
              <br />
              私たちは、その経験を通して、生きることをもっと深く味わいたいと思っています。
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
            <div className="eyebrow">OUR STORY / FOUR CHAPTERS</div>
            <h2>私たちと、田んぼの物語。</h2>
          </div>
          <p className="section-aside">
            里山暮らしを始めたきっかけから、季節に合わせて田んぼに立つ毎日まで。私たちが米づくりを続ける理由を綴りました。
          </p>
        </div>
        <div className="chapter">
          <div className="chapter-number">01</div>
          <div className="chapter-body">
            <div className="eyebrow">ORIGIN / 原点</div>
            <h3>
              便利な暮らしのなかで、
              <br />
              ふと浮かんだ問い。
            </h3>
            <p>
              何もかも便利になった現代の暮らし。当たり前に手に入るものを、自分たちの手で生み出してみたら、世界はどんなふうに見えるのだろう。
            </p>
            <p>
              そんな一つの好奇心から、私たちの里山暮らしは始まりました。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">A QUESTION WE HAD</span>
            当たり前に受け取っているものを、
            <br />
            自分たちで生み出したら、
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
              導かれるようにたどり着いた、兵庫県上郡町の小さな集落。ここでは、人とのご縁を通じて、家や土地、農機具、知識や技術など、本当にたくさんのものを受け取ってきました。
            </p>
            <p>
              その中で私たちが気づいたのは、豊かさは新しく生み出すだけのものではないということ。この土地には、長い時間をかけて育まれ、今も受け継がれている豊かさがあります。その中には失われかけているものもあります。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">WHAT THE LAND TAUGHT US</span>
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
              2026年、仲間とともに約1.7町の田んぼで本格的なお米づくりを始めました。毎日、土と水と太陽と稲に向き合っています。
            </p>
            <p>
              季節が巡り、自然の様子が変わるたびに、その日にするべきことも変わっていきます。人間の都合で動いていた暮らしが、少しずつ自然の都合で動く暮らしへ。気づけば、里山で暮らし始めた頃とは、世界の見え方が大きく変わっていました。
            </p>
            <p>
              自分たちで育てたお米を毎日食べられること。そのお米を「おいしい」と喜んでくれる人がいること。そんな日々の積み重ねの中に、私たちは生きることの充実を感じています。
            </p>
          </div>
          <blockquote className="chapter-quote">
            <span className="quote-tag">LIVING WITH THE SEASONS</span>
            季節が巡るたび、
            <br />
            私たちの一日も変わっていく。
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
              私たちは、お米も、野菜も、卵も、肉も、仲間と育て、分かち合う暮らしを育てたいと思っています。
            </p>
            <p>
              そこには、集落の人々とのつながりも、里山の自然も欠かせません。一人では成り立たないからこそ、それぞれの力を持ち寄り、助け合いながら暮らしをつくっていきます。
            </p>
            <p>
              そして、私たちがこの土地から受け取ってきた豊かさを、次の世代にも残していきたいと思っています。
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
              「金瓮（かなへ）」は、金属の器を意味する古い日本語です。この土地の実りを受け取り、次の暮らしへ手渡す器でありたい。そんな想いを、この言葉に重ねました。
            </p>
            <div className="mini-rule"></div>
            <div className="rice-line">
              受け継がれてきた土地の実りを、
              <br />
              次世代の暮らしへ。
            </div>
            <p>
              この土地にあった「金内」と、器を意味する「金瓮」。二つの言葉を重ねて、私たちはこのお米を「金瓮」と名付けました。
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
            私たちは、土地を耕すことも、家を直すことも、食べ物を育てることも、それぞれの力を持ち寄って続けてきました。力を合わせて育てたものを分け合う時間に、暮らしの豊かさを感じています。
          </p>
          <p>
            アルデルファームと岩上邸を拠点に、暮らしをともにつくる共同サロンの準備も進めています。一緒に考え、企画し、手を動かす人の輪を少しずつ広げていきます。
          </p>
          <div className="community-status">共同サロンは開設準備中です</div>
          <div className="community-links">

            <Link href="/sharehouse">アルデルハウスで暮らす ↗</Link>

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
              <a href="#story">私たちとお米の物語</a>
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
