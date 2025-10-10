'use client';

import { Code, Sparkles, Palette, Zap, Brain, Globe } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Brain,
    title: 'AI Automation',
    description: 'Intelligent workflows and automation solutions powered by cutting-edge AI technology.',
    link: 'https://openai.com/blog/chatgpt',
    linkText: 'Learn about AI'
  },
  {
    icon: Palette,
    title: 'VFX Design',
    description: 'Stunning visual effects and 3D animations using Blender and industry-standard tools.',
    link: 'https://www.blender.org/features/vfx/',
    linkText: 'Explore VFX'
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with Next.js, React, and Firebase.',
    link: 'https://nextjs.org/showcase',
    linkText: 'Next.js Examples'
  },
  {
    icon: Zap,
    title: 'API Integration',
    description: 'Seamless integration of third-party APIs and custom backend solutions.',
    link: 'https://firebase.google.com/docs/functions',
    linkText: 'Firebase Functions'
  },
  {
    icon: Sparkles,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with Tailwind CSS and modern frameworks.',
    link: 'https://tailwindcss.com/showcase',
    linkText: 'Tailwind Showcase'
  },
  {
    icon: Globe,
    title: 'Full Stack Solutions',
    description: 'End-to-end development from concept to deployment on modern cloud platforms.',
    link: 'https://vercel.com/templates',
    linkText: 'View Templates'
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-20 px-4" id="services">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            What I Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in cutting-edge technologies to bring your ideas to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group glass-panel p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-primary-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1 mt-auto"
                  >
                    {service.linkText} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want to learn more about these technologies?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/#projects" className="hover:text-primary transition-colors">
              View My Projects
            </Link>
            <span className="text-muted-foreground">•</span>
            <a 
              href="https://github.com/Hunter28-lucky" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Check My GitHub
            </a>
            <span className="text-muted-foreground">•</span>
            <Link href="/#contact" className="hover:text-primary transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
