import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'VFX Showcase',
    description: 'A modern, visually-driven portfolio for showcasing VFX projects and creative work.',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['Web', 'Portfolio', 'Vercel'],
    link: 'https://vfx-two.vercel.app/',
    aiHint: 'visual effects'
  },
  {
    id: '2',
    title: 'Shree Sawariya Elegance',
    description: 'A mobile-first e-commerce experience for an elegance and fashion brand.',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['E-commerce', 'Mobile', 'Vercel'],
    link: 'https://shree-sawariya-elegance-mobile.vercel.app/',
    aiHint: 'fashion store'
  },
  {
    id: '3',
    title: 'Bomboclat Mines',
    description: 'An interactive web-based game with a unique and engaging user interface.',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['Game', 'Web', 'Vercel'],
    link: 'https://bomboclatmines-a9fy.vercel.app/',
    aiHint: 'web game'
  },
  {
    id: '4',
    title: 'Modern Business Website',
    description: 'A clean and professional website for a business, hosted on GitHub Pages.',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['Web', 'Business', 'GitHub Pages'],
    link: 'https://hunter28-lucky.github.io/new-website-/',
    aiHint: 'corporate website'
  },
  {
    id: '5',
    title: 'Developer Portfolio',
    description: 'A personal portfolio page to showcase skills and projects, hosted on GitHub Pages.',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['Web', 'Portfolio', 'GitHub Pages'],
    link: 'https://hunter28-lucky.github.io/my-portfolio/',
    aiHint: 'developer portfolio'
  }
];

// This data is no longer used by the simplified portfolio section.
export const projectPerformanceMetrics: string[] = [];
