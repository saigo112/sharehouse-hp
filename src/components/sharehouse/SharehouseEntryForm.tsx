"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";

const occupationOptions = [
  "会社員・公務員",
  "自営業・フリーランス",
  "学生",
  "その他",
];

const viewingTimeOptions = [
  "午前（10:00 - 12:00）",
  "午後（13:00 - 15:00）",
  "夕方（15:00 - 17:00）",
];

const interestOptions = [
  "共同生活",
  "里山コミュニティ",
  "家庭菜園",
  "DIY",
  "自給自足",
  "里山再生",
  "特になし",
];

const discoveryOptions = [
  "ウェブサイト（公式）",
  "SNS（Instagram、Xなど）",
  "賃貸情報サイト（SUUMO、HOME'Sなど）",
  "知人・友人からの紹介",
  "その他",
];

type EntryFormValues = {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  occupation: string;
  occupationOther: string;
  moveInTiming: string;
  stayDuration: string;
  viewingFirstChoice: string;
  viewingSecondChoice: string;
  viewingTimes: string[];
  viewingParticipants: string;
  interests: string[];
  concerns: string;
  introduction: string;
  discoverySource: string;
  discoverySourceOther: string;
  privacyAccepted: boolean;
};

type SharehouseEntryFormProps = {
  lineOfficialId: string;
  lineFriendUrl?: string;
};

const initialValues: EntryFormValues = {
  name: "",
  furigana: "",
  email: "",
  phone: "",
  occupation: "",
  occupationOther: "",
  moveInTiming: "",
  stayDuration: "",
  viewingFirstChoice: "",
  viewingSecondChoice: "",
  viewingTimes: [],
  viewingParticipants: "1",
  interests: [],
  concerns: "",
  introduction: "",
  discoverySource: "",
  discoverySourceOther: "",
  privacyAccepted: false,
};

