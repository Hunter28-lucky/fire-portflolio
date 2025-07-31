import AudioPlayer from '@/components/audio-player';
import Footer from '@/components/footer';
import GithubSection from '@/components/github-section';
import HeroSection from '@/components/hero-section';
import MobileCta from '@/components/mobile-cta';
import PortfolioSection from '@/components/portfolio-section';
import SplineSection from '@/components/spline-section';
import Head from 'next/head'; // Import Head

export default function Home() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krish Goswami",
    "alternateName": "Krish Yogi",
    "url": "https://fire-portflolio.vercel.app/",
    "sameAs": [
      "https://www.linkedin.com/in/krish-goswami-779595316",
      "https://github.com/Hunter28-lucky"
    ],
    "jobTitle": "Website Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Krish Goswami (Krish Yogi)" // Using your name as personal brand
    },
    // Add more properties as needed, like "alumniOf", "birthPlace", etc.
  };

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="_aJe80vNCJUNUxqfdrGVigptIOp5DJuqA903gr6xhso" />
      </Head>
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <HeroSection />
        <SplineSection />
        <PortfolioSection />
        <GithubSection />
        <Footer />
      </main>
      <AudioPlayer />
      <MobileCta />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
    </>
  );
}
