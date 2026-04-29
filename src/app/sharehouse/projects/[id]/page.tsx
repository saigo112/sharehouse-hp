import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { getSharehouseProjectById, getSiteGlobals } from '@/libs/microcms';
import type { SharehouseProject } from '@/types/sharehouse-cms';
import type { Project } from '@/types/microcms';

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();
  
  // データの取得
  const [newProject, globalsData] = await Promise.all([
    getSharehouseProjectById(params.id, { preview: isEnabled }) as Promise<SharehouseProject | null>,
    getSiteGlobals()
  ]);

  let project: Project | undefined;

  if (newProject) {
    project = {
      id: newProject.id,
      title: newProject.title,
      description: newProject.summary || newProject.body || "",
      image: newProject.mainVisual || { url: "" },
      status: newProject.status || "進行中",
      content: newProject.body || ""
    };
  }

  if (!project) {
    notFound();
  }

  // フォント設定の構築
  const fontStyles = {
    '--base-font-size': globalsData?.baseFontSize ? `${globalsData.baseFontSize}px` : undefined,
    '--font-family-body': globalsData?.fontFamilyBody ? (globalsData.fontFamilyBody.includes(',') ? globalsData.fontFamilyBody : `'${globalsData.fontFamilyBody}', sans-serif`) : undefined,
    '--font-family-headline': globalsData?.fontFamilyHeadline ? (globalsData.fontFamilyHeadline.includes(',') ? globalsData.fontFamilyHeadline : `'${globalsData.fontFamilyHeadline}', sans-serif`) : undefined,

    '--hero-size': globalsData?.pcFontSize?.heroTitleSizePc ? `${globalsData.pcFontSize.heroTitleSizePc}px` : undefined,
    '--hero-size-sp': globalsData?.mobileFontSize?.heroTitleSizeSp ? `${globalsData.mobileFontSize.heroTitleSizeSp}px` : undefined,
    
    '--section-title-size': globalsData?.pcFontSize?.sectionTitleSizePc ? `${globalsData.pcFontSize.sectionTitleSizePc}px` : undefined,
    '--section-title-size-sp': globalsData?.mobileFontSize?.sectionTitleSizeSp ? `${globalsData.mobileFontSize.sectionTitleSizeSp}px` : undefined,
    
    '--body-text-size': globalsData?.pcFontSize?.bodyTextSizePc ? `${globalsData.pcFontSize.bodyTextSizePc}px` : undefined,
    '--body-text-size-sp': globalsData?.mobileFontSize?.bodyTextSizeSp ? `${globalsData.mobileFontSize.bodyTextSizeSp}px` : undefined,
    
    '--caption-text-size': globalsData?.pcFontSize?.captionTextSizePc ? `${globalsData.pcFontSize.captionTextSizePc}px` : undefined,
    '--caption-text-size-sp': globalsData?.mobileFontSize?.captionTextSizeSp ? `${globalsData.mobileFontSize.captionTextSizeSp}px` : undefined,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --base-font-size: ${fontStyles['--base-font-size'] || '16px'} !important;
          ${fontStyles['--font-family-body'] ? `--font-family-body: ${fontStyles['--font-family-body']} !important;` : ''}
          ${fontStyles['--font-family-headline'] ? `--font-family-headline: ${fontStyles['--font-family-headline']} !important;` : ''}
          
          --hero-size: ${fontStyles['--hero-size'] || '3rem'} !important;
          --section-title-size: ${fontStyles['--section-title-size'] || '2.25rem'} !important;
          --body-text-size: ${fontStyles['--body-text-size'] || '1rem'} !important;
          --caption-text-size: ${fontStyles['--caption-text-size'] || '0.875rem'} !important;
        }

        @media (max-width: 1023px) {
          :root {
            --hero-size: ${fontStyles['--hero-size-sp'] || '1.75rem'} !important;
            --section-title-size: ${fontStyles['--section-title-size-sp'] || '1.5rem'} !important;
            --body-text-size: ${fontStyles['--body-text-size-sp'] || '0.9375rem'} !important;
            --caption-text-size: ${fontStyles['--caption-text-size-sp'] || '0.8125rem'} !important;
          }
        }
      `}} />

      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/sharehouse/projects"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand" style={{ fontSize: 'var(--caption-text-size)' }}>一覧に戻る</span>
          </Link>
          <h1 
            className="font-headline font-black text-on-surface leading-tight"
            style={{ fontSize: 'var(--section-title-size)' }}
          >
            {project.title}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <span 
              className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              {project.status}
            </span>
          </div>
        </header>

        <main>
          {project.image?.url && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image.url} alt={project.title} className="w-full h-auto" />
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed"
            style={{ fontSize: 'var(--body-text-size)' }}
          >
            <p className="whitespace-pre-wrap">{project.description}</p>
            {project.content && (
              <div 
                className="mt-8 concept-rich-text" 
                style={{ fontSize: 'var(--body-text-size)' }}
                dangerouslySetInnerHTML={{ __html: project.content }} 
              />
            )}
          </div>
        </main>

        <footer className="mt-20 pt-12 border-t border-surface-container text-center">
          <Link
            href="/sharehouse/projects"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
          >
            プロジェクト一覧へ
          </Link>
        </footer>
      </div>
    </div>
  );
}
