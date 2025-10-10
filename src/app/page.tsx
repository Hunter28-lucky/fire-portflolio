import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import FAQSchema from '@/components/faq-schema';

// Lazy lo        <article itemScope itemType="https://schema.org/Article">
          <HeroSection />
          <SplineSection />
          <ServicesSection />
          <PortfolioSection />
          <GithubSection />
        </article>
        <Footer />y components for better initial load time
const SplineSection = dynamic(() => import('@/components/spline-section'), {
  loading: () => <div className="h-screen w-full bg-gradient-to-b from-background to-background/50" />,
  ssr: false, // Disable SSR for 3D component
});

const PortfolioSection = dynamic(() => import('@/components/portfolio-section'), {
  loading: () => <div className="min-h-screen w-full flex items-center justify-center">Loading projects...</div>,
});

const GithubSection = dynamic(() => import('@/components/github-section'), {
  loading: () => <div className="min-h-screen w-full" />,
});

const AudioPlayer = dynamic(() => import('@/components/audio-player'), {
  ssr: false, // Audio player doesn't need SSR
});

const Footer = dynamic(() => import('@/components/footer'));

const MobileCta = dynamic(() => import('@/components/mobile-cta'), {
  ssr: false,
});

export default function Home() {
  // Enhanced Schema.org markup for better SEO and rich results
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "CreativeWork"],
    "name": "Krish Goswami",
    "alternateName": ["Krish Yogi", "Krish", "Krishna Goswami"],
    "url": "https://krishgoswami.me",
    "image": "https://krishgoswami.me/icon.png",
    "sameAs": [
      "https://www.linkedin.com/in/krish-goswami-779595316",
      "https://github.com/Hunter28-lucky",
      "https://www.fiverr.com/",
      "https://krishgoswami.me"
    ],
    "jobTitle": ["AI Automation Expert", "VFX Designer", "Web Developer"],
    "description": "Top-Rated Fiverr Developer specializing in AI automation, VFX design, and modern web development. Expert in Next.js, React, Firebase, and Blender.",
    "knowsAbout": [
      "AI Automation",
      "Artificial Intelligence",
      "VFX Design",
      "Visual Effects",
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Firebase",
      "Blender",
      "3D Animation",
      "Video Editing",
      "UI/UX Design",
      "Full Stack Development",
      "Tailwind CSS",
      "Node.js"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Web Developer & AI Automation Expert",
      "occupationLocation": {
        "@type": "Country",
        "name": "India"
      },
      "skills": "Web Development, AI Automation, VFX Design, Next.js, React, Firebase"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "knowsLanguage": ["English", "Hindi"],
    "email": "mailto:contact@krishgoswami.me",
    "gender": "Male"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Krish Goswami Portfolio",
    "url": "https://krishgoswami.me",
    "description": "Portfolio showcasing AI automation, VFX design, and web development projects",
    "author": {
      "@type": "Person",
      "name": "Krish Goswami"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Krish Goswami - Web Development & VFX Services",
    "alternateName": "Krish Yogi Development Services",
    "image": "https://krishgoswami.me/icon.png",
    "logo": "https://krishgoswami.me/icon.png",
    "description": "Professional AI automation, VFX design, and web development services. Specializing in Next.js, React, Firebase development, Blender VFX, and custom automation solutions.",
    "priceRange": "$$",
    "url": "https://krishgoswami.me",
    "telephone": "+91-XXX-XXX-XXXX",
    "email": "contact@krishgoswami.me",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "serviceType": [
      "Web Development",
      "AI Automation",
      "VFX Design",
      "UI/UX Design",
      "Full Stack Development"
    ],
    "provider": {
      "@type": "Person",
      "name": "Krish Goswami"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50+"
    }
  };

  // Breadcrumb schema for better navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://krishgoswami.me"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://krishgoswami.me/#projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "GitHub",
        "item": "https://krishgoswami.me/#github"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://krishgoswami.me/#contact"
      }
    ]
  };

  // Organization schema for brand
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Krish Goswami",
    "alternateName": "Krish Yogi",
    "url": "https://krishgoswami.me",
    "logo": "https://krishgoswami.me/icon.png",
    "description": "Professional web development, AI automation, and VFX design services by top-rated developer",
    "sameAs": [
      "https://www.linkedin.com/in/krish-goswami-779595316",
      "https://github.com/Hunter28-lucky",
      "https://www.fiverr.com/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contact@krishgoswami.me",
      "availableLanguage": ["English", "Hindi"]
    },
    "founder": {
      "@type": "Person",
      "name": "Krish Goswami"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "1"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    }
  };

  return (
    <>
      <main className="flex w-full flex-col items-center overflow-x-hidden" role="main">
        <article itemScope itemType="https://schema.org/Person">
          <HeroSection />
          <SplineSection />
          <ServicesSection />
          <PortfolioSection />
          <GithubSection />
        </article>
        <Footer />
      </main>
      <AudioPlayer />
      <MobileCta />

      {/* Enhanced Schema Markup for SEO and Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* FAQ Schema for Featured Snippets */}
      <FAQSchema />
    </>
  );
}
