import { redirect } from "next/navigation";

export default function Home() {
  // 将来は総合エントランスになるが、現在はシェアハウス募集がメインのためリダイレクト
  redirect("/sharehouse");
}
