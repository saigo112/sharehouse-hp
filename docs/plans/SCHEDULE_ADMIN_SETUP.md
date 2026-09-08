# スタッフ用日程管理画面の初期設定

`/schedule/manage` は、Googleカレンダーを直接操作せずにHP掲載予定を登録・編集・削除する画面です。
予定の種類を選ぶと、既存のHP表示に必要なタグが自動で予定名へ追加されます。

## 1. Google Cloudでサービスアカウントを作る

1. Google Cloud Consoleで、このサイト用のプロジェクトを選択または作成する。
2. 「APIとサービス」から **Google Calendar API** を有効にする。
3. 「IAMと管理」→「サービス アカウント」でサービスアカウントを作成する。
4. 作成したサービスアカウントの「キー」からJSONキーを1つ発行し、安全な場所へ保存する。

JSONキーは秘密情報です。GitHub、チャット、共有ドライブへ置かず、Vercelの環境変数へ直接登録します。

## 2. 公開カレンダーへ編集権限を付ける

1. Googleカレンダーで、HP表示に使っているALDEL FARM専用カレンダーの「設定と共有」を開く。
2. 「特定のユーザーまたはグループと共有する」に、JSONキーの `client_email` を追加する。
3. 権限を **予定の変更** にする。

個人用カレンダーではなく、公開情報だけを登録する専用カレンダーを共有します。

## 3. Vercelの環境変数を設定する

Vercelの Project Settings → Environment Variables に次を設定します。

| 変数名 | 設定する値 |
| --- | --- |
| `SCHEDULE_ADMIN_PASSWORD` | スタッフで共有する十分に長いパスワード |
| `SCHEDULE_ADMIN_SESSION_SECRET` | パスワードとは別の長いランダム文字列 |
| `GOOGLE_CALENDAR_SERVICE_ACCOUNT_EMAIL` | JSONキーの `client_email` |
| `GOOGLE_CALENDAR_PRIVATE_KEY` | JSONキーの `private_key`。改行は `\n` のまま1行で登録 |
| `GOOGLE_CALENDAR_ID` | 専用カレンダーの「カレンダーID」。埋め込みURLと同じなら省略可 |

既存の `NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL` も、同じ専用カレンダーを指していることを確認します。
環境変数を保存したあと、Vercelで再デプロイします。

## 4. 動作確認

1. `/schedule/manage` を開き、共有パスワードでログインする。
2. テスト予定を登録する。
3. 管理画面右側の一覧とGoogleカレンダーに予定が現れることを確認する。
4. `/schedule` で公開表示を確認する。反映には最大5分ほどかかる。
5. テスト予定を管理画面から削除する。

公開カレンダーには、予約者の氏名、電話番号、住所、相談内容などの個人情報を入力しません。
