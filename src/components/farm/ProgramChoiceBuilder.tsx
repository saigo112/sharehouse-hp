"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Choice = { id: string; title: string; description: string };
type ScheduleItem = { label: string; text: string };
type ProgramConfig = {
  heading: string;
  introduction: string;
  choices: Choice[];
  buildSchedule: (selected: Choice[]) => ScheduleItem[];
};

const configs: Record<string, ProgramConfig> = {
  "visit-and-look-around": {
    heading: "見てみたい場所を選ぶ",
    introduction: "複数選択できます。当日の作業や立ち入り状況に合わせて、実際の案内場所を相談します。",
    choices: [
      { id: "village", title: "集落", description: "道や水路、周囲の風景を歩きます。" },
      { id: "house", title: "アルデルハウス", description: "住まいと共用部分をご案内します。" },
      { id: "fields", title: "田畑", description: "その季節の作物と作業を見ます。" },
      { id: "chickens", title: "鶏小屋", description: "鶏のいる日常と世話の様子を見ます。" },
    ],
    buildSchedule: (selected) => [
      { label: "はじめに", text: "到着後、見たい場所と質問したいことを確認します。" },
      { label: "見学", text: selected.length ? `${selected.map((item) => item.title).join("、")}を中心にご案内します。` : "選択した場所を中心に、約1時間を目安にご案内します。" },
      { label: "おわりに", text: "気になったことを質問し、次の関わり方を相談できます。" },
    ],
  },
  "join-daily-life": {
    heading: "やってみたいことを選ぶ",
    introduction: "複数選択できます。選んだ内容を午前と午後に組み込み、1日の参考例をつくります。",
    choices: [
      { id: "rice", title: "田んぼのしごと", description: "種まき、田植え、見回り、草取りなど。" },
      { id: "field", title: "畑のしごと", description: "土づくり、畝づくり、植え付け、収穫など。" },
      { id: "chicken", title: "鶏の世話", description: "餌の仕込みや鶏小屋の掃除など。" },
      { id: "kominka", title: "古民家・集落の手入れ", description: "掃除、庭、水路、補修など。" },
      { id: "food", title: "食の手しごと", description: "味噌、ジャム、ジャーキーなど。" },
      { id: "mountain", title: "山・竹林のしごと", description: "竹林整備、薪割り、竹炭、菌打ちなど。" },
      { id: "gibier", title: "ジビエ・狩猟を知る", description: "罠の見回り、鹿肉の加工、食卓まで。" },
    ],
    buildSchedule: (selected) => {
      const morning = selected[0]?.title || "その日に必要な作業";
      const afternoon = selected[1]?.title || selected[0]?.title || "その日に必要な作業";
      return [
        { label: "朝", text: "住人と顔を合わせ、その日の予定を相談します。" },
        { label: "午前", text: `${morning}に加わります。` },
        { label: "昼", text: "みんなで食事をとり、午後の内容を確認します。" },
        { label: "午後", text: `${afternoon}に加わります。` },
        { label: "夕方", text: "片付け、入浴、自由時間。" },
        { label: "夜", text: "みんなでご飯をつくり、食卓を囲みます。食費は割り勘です。" },
      ];
    },
  },
  "live-in-help": {
    heading: "関心のある作業を選ぶ",
    introduction: "実際の募集は、人手が必要な時期と作業内容が決まったときに行います。",
    choices: [
      { id: "planting", title: "田植え", description: "田植え前後の準備を含む季節作業。" },
      { id: "harvest", title: "収穫", description: "稲や果樹など、収穫期の作業。" },
      { id: "maintenance", title: "草刈り・水路", description: "農地や集落を保つための共同作業。" },
      { id: "repair", title: "古民家・竹林", description: "建物や山の環境を整える作業。" },
    ],
    buildSchedule: (selected) => [
      { label: "参加前", text: "募集期間、作業内容、滞在条件、安全上の注意を確認します。" },
      { label: "滞在開始", text: "生活場所と作業場所を案内し、担当者と作業を確認します。" },
      { label: "期間中", text: selected.length ? `${selected.map((item) => item.title).join("、")}に関する募集がある場合にご案内します。` : "募集時に示された作業へ継続して参加します。" },
      { label: "終了時", text: "作業と滞在を振り返り、今後の関わり方を相談します。" },
    ],
  },
  "move-to-kamigori": {
    heading: "相談したいことを選ぶ",
    introduction: "まだ移住を決めていなくても構いません。知りたいことを整理するところから始めます。",
    choices: [
      { id: "housing", title: "住まい", description: "アルデルハウスや町内での住まい方。" },
      { id: "work", title: "仕事・農業", description: "地域での仕事や農のある暮らし。" },
      { id: "community", title: "地域の日常", description: "集落、人との関わり、日々の環境。" },
      { id: "people", title: "人とつながる", description: "相談内容に応じて、地域の人をご紹介します。" },
      { id: "trial", title: "滞在して確かめる", description: "見学や短期滞在から始める方法。" },
      { id: "support", title: "町の支援制度", description: "上郡町の公式窓口や公開情報。" },
    ],
    buildSchedule: (selected) => [
      { label: "移住相談", text: selected.length ? `${selected.map((item) => item.title).join("、")}について知りたいことを伺います。` : "移住を考えた理由や、気になっていることを伺います。" },
      { label: "情報提供", text: "希望と状況を整理し、必要な地域情報をお伝えします。" },
      { label: "人の紹介", text: "相談内容に合う地域の人がいる場合は、相手方の了承を得たうえでご紹介します。" },
      { label: "次の一歩", text: "見学や滞在、町の公式窓口など、次に確かめることを一緒に整理します。" },
    ],
  },
};

