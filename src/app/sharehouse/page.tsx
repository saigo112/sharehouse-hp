import type { Metadata } from "next";
import { AldelHouse } from "@/components/sharehouse/AldelHouse";
import { getFarmSiteGlobals } from "@/libs/farm-microcms";
import { getLineOfficialUrl } from "@/libs/line-official";

export const metadata: Metadata = {
  title: "アルデルハウス | 暮らしを、ともにつくる場所。",
  description:
    "兵庫県上郡町のアルデルハウス。ここでの暮らしと、住まい・内覧についてご案内します。",
  openGraph: {
    title: "アルデルハウス | 暮らしを、ともにつくる場所。",
    description: "兵庫県上郡町の住まいと内覧のご案内。",
  },
  twitter: {
    title: "アルデルハウス | 暮らしを、ともにつくる場所。",
    description: "兵庫県上郡町の住まいと内覧のご案内。",
  },
};

export const revalidate = 60;

export default async function SharehousePage() {
  const globals = await getFarmSiteGlobals();
  return <AldelHouse lineUrl={getLineOfficialUrl(globals)} />;
}
