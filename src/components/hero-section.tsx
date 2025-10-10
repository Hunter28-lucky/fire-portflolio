'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Briefcase, Eye } from 'lucide-react';

const titles = [
  'Top-Rated Fiverr Developer ⚡',
  'AI-Powered Automation Expert 🤖',
  'Building Impactful Projects 💸',
];

export default function HeroSection() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="flex min-h-[80svh] w-full flex-col items-center justify-center gap-8 px-4 text-center md:min-h-screen"
      aria-label="Hero section"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 
          className="font-headline text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl"
          style={{
            textShadow: '0 0 10px hsl(var(--primary)/0.8), 0 0 30px hsl(var(--primary)/0.6)'
          }}
        >
          Krish Goswami
        </h1>
        <div className="h-8">
            <p 
              key={currentTitleIndex} 
              className="animate-fade-in font-code text-lg text-primary-foreground/80 md:text-xl"
              role="status"
              aria-live="polite"
            >
              {titles[currentTitleIndex]}
            </p>
        </div>
      </div>
      {/* Mobile layout: buttons stack vertically */}
      <nav className="flex flex-col items-center gap-4 sm:flex-row md:flex" aria-label="Primary navigation">
        <a 
          href="https://www.fiverr.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="neon-border-button"
          aria-label="View my Fiverr profile (opens in new tab)"
        >
          <span></span>
          <div><Briefcase className="mr-2" aria-hidden="true" /> View My Fiverr Profile</div>
        </a>
        <Button asChild size="lg" className="text-lg">
          <a href="#projects" className="neon-border-button" aria-label="Explore my projects">
            <span></span>
            <div><Eye className="mr-2" aria-hidden="true" /> Explore Projects</div>
          </a>
        </Button>
        <Button asChild size="lg" className="text-lg">
          <a href="#contact" className="neon-border-button" aria-label="Contact me for hire">
            <span></span>
            <div><Mail className="mr-2" aria-hidden="true" /> Hire Me</div>
          </a>
        </Button>
      </nav>
    </section>
  );
}
