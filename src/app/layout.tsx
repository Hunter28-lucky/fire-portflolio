import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/custom-cursor';
import AnimatedBackground from '@/components/animated-background';

export const metadata: Metadata = {
  title: 'Krish Goswami (Krish Yogi) – AI Automation | VFX Designer | Web Developer Portfolio',
  description: 'This is the official portfolio of Krish Goswami (also known as Krish Yogi). Explore his work in AI automation, VFX design, and modern web development. Showcasing cutting-edge tech, digital art, and innovative tools.',
  keywords: 'Krish Goswami, Krish Yogi, Krish, Krish Goswami Portfolio, AI Developer India, VFX Designer, Automation Engineer, Video Editing, Blender VFX, Web Developer Portfolio, Computer Science Student, Tech Entrepreneur India, Website Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js" async></script>
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/40">
        <CustomCursor />
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
