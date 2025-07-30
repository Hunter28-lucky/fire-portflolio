import AudioPlayer from '@/components/audio-player';
import Footer from '@/components/footer';
import GithubSection from '@/components/github-section';
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
        <GithubSection />
        <Footer />
      </main>
      <AudioPlayer />
      <MobileCta />
    </>
  );
}
