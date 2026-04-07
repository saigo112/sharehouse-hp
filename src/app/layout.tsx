import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ハチソラハウス | 自給自足の里山シェアハウス",
  description: "兵庫県上郡町の里山で「生きる力」を育む自給自足シェアハウス。無農薬米栽培、狩猟、DIYを一緒に楽しめる住人を募集しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;900&family=Be+Vietnam+Pro:wght@400;500;700&family=Kalam:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
