import AudioPlayer from '@/components/audio-player';
import HeroSection from '@/components/hero-section';
import MobileCta from '@/components/mobile-cta';
import PortfolioSection from '@/components/portfolio-section';
import SplineSection from '@/components/spline-section';

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <HeroSection />
        <SplineSection />
        <PortfolioSection />
        <footer className="mt-16 w-full p-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Krish Goswami. All rights reserved.
          </p>
        </footer>
      </main>
      <AudioPlayer />
      <MobileCta />
    </>
  );
}
