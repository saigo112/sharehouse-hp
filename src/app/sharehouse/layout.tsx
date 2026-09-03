import type { Metadata } from "next";

/** Keep the established Al Del House identity and SEO independent from the farm entrance. */
export const metadata: Metadata = {
  title: {
    default: "アルデルハウス (Al Del House) | 自給自足の里山シェアハウス",
    template: "%s",
  },
  description: "兵庫県上郡町の里山で「生きる力」を育む自給自足シェアハウス。無農薬米栽培、狩猟、DIYを一緒に楽しめる住人を募集しています。",
  openGraph: {
    title: "アルデルハウス (Al Del House) | 自給自足の里山シェアハウス",
    description: "兵庫県上郡町の里山で「生きる力」を育む自給自足シェアハウス。",
    type: "website",
    locale: "ja_JP",
    siteName: "アルデルハウス",
  },
  twitter: {
    card: "summary_large_image",
    title: "アルデルハウス (Al Del House)",
    description: "兵庫県上郡町の里山で「生きる力」を育む自給自足シェアハウス。",
  },
};

export default function SharehouseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
