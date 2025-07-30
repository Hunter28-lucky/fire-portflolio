import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import ContactForm from './contact-form';

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 w-full border-t border-white/10 bg-background/50 p-8 text-muted-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h3 className="text-lg font-headline text-primary-foreground">Krish Goswami</h3>
            <p className="text-center md:text-left">
              AI & Automation Expert building impactful, futuristic web experiences.
            </p>
             <div className="flex gap-4">
              <a href="https://github.com/Hunter28-lucky" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github />
              </a>
              <a href="https://www.linkedin.com/in/krish-goswami-779595316" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h3 className="text-lg font-headline text-primary-foreground">Get in Touch</h3>
            <ContactForm />
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Krish Goswami. All rights reserved. | <Link href="/admin" className="hover:text-primary">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
