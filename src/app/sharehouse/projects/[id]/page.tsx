// src/app/sharehouse/projects/[id]/page.tsx
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getLPData } from '@/libs/microcms';
import type { Project } from '@/types/microcms';

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();
  const data = await getLPData({ preview: isEnabled });
  if (!data) {
    notFound();
    return null;
  }
  const project = (data.projects || []).find((p: Project) => p.id === params.id);
  if (!project) {
    notFound();
    return null;
  }
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      {project.image?.url && (
        <img src={project.image.url} alt={project.title} className="w-full h-auto mb-6" />
      )}
      <p className="text-lg mb-4">{project.description}</p>
    </section>
  );
}
