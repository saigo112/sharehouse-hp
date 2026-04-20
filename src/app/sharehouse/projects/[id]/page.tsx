import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { getSharehouseProjectById } from '@/libs/microcms';
import type { SharehouseProject } from '@/types/sharehouse-cms';
import type { Project } from '@/types/microcms';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();
  
  // 新しいプロジェクト専用APIからIDで取得
  const newProject = await getSharehouseProjectById(params.id, { preview: isEnabled }) as SharehouseProject | null;
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

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/sharehouse/projects"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand text-lg">一覧に戻る</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface leading-tight">
            {project.title}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-sm font-bold">
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
          
          <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed">
            <p className="whitespace-pre-wrap">{project.description}</p>
            {project.content && (
              <div 
                className="mt-8 concept-rich-text" 
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
