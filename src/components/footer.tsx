import { Button } from './ui/button';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-white/10 bg-background/50 p-8 text-center text-muted-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h3 className="text-lg font-headline text-primary-foreground">Krish Goswami</h3>
            <p className="text-left">
              AI & Automation Expert building impactful, futuristic web experiences.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-headline text-primary-foreground">Get in Touch</h3>
            <div className="flex gap-4">
              <Button asChild size="lg" variant="secondary">
                <a href="mailto:hire.krish.goswami@example.com">
                  <Mail className="mr-2" /> Hire Me
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <a href="mailto:message.krish.goswami@example.com">
                  <Send className="mr-2" /> Message Me
                </a>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <h3 className="text-lg font-headline text-primary-foreground">Follow Me</h3>
            <div className="flex gap-4">
              <Button asChild variant="ghost" size="icon">
                <a href="https://github.com/Hunter28-lucky" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8">
          <p>
            &copy; {new Date().getFullYear()} Krish Goswami. All rights reserved. | <Link href="/admin" className="hover:text-primary">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}