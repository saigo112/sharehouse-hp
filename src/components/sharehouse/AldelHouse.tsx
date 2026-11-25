import Image from "next/image";
import Link from "next/link";
import { HouseNavigation } from "./HouseNavigation";
import "./aldel-house.css";

function HouseIntroduction() {
  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <div className="eyebrow">01 / HOW WE LIVE</div>
          <h1 className="serif" id="page-title">
            <span>暮らしを、</span>
            <span>もっと遊ぼう。</span>
          </h1>
          <p className="hero-lead">
            食べたいものを育て、欲しいものをつくる。
            <br />
            やってみたいことがあれば、仲間とやってみる。
            <br />
            兵庫県上郡町の小さな集落にあるアルデルハウスは、そんな暮らしを楽しむ人たちが集まる古民家です。
          </p>
          <div className="hero-links">
            <a className="text-link" href="#about">
              アルデルハウスについて <b aria-hidden="true">↗</b>
            </a>
            <a className="text-link" href="#visit">
              内覧・入居のご相談 <b aria-hidden="true">↗</b>
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
            一人でできることよりも、
            <br />
            一緒だからできることがある。
          </strong>
          <span>THE ART OF LIVING TOGETHER</span>
        </div>
      </section>
      <section className="intro chapter-opening wrap" id="about">
        <div>
          <div className="eyebrow">02 / CONCEPT</div>
          <h2 className="serif">
            暮らすことに
            <br />
            夢中になる。
          </h2>
        </div>
        <div className="intro-copy">
          <p>食べること、寝ること、働くこと、遊ぶこと。</p>
          <p>私たちは、毎日の当たり前をどれだけ味わえているのでしょうか。</p>
          <p>
            便利な世の中になり、暮らしに必要なものの多くが、お金を払えば手に入るようになりました。
          </p>
          <p>
            では、その暮らしの一部を自分たちの手でつくってみたら、どんな世界が見えてくるのでしょうか。
          </p>
          <p>
            食べたいものを育て、欲しいものをつくり、心地よい場所を自分たちで整える。
          </p>
          <p>
            思い通りにいかないことも、手間がかかることも、いつしか夢中になっている自分に気づく。
          </p>
          <p>当たり前の暮らしを、お気に入りの暮らしへ。</p>
          <p>アルデルハウスは、そんな暮らしを追求する場所です。</p>
        </div>
      </section>
      <section className="intro chapter-continuation wrap" id="our-story">
        <div>
          <div className="section-no">03 / OUR STORY</div>
          <h2 className="serif">一人ではできなかったこと。</h2>
        </div>
        <div className="intro-copy">
          <p>はじまりは、古い家の片付けでした。</p>
          <p>
            押し入れや納屋に残された大量の荷物を運び出し、少しずつ家を整えていく。最初は一人で黙々と作業をする日々でした。
          </p>
          <p>
            やがて住人が集まり、一緒にご飯をつくり、どうすればもっと快適に暮らせるかを考えるようになりました。
          </p>
          <p>
            夏にはみんなで何日もセメントを練り、納屋を人が集まれる場所につくり変えました。集落の人から余った苗をいただいたことをきっかけに、使われていなかった畑を田んぼに変え、米づくりにも挑戦しました。
          </p>
          <p>卵が欲しいと、みんなで鶏小屋を建てたこともあります。</p>
          <p>どれも、一人ではなかなか踏み出せなかったことです。</p>
          <p>
            自給自足という言葉からは、何でも自分一人でできる暮らしを想像するかもしれません。
          </p>
          <p>でも、ここで暮らすうちに見えてきたのは、むしろその反対でした。</p>
        </div>
      </section>
      <section className="land" id="life">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-no">04 / OUR LIFE</div>
              <h2 className="section-title serif">
                暮らしの中に、遊びがある。
              </h2>
            </div>
            <p>ここでは、農業もDIYも料理も、暮らしの延長線上にあります。</p>
          </div>
          <div className="pillar-list">
            <div className="pillar">
              <span className="pillar-num">01</span>
              <h3>食べるものをつくる</h3>
              <p>
                米や野菜を育て、鶏小屋をつくる。採れた柿や柚子でジャムをつくる。食べることから始まる楽しみは、思っている以上にたくさんあります。
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">02</span>
              <h3>欲しい場所をつくる</h3>
              <p>
                古い納屋を改修したり、テーブルをつくったり。どうすればもっと心地よい場所になるか、みんなで考えながら手を動かします。
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">03</span>
              <h3>季節を楽しむ</h3>
              <p>
                春には種をまき、夏には畑で汗を流し、秋には収穫を喜ぶ。庭で火を囲み、その時期にしか味わえないものを食べる。
              </p>
            </div>
            <div className="pillar">
              <span className="pillar-num">04</span>
              <h3>知らないことを教わる</h3>
              <p>
                農機具の使い方、野菜の育て方、小屋の建て方。集落には、長年の暮らしの中で培われてきた知恵がたくさんあります。
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
      <section className="intro chapter-opening wrap" id="satoyama">
        <div>
          <div className="section-no">05 / SATOYAMA</div>
          <h2 className="serif">この土地にあるものから。</h2>
        </div>
        <div className="intro-copy">
          <p>
            私たちがここで暮らすようになってから、地域の人たちに本当に多くのものをいただいてきました。
          </p>
          <p>
            家や土地、車、農機具。そして、それらを使いこなすための知識や技術。
          </p>
          <p>
            自分たちだけでは到底つくれなかった暮らしが、この土地にあるものを受け継ぐことで、少しずつ形になってきました。
          </p>
          <p>
            使われなくなった田んぼも、古い家も、誰かが長い時間をかけてつくってきたものです。
          </p>
          <p>
            それらを今の私たちの暮らしに活かし、また次の世代が使えるようにしていく。
          </p>
          <p>
            自分たちがお気に入りの暮らしを追求することが、この里山を残していくことにもつながる。
          </p>
          <p>私たちは、そんな暮らしを続けていきたいと思っています。</p>
        </div>
      </section>
      <section className="intro chapter-continuation chapter-opening wrap" id="community">
        <div>
          <div className="section-no">06 / COMMUNITY</div>
          <h2 className="serif">集落というコミュニティ</h2>
        </div>
        <div className="intro-copy">
          <p>
            かつて、コミュニティはわざわざつくるものではなく、暮らしの中に当たり前にあるものでした。
          </p>
          <p>
            食べ物を分け合い、困ったときには助け合い、季節の仕事をともにする。
          </p>
          <p>
            集落には今でも、コミュニティと呼ぶ必要のないコミュニティがあります。
          </p>
          <p>
            経済合理性や効率を追求してきた現代社会では、人と人との関わりさえも、少しずつその温かさを失いつつあります。
          </p>
          <p>
            アルデルハウスは、都市と集落をつなぎ、暮らしの中にあった人と人との関係を、もう一度結び直す場所です。
          </p>
        </div>
      </section>
      <section className="places chapter-continuation wrap" id="place">
        <div className="places-head">
          <div>
            <div className="eyebrow">THE HOUSE / 住まいと環境</div>
            <h2 className="section-title serif">住居について</h2>
          </div>
          <div>
            <p>
              山と田んぼに囲まれた古民家で、それぞれの個室を持ちながら、台所や浴室などを共同で利用するシェアハウスです。
            </p>
            <Image
              className="places-dining-image"
              src="/images/aldel-house-dining.webp"
              alt="古民家の和室で食卓を囲む人々"
              width={1600}
              height={901}
              sizes="(max-width: 360px) 90vw, 320px"
            />
          </div>
        </div>
        <div className="equipment">
          <div>
            <h3>設備・環境</h3>
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
              設備の詳細や所在地、現在の入居状況については、内覧・入居相談の際にご案内します。
            </p>
          </div>
          <div>
            <h3>アルデルハウスの場所</h3>
            <p>
              アルデルハウスは、兵庫県赤穂郡上郡町の金内（かなえ）という集落にあります。
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
            <h2 className="section-title serif">こんな人と暮らしたい。</h2>
            <p>
              田舎暮らしの経験や、農業、DIYの技術があるかどうかよりも、日々の暮らしに好奇心を持っていることを大切にしたいと思っています。
            </p>
            <p>やりたいことも、得意なことも、人それぞれ。</p>
            <p>
              それぞれが持っているものを活かしながら、一緒に暮らしをつくっていきたいと思っています。
            </p>
          </div>
          <div>
            <div className="real-rule">
              <span style={{ gridColumn: "1 / -1" }}>
                食べることやものづくりが好きな人
              </span>
            </div>
            <div className="real-rule">
              <span style={{ gridColumn: "1 / -1" }}>
                自分の手で何かをつくってみたい人
              </span>
            </div>
            <div className="real-rule">
              <span style={{ gridColumn: "1 / -1" }}>
                知らないことを学ぶのが好きな人
              </span>
            </div>
            <div className="real-rule">
              <span style={{ gridColumn: "1 / -1" }}>
                人と一緒に何かをすることが好きな人
              </span>
            </div>
            <div className="real-rule">
              <span style={{ gridColumn: "1 / -1" }}>
                自分なりのお気に入りの暮らしを見つけたい人
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
            <h2 className="serif">アルデルハウスの内覧・入居相談</h2>
            <p>
              アルデルハウスでの暮らしに興味を持ってくださった方は、公式LINEからお問い合わせください。
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
                実際に家や周辺の環境を見ていただきながら、暮らしのことや入居条件についてお話しします。
              </p>
            </div>
            <div className="line-buttons">
              <a
                className="line-primary"
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                公式LINEで問い合わせる
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
              <summary>内覧だけでも可能ですか？</summary>
              <p>
                はい。公式LINEからお問い合わせください。日程を調整のうえ、現地をご案内します。
              </p>
            </details>
            <details className="faq-item">
              <summary>家賃や入居条件を教えてください。</summary>
              <p>
                費用や契約条件については、個別にご案内します。公式LINEからお問い合わせください。
              </p>
            </details>
            <details className="faq-item">
              <summary>農作業や共同作業への参加は必須ですか？</summary>
              <p>
                共同生活のルールや日々の活動への関わり方については、内覧や入居相談の際にお話しします。
              </p>
            </details>
            <details className="faq-item">
              <summary>現在、入居できる部屋はありますか？</summary>
              <p>最新の空室状況は、公式LINEからお問い合わせください。</p>
            </details>
          </div>
        </div>
      </section>
      <section className="last">
        <div className="eyebrow" style={{ color: "#d7c3a1" }}>
          THE NEXT CHAPTER
        </div>
        <h2 className="serif">
          当たり前の暮らしを、
          <br />
          お気に入りに。
        </h2>
        <p>
          建物のことも、暮らしのことも。
          <br />
          最初の一歩は、小さな会話から。
        </p>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer">
          公式LINEで内覧・入居を相談する
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
