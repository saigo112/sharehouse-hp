# microCMS サービス分割戦略 実装計画 (スロット最適化版)

## 1. 背景と方針
「1事業 = 1microCMSサービス」というマルチサブドメイン戦略を採用しつつ、情報構造が似ているAPIを統合することで、HobbyプランのAPI枠（上限5）のうち2枠を将来の拡張用に確保します。現在は「アルデルハウス（シェアハウス）」専用のサービスを構築します。

## 2. 確定したAPI構成 (シェアハウス専用サービス)
APIを3つにスリム化し、フロントエンド側でカテゴリごとにデータを振り分ける設計とします。

| スロット | エンドポイント名 | 形式 | 役割・管理内容 | 備考 |
| --- | --- | --- | --- | --- |
| 1 | site_globals | オブジェクト | LPのヒーロー文言、コンセプトテキスト、共通メニュー、フォームURL | 旧 lp_settings と site_config を統合 |
| 2 | articles | リスト | お知らせ（news）、日記（diaries） | article_type（セレクト）で種類を判定 |
| 3 | projects | リスト | アルデルハウスの公式プロジェクト | 活動記録（独立したリストとして維持） |
| 4 | (未割り当て) | - | 将来の拡張用バッファ（FAQ、ギャラリーなど） | - |
| 5 | (未割り当て) | - | 将来の拡張用バッファ | - |

## 3. 環境変数の設定 (.env.local)
将来「お米販売」などの別プロジェクトが追加されてもキーが衝突しないよう、ドメイン名を明記します。
```bash
# シェアハウス専用microCMSサービス
MICROCMS_SHAREHOUSE_SERVICE_DOMAIN=xxxxxx
MICROCMS_SHAREHOUSE_API_KEY=xxxxxx
```

## 4. 変更・新規作成するコードファイル

### [NEW] src/types/sharehouse-cms.ts
3つのAPIに対応する厳密な型定義を作成します。`Article` 型には、識別子として `article_type: 'news' | 'diary'` というユニオン型を定義し、TypeScriptレベルで安全に振り分けられるようにします。

### [MODIFY] src/libs/microcms.ts
専用環境変数を使用した `sharehouseClient` を新設します。以下のデータ取得関数を実装します。
- `getSiteGlobals()`: オブジェクトを1つ取得。
- `getSharehouseArticles(type: 'news' | 'diary')`: クエリ（`filters=article_type[equals]${type}`）を使って、必要なカテゴリの記事だけを抽出して取得。
- `getSharehouseProjects()`: プロジェクト一覧を取得。

### [MODIFY] src/app/sharehouse/page.tsx (LPトップ)
新設したフェッチ関数を呼び出し、`site_globals` のデータでヒーローセクションなどを構築します。
`getSharehouseArticles('news')` を呼び出し、最新の「お知らせ」を数件表示します。

### [MODIFY] src/app/sharehouse/diaries/page.tsx 等 (下層ページ)
各一覧ページや詳細ページのルーティングは維持しつつ、データの取得元を新しい `getSharehouseArticles` 関数に差し替えます。

## 5. 実装ステップ
1. **microCMSの準備**: microCMSの管理画面にて、上記の `site_globals`, `articles`, `projects` の3つのAPIを作成し、テスト用のダミーデータを数件登録します。
2. **インフラ・型の整備**: `.env.local` の設定と、`types/sharehouse-cms.ts`、`libs/microcms.ts` の実装を行います。
3. **UIへの結合**: `page.tsx` 等で実際にデータを読み込み、画面に表示させます。
