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
  const rotations = ['', '', '', '', ''];

  // 表示するプロジェクトを制限
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className="py-10 md:py-24 bg-surface-container-low px-6 relative overflow-hidden">
      {/* Background decoration (Subtle grid or paper texture if desired, here keeping it clean) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-20 relative">
          <div className="relative inline-block">
            <span 
              className="font-hand text-primary block mb-2"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              What we are doing...
            </span>
            <h2 
              className="font-headline font-black text-on-surface tracking-tight"
              style={{ fontSize: 'var(--section-title-size)' }}
            >
              Projects
            </h2>
            <div className="h-3 w-1/2 bg-secondary-container/30 absolute -bottom-1 left-1/4 -z-10" />
          </div>
          


          {/* Floating decoration for PC */}
          <div className="hidden md:block absolute -right-4 top-0 translate-x-full">
            <div 
              className="text-primary font-hand bg-white/40 px-4 py-2 rounded-lg border border-primary/10 shadow-sm"
              style={{ fontSize: 'var(--caption-text-size)' }}
            >
              Work with your hands...
            </div>
          </div>
        </div>

        {/* Scroll indicator for mobile focus */}
        <div className="md:hidden flex justify-end px-4 -mt-12 mb-4 animate-pulse items-center gap-2 text-on-surface-variant font-hand text-base">
          <span>Swipe</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </div>

        {/* Projects Grid / Scrollable on mobile */}
        <div className="flex md:grid overflow-x-auto md:overflow-visible pb-12 md:pb-0 gap-8 md:gap-x-12 lg:gap-x-16 md:grid-cols-2 lg:grid-cols-3 snap-x snap-mandatory no-scrollbar">
          {displayedProjects.map((project, index) => (
            <div key={project.id || index} className="shrink-0 w-[85%] md:w-auto snap-center">
              <ProjectCard
                project={project}
                rotate={rotations[index % rotations.length]}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {limit && projects.length > 0 && (
          <div className="mt-6 md:mt-20 text-center">
            <Link
              href="/sharehouse/projects"
              className="inline-flex items-center gap-2 group text-primary font-bold"
              style={{ fontSize: 'var(--body-text-size)' }}
            >
              <span className="border-b-2 border-primary/30 group-hover:border-primary transition-all pb-1">
                すべてのプロジェクトを見る
              </span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontSize: '1.2em' }}>arrow_forward</span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer accent for the section */}
      <div className="absolute bottom-0 right-10 w-48 h-12 bg-outline-variant/10 -skew-x-12 -z-10" />
    </section>
  );
};
