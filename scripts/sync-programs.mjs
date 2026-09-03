import fs from "node:fs";

if (!process.argv.includes("--apply")) {
  console.error("This script writes to microCMS. Run with --apply when you intend to publish the four programs.");
  process.exit(1);
}

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, "")];
    })
);

const serviceDomain = env.MICROCMS_SHAREHOUSE_SERVICE_DOMAIN || env.MICROCMS_SERVICE_DOMAIN;
const apiKey = env.MICROCMS_SHAREHOUSE_API_KEY || env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) throw new Error("microCMS credentials are not configured in .env.local");

const endpoint = `https://${serviceDomain}.microcms.io/api/v1/programs`;
const headers = { "X-MICROCMS-API-KEY": apiKey, "Content-Type": "application/json" };

const programs = [
  {
    legacyId: "i-4rd6b2snh",
    content: {
      title: "見学してみる",
      slug: "visit-and-look-around",
      summary: "集落、アルデルハウス、田畑、鶏小屋などを歩きながら、ALDEL FARMの日常をご案内します。",
      body: "<p>ALDEL FARMを初めて訪れる方向けの見学です。集落を歩き、アルデルハウス、畑や田んぼ、鶏小屋など、その日にご案内できる場所を回ります。</p><p>決まった観光ツアーではなく、手が空いている者が普段の暮らしや活動についてお話しします。気になる場所を選び、質問しながらゆっくり見て回ってください。</p>",
      status: ["相談受付中"],
      category: ["experience"],
      season: "日程は相談",
      duration: "約1時間",
      price: "無料",
      target: "まず場所を見てみたい方、活動や暮らしの雰囲気を知りたい方",
      scheduleNote: "到着後に見たい場所を確認し、約1時間を目安にご案内します。農作業や受け入れ状況により、日時や見学できる場所を調整する場合があります。",
      participationNotes: "田畑や鶏小屋に入る場合があります。汚れてもよい靴と動きやすい服装でお越しください。",
      sort_order: 10,
    },
  },
  {
    legacyId: "nms1emdyc3",
    content: {
      title: "暮らしに混ざってみる",
      slug: "join-daily-life",
      summary: "1泊以上滞在し、住人とご飯をつくり、その日の作業に加わりながら、日常を一緒に過ごします。",
      body: "<p>アルデルハウスに1泊以上滞在し、シェアハウスの住人と同じように日常を過ごします。みんなでご飯をつくり、その日に必要な田畑、鶏、古民家、山や集落の作業に加わります。</p><p>やってみたいことを選べますが、季節、天候、作物や生き物の状態によって実施できる内容は変わります。選択内容をもとに参考スケジュールをつくり、実際の内容は事前相談で決めます。</p>",
      status: ["相談受付中"],
      category: ["experience"],
      season: "日程は相談",
      duration: "1泊以上",
      price: "宿泊料金がかかります。食費はみんなで割り勘です。",
      target: "観光ではなく、ALDEL FARMの日常を実際に過ごしてみたい方",
      scheduleNote: "チェックインや食事、作業の時間は、当日の状況と住人の予定に合わせて相談します。ページ上のスケジュールは参考例です。",
      participationNotes: "共同生活のため、食事づくりや片付け、共用部分の掃除なども一緒に行います。食物アレルギーや生活上の配慮が必要な場合は、事前にお知らせください。",
      sort_order: 20,
    },
  },
  {
    content: {
      title: "住み込みで手伝う",
      slug: "live-in-help",
      summary: "田植えや収穫など、人手が必要な期間に滞在し、スタッフと一緒に作業します。",
      body: "<p>田植え、収穫、草刈り、集落や古民家の手入れなど、人手が必要な時期に住み込みで手伝うプログラムです。スタッフと一緒に、その期間に必要な作業を進めます。</p><p>観光体験ではなく、募集ごとに決められた期間と作業への参加が前提です。受け入れ期間、作業内容、時間、滞在条件は募集時に明示し、事前に双方で確認します。</p>",
      status: ["季節で変わります"],
      category: ["experience"],
      season: "田植え・収穫など、人手が必要な時期",
      duration: "募集ごとに設定",
      price: "募集条件を満たす場合、宿泊費・食費はかかりません。",
      target: "一定期間滞在し、決められた作業に継続して参加できる方",
      scheduleNote: "募集ごとに、滞在期間、作業日、休み、1日の流れを事前にご案内します。常時募集ではありません。",
      participationNotes: "作業には体力を使うものや、刃物、農機具、斜面を伴うものがあります。経験と安全を確認し、担当する作業を調整します。",
      sort_order: 30,
    },
  },
  {
    content: {
      title: "上郡に移住したい",
      slug: "move-to-kamigori",
      summary: "移住相談を受けたうえで、上郡町で暮らすために必要な情報を提供し、必要に応じて地域の人をご紹介します。",
      body: "<p>上郡町でどのように暮らしたいか、仕事、住まい、農のある生活、地域との関わり方などについて、まずお話を伺います。</p><p>希望や現在の状況を一緒に整理したうえで、ALDEL FARMが持っている地域の情報を提供します。また、相談内容に応じて、地域で暮らす人、仕事や農業に関わる人など、次の一歩につながる人をご紹介します。</p><p>行政制度や正式な手続きについては、上郡町の公式窓口・公式情報もあわせてご案内します。</p>",
      status: ["相談受付中"],
      category: ["experience"],
      season: "通年・日程は相談",
      duration: "相談内容により調整",
      target: "上郡町への移住や二拠点生活、地域との継続的な関わりを考えている方",
      scheduleNote: "まずLINEで移住を考えた理由や知りたいことを伺い、オンライン相談または現地での相談・見学を調整します。",
      participationNotes: "ご紹介できる情報や人は、相談内容とその時のつながりによって変わります。人の紹介は相手方の了承を得たうえで行います。",
      sort_order: 40,
    },
  },
];

async function listPrograms() {
  const response = await fetch(`${endpoint}?limit=100`, { headers });
  if (!response.ok) throw new Error(`GET programs failed: ${response.status} ${await response.text()}`);
  return (await response.json()).contents || [];
}

let existing = await listPrograms();

for (const program of programs) {
  const match = existing.find((item) => item.slug === program.content.slug || item.id === program.legacyId);
  const url = match ? `${endpoint}/${match.id}` : endpoint;
  const method = match ? "PATCH" : "POST";
  const response = await fetch(url, { method, headers, body: JSON.stringify(program.content) });
  const responseBody = await response.text();
  if (!response.ok) throw new Error(`${method} ${program.content.title} failed: ${response.status} ${responseBody}`);
  const result = responseBody ? JSON.parse(responseBody) : {};
  console.log(`${match ? "updated" : "created"}: ${program.content.title} (${match?.id || result.id || "ok"})`);
  existing = await listPrograms();
}

const canonical = (await listPrograms())
  .filter((item) => programs.some((program) => program.content.slug === item.slug))
  .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
  .map((item) => ({ id: item.id, slug: item.slug, title: item.title, status: item.status }));

console.log(JSON.stringify({ publishedPrograms: canonical }, null, 2));
