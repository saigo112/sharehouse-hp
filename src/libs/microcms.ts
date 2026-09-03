import { createClient } from 'microcms-js-sdk';
import { SharehouseSiteGlobals, SharehouseArticle, SharehouseProject, SharehouseLpSettings, SharehouseSiteConfig } from '../types/sharehouse-cms';

/**
 * 【シェアハウス専用】microCMSクライアント
 */
export const sharehouseClient = createClient({
  // The SDK validates these parameters while importing a route. Placeholder values
  // keep a credentials-free local build possible; requests are guarded below.
  serviceDomain: process.env.MICROCMS_SHAREHOUSE_SERVICE_DOMAIN || process.env.MICROCMS_SERVICE_DOMAIN || 'not-configured',
  apiKey: process.env.MICROCMS_SHAREHOUSE_API_KEY || process.env.MICROCMS_API_KEY || 'not-configured',
});

/** Avoid SDK calls during local builds when CMS credentials have not been configured. */
export const hasMicrocmsCredentials = Boolean(
  (process.env.MICROCMS_SHAREHOUSE_SERVICE_DOMAIN || process.env.MICROCMS_SERVICE_DOMAIN) &&
  (process.env.MICROCMS_SHAREHOUSE_API_KEY || process.env.MICROCMS_API_KEY)
);

/**
 * 共通クエリビルダ
 */
function buildSharehouseQueries(options: { preview?: boolean; filters?: string; limit?: number; contentId?: string } = {}) {
  const queries: any = {};
  
  const previewSecret = process.env.MICROCMS_SHAREHOUSE_PREVIEW_SECRET || process.env.MICROCMS_PREVIEW_SECRET;
  
  if (options.preview && previewSecret) {
    queries.draftKey = previewSecret;
  }
  
  if (options.filters) {
    queries.filters = options.filters;
  }
  
  if (options.limit) {
    queries.limit = options.limit;
  }
  
  // 基本的に並び順指定（sort_order）を優先
  queries.orders = 'sort_order,-publishedAt';
  
  return queries;
}

// -----------------------------------------------------------------------------
// V2 API (site_globals, articles, projects)
// -----------------------------------------------------------------------------

/**
 * 1. サイト共通・LP設定の取得 (site_globals)
 */
export async function getSiteGlobals(options: { preview?: boolean } = { preview: false }) {
  if (!hasMicrocmsCredentials) return null;
  try {
    return await sharehouseClient.get<SharehouseSiteGlobals>({
      endpoint: 'site_globals',
      queries: buildSharehouseQueries(options),
    });
  } catch (error) {
    console.warn('[microCMS] site_globals の取得に失敗しました。');
    return null;
  }
}

/**
 * 2. 記事一覧の取得 (articles - news / diary)
 */
export async function getSharehouseArticles(
  type: 'news' | 'diary',
  options: { preview?: boolean; limit?: number } = { preview: false }
) {
  if (!hasMicrocmsCredentials) return { contents: [], totalCount: 0 };
  try {
    // 確実に取得するため、サーバーサイドフィルタを一時的にオフにする
    // （セレクトフィールドが単一選択か複数選択か、あるいは内部値が大文字かなどでマッチングが失敗するのを防ぐ）
    const queries = buildSharehouseQueries({ 
      ...options,
      limit: 100 // 全件取得してJSでフィルタ
    });
    
    const response = await sharehouseClient.getList<SharehouseArticle>({
      endpoint: 'articles',
      queries,
    });

    // JS側でフィルタリング（日本語/英語、大文字小文字、文字列/配列の全てに対応）
    const filteredContents = response.contents.filter(article => {
      const artType = article.article_type;
      if (!artType) return false;
      
      const target = type.toLowerCase();
      const newsKeywords = ['news', 'お知らせ'];
      const diaryKeywords = ['diary', '日記', 'インスタ投稿', 'instagram'];
      const keywords = target === 'news' ? newsKeywords : diaryKeywords;

      if (Array.isArray(artType)) {
        return artType.some(t => keywords.includes(t.toLowerCase()));
      }
      return keywords.includes(String(artType).toLowerCase());
    });

    return {
      ...response,
      contents: options.limit ? filteredContents.slice(0, options.limit) : filteredContents,
      totalCount: filteredContents.length
    };
  } catch (error) {
    console.error(`[microCMS] articles (${type}) の取得に失敗しました。APIが削除されている可能性があります。`);
    return { contents: [], totalCount: 0 };
  }
}

/**
 * 2.1 記事詳細の取得
 */
export async function getSharehouseArticleById(
  id: string,
  options: { preview?: boolean } = { preview: false }
) {
  if (!hasMicrocmsCredentials) return null;
  try {
    return await sharehouseClient.get<SharehouseArticle>({
      endpoint: 'articles',
      contentId: id,
      queries: buildSharehouseQueries(options),
    });
  } catch (error) {
    return null;
  }
}

/**
 * 3. プロジェクト一覧の取得 (projects)
 */
export async function getSharehouseProjects(options: { preview?: boolean; limit?: number } = { preview: false }) {
  if (!hasMicrocmsCredentials) return { contents: [], totalCount: 0 };
  try {
    return await sharehouseClient.getList<SharehouseProject>({
      endpoint: 'projects',
      queries: buildSharehouseQueries(options),
    });
  } catch (error) {
    console.error('[microCMS] projects の取得に失敗しました。APIが削除されている可能性があります。');
    return { contents: [], totalCount: 0 };
  }
}

/**
 * 3.1 プロジェクト詳細の取得
 */
export async function getSharehouseProjectById(id: string, options: { preview?: boolean } = { preview: false }) {
  if (!hasMicrocmsCredentials) return null;
  try {
    return await sharehouseClient.get<SharehouseProject>({
      endpoint: 'projects',
      contentId: id,
      queries: buildSharehouseQueries(options),
    });
  } catch (error) {
    return null;
  }
}

// -----------------------------------------------------------------------------
// V1 API 後方互換性レイヤー (安全な移行のため一時的に残す)
// -----------------------------------------------------------------------------

export async function getSharehouseLpSettings(options: { preview?: boolean } = { preview: false }) {
  return await getSiteGlobals(options);
}

export async function getSharehouseSiteConfig(options: { preview?: boolean } = { preview: false }) {
  return await getSiteGlobals(options);
}

export async function getSharehouseDiaries(options: { preview?: boolean; limit?: number } = { preview: false }) {
  return await getSharehouseArticles('diary', options);
}

export async function getSharehouseDiaryById(id: string, options: { preview?: boolean } = { preview: false }) {
  return await getSharehouseArticleById(id, options);
}

export async function getSharehouseNews(options: { preview?: boolean; limit?: number } = { preview: false }) {
  return await getSharehouseArticles('news', options);
}

export async function getLPData(options: { preview: boolean } = { preview: false }) {
  const globals = await getSiteGlobals(options);
  const projects = await getSharehouseProjects(options);
  const diaries = await getSharehouseArticles('diary', options);
  
  if (!globals) return null;

  return {
    ...globals,
    projects: projects.contents,
    diaries: diaries.contents,
  };
}
