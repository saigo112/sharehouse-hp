import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/microcms';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  limit?: number;
}

/**
 * プロジェクトセクション全体のコンテナコンポーネント
 * セクションヘッダー、装飾、プロジェクトカードのグリッド表示を担当
 */
export const ProjectList: React.FC<ProjectListProps> = ({ projects, limit }) => {
  // スクラップブック風のバラバラ感を出すための回転角パターン
  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3'];
  
  // 表示するプロジェクトを制限
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="py-24 bg-surface-container-low px-6 relative overflow-hidden">
      {/* Background decoration (Subtle grid or paper texture if desired, here keeping it clean) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 relative">
          <div className="relative">
            <span className="font-hand text-primary text-xl block mb-2 -rotate-2">What we are doing...</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-on-surface tracking-tight">
              Projects
            </h2>
            <div className="h-3 w-1/2 bg-secondary-container/30 absolute -bottom-1 left-0 -z-10" />
            <p className="text-on-surface-variant mt-6 font-body font-medium text-lg max-w-xl">
              「生きる」を手打ちにするための。現在進行中の自給自足プロジェクトたち。
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-primary font-hand text-2xl rotate-3 bg-white/40 px-4 py-2 rounded-lg border border-primary/10 shadow-sm">
              Work with your hands...
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 lg:gap-x-16">
          {displayedProjects.map((project, index) => (
            <ProjectCard 
              key={project.id || index} 
              project={project} 
              rotate={rotations[index % rotations.length]}
            />
          ))}
        </div>

        {/* View All Button */}
        {limit && projects.length > 0 && (
          <div className="mt-20 text-center">
            <Link 
              href="/sharehouse/projects"
              className="inline-flex items-center gap-2 group text-primary font-bold text-lg"
            >
              <span className="border-b-2 border-primary/30 group-hover:border-primary transition-all pb-1">
                すべてのプロジェクトを見る
              </span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer accent for the section */}
      <div className="absolute bottom-0 right-10 w-48 h-12 bg-outline-variant/10 -skew-x-12 -z-10" />
    </section>
  );
};
