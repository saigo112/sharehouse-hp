import { Metadata } from "next";
import Link from "next/link";
import { getSharehouseProjects } from "@/libs/microcms";
import { SharehouseProject } from "@/types/sharehouse-cms";
import { ProjectCard } from "@/components/sharehouse/ProjectCard";

export const metadata: Metadata = {
  title: "プロジェクト一覧 | ハチソラハウス",
  description: "ハチソラハウスで進行中の「生きる力」を育むプロジェクト一覧です。",
};

export default async function ProjectListPage() {
  const data = await getSharehouseProjects();
  const projects = (data?.contents || []).map((p: SharehouseProject, index: number) => ({
    id: p.id || String(index + 1),
    title: p.title,
    description: p.summary || p.body || "",
    image: p.mainVisual || { url: "" },
    status: p.status || "進行中",
    content: p.body || ""
  }));

  return (
    <div className="min-h-screen bg-background font-body py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <Link
            href="/sharehouse"
            className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-bold font-hand text-lg">ホームに戻る</span>
          </Link>
          <div className="relative">
            <div className="inline-block font-hand text-primary text-2xl -rotate-2 mb-2">
              Our Activities
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface">
              プロジェクト<span className="marker-underline-terracotta">一覧</span>
            </h1>
          </div>
        </header>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant">
            <p className="text-on-surface-variant text-lg">現在公開中のプロジェクトはありません。</p>
          </div>
        )}
      </div>
    </div>
  );
}
