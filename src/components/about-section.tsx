'use client';

import { Code2, Sparkles, Video, Zap, Award, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="w-full py-12 md:py-16 px-4" id="about">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            About Krish Goswami
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Top-Rated Developer • AI Expert • Creative Technologist
          </p>
        </div>

        {/* Main Content - Card Layout */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Introduction Card */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold mb-2">Who I Am</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Krish Goswami</span> (aka Krish Goswmi, Krish Yogi) - 
                  A passionate full-stack developer from India, specializing in cutting-edge web solutions and AI automation.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Code2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold mb-2">What I Do</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Building modern web apps with <span className="text-primary font-medium">Next.js, React & Firebase</span>, 
                  crafting stunning visuals with <span className="text-accent font-medium">Blender & Premiere Pro</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Grid - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 md:p-5 rounded-xl border border-primary/20">
            <Code2 className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2" />
            <h4 className="font-semibold text-sm md:text-base mb-1">Web Development</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Next.js • React • TypeScript</p>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 md:p-5 rounded-xl border border-accent/20">
            <Zap className="h-6 w-6 md:h-8 md:w-8 text-accent mb-2" />
            <h4 className="font-semibold text-sm md:text-base mb-1">AI Automation</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Integration • Workflows</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 md:p-5 rounded-xl border border-purple-500/20">
            <Video className="h-6 w-6 md:h-8 md:w-8 text-purple-500 mb-2" />
            <h4 className="font-semibold text-sm md:text-base mb-1">Video & VFX</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Editing • 3D Animation</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 md:p-5 rounded-xl border border-green-500/20">
            <Award className="h-6 w-6 md:h-8 md:w-8 text-green-500 mb-2" />
            <h4 className="font-semibold text-sm md:text-base mb-1">Top Rated</h4>
            <p className="text-xs md:text-sm text-muted-foreground">5★ Fiverr Pro Developer</p>
          </div>
        </div>

        {/* Why Choose Section - Compact */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl">
          <h3 className="font-headline text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center">
            Why Work With Me?
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              'Top-rated Fiverr developer',
              'AI automation expert',
              'Full-stack proficiency',
              'VFX & video editing',
              'Fast delivery',
              'Client satisfaction guaranteed'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-sm md:text-base text-muted-foreground">
            Ready to bring your project to life? <span className="text-primary font-semibold">Let's connect!</span>
          </p>
        </div>
      </div>
    </section>
  );
}
