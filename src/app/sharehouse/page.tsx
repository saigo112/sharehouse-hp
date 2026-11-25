import type { Metadata } from "next";
import { AldelHouse } from "@/components/sharehouse/AldelHouse";
import { getFarmSiteGlobals } from "@/libs/farm-microcms";
import { getLineOfficialUrl } from "@/libs/line-official";

const title = "アルデルハウス｜暮らしを、もっと遊ぼう。｜ALDEL FARM";
const description =
  "兵庫県赤穂郡上郡町の里山にある古民家シェアハウス、アルデルハウス。米づくりや畑、DIYなど、仲間とともに暮らしをつくりながら、都市と集落をつなぐ場所です。";
const url = "https://www.aldel08.com/sharehouse";
const image = {
  url: "https://www.aldel08.com/images/aldel-house-hero.jpg",
  width: 1365,
  height: 2047,
  alt: "アルデルハウスの古民家の前に並ぶ人たち",
};

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    locale: "ja_JP",
    siteName: "ALDEL FARM",
    images: [image],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export const revalidate = 60;

export default async function SharehousePage() {
  const globals = await getFarmSiteGlobals();
  return <AldelHouse lineUrl={getLineOfficialUrl(globals)} />;
}
