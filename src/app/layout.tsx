import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import FontLoader from '@/components/font-loader';

// Lazy load non-critical components for better initial load
const CustomCursor = dynamic(() => import('@/components/custom-cursor'), {
  ssr: false,
  loading: () => null,
});
const AnimatedBackground = dynamic(() => import('@/components/animated-background'), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://krishgoswami.me'),
  title: {
    default: 'Krish Goswami (Krish Yogi) – AI Automation | VFX Designer | Web Developer',
    template: '%s | Krish Goswami Portfolio',
  },
  description: 'Top-Rated Fiverr Developer specializing in AI Automation, VFX Design & Web Development. Expert in Next.js, React, Firebase. Available for hire.',
  keywords: [
    // Name variations
    'Krish Goswami',
    'Krish Yogi',
    'Krish Goswami Portfolio',
    'Krish Yogi Developer',
    
    // Primary skills
    'AI Developer India',
    'AI Automation Expert',
    'VFX Designer India',
    'Web Developer India',
    'Automation Engineer',
    
    // Platforms & Technologies
    'Top Rated Fiverr Developer',
    'Fiverr Freelancer',
    'Next.js Developer',
    'React Developer',
    'Firebase Developer',
    'TypeScript Developer',
    'Tailwind CSS Expert',
    
    // Specializations
    'Blender VFX Artist',
    'Video Editing Expert',
    '3D Animation Designer',
    'UI/UX Designer',
    'Full Stack Developer',
    
    // Services
    'Custom Web Development',
    'AI Automation Solutions',
    'VFX and Motion Graphics',
    'Website Development Services',
    'Freelance Web Developer',
    
    // Location-based
    'Web Developer India',
    'Freelance Developer India',
    'Indian Tech Entrepreneur',
    'Computer Science Student India',
    
    // Project types
    'Portfolio Website Development',
    'E-commerce Development',
    'Business Website Design',
    'Landing Page Development',
    'SaaS Development',
    
    // Trending keywords
    'AI Integration Services',
    'Automation Workflow',
    'Modern Web Design',
    'Responsive Web Development',
    'Progressive Web Apps',
  ],
  authors: [{ name: 'Krish Goswami', url: 'https://krishgoswami.me' }],
  creator: 'Krish Goswami',
  publisher: 'Krish Goswami',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://krishgoswami.me',
    siteName: 'Krish Goswami - Professional Web Developer & AI Automation Expert',
    title: 'Krish Goswami (Krish Yogi) – Top-Rated Fiverr Developer | AI Automation | VFX Design | Web Development',
    description: 'Hire Krish Goswami for professional web development, AI automation, and VFX design services. Top-rated Fiverr developer with expertise in Next.js, React, Firebase, and Blender. Creating impactful digital solutions.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Krish Goswami - Web Developer, AI Expert, VFX Designer Portfolio',
      },
    ],
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KrishYogi',
    creator: '@KrishYogi',
    title: 'Krish Goswami - Top-Rated Web Developer | AI Automation Expert | VFX Designer',
    description: 'Professional web development, AI automation & VFX design services. Hire expert Fiverr developer for Next.js, React, Firebase projects. Portfolio & contact.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Web Development, AI Automation, VFX Design',
  referrer: 'origin-when-cross-origin',
  verification: {
    google: '_aJe80vNCJUNUxqfdrGVigptIOp5DJuqA903gr6xhso',
  },
  alternates: {
    canonical: 'https://krishgoswami.me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8808J83YNY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8808J83YNY');
            `,
          }}
        />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Spline 3D viewer - preload for faster loading */}
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="preload" href="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js" as="script" />
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js" defer></script>
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#4D70FA" />
        <meta name="msapplication-TileColor" content="#4D70FA" />
        
        {/* Additional SEO tags */}
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://krishgoswami.me" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/40">
        <FontLoader />
        <CustomCursor />
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
