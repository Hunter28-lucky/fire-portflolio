'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './project-card';
import { Separator } from './ui/separator';
import { getProjects } from '@/services/project-service';
import type { Project } from '@/types';
import { Skeleton } from './ui/skeleton';

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const dbProjects = await getProjects();
        setProjects(dbProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="w-full max-w-7xl px-4 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          My Recent Work
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
          Here is a selection of projects I've built.
        </p>
      </div>
      <Separator className="my-12 bg-primary/20" />
      {isLoading ? (
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
