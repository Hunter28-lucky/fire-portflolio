'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './project-card';
import { Separator } from './ui/separator';
import type { Project } from '@/types';
import { Skeleton } from './ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { getProjects } from '@/services/project-service';
import { projects as seedProjects } from '@/data/projects';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.05 : 0.1, // Lower threshold on mobile for earlier loading
  });
  
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const dbProjects = await getProjects();
        setProjects(dbProjects);
      } catch (error) {
        console.error("Failed to fetch projects, falling back to local data:", error);
        setProjects(seedProjects);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section 
      id="projects"
      ref={ref}
      className={cn(
        'w-full max-w-7xl px-4 py-16 sm:py-24 opacity-0 transform translate-y-8',
        inView && 'opacity-100 translate-y-0'
      )}
      style={{ contentVisibility: 'auto' }}
      aria-label="Portfolio projects"
    >
      <header className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          My Recent Work
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
          Here is a selection of projects I've built using modern technologies.
        </p>
      </header>
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
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index}/>
          ))}
        </div>
      )}
    </section>
  );
}
