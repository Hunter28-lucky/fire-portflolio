import { getTopProjects } from '@/ai/flows/smart-project-display';
import { projects, projectPerformanceMetrics } from '@/data/projects';
import ProjectCard from './project-card';
import { Separator } from './ui/separator';

export default async function PortfolioSection() {
  const freelancerSkills = 'website building, automation, AI projects';
  const projectDescriptions = projects.map((p) => p.description).join('; ');
  const performanceMetrics = projectPerformanceMetrics.join('; ');
  
  let displayedProjects = [];
  try {
    const { topProjects } = await getTopProjects({
      freelancerSkills,
      projectDescriptions,
      projectPerformanceMetrics: performanceMetrics,
    });
    
    // The AI returns project titles, so we filter based on that.
    const topProjectTitles = topProjects.split(',').map(t => t.trim().toLowerCase());
    
    displayedProjects = projects.filter(p => topProjectTitles.includes(p.title.toLowerCase()));

    // Fallback to show all projects if AI returns fewer than 3
    if (displayedProjects.length < 3) {
      displayedProjects = projects.slice(0, 4);
    }
  } catch (error) {
    console.error("AI flow failed, showing fallback projects:", error);
    // Fallback to first 4 projects if AI fails
    displayedProjects = projects.slice(0, 4);
  }


  return (
    <section id="projects" className="w-full max-w-7xl px-4 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Curated Projects
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
          A selection of my best work, intelligently curated to showcase my skills.
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
