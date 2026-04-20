export type MicroCMSImage = {
  url: string;
  height?: number;
  width?: number;
};

export type MenuItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  title: string;
  backgroundImage: MicroCMSImage;
};

export type ConceptContent = {
  handwrittenText?: string;
  title: string;
  description1: string;
  description2: string;
  polaroidImage: MicroCMSImage;
  polaroidCaption?: string;
  stickerText?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: MicroCMSImage;
  status: string;
  content?: string;
};

export type Diary = {
  id: string;
  image: MicroCMSImage;
  caption: string;
  content?: string;
  instagramUrl?: string;
};

export type Voice = {
  id: string;
  name: string;
  profession: string;
  quote: string;
  image: MicroCMSImage;
};

export type RecruitmentInfo = {
  id: string;
  label: string;
  value: string;
};

// ひとつのエンドポイントで管理する場合（推奨） - ※段階的移行のため一時的に残す
export type LPData = {
  // Hero (Flat)
  heroTitle?: string;
  heroImage?: MicroCMSImage;
  
  // Concept (Flat)
  conceptHandText?: string;
  conceptTitle?: string;
  conceptDesc1?: string;
  conceptDesc2?: string;
  conceptImage?: MicroCMSImage;
  conceptCaption?: string;
  conceptSticker?: string;

  // Repeated Fields
  projects?: Project[];
  diaries?: Diary[];
  voices?: Voice[];
  recruitment?: RecruitmentInfo[];
  menuItems?: MenuItem[];

  // CTA
  entryFormUrl?: string;

  // Concept Detail (Rich Text)
  conceptDetailTitle?: string;
  conceptRichText?: string;
};

// --- 新しい汎用リストAPI / 設定API 用の型定義 ---

// 設定値API（オブジェクト形式） `sharehouse_settings`
export type SharehouseSettings = {
  heroTitle?: string;
  heroImage?: MicroCMSImage;
  conceptHandText?: string;
  conceptTitle?: string;
  conceptDesc1?: string;
  conceptDesc2?: string;
  conceptImage?: MicroCMSImage;
  conceptCaption?: string;
  conceptSticker?: string;
  conceptDetailTitle?: string;
  conceptRichText?: string;
  entryFormUrl?: string;
  menuItems?: MenuItem[];
};

// 汎用リストAPI（リスト形式） `contents`
export type ProjectType = 'sharehouse' | 'rice_sales' | 'camp_site';
export type ContentType = 'project' | 'diary' | 'voice' | 'recruitment' | 'news' | 'hero_copy' | 'about' | 'features';

export type GlobalContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  project_type: ProjectType[]; // セレクトフィールド（複数選択可の場合を考慮、単一なら string） - microCMSのセレクトフィールドは配列で返ることが多い
  content_type: ContentType[];
  title?: string;
  subtitle?: string;
  body?: string;
  summary?: string;
  main_visual?: MicroCMSImage;
  status?: string;
  instagram_url?: string;
  sort_order?: number;
};