const aliases: Record<string, string> = {
  "i-4rd6b2snh": "visit-and-look-around",
  "nms1emdyc3": "join-daily-life",
};

export function ProgramChoiceBuilder({ programKey }: { programKey: string }) {
  const key = aliases[programKey] || programKey;
  const config = configs[key];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selected = useMemo(() => config?.choices.filter((choice) => selectedIds.includes(choice.id)) || [], [config, selectedIds]);

  if (!config) return null;

  function toggle(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  const scheduleParams = new URLSearchParams({ program: key });
  selected.forEach((choice) => scheduleParams.append("activity", choice.title));

  return (
    <section className="mt-16 border-t border-stone-300 pt-12 md:mt-24 md:pt-16">
      <p className="font-hand text-primary">Build your plan</p>
      <h2 className="mt-3 font-headline text-2xl font-black md:text-4xl">{config.heading}</h2>
      <p className="mt-5 max-w-3xl text-sm leading-8 text-on-surface-variant">{config.introduction}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {config.choices.map((choice) => {
          const isSelected = selectedIds.includes(choice.id);
          return (
            <button key={choice.id} type="button" aria-pressed={isSelected} onClick={() => toggle(choice.id)} className={`rounded-2xl border p-5 text-left transition-colors ${isSelected ? "border-primary bg-primary text-white" : "border-stone-300 bg-[#fbf9f6] hover:border-primary"}`}>
              <span className="flex items-center justify-between gap-3"><strong className="font-headline text-base font-black">{choice.title}</strong><span className="material-symbols-outlined text-lg" aria-hidden>{isSelected ? "check_circle" : "add_circle"}</span></span>
              <span className={`mt-3 block text-xs leading-6 ${isSelected ? "text-white/80" : "text-on-surface-variant"}`}>{choice.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl bg-[#433d35] p-7 text-white md:p-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="font-hand text-[#febe4e]">Reference plan</p><h3 className="mt-2 font-headline text-2xl font-black">参考プラン</h3></div><p className="text-xs text-white/60">実際の内容・順番・時間は事前相談で決まります。</p></div>
        <div className="mt-7 grid gap-px overflow-hidden border border-white/20 bg-white/20 sm:grid-cols-2">
          {config.buildSchedule(selected).map((item) => <div key={item.label} className="bg-[#433d35] p-5"><p className="text-xs font-bold text-[#febe4e]">{item.label}</p><p className="mt-2 text-sm leading-7 text-white/75">{item.text}</p></div>)}
        </div>
        <Link href={`/schedule?${scheduleParams.toString()}`} className="mt-7 inline-flex items-center rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container">
          この内容で日程を見る <span className="ml-3" aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
