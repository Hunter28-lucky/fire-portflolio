import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import ContactForm from './contact-form';

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 w-full border-t border-white/10 bg-background/50 p-8 text-muted-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h3 className="text-lg font-headline text-primary-foreground">Krish Goswami</h3>
            <p className="text-center md:text-left text-sm">
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
          
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="text-lg font-headline text-primary-foreground">Quick Links</h3>
            <Link href="/#projects" className="text-sm hover:text-primary transition-colors">Projects</Link>
            <Link href="/#github" className="text-sm hover:text-primary transition-colors">GitHub</Link>
            <Link href="/#contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
            <Link href="/admin" className="text-sm hover:text-primary transition-colors">Admin</Link>
          </div>
          
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="text-lg font-headline text-primary-foreground">Resources</h3>
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">Next.js Documentation</a>
            <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">React Learning Resources</a>
            <a href="https://firebase.google.com/docs" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">Firebase Guides</a>
            <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">Tailwind CSS Docs</a>
            <a href="https://www.blender.org/support/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">Blender VFX Tutorials</a>
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
