import { Github } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function GithubSection() {
  return (
    <section id="github" className="w-full max-w-7xl px-4 py-16 sm:py-24">
      <Separator className="my-12 bg-primary/20" />
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Explore My Code
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-xl">
          I share many of my projects and experiments on GitHub. Feel free to explore my repositories, check out my code, and see how I build things.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href="https://github.com/Hunter28-lucky" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2" /> Visit My GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
