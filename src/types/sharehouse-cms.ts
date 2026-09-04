import type { MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

/**
 * レスポンシブフォントサイズ設定（カスタムフィールド）
 */
export type PcFontSize = {
  fieldId: 'pcFontSize';
  heroTitleSizePc?: number;
  sectionTitleSizePc?: number;
  bodyTextSizePc?: number;
  captionTextSizePc?: number;
};

export type MobileFontSize = {
  fieldId: 'mobileFontSize';
  heroTitleSizeSp?: number;
  sectionTitleSizeSp?: number;
  bodyTextSizeSp?: number;
  captionTextSizeSp?: number;
};

/**
 * サイト共通設定（site_globals）
 * lp_settings と site_config が統合されたオブジェクト形式のAPI
 */
export type SharehouseSiteGlobals = {
  heroTitle?: string;
  heroImage?: MicroCMSImage | MicroCMSImage[];
  menuItems?: {
    label: string;
    href: string;
  }[];
  conceptHandText?: string;
  conceptTitle?: string;
  conceptDesc1?: string;
  conceptDesc2?: string;
  conceptImage?: MicroCMSImage | MicroCMSImage[];
  conceptCaption?: string;
  conceptSticker?: string;
  conceptDetailTitle?: string;
  conceptDetail?: string;
  voices?: {
    fieldId: "voice";
    name: string;
    profession: string;
    quote: string;
    image: MicroCMSImage;
  }[];
  recruitmentInfos?: {
    fieldId: "recruitment";
    label: string;
    value: string;
  }[];
  // Font Settings (Legacy / Global)
  baseFontSize?: number;
  fontFamilyBody?: string;
  fontFamilyHeadline?: string;
  
  // Responsive Font Settings (New Custom Fields)
  pcFontSize?: PcFontSize;
  mobileFontSize?: MobileFontSize;
  entryFormUrl?: string;
  lineOfficialId?: string;
  lineOfficialUrl?: string;
  instagramUrl?: string;
  
  // Legacy individual settings (Backward compatibility)
  heroTitleFontSize?: number;
  conceptTitleFontSize?: number;
} & MicroCMSDate;

/**
 * 記事汎用型 (articles)
 * お知らせ(news)や日記(diaries)を1つのリストで統合管理
 */
export type SharehouseArticle = {
  id: string;
  article_type: ['news' | 'diary']; // MicroCMSのセレクトフィールドは配列で返る場合があるが、まずは単一文字列か配列かを想定。"news" | "diary"
  title: string;
  body?: string;
  mainVisual?: MicroCMSImage;
  summary?: string;
  instagramUrl?: string;
} & MicroCMSDate;

/**
 * プロジェクト（projects）
 */
export type SharehouseProject = {
  id: string;
  title: string;
  summary?: string;
  body?: string;
  mainVisual?: MicroCMSImage;
  status?: string;
  sort_order?: number;
} & MicroCMSDate;

// 後方互換維持用の型エイリアス (移行が完全に完了するまで保持)
export type SharehouseLpSettings = Partial<SharehouseSiteGlobals>;
export type SharehouseSiteConfig = Partial<SharehouseSiteGlobals>;
export type SharehouseDiary = SharehouseArticle;
export type SharehouseNews = SharehouseArticle;
