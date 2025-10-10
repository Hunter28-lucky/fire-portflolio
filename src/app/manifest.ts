import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krish Goswami Portfolio',
    short_name: 'Krish Goswami',
    description: 'Top-Rated Fiverr Developer specializing in AI automation, VFX design, and modern web development',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#4D70FA',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
