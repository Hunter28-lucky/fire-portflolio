import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krish Goswami - Professional Web Developer & AI Expert',
    short_name: 'Krish Goswami',
    description: 'Krish Goswami - Top-Rated Developer & AI Automation Expert. Professional web development, VFX design, and AI solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['business', 'productivity', 'portfolio', 'technology'],
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    screenshots: [
      {
        src: '/icon.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  };
}