const fieldClassName =
  "mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal text-on-surface outline-none transition-colors placeholder:text-stone-400 focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClassName = "block text-sm font-black text-on-surface";

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function SharehouseEntryForm({ lineOfficialId, lineFriendUrl }: SharehouseEntryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<EntryFormValues>(initialValues);
  const [groupError, setGroupError] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const normalizedLineId = lineOfficialId.startsWith("@") ? lineOfficialId : `@${lineOfficialId}`;
  const friendUrl = lineFriendUrl || `https://line.me/R/ti/p/${encodeURIComponent(normalizedLineId)}`;

  const message = useMemo(() => {
    const lines = [
      "【アルデルハウス 入居・内覧相談】",
      `お名前：${values.name || "未入力"}`,
      `フリガナ：${values.furigana || "未入力"}`,
      `メールアドレス：${values.email || "未入力"}`,
      `電話番号：${values.phone || "未入力"}`,
      `現在の職業：${values.occupation === "その他" && values.occupationOther ? `その他（${values.occupationOther}）` : values.occupation || "未入力"}`,
      `希望する入居時期：${values.moveInTiming || "未入力"}`,
      `希望する滞在期間：${values.stayDuration || "未入力"}`,
      `内覧第一希望：${values.viewingFirstChoice || "未入力"}`,
      `内覧第二希望：${values.viewingSecondChoice || "未入力"}`,
      `内覧希望時間帯：${values.viewingTimes.join("、") || "未入力"}`,
      `内覧人数：${values.viewingParticipants || "未入力"}名`,
      `興味があること：${values.interests.join("、") || "未入力"}`,
      `共同生活への懸念・質問：${values.concerns || "未入力"}`,
      `自己紹介：${values.introduction || "未入力"}`,
      `このシェアハウスを知ったきっかけ：${values.discoverySource === "その他" && values.discoverySourceOther ? `その他（${values.discoverySourceOther}）` : values.discoverySource || "未入力"}`,
      `個人情報保護方針：${values.privacyAccepted ? "同意済み" : "未同意"}`,
      "",
      "上記の内容で、アルデルハウスへの入居・内覧について相談したいです。",
    ];
    return lines.join("\n");
  }, [values]);

  const lineMessageUrl = `https://line.me/R/oaMessage/${encodeURIComponent(normalizedLineId)}/?${encodeURIComponent(message)}`;

  function updateValue<K extends keyof EntryFormValues>(key: K, value: EntryFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validateGroups() {
    if (values.viewingTimes.length === 0) {
      setGroupError("内覧希望の時間帯を1つ以上選んでください。");
      return false;
    }
    if (values.interests.length === 0) {
      setGroupError("興味があることを1つ以上選んでください。");
      return false;
    }
    setGroupError("");
    return true;
  }

  function validateForm() {
    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return false;
    }
    return validateGroups();
  }

  function openLine(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) return;
    window.open(lineMessageUrl, "_blank", "noopener,noreferrer");
  }

  async function copyMessage() {
    if (!validateForm()) return;
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
      setCopyStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={openLine} className="space-y-10">
      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-9">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-hand font-black text-white">1</span>
          <div>
            <h2 className="font-headline text-2xl font-black">基本情報</h2>
            <p className="mt-2 text-sm leading-7 text-on-surface-variant">ご本人への連絡に必要な情報を入力してください。</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className={labelClassName}>お名前（漢字）<span className="ml-2 text-xs text-red-700">必須</span>
            <input required autoComplete="name" value={values.name} onChange={(event) => updateValue("name", event.target.value)} className={fieldClassName} />
          </label>
          <label className={labelClassName}>フリガナ（カタカナ）<span className="ml-2 text-xs text-red-700">必須</span>
            <input required value={values.furigana} onChange={(event) => updateValue("furigana", event.target.value)} className={fieldClassName} />
          </label>
          <label className={labelClassName}>メールアドレス<span className="ml-2 text-xs text-red-700">必須</span>
            <input required type="email" autoComplete="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} className={fieldClassName} />
          </label>
          <label className={labelClassName}>電話番号（日中連絡が取れる番号）<span className="ml-2 text-xs text-red-700">必須</span>
            <input required type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} className={fieldClassName} />
          </label>
          <label className={`${labelClassName} md:col-span-2`}>現在の職業<span className="ml-2 text-xs text-red-700">必須</span>
            <select required value={values.occupation} onChange={(event) => updateValue("occupation", event.target.value)} className={fieldClassName}>
              <option value="">選択してください</option>
              {occupationOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          {values.occupation === "その他" && (
            <label className={`${labelClassName} md:col-span-2`}>職業をご記入ください<span className="ml-2 text-xs text-red-700">必須</span>
              <input required value={values.occupationOther} onChange={(event) => updateValue("occupationOther", event.target.value)} className={fieldClassName} />
            </label>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-9">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-hand font-black text-white">2</span>
          <div>
            <h2 className="font-headline text-2xl font-black">入居・内覧の希望</h2>
            <p className="mt-2 text-sm leading-7 text-on-surface-variant">入居時期や滞在期間が決まっていない場合は「未定」と入力し、内覧日は候補日を選んでください。</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className={labelClassName}>ご希望の入居時期<span className="ml-2 text-xs text-red-700">必須</span>
            <input required value={values.moveInTiming} onChange={(event) => updateValue("moveInTiming", event.target.value)} placeholder="例：2026年10月ごろ、未定" className={fieldClassName} />
          </label>
          <label className={labelClassName}>ご希望の滞在期間<span className="ml-2 text-xs text-red-700">必須</span>
            <input required value={values.stayDuration} onChange={(event) => updateValue("stayDuration", event.target.value)} placeholder="例：6か月、1年、未定" className={fieldClassName} />
          </label>
          <label className={labelClassName}>内覧ご希望日（第一希望）<span className="ml-2 text-xs text-red-700">必須</span>
            <input required type="date" value={values.viewingFirstChoice} onChange={(event) => updateValue("viewingFirstChoice", event.target.value)} className={fieldClassName} />
          </label>
          <label className={labelClassName}>内覧ご希望日（第二希望）<span className="ml-2 text-xs text-red-700">必須</span>
            <input required type="date" value={values.viewingSecondChoice} onChange={(event) => updateValue("viewingSecondChoice", event.target.value)} className={fieldClassName} />
          </label>
        </div>

        <fieldset className="mt-7">
          <legend className="text-sm font-black">内覧ご希望の時間帯<span className="ml-2 text-xs text-red-700">必須・複数選択可</span></legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {viewingTimeOptions.map((option) => (
              <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 transition-colors ${values.viewingTimes.includes(option) ? "border-primary bg-primary/5" : "border-stone-300"}`}>
                <input type="checkbox" checked={values.viewingTimes.includes(option)} onChange={() => updateValue("viewingTimes", toggleArrayValue(values.viewingTimes, option))} className="mt-1 h-4 w-4 accent-primary" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className={`${labelClassName} mt-7`}>内覧時のご希望人数（ご本人含む）<span className="ml-2 text-xs text-red-700">必須</span>
          <input required type="number" min="1" inputMode="numeric" value={values.viewingParticipants} onChange={(event) => updateValue("viewingParticipants", event.target.value)} className={`${fieldClassName} sm:max-w-xs`} />
        </label>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-9">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-hand font-black text-white">3</span>
          <div>
            <h2 className="font-headline text-2xl font-black">関心・自己紹介</h2>
            <p className="mt-2 text-sm leading-7 text-on-surface-variant">お互いを知るための参考としてお聞かせください。</p>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-black">シェアハウスで興味があること<span className="ml-2 text-xs text-red-700">必須・複数選択可</span></legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {interestOptions.map((option) => (
              <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors ${values.interests.includes(option) ? "border-primary bg-primary/5" : "border-stone-300"}`}>
                <input type="checkbox" checked={values.interests.includes(option)} onChange={() => updateValue("interests", toggleArrayValue(values.interests, option))} className="h-4 w-4 accent-primary" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-6">
          <label className={labelClassName}>共同生活に対する懸念点やご質問<span className="ml-2 text-xs text-red-700">必須</span>
            <textarea required rows={4} value={values.concerns} onChange={(event) => updateValue("concerns", event.target.value)} placeholder="特にない場合は「なし」とご記入ください" className={`${fieldClassName} leading-7`} />
          </label>
          <label className={labelClassName}>ライフスタイルについての簡単な自己紹介<span className="ml-2 text-xs text-red-700">必須</span>
            <textarea required rows={5} value={values.introduction} onChange={(event) => updateValue("introduction", event.target.value)} placeholder="例：週末の過ごし方、趣味など" className={`${fieldClassName} leading-7`} />
          </label>
          <label className={labelClassName}>このシェアハウスをどこでお知りになりましたか？<span className="ml-2 text-xs text-red-700">必須</span>
            <select required value={values.discoverySource} onChange={(event) => updateValue("discoverySource", event.target.value)} className={fieldClassName}>
              <option value="">選択してください</option>
              {discoveryOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          {values.discoverySource === "その他" && (
            <label className={labelClassName}>知ったきっかけをご記入ください<span className="ml-2 text-xs text-red-700">必須</span>
              <input required value={values.discoverySourceOther} onChange={(event) => updateValue("discoverySourceOther", event.target.value)} className={fieldClassName} />
            </label>
          )}
        </div>
      </section>

      <section className="rounded-3xl bg-[#433d35] p-5 text-white shadow-lg md:p-9">
        <p className="font-hand text-[#febe4e]">Check & send</p>
        <h2 className="mt-3 font-headline text-2xl font-black">入力内容を確認してLINEへ</h2>
        <p className="mt-4 text-sm leading-7 text-white/75">入力内容はこのサイトには保存されません。LINEが開いた後、内容を確認して送信してください。</p>

        <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/25 p-4 text-sm leading-7">
          <input required type="checkbox" checked={values.privacyAccepted} onChange={(event) => updateValue("privacyAccepted", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#febe4e]" />
          <span><Link href="/sharehouse/privacy" target="_blank" className="font-bold underline underline-offset-4">個人情報保護方針</Link>を確認し、入力内容をLINE公式アカウントへ送ることに同意します。</span>
        </label>

        {groupError && <p role="alert" className="mt-4 rounded-xl bg-red-950/40 px-4 py-3 text-sm text-red-100">{groupError}</p>}

        <details className="mt-6 rounded-2xl bg-black/15 p-4">
          <summary className="cursor-pointer text-sm font-black">LINEに引き継ぐ本文を確認する</summary>
          <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap font-body text-xs leading-7 text-white/75">{message}</pre>
        </details>

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="submit" className="inline-flex items-center rounded-full bg-secondary-container px-6 py-3.5 text-sm font-black text-on-secondary-container transition-transform hover:-translate-y-0.5">
            LINEでこの内容を送る <span className="ml-3" aria-hidden>→</span>
          </button>
          <button type="button" onClick={copyMessage} className="inline-flex rounded-full border border-white/50 px-6 py-3.5 text-sm font-black transition-colors hover:bg-white hover:text-[#433d35]">
            {copyStatus === "copied" ? "コピーしました" : copyStatus === "error" ? "コピーできませんでした" : "内容をコピー"}
          </button>
        </div>
        <p className="mt-4 text-xs leading-6 text-white/60">PCでは「内容をコピー」を押し、LINEのトーク画面へ貼り付けてください。</p>
        <p className="sr-only" aria-live="polite">{copyStatus === "copied" ? "LINEへの相談内容をコピーしました。" : copyStatus === "error" ? "内容をコピーできませんでした。" : ""}</p>
        <a href={friendUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-xs font-bold text-white/75 underline underline-offset-4">まだ友だちでない場合は、ALDEL FARMを友だち追加</a>
      </section>
    </form>
  );
}
