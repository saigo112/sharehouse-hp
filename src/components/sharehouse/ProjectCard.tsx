import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/microcms';

interface ProjectCardProps {
  project: Project;
  rotate?: string;
  className?: string;
}

/**
 * プロジェクトセクション用の個別カードコンポーネント
 * スクラップブック風のデザイン（傾き、テープ装飾、ポラロイド風の縁取り）を適用
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  rotate = '',
  className = '',
}) => {
  return (
    <Link href={`/sharehouse/projects/${project.id}`} className="block">
      <div className={`group relative bg-surface-container-lowest p-4 pb-12 shadow-polaroid rounded-sm transform transition-all duration-500 hover:scale-105 ${rotate} ${className}`}>
        {/* Washi Tape - スクラップブック感を出すためのテープ装飾 */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-secondary/15 backdrop-blur-[1px] z-20 pointer-events-none border-x border-white/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        />

        {/* Image Container (Polaroid style) */}
        <div className="relative aspect-square overflow-hidden mb-6 bg-surface-container-low border-8 border-white shadow-inner">
          {project.image?.url ? (
            <Image
              src={project.image.url}
              alt={project.title}
              fill
              className="object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
              <span className="material-symbols-outlined text-3xl">image</span>
            </div>
          )}

          {/* Status Badge (Marker/Post-it style) */}
          <div 
            className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-sm font-hand font-bold shadow-md border-b-2 border-r-2 border-black/5 z-10"
            style={{ fontSize: 'var(--caption-text-size)' }}
          >
            {project.status}
          </div>
        </div>

        {/* Content */}
        <div className="px-2">
          <h3 
            className="font-headline font-black text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors duration-300"
            style={{ fontSize: 'var(--body-text-size)' }}
          >
            {project.title}
          </h3>
          <p 
            className="text-on-surface-variant font-body leading-relaxed line-clamp-3"
            style={{ fontSize: 'var(--caption-text-size)' }}
          >
            {project.description}
          </p>
        </div>

        {/* Handwriting accent */}
        <div className="absolute bottom-4 right-6 font-hand text-primary/30 group-hover:text-primary transition-colors text-xs italic">
          Keep growing...
        </div>
      </div>
    </Link>
  );
};
