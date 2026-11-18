import type { Metadata } from "next";
import { FarmHome } from "@/components/farm/FarmHome";
import { getFarmHomepageData } from "@/libs/farm-microcms";

const title = "ALDEL FARM | 生きることを、もっと味わい深く。";
const description =
  "兵庫県上郡町で暮らしをつくるアルデルファーム。米づくりの物語と、金瓮米をご紹介します。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    locale: "ja_JP",
    type: "website",
    siteName: "ALDEL FARM",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const revalidate = 60;

export default async function Home() {
  const { siteGlobals, articles } = await getFarmHomepageData();
  return <FarmHome globals={siteGlobals} articles={articles} />;
}
