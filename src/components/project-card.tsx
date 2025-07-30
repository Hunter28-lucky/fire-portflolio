import type { Project } from '@/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card
      ref={ref}
      className={cn(
        'glass-panel group overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl opacity-0 transform translate-y-8',
        inView && 'opacity-100 translate-y-0'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <CardHeader>
        <div className="relative mb-4 h-60 w-full overflow-hidden rounded-lg">
           <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={project.aiHint}
          />
        </div>
        <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-code">
              {tag}
            </Badge>
          ))
          }
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary-foreground">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
