import type { Metadata } from "next";
import "./globals.css";

const metadataBase = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "ALDEL FARM | 暮らしを、みんなでつくる。",
    template: "%s | ALDEL FARM",
  },
  description: "兵庫県赤穂郡上郡町で、農、食、住まい、人のつながりを育てる地域プロジェクト。土地や暮らしを知り、体験し、相談できる入口です。",
  openGraph: {
    title: "ALDEL FARM | 暮らしを、みんなでつくる。",
    description: "兵庫県赤穂郡上郡町で、人・土地・技術とともに暮らしをつくる地域プロジェクト。",
    type: "website",
    locale: "ja_JP",
    siteName: "ALDEL FARM",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALDEL FARM | 暮らしを、みんなでつくる。",
    description: "兵庫県赤穂郡上郡町で、人・土地・技術とともに暮らしをつくる地域プロジェクト。",
  },
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
