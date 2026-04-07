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

### Phase 1: 基礎構築
- [ ] `src/libs/client.ts`: microCMS クライアントの作成
- [ ] `src/types/microcms.ts`: 各コンテンツの型定義

### Phase 2: データ取得の実装
- [ ] `src/app/sharehouse/page.tsx` でデータをフェッチ
- [ ] ハードコードされた値をフェッチしたデータで置換

## 検証方法
- `http://localhost:3000/sharehouse` が期待通り表示されることを確認。
- （モックデータまたはmicroCMSからの実データを使用して）表示が切り替わることを確認。
