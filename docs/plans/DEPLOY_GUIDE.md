# デプロイガイド（GitHub + Vercel）

このプロジェクトは、GitHub の `saigo112/sharehouse-hp` と Vercel の
`sharehouse-hp` プロジェクトに接続されています。

## 1. 日常の更新手順

作業前に、公開中の最新版を取得します。

```bash
git switch main
git pull origin main
git switch -c codex/変更内容を表す名前
```

変更後は、ビルドで問題がないことを確認します。

```bash
npm run build
git status
git add 変更したファイル
git commit -m "変更内容の説明"
git push -u origin 現在のブランチ名
```

`main` 以外のブランチを push すると、Vercel が確認用の Preview を作ります。
Preview で表示を確認したあと、GitHub の Pull Request を使って `main` に統合します。
`main` への統合後、Vercel が本番サイトを更新します。

## 2. Vercel の環境変数

Vercel の「Project Settings」→「Environment Variables」に、用途に応じて以下を設定します。

- `MICROCMS_SHAREHOUSE_SERVICE_DOMAIN`: microCMS のサービスドメイン
- `MICROCMS_SHAREHOUSE_API_KEY`: microCMS の API キー（秘密情報）
- `NEXT_PUBLIC_SITE_URL`: 本番サイトのURL（例: `https://www.aldel08.com`）
- `NEXT_PUBLIC_LINE_OFFICIAL_ID`: LINE公式アカウントID
- `NEXT_PUBLIC_LINE_OFFICIAL_URL`: LINE友だち追加URL
- `NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL`: 公開カレンダーの埋め込みURL

既存構成との互換用に、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` も利用できます。
ただし、新規設定では `MICROCMS_SHAREHOUSE_*` を使用します。

`.env.local` はパソコン内だけで使用する秘密情報を含むため、GitHubには送信しません。

## 3. microCMS Webhook の連携（自動更新）

microCMS でコンテンツを公開したときに Vercel のサイトを更新する設定です。

1. Vercel の「Settings」→「Git」→「Deploy Hooks」で、`main` 用の Hook を作成します。
2. 発行されたURLをコピーします。
3. microCMS のAPI設定にある「Webhook」で「Vercel」を追加し、URLを貼り付けます。
4. 「コンテンツの公開時」「非公開時」など、必要な通知タイミングを選んで保存します。

## 4. 注意事項

- `main` への push / merge は本番公開につながります。
- APIキーを画面共有、Issue、コミット、チャット本文へ貼らないでください。
- `.env.local.example` には変数名だけを記載し、本物のAPIキーは入れません。
- 公開前に `/`、`/about`、`/programs`、`/schedule`、`/sharehouse` を確認します。
