'use client';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Eye, Mail, Briefcase } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function MobileCta() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-50 w-full border-t border-white/10 bg-background/80 p-4 backdrop-blur-sm md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg" className="w-full">Menu</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
             <Button asChild size="lg">
              <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer"><Briefcase className="mr-2" /> Fiverr Profile</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#projects"><Eye className="mr-2" /> Explore Projects</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="mailto:hire.krish.goswami@gmail.com" target="_blank" rel="noopener noreferrer"><Mail className="mr-2" /> Hire Me</a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
