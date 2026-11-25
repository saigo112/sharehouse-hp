"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["#about", "アルデルハウスについて"],
  ["#life", "暮らし"],
  ["#place", "住まいについて"],
  ["#visit", "内覧・入居相談"],
];

export function HouseNavigation({ lineUrl }: { lineUrl: string }) {
  const [open, setOpen] = useState(false);
  const navigation = (
    <>
      <Link href="/" onClick={() => setOpen(false)}>
        ホーム
      </Link>
      {links.map(([href, label]) => (
        <a key={href} href={href} onClick={() => setOpen(false)}>
          {label}
        </a>
      ))}
      <a
        className="nav-cta"
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
      >
        公式LINEで相談する ↗
      </a>
    </>
  );
  return (
    <header
      className="header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="ALDEL FARM ホームページへ">
          <span className="seal" aria-hidden="true">
            稲
          </span>
          <span className="brand-title">ALDEL FARM</span>
        </Link>
        <nav className="nav" aria-label="メインメニュー">
          {navigation}
        </nav>
        <button
          className="menu"
          type="button"
          aria-expanded={open}
          aria-controls="house-mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "閉じる ×" : "メニュー ☰"}
        </button>
      </div>
      <nav
        className={open ? "mobile-nav open" : "mobile-nav"}
        id="house-mobile-menu"
        aria-label="モバイルメニュー"
      >
        {navigation}
      </nav>
    </header>
  );
}
