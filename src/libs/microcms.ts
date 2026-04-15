import { createClient } from 'microcms-js-sdk';

// microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイント）
const ENDPOINT = 'shared_house';

/**
 * LP全データを取得する関数
 * - 環境変数が未設定の場合はnullを返し、ページ側でフォールバック値を使用する
 * - Next.js ISR（増分静的再生成）に対応: revalidate=60秒
 */
export async function getLPData(options: { preview: boolean } = { preview: false }) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    console.warn('[microCMS] 環境変数が未設定です。フォールバックデータを使用します。');
    return null;
  }

  try {
    const client = createClient({ serviceDomain, apiKey });
    const queries: any = {};
    if (options.preview && process.env.MICROCMS_PREVIEW_SECRET) {
      queries.draftKey = process.env.MICROCMS_PREVIEW_SECRET;
    }
    const data = await client.get({
      endpoint: ENDPOINT,
      queries,
    });
    return data;
  } catch (error) {
    console.error('[microCMS] データ取得に失敗しました:', error);
    return null;
  }
}


// microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイント）
const ENDPOINT = 'shared_house';

/**
 * LP全データを取得する関数
 * - 環境変数が未設定の場合はnullを返し、ページ側でフォールバック値を使用する
 * - Next.js ISR（増分静的再生成）に対応: revalidate=60秒
 */
export async function getLPData(options: { preview: boolean } = { preview: false }) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    console.warn('[microCMS] 環境変数が未設定です。フォールバックデータを使用します。');
    return null;
  }

  try {
    const client = createClient({ serviceDomain, apiKey });
    const queries: any = {};
    if (options.preview && process.env.MICROCMS_PREVIEW_SECRET) {
      queries.draftKey = process.env.MICROCMS_PREVIEW_SECRET;
    }
    const data = await client.get({
      endpoint: ENDPOINT,
      queries,
    });
    return data;
  } catch (error) {
    console.error('[microCMS] データ取得に失敗しました:', error);
    return null;
  }
}
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    // 開発時にenv未設定でも静かにフォールバックするためwarnに留める
    console.warn('[microCMS] 環境変数が未設定です。フォールバックデータを使用します。');
    return null;
  }

  try {
    const client = createClient({ serviceDomain, apiKey });
    // Object形式なのでエンドポイントを指定するだけで全データを取得
    const data = await client.get({
      endpoint: ENDPOINT,
    });
    return data;
  } catch (error) {
    console.error('[microCMS] データ取得に失敗しました:', error);
    return null;
  }
}

