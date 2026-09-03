import Link from "next/link";
import type { ReactNode } from "react";

export function FarmPageHeader() {
  return (
    <header className="bg-[#2d2a26] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link href="/" className="font-headline text-lg font-black tracking-[0.12em] md:text-xl">
          ALDEL FARM
        </Link>
        <div className="flex items-center gap-4 text-xs font-bold md:gap-7">
          <Link href="/about" className="transition-opacity hover:opacity-60">知る・相談する</Link>
          <Link href="/stories" className="hidden transition-opacity hover:opacity-60 sm:inline">日々の暮らし</Link>
          <Link href="/programs" className="hidden transition-opacity hover:opacity-60 md:inline">体験する</Link>
          <Link href="/schedule" className="hidden transition-opacity hover:opacity-60 lg:inline">日程を見る</Link>
          <Link href="/sharehouse" className="rounded-full border border-white/60 px-4 py-2 transition-colors hover:bg-white hover:text-primary">暮らす</Link>
        </div>
      </nav>
    </header>
  );
}

export function FarmPageFooter() {
  return (
    <footer className="bg-[#2d2a26] px-5 py-10 text-white/70 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="font-headline text-sm font-black tracking-[0.15em] text-white">ALDEL FARM</Link>
        <div className="flex flex-wrap gap-5 text-xs">
          <Link href="/about" className="hover:text-white">知る・相談する</Link>
          <Link href="/stories" className="hover:text-white">日々の暮らし</Link>
          <Link href="/schedule" className="hover:text-white">日程を見る</Link>
          <Link href="/sharehouse" className="hover:text-white">アルデルハウス</Link>
          <a href="https://aldel08.square.site/" target="_blank" rel="noopener noreferrer" className="hover:text-white">お米を買う</a>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} ALDEL FARM</p>
      </div>
    </footer>
  );
}

export function FarmPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fbf9f6] text-on-surface">
      <FarmPageHeader />
      <main>{children}</main>
      <FarmPageFooter />
    </div>
  );
}

export function FarmBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
      <Link href="/" className="hover:text-primary">ホーム</Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href || "current"}`} className="flex items-center gap-2">
          <span aria-hidden>/</span>
          {item.href ? <Link href={item.href} className="hover:text-primary">{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function FarmPageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="border-b border-stone-200 bg-[#f1eee7] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-hand text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl whitespace-pre-line font-headline text-4xl font-black leading-[1.15] tracking-[-0.035em] md:text-6xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-sm leading-8 text-on-surface-variant md:text-base">{lead}</p>
      </div>
    </section>
  );
}
