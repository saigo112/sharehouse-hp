"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { ScheduleAdminEvent, ScheduleAdminInput } from "@/libs/google-calendar-admin";

const kinds: Array<{ value: ScheduleAdminInput["kind"]; label: string; help: string }> = [
  { value: "availability", label: "宿泊・見学受付", help: "宿泊、見学、体験などを相談できる日" },
  { value: "event", label: "イベント", help: "体験会や季節の催しの開催日" },
  { value: "workstay", label: "住み込み募集", help: "住み込みで手伝ってもらう募集期間" },
];

const detailTemplates: Record<ScheduleAdminInput["kind"], Array<{ id: string; label: string; content: string }>> = {
  availability: [
    {
      id: "stay",
      label: "宿泊受付",
      content: `受け入れ内容：
宿泊できる期間：
受け入れ人数：
食事：
持ち物：
申込期限：
その他：`,
    },
    {
      id: "visit",
      label: "見学・体験受付",
      content: `相談できる内容：
当日の流れ：
所要時間：
持ち物：
申込期限：
その他：`,
    },
  ],
  event: [
    {
      id: "experience-event",
      label: "体験イベント",
      content: `イベント内容：
対象：
定員：
参加費：
持ち物：
申込期限：
雨天時：
その他：`,
    },
    {
      id: "gathering",
      label: "交流会・集まり",
      content: `内容：
対象：
定員：
参加費：
持ち物：
申込期限：
その他：`,
    },
  ],
  workstay: [
    {
      id: "live-in",
      label: "住み込み募集",
      content: `主な作業：
滞在期間：
募集人数：
宿泊・食事：
参加条件：
持ち物：
申込期限：
その他：`,
    },
    {
      id: "short-help",
      label: "短期のお手伝い募集",
      content: `主な作業：
作業時間：
募集人数：
宿泊：
食事：
持ち物：
参加条件：
その他：`,
    },
  ],
};

function localDate() {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(new Date());
}

function blankForm(): ScheduleAdminInput {
  const today = localDate();
  return { kind: "availability", title: "", description: "", location: "", startDate: today, endDate: today, allDay: true, startTime: "10:00", endTime: "16:00", closed: false, featured: false };
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  const body = await response.json().catch(() => ({})) as T & { message?: string };
  if (!response.ok) throw new Error(body.message || "処理に失敗しました。");
  return body;
}

function formatPeriod(event: ScheduleAdminEvent) {
  const date = (value: string) => new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short", day: "numeric", weekday: "short" }).format(new Date(`${value}T00:00:00+09:00`));
  const period = event.startDate === event.endDate ? date(event.startDate) : `${date(event.startDate)}〜${date(event.endDate)}`;
  return event.allDay ? period : `${period} ${event.startTime}〜${event.endTime}`;
}

function kindLabel(kind: ScheduleAdminInput["kind"]) {
  return kinds.find((item) => item.value === kind)?.label || kind;
}

