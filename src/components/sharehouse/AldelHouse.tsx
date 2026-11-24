import Image from "next/image";
import Link from "next/link";
import { HouseNavigation } from "./HouseNavigation";
import "./aldel-house.css";

function HouseIntroduction() {
  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <div className="eyebrow">ALDEL HOUSE / LIVING TOGETHER</div>
          <h1 className="serif" id="page-title">
            <span>暮らしを、</span>
            <span>ともにつくる</span>
            <span>場所。</span>
          </h1>
          <p className="hero-lead">
            田んぼを耕し、古い家に手を入れ、同じ食卓を囲む。兵庫県上郡町の小さな集落で、私たちは暮らしを自分たちの手でつくっています。
          </p>
          <div className="hero-links">
            <a className="text-link" href="#about">
              この場所の物語を読む <b aria-hidden="true">↗</b>
            </a>
            <a className="text-link" href="#visit">
              住まい・内覧について <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/aldel-house-hero.jpg"
            alt="アルデルハウスの古民家の前に並ぶ６人"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 49vw"
          />
        </div>
      </section>
      <section className="motto">
        <div className="wrap motto-inner">
          <strong className="serif">
            「自分でできる」は、
            <br />
            一人でできる、ということじゃない。
          </strong>
          <span>THE ART OF LIVING TOGETHER</span>
        </div>
      </section>
      <section className="intro wrap" id="about">
        <div>
          <div className="eyebrow">OUR PLACE / はじまり</div>
          <h2 className="serif">
            ここには、
            <br />
            受け取ってきた
            <br />
            豊かさがある。
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            何もかも便利になった今、食べるものや暮らしに必要なものを、自分たちの手で生み出してみたら、世界はどんなふうに見えるのだろう。
          </p>
          <p>
            そんな好奇心をきっかけに、この里山での暮らしづくりが始まりました。今では仲間がそれぞれの思いと力を持ち寄り、私たちは一緒に日々の暮らしをつくっています。
          </p>
          <p>
            上郡町の集落で暮らし始めてから、私たちは家や土地、車、農機具、そして知識や技術まで、地域の人たちとのご縁を通じて本当に多くのものを受け取ってきました。ここでの暮らしは、自分たちだけの力では成り立ちません。
          </p>
          <p>
            私たちが大切にしたいのは、新しい豊かさを生み出すことだけではありません。この土地にすでにある豊かさを見つめ、失われかけているものを受け継ぎ、次の世代へ手渡していくこと。
          </p>
          <p>
            アルデルハウスは、その思いを仲間とともに日々の暮らしの中で育てていく場所です。
          </p>
          <div className="intro-quote">
            暮らしを受け取り、
            <br />
            自分たちの手で育て、
            <br />
            また次の誰かへ渡していく。
          </div>
        </div>
      </section>
      <section className="land" id="life">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-no">01 / HOW WE LIVE</div>
              <h2 className="section-title serif">
                この土地で、
                <br />
                毎日をつくる。
              </h2>
            </div>
            <p>
              特別なイベントがなくても、暮らしには手を動かすことがたくさんあります。自然の変化を見ながら、できることを少しずつ増やしていく毎日です。
            </p>
          </div>
          <div className="pillar-list">
            <div className="pillar">
              <span className="pillar-num">01</span>
              <h3>育てる。</h3>
              <p>
                田んぼの水を見て、畑の様子を確かめる。お米や野菜、鶏との暮らし。食べるものが育つ時間を、日常のすぐそばで感じます。
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">02</span>
              <h3>手を入れる。</h3>
              <p>
                古い家や道具を、すぐに手放すのではなく、直しながら使う。できないことは誰かに教わり、工夫しながら暮らしを整えていきます。
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">03</span>
              <h3>分かち合う。</h3>
              <p>
                育てたものを食べることも、困ったときに力を借りることも。一人ひとりができることを持ち寄り、同じ食卓を囲む時間を大切にしています。
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">04</span>
              <h3>受け継ぐ。</h3>
              <p>
                田んぼのある風景、地域の知恵、顔の見える関係性。この場所に残る豊かさを自分たちの暮らしの中で生かし、次の世代へつないでいきたいと思っています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HouseLiving() {
  return (
    <>
      <section className="places wrap" id="place">
        <div className="places-head">
          <div>
            <div className="eyebrow">THE HOUSE / 住まいと環境</div>
            <h2 className="section-title serif">
              住まいも、
              <br />
              暮らしの一部。
            </h2>
          </div>
          <p>
            アルデルハウスには、個室のほか、食事や会話をする共有スペース、共同キッチンや浴室などがあります。建物の中だけでなく、畑や田んぼ、集落とのつながりも、ここでの日常の一部です。
          </p>
        </div>
        <Image
          className="places-dining-image"
          src="/images/aldel-house-dining.webp"
          alt="古民家の和室で食卓を囲む人々"
          width={1600}
          height={901}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1120px"
        />
        <div className="equipment">
          <div>
            <h3>ここにあるもの。</h3>
            <p>
              暮らしの拠点としての基本的な設備と、共同で使う空間があります。家とその周りの環境を、少しずつ手入れしながら使っています。
            </p>
            <div className="amenity-tags">
              <span>個室</span>
              <span>共同キッチン</span>
              <span>共同浴室</span>
              <span>共同トイレ</span>
              <span>共有スペース</span>
              <span>田畑</span>
            </div>
            <p className="note">
              利用できる設備や共有スペースの詳細は、LINEでご案内します。
            </p>
          </div>
          <div>
            <h3>アルデルハウスの場所</h3>
            <p>
              兵庫県赤穂郡上郡町、八保地区の金内（かなえ）。山と田んぼに囲まれた集落です。季節によって風景も、日々の仕事も変わります。
            </p>
            <p>
              所在地の詳細や現地までの行き方は、内覧の日程を調整する際にご案内します。
            </p>
          </div>
        </div>
      </section>
      <section className="divider-quote">
        <div className="eyebrow">WHAT MAKES A HOME</div>
        <p className="serif">
          完成された暮らしに入るのではなく、
          <br />
          これからの暮らしを、
          <br />
          ともに育てていく。
        </p>
        <span>ALDEL HOUSE / KANAE</span>
      </section>
      <section className="real wrap">
        <div className="real-inner">
          <div>
            <div className="eyebrow">LIVING TOGETHER / 大切にしたいこと</div>
            <h2 className="section-title serif">
              「一緒に暮らす」を、
              <br />
              急がない。
            </h2>
            <p>
              暮らしの形も、心地よい距離感も、一人ひとり違います。だからこそ、住む前にお互いのことを知り、日々の過ごし方や関わり方を話せることを大切にしたいと思っています。
            </p>
            <p>
              家を選ぶことは、その場所や人との関係を選ぶことでもあるから。まずは相談し、現地を見て、自分に合う暮らしかどうかを確かめてください。
            </p>
          </div>
          <div>
            <div className="real-rule">
              <strong>自分の時間</strong>
              <span>
                共同生活の中でも、それぞれの生活や仕事の時間を大切に。
              </span>
            </div>
            <div className="real-rule">
              <strong>助け合い</strong>
              <span>得意なことを持ち寄り、難しいことは声をかけ合う。</span>
            </div>
            <div className="real-rule">
              <strong>土地との関係</strong>
              <span>
                自然や地域の人々とのつながりも、ここでの暮らしの一部。
              </span>
            </div>
            <div className="real-rule">
              <strong>まずは対話</strong>
              <span>
                暮らしへの関わり方や住まいの条件は、相談と内覧で確認する。
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HouseVisit({ lineUrl }: { lineUrl: string }) {
  return (
    <>
      <section className="visit" id="visit">
        <div className="wrap">
          <div className="visit-head">
            <div className="eyebrow">VISIT & CONVERSATION / 内覧のご相談</div>
            <h2 className="serif">
              住まいのことは、
              <br />
              まず話してみるところから。
            </h2>
            <p>
              入居を決める前に、どんな場所なのか、どんな暮らしなのかを知ってもらえたらと思っています。お部屋のこと、生活のこと、気になることがあれば、公式LINEからご相談ください。
            </p>
          </div>
          <div className="step-grid">
            <div className="step">
              <div className="num">01</div>
              <h3>LINEで相談する</h3>
              <p>
                シェアハウスについて関心があることや、知りたいことを送ってください。
              </p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>内覧の日程を決める</h3>
              <p>
                お互いの予定と受け入れ状況を確認しながら、現地を見に来る日を調整します。
              </p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>実際の暮らしに触れる</h3>
              <p>
                建物や周辺の環境を見ながら、生活のこと、費用や入居条件についてお話しします。
              </p>
            </div>
          </div>
          <div className="line-panel">
            <div>
              <div className="eyebrow">OFFICIAL LINE / CONTACT</div>
              <h3 className="serif">内覧・住まいの相談はこちら。</h3>
              <p>
                公式LINEで「シェアハウスについて相談したい」と送ってください。内覧希望日が決まっていなくても大丈夫です。
              </p>
            </div>
            <div className="line-buttons">
              <a
                className="line-primary"
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ALDEL FARM公式LINEで相談する ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="faq">
        <div className="wrap faq-inner">
          <div className="faq-intro">
            <div className="eyebrow">QUESTIONS / よくあるご質問</div>
            <h2 className="section-title serif">気になること。</h2>
            <p className="small">
              条件の詳細や現在の受け入れ状況は、LINEでのご相談時にご案内します。
            </p>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>内覧だけでも相談できますか？</summary>
              <p>
                はい。まずは公式LINEでシェアハウスの内覧についてお問い合わせください。ご希望と現地の状況を確認し、日程を調整します。一般向けの見学・体験プログラムとは別の、住まいの内覧相談です。
              </p>
            </details>
            <details className="faq-item">
              <summary>家賃や入居条件はどこで分かりますか？</summary>
              <p>
                費用や契約条件などは、入居を具体的に検討される方へ個別にご案内します。公式LINEでご相談ください。
              </p>
            </details>
            <details className="faq-item">
              <summary>農作業や共同作業への参加は必須ですか？</summary>
              <p>
                日々の関わり方や共同生活のルールは、相談と内覧の中で確認していただく形を想定しています。事前に知りたいことがあれば、遠慮なくご質問ください。
              </p>
            </details>
            <details className="faq-item">
              <summary>今、入居できる部屋はありますか？</summary>
              <p>
                お部屋の状況は変わることがあります。最新の受け入れ状況は公式LINEにてお問い合わせください。
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="last">
        <div className="eyebrow" style={{ color: "#d7c3a1" }}>
          THE NEXT CHAPTER
        </div>
        <h2 className="serif">
          この場所で、
          <br />
          どんな毎日をつくっていこう。
        </h2>
        <p>
          建物のことも、暮らしのことも。
          <br />
          最初の一歩は、小さな会話から。
        </p>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer">
          公式LINEで住まいを相談する ↗
        </a>
      </section>
    </>
  );
}

export function AldelHouse({ lineUrl }: { lineUrl: string }) {
  return (
    <div className="aldel-house">
      <HouseNavigation lineUrl={lineUrl} />
      <main>
        <HouseIntroduction />
        <HouseLiving />
        <HouseVisit lineUrl={lineUrl} />
      </main>
      <footer>
        <div className="wrap">
          <strong>ALDEL FARM</strong>
          <nav aria-label="フッター">
            <Link href="/">ホーム</Link>
            <Link href="/stories">日々の記録</Link>
            <Link href="/sharehouse">アルデルハウス</Link>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer">
              公式LINE ↗
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
