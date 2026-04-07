# デプロイガイド (Vercel + GitHub)

このプロジェクトをインターネットに公開し、microCMSでの更新を自動反映させるための手順です。

## 1. GitHub へのコード提供
1. [GitHub](https://github.com/) で新しいリポジトリ（例: `sharehouse-hp`）を作成します。
2. ターミナルで以下のコマンドを実行し、ローカルのコードをプッシュします。
   ```bash
   git remote add origin https://github.com/ユーザー名/リポジトリ名.git
   git branch -M main
   git push -u origin main
   ```

## 2. Vercel でのデプロイ
1. [Vercel](https://vercel.com/) にログインし、「Add New」>「Project」を選択します。
2. 先ほど push したリポジトリを Import します。
3. **重要：Environment Variables (環境変数)** の設定画面で、`.env.local` にある以下の2つを追加してください。
   - `MICROCMS_SERVICE_DOMAIN` : (例: `kv5amlkshc`)
   - `MICROCMS_API_KEY` : (ご自身のAPIキー)
4. 「Deploy」をクリックします。数分で公開URLが発行されます。

## 3. microCMS Webhook の連携（自動更新）
microCMS で記事を「公開」した時に、自動でVercelのサイトを最新にするための設定です。

1. **Vercel 側**:
   - プロジェクトの「Settings」>「Git」>「Deploy Hooks」へ移動します。
   - 適当な名前（例: `microcms`）を付け、`main` ブランチを指定して「Create Hook」を押します。
   - 発行された **URLをコピー** します。
2. **microCMS 側**:
   - APIの「Webhook」設定へ移動し、「追加」ボタンを押します。
   - 「Vercel」を選択し、先ほどコピーした **Webhook URL を貼り付け** ます。
   - 通知タイミングとして「コンテンツの公開時」「非公開時」などにチェックを入れて保存します。

これで、microCMS でポチッと公開ボタンを押すだけで、サイトが自動的に最新の状態に更新されるようになります！
