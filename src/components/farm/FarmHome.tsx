import Link from "next/link";
import type { FarmArticle, FarmPerson, FarmProject, FarmSiteGlobals } from "@/types/farm-cms";
import type { FarmCalendarEvent } from "@/libs/google-calendar";

const HERO_FALLBACK = "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWYB1nuktR8iDjjUe-4cm8jAxzBtTp6yZt3qolxR9AOwa6WRTlqCQkej7rozeAJd1OQEssx0giUbC1WQ0LsmfJ2mvOqP8K42aTrXJKGPTT2YrH_iS51bRYmrONcBeZJW4iBLqUJkRn-y9lq10rrg1QrByhhdjYUWXjLXpNcxonW4dHMq2s-ui3fgrKql4xFTtEkT4bzDRBMoqzFHMGL816vpg8qVJnD93hF76GnwCrW0RaDXTMAmxAqhc-LphS0I1nFhtenMa5MyF";
const LIFE_FALLBACK = "/images/life-made-by-many-hands.jpg";
const CTA_FALLBACK = "https://lh3.googleusercontent.com/aida-public/AB6AXuDyYKHcRfDIXuE-y03ZplImevO5CjsqB093TLKRVURstpztDpk6-ZlEZWM-NJazzFwkEUUtq7Cq0MHf-UVO9e_IOoTRXKQKy8nIJWl39x8erJQ7Dk8hIbmP0r-F0vhMXYqHDd6GIRl7hz7KVZOS5DiOy71j5bfQAnK4X8hy69-KwmnicNdlnVaCLkaOAEw6p1_o_AtpI-VmBtPqobRj0O22cwHPsP9Y0FhuNq2LmAiACQBYIMQVjbvoUcKzApBBMljJsfIBR5C9niwP";

type FarmHomeProps = {
  globals: FarmSiteGlobals | null;
  articles: FarmArticle[];
  projects: FarmProject[];
  people: FarmPerson[];
  upcomingEvents: FarmCalendarEvent[];
};

const ways = [
  { number: "01", title: "知る・相談する", text: "土地と人を知り、気になることを相談する。", detail: "上郡町・ALDEL FARM・相談窓口", href: "/about" },
  { number: "02", title: "体験する", text: "季節の農や食、手を動かす時間にふれる。", detail: "田畑・鶏・山・古民家・食", href: "/programs" },
  { number: "03", title: "暮らす", text: "この土地の日常に、もう少し深く滞在する。", detail: "アルデルハウス・中長期滞在", href: "/sharehouse" },
  { number: "04", title: "お米を買う", text: "ALDEL FARMで育てたお米を、オンラインで購入する。", detail: "オンラインショップ", href: "https://aldel08.square.site/" },
];

const lifePractices = [
  { title: "育てる", text: "田畑で米や野菜を育て、鶏と暮らす。" },
  { title: "いただく", text: "畑や山の恵みを料理し、みんなで食卓を囲む。" },
  { title: "手を入れる", text: "古民家や道具、田畑や山に手をかけ、次へつなぐ。" },
  { title: "つながる", text: "地域の人から学び、訪れた人と一緒につくる。" },
];

const projectFallbackTitles = ["米", "畑", "鶏", "ジビエ", "古民家", "食", "山", "地域"];

