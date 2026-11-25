import Image from "next/image";
import Link from "next/link";
import { HouseNavigation } from "./HouseNavigation";
import "./aldel-house.css";

export function AldelHouse({ lineUrl }: { lineUrl: string }) {
  return (
    <div className="aldel-house">
      <HouseNavigation lineUrl={lineUrl} />
      <main>
        <section className="editorial-hero" aria-labelledby="page-title">
          <div className="editorial-hero-copy">
            <p className="eyebrow">ALDEL HOUSE</p>
            <h1 className="serif" id="page-title">暮らしを、<wbr />もっと遊ぼう。</h1>
            <p>食べたいものを育て、欲しいものをつくる。</p>
            <p>やってみたいことがあれば、仲間とやってみる。</p>
            <p>兵庫県上郡町の小さな集落にあるアルデルハウスは、そんな暮らしを楽しむ人たちが集まる古民家です。</p>
            <div className="hero-links">
              <a className="text-link" href="#about">アルデルハウスについて</a>
              <a className="text-link" href="#visit">内覧・入居のご相談</a>
            </div>
          </div>
          <Image className="editorial-photo editorial-hero-photo" src="/images/aldel-house-hero.jpg" alt="アルデルハウスの古民家の前に並ぶ人たち" width={1365} height={2047} sizes="(max-width: 760px) 92vw, 550px" priority />
        </section>
        <section className="wrap editorial-section" id="about">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">暮らすことに夢中になる。</h2>
          </div>
          <div className="editorial-body">
            <p>食べること、寝ること、働くこと、遊ぶこと。</p>
            <p>私たちは、毎日の当たり前をどれだけ味わえているのでしょうか。</p>
            <p>便利な世の中になり、暮らしに必要なものの多くが、お金を払えば手に入るようになりました。</p>
            <p>では、その暮らしの一部を自分たちの手でつくってみたら、どんな世界が見えてくるのでしょうか。</p>
            <p>食べたいものを育て、欲しいものをつくり、心地よい場所を自分たちで整える。</p>
            <p>思い通りにいかないことも、手間がかかることも、いつしか夢中になっている自分に気づく。</p>
            <p>当たり前の暮らしを、お気に入りの暮らしへ。</p>
            <p>アルデルハウスは、そんな暮らしを追求する場所です。</p>
          </div>
        </section>
        <section className="wrap editorial-section" id="story">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">一人ではできなかったこと。</h2>
            <Image className="editorial-photo " src="/images/home/rice-seedbed.webp" alt="苗床を整える人たち" width={1448} height={1086} sizes="(max-width: 760px) 92vw, 550px" />
          </div>
          <div className="editorial-body">
            <p>はじまりは、古い家の片付けでした。</p>
            <p>押し入れや納屋に残された大量の荷物を運び出し、少しずつ家を整えていく。最初は一人で黙々と作業をする日々でした。</p>
            <p>やがて住人が集まり、一緒にご飯をつくり、どうすればもっと快適に暮らせるかを考えるようになりました。</p>
            <p>夏にはみんなで何日もセメントを練り、納屋を人が集まれる場所につくり変えました。集落の人から余った苗をいただいたことをきっかけに、使われていなかった畑を田んぼに変え、米づくりにも挑戦しました。</p>
            <p>卵が欲しいと、みんなで鶏小屋を建てたこともあります。</p>
            <p>どれも、一人ではなかなか踏み出せなかったことです。</p>
            <p>自給自足という言葉からは、何でも自分一人でできる暮らしを想像するかもしれません。</p>
            <p>でも、ここで暮らすうちに見えてきたのは、むしろその反対でした。</p>
            <p className="editorial-emphasis"><strong>一人でできることよりも、<br />一緒だからできることがある。</strong></p>
          </div>
        </section>
        <section className="wrap editorial-section" id="life">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">暮らしの中に、遊びがある。</h2>
          </div>
          <div className="editorial-body">
            <p>ここでは、農業もDIYも料理も、暮らしの延長線上にあります。</p>
            <h3>食べるものをつくる</h3>
            <p>米や野菜を育て、鶏小屋をつくる。採れた柿や柚子でジャムをつくる。食べることから始まる楽しみは、思っている以上にたくさんあります。</p>
            <Image className="editorial-photo " src="/images/home/rice-cooking.webp" alt="釜で炊き上がったご飯" width={1200} height={900} sizes="(max-width: 760px) 92vw, 550px" />
            <h3>欲しい場所をつくる</h3>
            <p>古い納屋を改修したり、テーブルをつくったり。どうすればもっと心地よい場所になるか、みんなで考えながら手を動かします。</p>
            <h3>季節を楽しむ</h3>
            <p>春には種をまき、夏には畑で汗を流し、秋には収穫を喜ぶ。庭で火を囲み、その時期にしか味わえないものを食べる。</p>
            <h3>知らないことを教わる</h3>
            <p>農機具の使い方、野菜の育て方、小屋の建て方。集落には、長年の暮らしの中で培われてきた知恵がたくさんあります。</p>
          </div>
        </section>
        <section className="wrap editorial-section" id="satoyama">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">この土地にあるものから。</h2>
            <Image className="editorial-photo " src="/images/home/rice-weeding.webp" alt="集落の田んぼでの除草作業" width={1200} height={900} sizes="(max-width: 760px) 92vw, 550px" />
          </div>
          <div className="editorial-body">
            <p>私たちがここで暮らすようになってから、地域の人たちに本当に多くのものをいただいてきました。</p>
            <p>家や土地、車、農機具。そして、それらを使いこなすための知識や技術。</p>
            <p>自分たちだけでは到底つくれなかった暮らしが、この土地にあるものを受け継ぐことで、少しずつ形になってきました。</p>
            <p>使われなくなった田んぼも、古い家も、誰かが長い時間をかけてつくってきたものです。</p>
            <p>それらを今の私たちの暮らしに活かし、また次の世代が使えるようにしていく。</p>
            <p>自分たちがお気に入りの暮らしを追求することが、この里山を残していくことにもつながる。</p>
            <p>私たちは、そんな暮らしを続けていきたいと思っています。</p>
          </div>
        </section>
        <section className="wrap editorial-section" id="community">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">集落というコミュニティ</h2>
            <Image className="editorial-photo editorial-portrait" src="/images/home/community-night.webp" alt="夜の古民家の庭で火を囲む人たち" width={1086} height={1448} sizes="(max-width: 760px) 92vw, 550px" />
          </div>
          <div className="editorial-body">
            <p>かつて、コミュニティはわざわざつくるものではなく、暮らしの中に当たり前にあるものでした。</p>
            <p>食べ物を分け合い、困ったときには助け合い、季節の仕事をともにする。</p>
            <p>集落には今でも、コミュニティと呼ぶ必要のないコミュニティがあります。</p>
            <p>経済合理性や効率を追求してきた現代社会では、人と人との関わりさえも、少しずつその温かさを失いつつあります。</p>
            <p>アルデルハウスは、都市と集落をつなぎ、暮らしの中にあった人と人との関係を、もう一度結び直す場所です。</p>
          </div>
        </section>
        <section className="wrap editorial-section" id="place">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">住まいについて</h2>
            <Image className="editorial-photo editorial-dining" src="/images/aldel-house-dining.webp" alt="古民家で食卓を囲む暮らしのイメージ" width={1600} height={901} sizes="(max-width: 760px) 92vw, 550px" />
          </div>
          <div className="editorial-body">
            <p>アルデルハウスは、兵庫県赤穂郡上郡町の金内（かなえ）という集落にあります。</p>
            <p>山と田んぼに囲まれた古民家で、それぞれの個室を持ちながら、台所や浴室などを共同で利用するシェアハウスです。</p>
            <h3>設備・環境</h3>
            <ul>
              <li>個室</li>
              <li>共同キッチン</li>
              <li>共同浴室</li>
              <li>共同トイレ</li>
              <li>共有スペース</li>
              <li>田畑</li>
            </ul>
            <p>設備の詳細や所在地、現在の入居状況については、内覧・入居相談の際にご案内します。</p>
          </div>
        </section>
        <section className="wrap editorial-section" id="members">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">こんな人と暮らしたい。</h2>
          </div>
          <div className="editorial-body">
            <p>田舎暮らしの経験や、農業、DIYの技術があるかどうかよりも、日々の暮らしに好奇心を持っていることを大切にしたいと思っています。</p>
            <ul>
              <li>食べることやものづくりが好きな人</li>
              <li>自分の手で何かをつくってみたい人</li>
              <li>知らないことを学ぶのが好きな人</li>
              <li>人と一緒に何かをすることが好きな人</li>
              <li>自分なりのお気に入りの暮らしを見つけたい人</li>
            </ul>
            <p>やりたいことも、得意なことも、人それぞれ。</p>
            <p>それぞれが持っているものを活かしながら、一緒に暮らしをつくっていきたいと思っています。</p>
          </div>
        </section>
        <section className="wrap editorial-section" id="visit">
          <div className="editorial-section-heading">
            <h2 className="section-title serif">アルデルハウスの内覧・入居相談</h2>
          </div>
          <div className="editorial-body">
            <p>アルデルハウスでの暮らしに興味を持ってくださった方は、公式LINEからお問い合わせください。</p>
            <p>実際に家や周辺の環境を見ていただきながら、暮らしのことや入居条件についてお話しします。</p>
            <a className="house-line-link" href={lineUrl} target="_blank" rel="noopener noreferrer">公式LINEで問い合わせる</a>
          </div>
        </section>
        <section className="wrap editorial-section" id="faq">
          <h2 className="section-title serif">よくあるご質問</h2>
          <div className="editorial-body">
            <details className="faq-item"><summary>内覧だけでも可能ですか？</summary><p>はい。公式LINEからお問い合わせください。日程を調整のうえ、現地をご案内します。</p></details>
            <details className="faq-item"><summary>家賃や入居条件を教えてください。</summary><p>費用や契約条件については、個別にご案内します。公式LINEからお問い合わせください。</p></details>
            <details className="faq-item"><summary>農作業や共同作業への参加は必須ですか？</summary><p>共同生活のルールや日々の活動への関わり方については、内覧や入居相談の際にお話しします。</p></details>
            <details className="faq-item"><summary>現在、入居できる部屋はありますか？</summary><p>最新の空室状況は、公式LINEからお問い合わせください。</p></details>
          </div>
        </section>
        <section className="last"><p>ALDEL HOUSE</p><h2 className="serif">当たり前の暮らしを、お気に入りに。</h2><a className="house-line-link" href={lineUrl} target="_blank" rel="noopener noreferrer">公式LINEで内覧・入居を相談する</a></section>
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