export function ScheduleManager() {
  const [checking, setChecking] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<ScheduleAdminEvent[]>([]);
  const [form, setForm] = useState<ScheduleAdminInput>(blankForm);
  const [templateId, setTemplateId] = useState(detailTemplates.availability[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const body = await api<{ events: ScheduleAdminEvent[] }>("/api/schedule-admin/events");
      setEvents(body.events);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "予定を読み込めませんでした。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    api<{ authenticated: boolean; configured: boolean }>("/api/schedule-admin/session")
      .then((body) => {
        setAuthenticated(body.authenticated);
        setConfigured(body.configured);
        if (body.authenticated) void loadEvents();
      })
      .catch(() => setError("ログイン状態を確認できませんでした。"))
      .finally(() => setChecking(false));
  }, [loadEvents]);

  const selectedKind = useMemo(() => kinds.find((kind) => kind.value === form.kind)!, [form.kind]);
  const availableTemplates = detailTemplates[form.kind];

  function changeKind(kind: ScheduleAdminInput["kind"]) {
    update("kind", kind);
    setTemplateId(detailTemplates[kind][0].id);
  }

  function applyDetailTemplate() {
    const template = availableTemplates.find((item) => item.id === templateId);
    if (!template) return;
    if (form.description?.trim() && !window.confirm("現在入力されている詳しい内容を、選んだ定型文に置き換えますか？")) return;
    update("description", template.content);
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api("/api/schedule-admin/session", { method: "POST", body: JSON.stringify({ password }) });
      setAuthenticated(true);
      setPassword("");
      await loadEvents();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "ログインできませんでした。");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await api("/api/schedule-admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setEvents([]);
    resetForm();
  }

  function update<K extends keyof ScheduleAdminInput>(key: K, value: ScheduleAdminInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(blankForm());
    setTemplateId(detailTemplates.availability[0].id);
    setEditingId(null);
    setError("");
  }

  function beginEdit(event: ScheduleAdminEvent) {
    const { id, htmlLink, ...input } = event;
    setForm(input);
    setTemplateId(detailTemplates[event.kind][0].id);
    setEditingId(id);
    setMessage("");
    setError("");
    document.getElementById("schedule-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      if (editingId) {
        await api("/api/schedule-admin/events", { method: "PATCH", body: JSON.stringify({ id: editingId, event: form }) });
        setMessage("予定を更新しました。HPへの反映には最大5分ほどかかります。");
      } else {
        await api("/api/schedule-admin/events", { method: "POST", body: JSON.stringify(form) });
        setMessage("予定を登録しました。HPへの反映には最大5分ほどかかります。");
      }
      resetForm();
      await loadEvents();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "予定を保存できませんでした。");
    } finally {
      setLoading(false);
    }
  }

  async function remove(event: ScheduleAdminEvent) {
    if (!window.confirm(`「${event.title}」をGoogleカレンダーから削除しますか？`)) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await api(`/api/schedule-admin/events?id=${encodeURIComponent(event.id)}`, { method: "DELETE" });
      if (editingId === event.id) resetForm();
      setMessage("予定を削除しました。HPへの反映には最大5分ほどかかります。");
      await loadEvents();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "予定を削除できませんでした。");
    } finally {
      setLoading(false);
    }
  }

  if (checking) return <div className="rounded-3xl border border-stone-300 bg-white p-8 text-sm text-on-surface-variant">管理画面を読み込んでいます…</div>;

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-stone-300 bg-white p-7 shadow-sm md:p-10">
        <p className="font-hand text-primary">Staff only</p>
        <h2 className="mt-3 font-headline text-3xl font-black">スタッフログイン</h2>
        <p className="mt-4 text-sm leading-7 text-on-surface-variant">共有パスワードを入力してください。このページから登録した予定はGoogleカレンダーとHPへ反映されます。</p>
        {!configured && <p className="mt-5 rounded-xl bg-[#fff0cf] p-4 text-sm font-bold text-[#725000]">管理用パスワードが未設定です。先に環境変数を設定してください。</p>}
        <form onSubmit={login} className="mt-7">
          <label className="block text-sm font-black" htmlFor="staff-password">パスワード</label>
          <input id="staff-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-stone-400 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
          {error && <p role="alert" className="mt-4 text-sm font-bold text-red-700">{error}</p>}
          <button disabled={loading || !configured} className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{loading ? "確認中…" : "ログイン"}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start">
      <section id="schedule-editor" className="scroll-mt-6 rounded-3xl border border-stone-300 bg-white p-6 shadow-sm md:p-9">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-hand text-primary">Calendar editor</p><h2 className="mt-2 font-headline text-3xl font-black">{editingId ? "予定を編集" : "新しい予定を登録"}</h2></div>
          {editingId && <button type="button" onClick={resetForm} className="rounded-full border border-stone-300 px-4 py-2 text-xs font-black">編集をやめる</button>}
        </div>

        <form onSubmit={save} className="mt-8 space-y-7">
          <fieldset>
            <legend className="text-sm font-black">1. 種類を選ぶ</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {kinds.map((kind) => (
                <label key={kind.value} className={`cursor-pointer rounded-2xl border p-4 transition-colors ${form.kind === kind.value ? "border-primary bg-[#f3f6ea] ring-1 ring-primary" : "border-stone-300"}`}>
                  <input type="radio" name="kind" value={kind.value} checked={form.kind === kind.value} onChange={() => changeKind(kind.value)} className="sr-only" />
                  <span className="block text-sm font-black">{kind.label}</span><span className="mt-2 block text-xs leading-5 text-on-surface-variant">{kind.help}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="schedule-title" className="text-sm font-black">2. 予定名 <span className="text-red-700">必須</span></label>
            <input id="schedule-title" value={form.title} onChange={(event) => update("title", event.target.value)} placeholder={form.kind === "event" ? "例：味噌づくりの日" : form.kind === "workstay" ? "例：田植えのお手伝い" : "例：宿泊・見学相談"} className="mt-2 w-full rounded-xl border border-stone-400 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
            <p className="mt-2 text-xs text-on-surface-variant">HP用のタグは自動で追加されます。予定名には入力不要です。</p>
          </div>

          <fieldset>
            <legend className="text-sm font-black">3. 日時 <span className="text-red-700">必須</span></legend>
            <label className="mt-3 inline-flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={form.allDay} onChange={(event) => update("allDay", event.target.checked)} className="h-5 w-5 accent-primary" /> 終日の予定</label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold">開始日<input type="date" value={form.startDate} onChange={(event) => { update("startDate", event.target.value); if (event.target.value > form.endDate) update("endDate", event.target.value); }} className="mt-2 block w-full rounded-xl border border-stone-400 px-3 py-3 text-sm" required /></label>
              <label className="text-xs font-bold">終了日<input type="date" value={form.endDate} min={form.startDate} onChange={(event) => update("endDate", event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-400 px-3 py-3 text-sm" required /></label>
              {!form.allDay && <><label className="text-xs font-bold">開始時刻<input type="time" value={form.startTime} onChange={(event) => update("startTime", event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-400 px-3 py-3 text-sm" required /></label><label className="text-xs font-bold">終了時刻<input type="time" value={form.endTime} onChange={(event) => update("endTime", event.target.value)} className="mt-2 block w-full rounded-xl border border-stone-400 px-3 py-3 text-sm" required /></label></>}
            </div>
          </fieldset>

          <div>
            <label htmlFor="schedule-description" className="text-sm font-black">4. HPに載せる詳しい内容</label>
            <div className="mt-3 rounded-2xl border border-stone-300 bg-surface-container-low p-4">
              <label htmlFor="detail-template" className="block text-xs font-black">定型文を選ぶ</label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <select id="detail-template" value={templateId} onChange={(event) => setTemplateId(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-stone-400 bg-white px-3 py-3 text-sm font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                  {availableTemplates.map((template) => <option key={template.id} value={template.id}>{template.label}</option>)}
                </select>
                <button type="button" onClick={applyDetailTemplate} className="rounded-full bg-[#433d35] px-5 py-3 text-xs font-black text-white">この定型文を入れる</button>
              </div>
              <p className="mt-2 text-xs leading-5 text-on-surface-variant">定型文を入れたあと、各項目の「：」の後ろへ内容を入力してください。</p>
            </div>
            <textarea id="schedule-description" rows={9} value={form.description} onChange={(event) => update("description", event.target.value)} placeholder={form.kind === "event" ? "内容、定員、参加費、持ち物、申込期限など" : form.kind === "workstay" ? "作業内容、宿泊・食事、募集人数、参加条件など" : "受け付けできる内容や注意事項など"} className="mt-2 w-full rounded-xl border border-stone-400 px-4 py-3 text-sm leading-7 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <p className="mt-2 text-xs font-bold text-red-700">氏名、電話番号、住所などの個人情報は入力しないでください。</p>
          </div>

          <div><label htmlFor="schedule-location" className="text-sm font-black">場所（任意）</label><input id="schedule-location" value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="例：ALDEL FARM" className="mt-2 w-full rounded-xl border border-stone-400 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></div>

          <fieldset className="rounded-2xl bg-surface-container-low p-5">
            <legend className="px-1 text-sm font-black">掲載オプション</legend>
            <label className="mt-2 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.featured} onChange={(event) => update("featured", event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" /><span><strong className="block">トップページにも載せる</strong><span className="mt-1 block text-xs leading-5 text-on-surface-variant">重要な募集やイベントだけ選びます。</span></span></label>
            <label className="mt-5 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.closed} onChange={(event) => update("closed", event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" /><span><strong className="block">受付終了にする</strong><span className="mt-1 block text-xs leading-5 text-on-surface-variant">イベントはHPに残したまま「受付終了」と表示されます。</span></span></label>
          </fieldset>

          <div className="rounded-2xl border border-dashed border-stone-400 p-5 text-sm"><p className="font-black">登録内容の確認</p><p className="mt-2 leading-7 text-on-surface-variant">{selectedKind.label} ／ {form.title || "（予定名を入力してください）"}<br />{form.startDate}{form.endDate !== form.startDate ? ` 〜 ${form.endDate}` : ""}{form.allDay ? "・終日" : `・${form.startTime}〜${form.endTime}`}</p></div>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
          {message && <p role="status" className="rounded-xl bg-[#f3f6ea] p-4 text-sm font-bold text-primary">{message}</p>}
          <button disabled={loading} className="w-full rounded-full bg-primary px-6 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{loading ? "保存中…" : editingId ? "この内容で更新する" : "Googleカレンダーに登録する"}</button>
        </form>
      </section>

      <aside className="space-y-5 lg:sticky lg:top-6">
        <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold text-primary">HP掲載対象</p><h2 className="mt-1 font-headline text-2xl font-black">これからの予定</h2></div><button type="button" onClick={() => void loadEvents()} disabled={loading} className="rounded-full border border-stone-400 px-4 py-2 text-xs font-black disabled:opacity-50">再読み込み</button></div>
        {message && <p role="status" className="rounded-xl bg-[#f3f6ea] p-4 text-sm font-bold text-primary">{message}</p>}
        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
        {loading && !events.length && <p className="rounded-2xl border border-stone-300 bg-white p-5 text-sm text-on-surface-variant">予定を読み込んでいます…</p>}
        {!loading && !events.length && <p className="rounded-2xl border border-dashed border-stone-400 p-6 text-sm leading-7 text-on-surface-variant">これからの公開予定はありません。左のフォームから登録できます。</p>}
        <div className="space-y-3">
          {events.map((event) => (
            <article key={event.id} className={`rounded-2xl border bg-white p-5 ${editingId === event.id ? "border-primary ring-1 ring-primary" : "border-stone-300"}`}>
              <div className="flex flex-wrap gap-2"><span className="rounded-full bg-surface-container-low px-3 py-1 text-[11px] font-black">{kindLabel(event.kind)}</span>{event.featured && <span className="rounded-full bg-[#fff0cf] px-3 py-1 text-[11px] font-black text-[#725000]">トップ掲載</span>}{event.closed && <span className="rounded-full bg-stone-200 px-3 py-1 text-[11px] font-black text-stone-600">受付終了</span>}</div>
              <h3 className="mt-4 font-headline text-xl font-black">{event.title}</h3><p className="mt-2 text-xs font-bold leading-6 text-primary">{formatPeriod(event)}</p>
              {event.description && <p className="mt-3 line-clamp-3 whitespace-pre-line text-xs leading-6 text-on-surface-variant">{event.description}</p>}
              <div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => beginEdit(event)} className="rounded-full bg-primary px-4 py-2 text-xs font-black text-white">編集</button><button type="button" onClick={() => void remove(event)} className="rounded-full border border-red-300 px-4 py-2 text-xs font-black text-red-700">削除</button>{event.htmlLink && <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-stone-300 px-4 py-2 text-xs font-black">Googleで確認 ↗</a>}</div>
            </article>
          ))}
        </div>
        <div className="rounded-2xl bg-[#433d35] p-5 text-white"><p className="text-xs font-black text-[#febe4e]">操作を終えたら</p><div className="mt-3 flex flex-wrap gap-2"><a href="/schedule" target="_blank" className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#433d35]">公開ページを確認 ↗</a><button type="button" onClick={() => void logout()} className="rounded-full border border-white/40 px-4 py-2 text-xs font-black">ログアウト</button></div></div>
      </aside>
    </div>
  );
}
