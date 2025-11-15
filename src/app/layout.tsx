import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import './pwa.css';
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
const PerformanceOptimizer = dynamic(() => import('@/components/performance-optimizer'), {
  ssr: false,
  loading: () => null,
});
const PWAInstallPrompt = dynamic(() => import('@/components/pwa-install-prompt'), {
  ssr: false,
  loading: () => null,
});
const PWAInstallButton = dynamic(() => import('@/components/pwa-install-button'), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://krishgoswami.me'),
  title: {
    default: 'Krish Goswami (Krish Goswmi) | Top Web Developer | AI Expert | Video Editor | VFX Designer',
    template: '%s | Krish Goswami - Professional Developer',
  },
  description: 'Krish Goswami (aka Krish Goswmi / Krish Yogi) - Top-Rated Web Developer, AI Expert & Cinematic Video Editor. 5★ Fiverr Pro | Next.js | React | Firebase | Blender VFX | Premiere Pro. Hire Krish Goswami for premium web, AI automation, and video editing.',
  keywords: [
    // Name variations - Primary focus for ranking (Top Priority)
    'Krish Goswami',
    'Krish Goswami developer',
    'Krish Goswami portfolio',
    'Krish Goswami web developer',
    'Krish Goswami AI expert',
    'Krish Goswami VFX designer',
    'Krish Goswami Fiverr',
    'Krish Goswami freelancer',
    'Krish Goswami LinkedIn',
    'Krish Goswami GitHub',
    'Krish Goswami website',
    'Krish Goswami projects',
    'Krish Yogi',
    'Krish Yogi Developer',
    'Krishna Goswami',
    'who is Krish Goswami',
    'Krish Goswami India',
    'hire Krish Goswami',
    'contact Krish Goswami',
    'Krish Goswami work',
    'Krish Goswami bio',
    'about Krish Goswami',
    // Misspelling variations captured for branded search dominance
    'Krish Goswmi',
    'Krish Goswmi developer',
    'Krish Goswmi portfolio',
    'Krish Goswmi video editor',
    'hire Krish Goswmi',
    'Krish Goswmi Fiverr',
    'Krish Goswmi AI expert',
    
    // Primary skills
    'AI Developer India',
    'AI Automation Expert',
    'VFX Designer India',
    'Web Developer India',
    'Automation Engineer',
    'Video Editor India',
    'Cinematic Video Editor',
    'Post Production Expert',
    
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
    'ChatGPT Integration',
    'OpenAI Developer',
    'Machine Learning Web Apps',
    'API Integration Expert',
    
    // Long-tail keywords for better ranking
    'hire web developer India',
    'best freelance developer',
    'top rated Fiverr developer',
    'affordable web development services',
    'professional VFX designer',
    'AI automation consultant',
    'Next.js expert developer',
    'React specialist India',
    'Firebase certified developer',
    'custom web application development',
    'startup web developer',
    'enterprise web solutions',
    'mobile responsive websites',
    'SEO optimized websites',
    'fast loading websites',
    'modern portfolio websites',
    'interactive web experiences',
    'web design and development',
    'full service web developer',
    'end to end web solutions',
    'Krish Goswmi video editing services',
    'hire Krish Goswmi video editor',
    'cinematic web and video experiences',
    'full stack developer and video editor',
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://krishgoswami.me',
    siteName: 'Krish Goswami - Web Developer, AI Expert & Video Editor',
    title: 'Krish Goswami (Krish Goswmi) | Web Developer | AI Automation Expert | Video Editor | VFX Designer',
    description: '🏆 Krish Goswami (Krish Goswmi) - 5-Star Developer | Web Development | AI Automation | Cinematic Video Editing | VFX Design | Next.js Expert | React Specialist | Firebase Pro | Hire for your next project!',
    images: [
      {
        url: 'https://krishgoswami.me/icon.png',
        width: 1200,
        height: 630,
        alt: 'Krish Goswami - Professional Web Developer, AI Expert & VFX Designer Portfolio',
        type: 'image/png',
      },
    ],
    countryName: 'India',
    determiner: 'the',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KrishYogi',
    creator: '@KrishYogi',
    title: 'Krish Goswami | Top Web Developer | AI Expert | VFX Designer',
    description: '🚀 Krish Goswami (Krish Goswmi) - Top-Rated Developer | Next.js | React | Firebase | AI Automation | Cinematic Video Editing | VFX Design | 5★ Fiverr Pro | Hire for professional web development and post-production',
    images: {
      url: 'https://krishgoswami.me/icon.png',
      alt: 'Krish Goswami - Web Developer Portfolio',
    },
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
        
        {/* LinkedIn Badge Script */}
        <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#4D70FA" />
        <meta name="msapplication-TileColor" content="#4D70FA" />
        
        {/* Additional SEO tags */}
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://krishgoswami.me" />
        
        {/* Enhanced SEO - Personal Branding */}
        <meta name="author" content="Krish Goswami" />
        <meta name="designer" content="Krish Goswami" />
        <meta name="owner" content="Krish Goswami" />
        <meta name="reply-to" content="contact@krishgoswami.me" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Krish Goswami" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Open Graph - LinkedIn Optimization */}
        <meta property="og:site_name" content="Krish Goswami Portfolio" />
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Krish" />
        <meta property="profile:last_name" content="Goswami" />
        <meta property="profile:username" content="krishgoswami" />
        
        {/* Article tags for better indexing */}
        <meta property="article:author" content="Krish Goswami" />
        <meta property="article:publisher" content="https://krishgoswami.me" />
        
        {/* Additional Twitter/X optimizations */}
        <meta name="twitter:domain" content="krishgoswami.me" />
        <meta name="twitter:url" content="https://krishgoswami.me" />
        <meta name="twitter:label1" content="Skills" />
        <meta name="twitter:data1" content="Web Development, AI, Video Editing, VFX" />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content="India" />
        
        {/* Dublin Core Metadata for academic/professional indexing */}
        <meta name="DC.title" content="Krish Goswami (Krish Goswmi) - Web Developer, AI Expert & Video Editor" />
        <meta name="DC.creator" content="Krish Goswami" />
        <meta name="DC.subject" content="Web Development, AI Automation, Video Editing, VFX Design" />
        <meta name="DC.description" content="Professional portfolio of Krish Goswami (Krish Goswmi) - Web Developer, AI Expert, Cinematic Video Editor, and VFX Designer" />
        <meta name="DC.publisher" content="Krish Goswami" />
        <meta name="DC.contributor" content="Krish Goswami" />
        <meta name="DC.type" content="Portfolio" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="en" />
        
        {/* Rich Pins for Pinterest */}
        <meta name="pinterest-rich-pin" content="true" />
        
        {/* LinkedIn specific */}
        <meta property="og:profile:first_name" content="Krish" />
        <meta property="og:profile:last_name" content="Goswami" />
        <meta property="og:profile:username" content="krish-goswami" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/icon.png" />
        <link rel="preload" as="image" href="/favicon.ico" />
        
        {/* Additional Performance Hints */}
        <link rel="prerender" href="https://krishgoswami.me" />
        <link rel="prefetch" href="https://krishgoswami.me/#projects" />
        <link rel="prefetch" href="https://krishgoswami.me/#contact" />
        
        {/* Mobile App Capability */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Krish Goswami" />
        
        {/* Windows Tiles */}
        <meta name="msapplication-TileImage" content="/icon.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tooltip" content="Krish Goswami - Web Developer" />
        <meta name="msapplication-starturl" content="/" />
        
        {/* iOS Specific */}
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-icon.png" />
        
        {/* Android Chrome */}
        <link rel="icon" sizes="192x192" href="/icon.png" />
        <link rel="icon" sizes="512x512" href="/icon.png" />
        
        {/* Alternate formats for better compatibility */}
        <link rel="alternate" type="application/rss+xml" title="Krish Goswami" href="https://krishgoswami.me/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Krish Goswami" href="https://krishgoswami.me/atom.xml" />
        
        {/* JSON-LD for additional context */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://krishgoswami.me",
                "url": "https://krishgoswami.me",
                "name": "Krish Goswami (Krish Goswmi) - Web Developer, AI Expert & Video Editor",
                "isPartOf": { "@id": "https://krishgoswami.me/#website" },
                "primaryImageOfPage": { "@id": "https://krishgoswami.me/#primaryimage" },
                "datePublished": "2024-01-01T00:00:00+00:00",
                "dateModified": "2025-10-10T00:00:00+00:00",
                "description": "Krish Goswami (Krish Goswmi) - Top-Rated Web Developer, AI Automation Expert & Cinematic Video Editor",
                "breadcrumb": { "@id": "https://krishgoswami.me/#breadcrumb" },
                "inLanguage": "en-US",
                "potentialAction": [
                  {
                    "@type": "ReadAction",
                    "target": ["https://krishgoswami.me"]
                  }
                ]
              },
              {
                "@type": "ImageObject",
                "@id": "https://krishgoswami.me/#primaryimage",
                "inLanguage": "en-US",
                "url": "https://krishgoswami.me/opengraph-image",
                "contentUrl": "https://krishgoswami.me/opengraph-image",
                "width": 1200,
                "height": 630,
                "caption": "Krish Goswami - Web Developer Portfolio"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://krishgoswami.me/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://krishgoswami.me"
                  }
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://krishgoswami.me/#website",
                "url": "https://krishgoswami.me",
                "name": "Krish Goswami (Krish Goswmi)",
                "description": "Professional Web Developer, AI Expert & Video Editor",
                "publisher": { "@id": "https://krishgoswami.me/#person" },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://krishgoswami.me/?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ],
                "inLanguage": "en-US"
              }
            ]
          })
        }} />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/40">
        <FontLoader />
        <PerformanceOptimizer />
        <CustomCursor />
        <AnimatedBackground />
        <PWAInstallPrompt />
        <PWAInstallButton />
        <div className="relative z-10">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
