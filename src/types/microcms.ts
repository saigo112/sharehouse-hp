export type MicroCMSImage = {
  url: string;
  height?: number;
  width?: number;
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

// ひとつのエンドポイントで管理する場合（推奨）
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

  // CTA
  entryFormUrl?: string;
};
