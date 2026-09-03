import { hasMicrocmsCredentials, sharehouseClient } from "@/libs/microcms";
import { fallbackFarmPrograms } from "@/content/farm-programs";
import type {
  FarmArticle,
  FarmPerson,
  FarmProgram,
  FarmProject,
  FarmSiteGlobals,
} from "@/types/farm-cms";

type ListResponse<T> = { contents: T[]; totalCount: number };

async function getList<T>(endpoint: string, limit: number): Promise<ListResponse<T>> {
  if (!hasMicrocmsCredentials) return { contents: [], totalCount: 0 };
  try {
    return await sharehouseClient.getList<T>({
      endpoint,
      queries: { limit, orders: "-publishedAt" },
    });
  } catch {
    // The first release works before every API has been created in microCMS.
    return { contents: [], totalCount: 0 };
  }
}

async function getSingleton<T>(endpoint: string): Promise<T | null> {
  if (!hasMicrocmsCredentials) return null;
  try {
    return await sharehouseClient.get<T>({ endpoint });
  } catch {
    return null;
  }
}

const STORY_TYPES = ["diary", "story", "report", "日記", "物語", "活動報告", "レポート", "インスタ投稿", "instagram"];

export function isFarmStory(article: Pick<FarmArticle, "article_type">) {
  const types = Array.isArray(article.article_type) ? article.article_type : [article.article_type];
  return types.some((type) => STORY_TYPES.includes(String(type).toLowerCase()));
}

export async function getFarmSiteGlobals() {
  return getSingleton<FarmSiteGlobals>("site_globals");
}

export async function getFarmStories(limit = 100) {
  const response = await getList<FarmArticle>("articles", limit);
  const contents = response.contents.filter(isFarmStory);
  return { contents, totalCount: contents.length };
}

export async function getFarmStoryById(id: string) {
  if (!hasMicrocmsCredentials) return null;
  try {
    const article = await sharehouseClient.get<FarmArticle>({ endpoint: "articles", contentId: id });
    return isFarmStory(article) ? article : null;
  } catch {
    return null;
  }
}

export function isExperienceProgram(program: Pick<FarmProgram, "category">) {
  const categories = Array.isArray(program.category) ? program.category : [program.category];
  return categories.some((category) => ["experience", "体験"].includes(String(category).toLowerCase()));
}

function mergeCanonicalPrograms(cmsPrograms: FarmProgram[]) {
  return fallbackFarmPrograms.map((base) => {
    const cms = cmsPrograms.find((program) => program.slug === base.slug || program.id === base.id);
    if (!cms) return base;

    // Existing records without a slug still contain the old two-program copy.
    // Keep their uploaded media while the canonical four-program copy is staged.
    if (!cms.slug) {
      return {
        ...cms,
        ...base,
        id: cms.id,
        mainVisual: cms.mainVisual,
        gallery: cms.gallery,
      };
    }

    return { ...base, ...cms };
  });
}

export async function getFarmPrograms() {
  const response = await getList<FarmProgram>("programs", 100);
  const cmsPrograms = response.contents.filter(isExperienceProgram);
  const contents = mergeCanonicalPrograms(cmsPrograms)
    .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));

  return { contents, totalCount: contents.length };
}

export async function getFarmProgramById(id: string) {
  const { contents } = await getFarmPrograms();
  return contents.find((program) => program.id === id || program.slug === id) || null;
}

export async function getFarmHomepageData() {
  const [siteGlobals, articles, projects, people] = await Promise.all([
    getSingleton<FarmSiteGlobals>("site_globals"),
    getList<FarmArticle>("articles", 3),
    getList<FarmProject>("projects", 6),
    getList<FarmPerson>("people", 4),
  ]);

  const storyArticles = articles.contents.filter(isFarmStory);

  return { siteGlobals, articles: storyArticles.slice(0, 3), projects: projects.contents, people: people.contents };
}
