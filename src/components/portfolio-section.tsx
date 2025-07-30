import { projects } from '@/data/projects';
import ProjectCard from './project-card';
import { Separator } from './ui/separator';

export default function PortfolioSection() {
  // Display all projects from the data file
  const displayedProjects = projects;

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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
