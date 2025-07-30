import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/custom-cursor';
import AnimatedBackground from '@/components/animated-background';

export const metadata: Metadata = {
  title: 'Krish Goswami Portfolio',
  description: 'Top-Rated Fiverr Developer | AI & Automation Expert',
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
