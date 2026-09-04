"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const programs = [
  { id: "visit-and-look-around", title: "見学してみる", note: "約1時間の見学希望日を相談します。" },
  { id: "join-daily-life", title: "暮らしに混ざってみる", note: "1泊以上の滞在希望日を相談します。" },
  { id: "live-in-help", title: "住み込みで手伝う", note: "募集中の作業と滞在期間を確認します。" },
  { id: "move-to-kamigori", title: "上郡に移住したい", note: "オンラインまたは現地での相談日を決めます。" },
] as const;

type ScheduleInquiryProps = {
  initialProgram?: string;
  initialActivities: string[];
  initialFirstChoice?: string;
  lineOfficialId: string;
  lineFriendUrl?: string;
};

export function ScheduleInquiry({ initialProgram, initialActivities, initialFirstChoice, lineOfficialId, lineFriendUrl }: ScheduleInquiryProps) {
  const knownInitialProgram = programs.some((program) => program.id === initialProgram) ? initialProgram : "";
  const [programId, setProgramId] = useState(knownInitialProgram);
  const [firstChoice, setFirstChoice] = useState(/^\d{4}-\d{2}-\d{2}$/.test(initialFirstChoice || "") ? initialFirstChoice! : "");
  const [secondChoice, setSecondChoice] = useState("");
  const [participants, setParticipants] = useState("1");
  const [activities, setActivities] = useState(initialActivities.join("、"));
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const selectedProgram = programs.find((program) => program.id === programId);
  const message = useMemo(() => {
    const lines = [
      "【ALDEL FARM 日程相談】",
      `プログラム：${selectedProgram?.title || "未定・相談したい"}`,
      `第一希望：${firstChoice || "未入力"}`,
      `第二希望：${secondChoice || "未入力"}`,
      `人数：${participants || "未入力"}名`,
    ];
    if (activities.trim()) lines.push(`やってみたいこと・相談内容：${activities.trim()}`);
    if (name.trim()) lines.push(`お名前：${name.trim()}`);
    if (note.trim()) lines.push(`補足：${note.trim()}`);
    lines.push("カレンダーを確認して、上記の日程を相談したいです。");
    return lines.join("\n");
  }, [activities, firstChoice, name, note, participants, secondChoice, selectedProgram]);

  const normalizedLineId = lineOfficialId.startsWith("@") ? lineOfficialId : `@${lineOfficialId}`;
  const lineMessageUrl = `https://line.me/R/oaMessage/${encodeURIComponent(normalizedLineId)}/?${encodeURIComponent(message)}`;
  const friendUrl = lineFriendUrl || `https://line.me/R/ti/p/${encodeURIComponent(normalizedLineId)}`;

  async function copyMessage() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(message);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = message;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!copied) throw new Error("Copy command failed");
      }
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 5000);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = message;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!copied) throw new Error("Copy command failed");
        setCopyStatus("copied");
        window.setTimeout(() => setCopyStatus("idle"), 5000);
      } catch {
        setCopyStatus("error");
      }
    }
  }

  return (
    <section id="inquiry" className="scroll-mt-8 border-t border-stone-300 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="font-hand text-primary">Send your request</p>
            <h2 className="mt-3 font-headline text-3xl font-black leading-tight">希望内容をまとめて、LINEで相談する</h2>
            <p className="mt-5 text-sm leading-8 text-on-surface-variant">入力内容はLINEのメッセージに引き継がれます。LINEが開いた後、内容を確認して送信してください。</p>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-6">
              <fieldset>
                <legend className="text-sm font-black">1. プログラム</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {programs.map((program) => {
                    const selected = program.id === programId;
                    return (
                      <button key={program.id} type="button" aria-pressed={selected} onClick={() => setProgramId(program.id)} className={`rounded-2xl border p-4 text-left transition-colors ${selected ? "border-primary bg-primary text-white" : "border-stone-300 bg-white hover:border-primary"}`}>
                        <strong className="block text-sm">{program.title}</strong>
                        <span className={`mt-2 block text-xs leading-5 ${selected ? "text-white/75" : "text-on-surface-variant"}`}>{program.note}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-black">2. 第一希望日
                  <input type="date" value={firstChoice} onChange={(event) => setFirstChoice(event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-black">第二希望日
                  <input type="date" value={secondChoice} onChange={(event) => setSecondChoice(event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal" />
                </label>
              </div>

              <label className="text-sm font-black">3. 参加人数
                <input type="number" min="1" inputMode="numeric" value={participants} onChange={(event) => setParticipants(event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal sm:max-w-xs" />
              </label>

              <label className="text-sm font-black">4. やってみたいこと・相談内容
                <textarea rows={3} value={activities} onChange={(event) => setActivities(event.target.value)} placeholder="例：畑仕事と鶏の世話に興味があります" className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal leading-7" />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-black">お名前（任意）
                  <input type="text" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal" />
                </label>
                <label className="text-sm font-black">補足（任意）
                  <input type="text" value={note} onChange={(event) => setNote(event.target.value)} placeholder="宿泊日数、年齢など" className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal" />
                </label>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#433d35] p-6 text-white">
              <p className="text-xs font-bold text-[#febe4e]">LINEに引き継ぐ内容</p>
              <pre className="mt-4 whitespace-pre-wrap font-body text-xs leading-7 text-white/75">{message}</pre>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={lineMessageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container">
                  LINEでこの内容を送る <span className="ml-3" aria-hidden>→</span>
                </a>
                <button type="button" onClick={copyMessage} className="inline-flex rounded-full border border-white/50 px-6 py-3.5 text-sm font-black transition-colors hover:bg-white hover:text-[#433d35]">
                  {copyStatus === "copied" ? "コピーしました" : copyStatus === "error" ? "コピーできませんでした" : "内容をコピー"}
                </button>
              </div>
              <p className="mt-4 text-xs leading-6 text-white/60">PC版LINEをご利用の場合は「内容をコピー」して、トーク画面に貼り付けてください。</p>
              <p className="sr-only" aria-live="polite">{copyStatus === "copied" ? "LINEへの相談内容をコピーしました。" : copyStatus === "error" ? "内容をコピーできませんでした。" : ""}</p>
              <a href={friendUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-xs font-bold text-white/75 underline underline-offset-4">まだ友だちでない場合は、ALDEL FARMを友だち追加</a>
            </div>

            <p className="mt-5 text-xs leading-6 text-on-surface-variant">日程は送信時点では確定しません。現場と宿泊場所の状況を確認した後、LINEでお返事します。</p>
            <Link href="/programs" className="mt-5 inline-flex text-sm font-bold text-primary">プログラム一覧へ戻る</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
