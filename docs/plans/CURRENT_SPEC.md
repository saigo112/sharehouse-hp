# microCMS 連携仕様書

## 目的
LPのコンテンツ（テキスト、画像）をmicroCMSから動的に管理できるようにし、エンジニアでないユーザーでも更新を可能にする。

## 仕様
以下のセクションをmicroCMSで管理する。

### 1. ヒーローセクション（フラット）
- `heroTitle` (Text / Rich Text)
- `heroImage` (Image)

### 2. コンセプトセクション（フラット）
- `conceptHandText` (Text)
- `conceptTitle` (Text / Rich Text)
- `conceptDesc1` (Text Area)
- `conceptDesc2` (Text Area)
- `conceptImage` (Image)
- `conceptCaption` (Text)
- `conceptSticker` (Text)

### 3. プロジェクトセクション
- プロジェクトリスト (Repeated)
  - タイトル (Text)
  - 説明 (Text)
  - 画像 (Image)
  - ステータス (Text)

### 4. 日記（ポラロイド）セクション
- 日記リスト (Repeated)
  - 画像 (Image)
  - キャプション (Text)

### 5. 入居者の声セクション
- ボイスリスト (Repeated)
  - 名前/肩書き (Text)
  - 引用文 (Text)
  - 画像 (Image)

### 6. 募集情報セクション
- 情報リスト (Repeated)
  - 項目名 (Text)
  - 内容 (Text)

## 実装計画

### Phase 1: 基礎構築 (Done)
- [x] `src/libs/microcms.ts`: microCMS クライアントの作成
- [x] `src/types/microcms.ts`: 各コンテンツの型定義

### Phase 2: データ取得の実装 (Done)
- [x] `src/app/sharehouse/page.tsx` でデータをフェッチ
- [x] ハードコードされた値をフェッチしたデータで置換

### Phase 3: プロジェクトセクションの作り込み (Done)
- [x] `src/components/sharehouse/ProjectCard.tsx` の作成
- [x] `src/components/sharehouse/ProjectList.tsx` の作成
- [x] `src/app/sharehouse/page.tsx` の統合

### Phase 4: 日記セクションの作り込み (Done)
- [x] `src/components/sharehouse/DiaryCard.tsx` の作成
- [x] `src/components/sharehouse/DiaryList.tsx` の作成
- [x] `src/app/sharehouse/page.tsx` の統合

### Phase 5: 住人の声・全体統合 (Done)
- [x] 各セクションのコンポーネント化とデザイン統一
- [x] エントリーフォーム導線の整備

### Phase 6: 子ページ（詳細ページ）の実装計画 (Current)
- [ ] `docs/plans/CURRENT_SPEC.md` に詳細ページの仕様を追記
- [ ] プロジェクト詳細ページ（`/sharehouse/projects/[id]`）用テンプレートの作成
- [ ] 日記詳細ページ（`/sharehouse/diaries/[id]`）用テンプレートの作成
- [ ] LP側のカード一覧から詳細ページへのリンク（導線）を有効化

## 詳細ページ（子ページ）の仕様
現在の microCMS API (`shared_house`: オブジェクト形式) から全データを取得し、それぞれの繰り返しフィールドの中に定義された `id` をキーとして個別の詳細データを表示します。

1. **プロジェクト詳細（`/sharehouse/projects/[id]`）**
   - **構成**: ヘッダー（戻るボタン）、プロジェクト画像、プロジェクトタイトル、ステータスラベル、詳細な説明文、CTAセクション。
   - **デザイン**: LPのスクラップブックの延長として、スケッチノート風のレイアウトを想定。

2. **日記詳細（`/sharehouse/diaries/[id]`）**
   - **構成**: ヘッダー（戻るボタン）、日記の大きなポラロイド写真、キャプション（タイトル代わり）、本文（※必要に応じて `content` フィールドを microCMS 側に追加）、LPへの戻るボタン。
   - **デザイン**: 手書きのノートやアルバムの1ページを開いたような温かみのあるUI。

## 検証方法
- `http://localhost:3000/sharehouse` が期待通り表示されることを確認。
- （モックデータまたはmicroCMSからの実データを使用して）表示が切り替わることを確認。
- カードをクリックして `/sharehouse/projects/1` などへの遷移と詳細の表示が成功することを確認。
