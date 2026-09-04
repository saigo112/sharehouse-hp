# ALDEL FARM Public CMS schema

ALDEL FARMの公開サイトでは、microCMSのHobbyプラン上限に合わせ、以下の5 APIだけを使用します。レイアウト、余白、アニメーション、コンポーネントの選択はコードで管理します。

| API | 形式 | 役割 |
| --- | --- | --- |
| `site_globals` | オブジェクト | サイト共通の文言、URL、画像 |
| `articles` | リスト | news / diary / story / report / column |
| `projects` | リスト | 継続的な活動 |
| `programs` | リスト | 参加・滞在・体験の入口 |
| `people` | リスト | この土地に関わる人 |

`agriculture`、`gibier`、`sharehouse` のような事業別APIは作成しません。分類は既存API内の `category` または `article_type` で表現します。

## site_globals

既存のアルデルハウス用フィールドは削除・改名しません。以下のALDEL FARM用フィールドを追加します。

| フィールドID | 種別 | 用途 |
| --- | --- | --- |
| `farmHeroTitle` | テキストエリア | ヒーローの主コピー |
| `farmHeroSubtitle` | テキストエリア | ヒーローの短い説明 |
| `farmHeroImage` | 画像（複数可） | ヒーロー写真 |
| `farmAboutTitle` | テキスト | About見出し |
| `farmAboutText` | テキストエリア | About本文 |
| `farmLifeImage` | 画像（複数可） | 「暮らしをつくる、小さな営み。」の写真 |
| `farmContactUrl` | テキスト | 旧問い合わせURL（現在の画面では使用しない） |
| `lineOfficialId` | テキスト | LINE公式アカウントのベーシックID（例: `@xxxxxxxx`） |
| `lineOfficialUrl` | テキスト | LINE公式アカウントの友だち追加URL |
| `scheduleCalendarEmbedUrl` | テキスト | 公開用Googleカレンダーの埋め込みURL |
| `scheduleBookingUrl` | テキスト | 将来、外部予約ページを使う場合のURL（任意） |
| `instagramUrl` | テキスト | Instagram URL |

未設定時はコード上の安全な初期文言・画像が表示されます。

## articles

既存の `article_type` を継続利用します。選択肢は `news`、`diary`、`story`、`report`、`column` を推奨します。アルデルハウスは既存通り `news` と `diary` を使用し、ALDEL FARMトップの「暮らしの記録」には `diary`、`story`、`report`、`column` が表示されます。

必須フィールド: `title`、`article_type`。推奨フィールド: `summary`、`body`、`mainVisual`。

## projects

継続活動を管理します。必須フィールドは `title`、推奨フィールドは `summary`、`mainVisual`、`status`、`category` です。

`category` は複数選択とし、`rice`、`field`、`chicken`、`gibier`、`kominka`、`food`、`mountain`、`region`、`sharehouse` を推奨値とします。

## programs

参加者が関わる入口を管理します。必須フィールドは `title`、推奨フィールドは `summary`、`mainVisual`、`status`、`category` です。

`category` は `experience`、`stay`、`learning`、`co-creation`、`sharehouse` を推奨します。固定メニューとして予約できる印象を避けるため、`status` には「季節で変わります」「まずは相談から」など、現在の状況を記載します。

## people

運営者だけでなく、住人、地域の先生、農家、猟師、メンターを扱います。必須フィールドは `name`、推奨フィールドは `role`、`introduction`、`image` です。

Community OSのスキル、タスク、連絡先、予定などの内部情報は格納しません。

## 公開前チェック

1. `.env.local` に `MICROCMS_SHAREHOUSE_SERVICE_DOMAIN` と `MICROCMS_SHAREHOUSE_API_KEY` を設定する。
2. デプロイ環境に同じ値と `NEXT_PUBLIC_SITE_URL` を設定する。
3. `site_globals` のALDEL FARM用フィールドを入力し、`programs` と `people` に少なくとも1件ずつ公開する。

## Googleカレンダー連携

- `scheduleCalendarEmbedUrl` または `NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL` に、公開用Googleカレンダーの埋め込みURLを設定する。
- トップページの「近日の作業・イベント。」は、同じカレンダーの公開iCalendarフィードから、運営者が掲載対象にした直近3件を取得する。
- 掲載したい予定は、予定名の先頭に `【トップ掲載】` を付けるか、説明欄に `#トップ掲載` と入力する。どちらの印も公開カード上では取り除かれる。
- 予約など、掲載の印がない予定はトップページに表示されない。
- Googleカレンダーの予定名、開始日時、説明、場所がそれぞれカードのタイトル、日時、本文、場所として表示される。
- 過去の予定は自動的に除外される。カレンダーの更新は最大5分程度キャッシュされる。
- 個人用カレンダーではなく、公開情報だけを登録するALDEL FARM専用カレンダーを使用する。
- 日程ページには、予定名または説明欄のタグで分類された予定だけを表示する。
- `【受付可】` / `#受付可`: 見学や体験を相談できる日。
- `【イベント】` / `#イベント`: 詳細を案内するイベント。
- `【住み込み募集】` / `#住み込み募集`: 開始日から終了日までの住み込み募集期間。
- `【受付終了】` / `#受付終了`: 受付を止めた予定。受付可能日・住み込み募集から除外し、イベントは終了表示にする。
- タグのない予定は公開日程ページに表示しない。公開カレンダーに予約者の個人情報を記載しない。
- スタッフ用の登録例は `/schedule/manage` で確認できる（検索エンジンには掲載しない設定）。
4. `npm run build` を実行し、CMS未設定・API未作成のときもフォールバック表示が崩れないことを確認する。
