import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

/** Public-facing content only. Community OS data is intentionally excluded. */
export type FarmSiteGlobals = {
  farmHeroTitle?: string;
  farmHeroSubtitle?: string;
  farmHeroImage?: MicroCMSImage | MicroCMSImage[];
  farmAboutTitle?: string;
  farmAboutText?: string;
  farmContactUrl?: string;
  instagramUrl?: string;
  lineOfficialUrl?: string;
  lineOfficialId?: string;
  lineQrCode?: MicroCMSImage;
  scheduleCalendarEmbedUrl?: string;
  scheduleBookingUrl?: string;
  representativePhone?: string;
  contactIntroduction?: string;
  contactNotice?: string;
} & Partial<MicroCMSDate>;

export type FarmArticle = {
  id: string;
  title: string;
  summary?: string;
  body?: string;
  mainVisual?: MicroCMSImage;
  article_type?: string | string[];
} & Partial<MicroCMSDate>;

export type FarmProject = {
  id: string;
  title: string;
  summary?: string;
  mainVisual?: MicroCMSImage;
  status?: string;
  category?: string | string[];
} & Partial<MicroCMSDate>;

export type FarmProgram = {
  id: string;
  title: string;
  slug?: string;
  summary?: string;
  body?: string;
  mainVisual?: MicroCMSImage;
  gallery?: MicroCMSImage[];
  category?: string | string[];
  status?: string | string[];
  season?: string;
  duration?: string;
  capacity?: string;
  price?: string;
  target?: string;
  scheduleNote?: string;
  participationNotes?: string;
  sort_order?: number;
} & Partial<MicroCMSDate>;

export type FarmPerson = {
  id: string;
  name: string;
  role?: string;
  introduction?: string;
  image?: MicroCMSImage;
} & Partial<MicroCMSDate>;
