"use client";

import { useEffect, useState } from "react";

const sections = [
  ["#philosophy", "私の原点"],
  ["#story", "私とお米の物語"],
  ["#kanahe", "金瓮米"],
  ["#life", "日々の記録"],
  ["#community", "暮らしと仲間"],
];

export function MobileFarmMenu({ lineUrl }: { lineUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <button
        type="button"
        className="menu-btn"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "閉じる ×" : "メニュー ☰"}
      </button>
      <nav
        className={open ? "mobile-panel open" : "mobile-panel"}
        id="mobile-menu"
        aria-label="モバイルナビゲーション"
      >
        {sections.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          お米を注文する ↗
        </a>
      </nav>
    </div>
  );
}

export function FarmHomeInteractions() {
  useEffect(() => {
    function openLinkedStory() {
      const id = window.location.hash.slice(1);
      const story = document.getElementById(id);
      if (
        story instanceof HTMLDetailsElement &&
        story.classList.contains("journal-entry")
      ) {
        story.open = true;
      }
    }
    openLinkedStory();
    window.addEventListener("hashchange", openLinkedStory);
    return () => window.removeEventListener("hashchange", openLinkedStory);
  }, []);
  return null;
}