function formatDate(value?: string) {
  if (!value) return "記録を更新中";
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

function eventDateParts(event: FarmCalendarEvent) {
  const start = new Date(event.start);
  return {
    month: new Intl.DateTimeFormat("ja-JP", { month: "short", timeZone: "Asia/Tokyo" }).format(start),
    day: new Intl.DateTimeFormat("ja-JP", { day: "2-digit", timeZone: "Asia/Tokyo" }).format(start),
    weekday: new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(start),
    time: event.allDay ? "終日" : new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" }).format(start),
  };
}

function eventScheduleHref(event: FarmCalendarEvent) {
  const date = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Tokyo" }).format(new Date(event.start));
  const params = new URLSearchParams({ date, activity: event.title });
  return `/schedule?${params.toString()}`;
}

function eventSummary(event: FarmCalendarEvent) {
  if (event.description) return event.description.length > 120 ? `${event.description.slice(0, 120)}…` : event.description;
  if (event.location) return `${event.location}で行う予定です。詳しい内容はLINEでお問い合わせください。`;
  return "内容や参加方法については、日程ページからLINEでお問い合わせください。";
}

export function FarmHome({ globals, articles, projects, people, upcomingEvents }: FarmHomeProps) {
  const heroImage = Array.isArray(globals?.farmHeroImage) ? globals.farmHeroImage[0]?.url : globals?.farmHeroImage?.url;
  const lifeImage = Array.isArray(globals?.farmLifeImage) ? globals.farmLifeImage[0]?.url : globals?.farmLifeImage?.url;
  const heroTitle = globals?.farmHeroTitle || "暮らしを、\nみんなでつくる。";
  const currentProjects = projects.length ? projects : projectFallbackTitles.map((title, index) => ({ id: title, title, summary: ["手をかけ、育て、分け合う。", "里山の営みを暮らしにつなげる。", "土地にあるものから考える。", "命をいただき、味わい尽くす。"][index % 4] }));

  return (
    <main className="overflow-hidden bg-[#fbf9f6] text-on-surface">
      <header className="absolute inset-x-0 top-0 z-20 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <Link href="/" className="font-headline text-lg font-black tracking-[0.12em] md:text-xl">ALDEL FARM</Link>
          <div className="hidden items-center gap-7 text-xs font-bold tracking-wider md:flex">
            <Link href="/about" className="transition-opacity hover:opacity-60">知る・相談する</Link>
            <Link href="/programs" className="transition-opacity hover:opacity-60">体験する</Link>
            <Link href="/stories" className="transition-opacity hover:opacity-60">日々の暮らし</Link>
            <Link href="/sharehouse" className="rounded-full border border-white/70 px-5 py-2.5 transition-colors hover:bg-white hover:text-primary">暮らす</Link>
          </div>
          <a href="#join" className="rounded-full border border-white/70 px-4 py-2 text-xs font-bold md:hidden">関わる</a>
        </nav>
      </header>

      <section className="relative flex min-h-[720px] items-end bg-stone-800 px-5 pb-14 pt-32 md:min-h-screen md:px-10 md:pb-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage || HERO_FALLBACK} alt="上郡町の里山で営む暮らし" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
        <div className="relative mx-auto w-full max-w-7xl text-white">
          <p className="mb-6 font-hand text-lg tracking-wide md:text-xl">KAMIGORI, HYOGO</p>
          <h1 className="whitespace-pre-line font-headline text-[clamp(3rem,8vw,7.25rem)] font-black leading-[0.95] tracking-[-0.05em] drop-shadow-lg">{heroTitle}</h1>
          <p className="mt-8 max-w-md text-sm leading-8 text-white/90 md:text-base">{globals?.farmHeroSubtitle || "兵庫県上郡町で、人と土地と手しごとをつなぎながら、まだ途中の暮らしを育てています。"}</p>
          <a href="#about" className="mt-10 inline-flex items-center gap-3 text-xs font-bold tracking-widest"><span className="h-px w-12 bg-white" />SCROLL TO DISCOVER</a>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-36">
        <div className="md:col-span-4"><p className="font-hand text-primary">What is ALDEL FARM?</p></div>
        <div className="md:col-span-8">
          <h2 className="font-headline text-3xl font-black leading-tight md:text-5xl">{globals?.farmAboutTitle || <>暮らしそのものを、<br />実験し、つくる場所。</>}</h2>
          <p className="mt-9 max-w-2xl whitespace-pre-line text-sm leading-8 text-on-surface-variant md:text-base">{globals?.farmAboutText || "ALDEL FARMは、農業、住まい、食、山、地域の知恵を別々のサービスに分けるのではなく、ひとつの暮らしとして育てていく地域プロジェクトです。\n\n完成された田舎暮らしを用意するのではなく、地域の人や訪れる人と、ともに手を入れ、ともに考える。関わり方は、一人ひとり違っていて構いません。"}</p>
        </div>
      </section>

      <section id="join" className="border-y border-stone-200 bg-[#f1eee7] px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-hand text-primary">How to join</p>
          <h2 className="mt-3 font-headline text-3xl font-black md:text-5xl">どう関わりたいですか？</h2>
          <div className="mt-12 grid border-t border-stone-300 md:mt-16 md:grid-cols-2">
            {ways.map(({ number, title, text, detail, href }) => {
              const content = <><span className="font-hand text-primary">{number}</span><h3 className="mt-6 font-headline text-2xl font-black">{title}</h3><p className="mt-4 text-sm leading-7 text-on-surface-variant">{text}</p><p className="mt-6 text-xs font-bold tracking-wide text-primary">{detail} <span aria-hidden>→</span></p></>;
              return href.startsWith("/") ? <Link href={href} key={title} className="group border-b border-stone-300 px-1 py-9 transition-colors hover:bg-white/60 md:px-8">{content}</Link> : <a href={href} key={title} target="_blank" rel="noopener noreferrer" className="group border-b border-stone-300 px-1 py-9 transition-colors hover:bg-white/60 md:px-8">{content}</a>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-36">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lifeImage || LIFE_FALLBACK} alt="古民家の前で手仕事を囲む人々" className="h-full w-full object-cover" />
          <p className="absolute bottom-4 right-5 font-hand text-sm text-white drop-shadow">A life made by many hands.</p>
        </div>
        <div className="md:order-1">
          <p className="font-hand text-primary">Made of everyday life</p>
          <h2 className="mt-3 font-headline text-3xl font-black leading-tight md:text-5xl">暮らしをつくる、<br />小さな営み。</h2>
          <div className="mt-10 grid border-l border-t border-stone-300 sm:grid-cols-2">
            {lifePractices.map((practice) => (
              <div key={practice.title} className="border-b border-r border-stone-300 px-5 py-6 md:min-h-40 md:px-6 md:py-7">
                <h3 className="font-headline text-xl font-black md:text-2xl">{practice.title}</h3>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{practice.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-8 text-on-surface-variant">育てること、食べること、直すこと、人とつながること。<br />ひとつひとつは小さな営みですが、重なり合うことで、この土地の暮らしになっていきます。</p>
        </div>
      </section>

      <section id="current" className="bg-[#433d35] px-5 py-20 text-[#fbf9f6] md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-hand text-[#febe4e]">Up next</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-headline text-3xl font-black md:text-5xl">近日の作業・イベント。</h2>
              <Link href="/schedule" className="mt-5 inline-flex text-xs font-bold text-[#febe4e]">カレンダーをすべて見る →</Link>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/70">これから行う作業や、参加・見学できる催しをご案内します。予定は天候や現場の状況によって変更になる場合があります。</p>
          </div>

          {upcomingEvents.length ? (
            <div className="mt-12 grid gap-px overflow-hidden border border-white/20 bg-white/20 md:grid-cols-3">
              {upcomingEvents.map((event) => {
                const date = eventDateParts(event);
                return (
                  <Link href={eventScheduleHref(event)} key={event.id} className="group bg-[#433d35] p-7 transition-colors hover:bg-white/5 md:p-9">
                    <div className="flex items-end gap-3 text-[#febe4e]">
                      <p className="font-headline text-5xl font-black leading-none">{date.day}</p>
                      <p className="pb-1 text-xs font-bold leading-5">{date.month}<br />{date.weekday}・{date.time}</p>
                    </div>
                    <h3 className="mt-7 font-headline text-2xl font-black leading-tight group-hover:text-[#febe4e]">{event.title}</h3>
                    {event.location && <p className="mt-3 text-xs font-bold text-[#febe4e]">{event.location}</p>}
                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/70">{eventSummary(event)}</p>
                    <span className="mt-7 inline-flex text-xs font-bold text-[#febe4e]">この日について相談する →</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 border border-white/20 p-7 md:p-10">
              <p className="font-headline text-xl font-black">現在、トップページでご案内中の予定はありません。</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">参加者を募集する作業やイベントが決まり次第、こちらでお知らせします。個別の見学や体験については、日程ページからご相談ください。</p>
              <Link href="/schedule" className="mt-7 inline-flex text-xs font-bold text-[#febe4e]">希望日を相談する →</Link>
            </div>
          )}
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-36"><div className="flex items-end justify-between gap-6"><div><p className="font-hand text-primary">Stories</p><h2 className="mt-3 font-headline text-3xl font-black md:text-5xl">暮らしの記録。</h2></div><Link href="/stories" className="hidden text-xs font-bold text-on-surface-variant hover:text-primary md:block">すべての記録を見る →</Link></div>{articles.length ? <div className="mt-12 grid gap-8 md:grid-cols-3">{articles.map((article) => <Link href={`/stories/${article.id}`} key={article.id} className="group border-t border-stone-300 pt-5"><p className="text-xs text-primary">{formatDate(article.publishedAt)}</p><h3 className="mt-5 font-headline text-xl font-black leading-snug group-hover:text-primary">{article.title}</h3><p className="mt-4 text-sm leading-7 text-on-surface-variant">{article.summary || "この土地で育つ、日々の営みを記録しています。"}</p></Link>)}</div> : <div className="mt-12"><p className="max-w-xl border-l-2 border-secondary-container pl-5 text-sm leading-7 text-on-surface-variant">田植え、古民家の手入れ、食を仕込む日。ALDEL FARMの日常の記録は、これからここに積み重なっていきます。</p><Link href="/stories" className="mt-7 inline-flex text-sm font-bold text-primary">日々の暮らしについて →</Link></div>}</section>

      {(projects.length > 0 || people.length > 0) && <section className="bg-surface-container-low px-5 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-7xl"><p className="font-hand text-primary">People & projects</p><div className="mt-8 grid gap-8 md:grid-cols-2"><div><h2 className="font-headline text-2xl font-black">手をかけていること</h2><div className="mt-6 flex flex-wrap gap-2">{currentProjects.slice(0, 8).map((project) => <span key={project.id} className="rounded-full border border-outline-variant/50 px-4 py-2 text-sm">{project.title}</span>)}</div></div>{people.length > 0 && <div><h2 className="font-headline text-2xl font-black">この場所に関わる人</h2><div className="mt-6 space-y-3">{people.slice(0, 3).map((person) => <p key={person.id} className="border-b border-stone-300 pb-3 text-sm"><strong>{person.name}</strong>{person.role ? ` — ${person.role}` : ""}</p>)}</div></div>}</div></div></section>}

      <section className="relative overflow-hidden px-5 py-24 text-white md:px-10 md:py-36" id="contact"><div className="absolute inset-0 bg-stone-700">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={CTA_FALLBACK} alt="上郡町の夕暮れ" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-[#3c2c20]/65" /></div><div className="relative mx-auto max-w-4xl text-center"><p className="font-hand text-[#febe4e]">Let&apos;s start with a conversation.</p><h2 className="mt-5 font-headline text-3xl font-black leading-tight md:text-5xl">知ってからでも、<br />まだ分からないままでも。</h2><p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/80">土地や暮らしのことを読みながら、気になったことをそのまま相談できます。</p><Link href="/about#contact" className="mt-10 inline-flex rounded-full bg-secondary-container px-7 py-4 text-sm font-black text-on-secondary-container transition-transform hover:scale-105">知る・相談する <span className="ml-3">→</span></Link></div></section>

      <footer className="bg-[#2d2a26] px-5 py-10 text-white/70 md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><p className="font-headline text-sm font-black tracking-[0.15em] text-white">ALDEL FARM</p><div className="flex flex-wrap gap-5 text-xs"><Link href="/about" className="hover:text-white">知る・相談する</Link><Link href="/sharehouse" className="hover:text-white">アルデルハウス</Link><a href="https://aldel08.square.site/" target="_blank" rel="noopener noreferrer" className="hover:text-white">お米を買う</a><a href={globals?.instagramUrl || "#"} className="hover:text-white">Instagram</a></div><p className="text-xs">© {new Date().getFullYear()} ALDEL FARM</p></div></footer>
    </main>
  );
}
