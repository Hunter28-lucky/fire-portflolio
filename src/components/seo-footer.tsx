/**
 * Comprehensive SEO Component with Internal Linking Structure
 * This creates a rich internal linking ecosystem for better SEO
 */

export default function SEOFooter() {
  return (
    <div className="w-full bg-background/50 border-t border-primary/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* SEO-Rich Content Section */}
        <div className="prose prose-invert max-w-none mb-12">
          <article className="text-sm text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-bold text-primary-foreground mb-4">
              About Krish Goswami - Professional Web Developer & AI Expert
            </h2>
            <p className="mb-4">
              <strong>Krish Goswami</strong> is a highly skilled professional web developer, AI automation expert, and VFX designer based in India. 
              With expertise in <strong>Next.js</strong>, <strong>React</strong>, <strong>TypeScript</strong>, <strong>Firebase</strong>, and <strong>Blender</strong>, 
              Krish Goswami delivers cutting-edge digital solutions for businesses worldwide.
            </p>
            <p className="mb-4">
              As a <strong>top-rated Fiverr developer</strong> with consistent 5-star reviews, <strong>Krish Goswami</strong> specializes in:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Custom Web Development</strong> - Building responsive, modern websites with Next.js and React</li>
              <li><strong>AI Automation</strong> - Integrating ChatGPT, OpenAI APIs, and custom AI solutions</li>
              <li><strong>VFX & 3D Design</strong> - Creating stunning visual effects with Blender</li>
              <li><strong>Full-Stack Development</strong> - End-to-end web application development</li>
              <li><strong>Firebase Integration</strong> - Backend, authentication, and database solutions</li>
              <li><strong>UI/UX Design</strong> - User-centered design with Tailwind CSS</li>
            </ul>
            <p className="mb-4">
              When searching for "<strong>Krish Goswami</strong>", "<strong>Krish Goswami developer</strong>", 
              "<strong>Krish Goswami web developer</strong>", or "<strong>hire Krish Goswami</strong>", you'll find 
              a proven track record of successful projects across various industries including e-commerce, SaaS, 
              portfolios, and business websites.
            </p>
            <p className="mb-4">
              <strong>Krish Goswami</strong> (also known as <strong>Krish Yogi</strong>) maintains active profiles on 
              multiple platforms including <strong>LinkedIn</strong>, <strong>GitHub</strong>, and <strong>Fiverr</strong>, 
              where clients consistently praise the quality of work, communication, and timely delivery.
            </p>
          </article>
        </div>

        {/* Keywords Section */}
        <div className="border-t border-primary/10 pt-8">
          <h3 className="text-sm font-bold text-primary-foreground mb-3">Related Keywords & Topics:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Krish Goswami',
              'Krish Yogi',
              'Web Developer India',
              'AI Expert',
              'Next.js Developer',
              'React Specialist',
              'Firebase Expert',
              'VFX Designer',
              'Blender Artist',
              'Full Stack Developer',
              'Fiverr Pro Developer',
              'Top Rated Developer',
              'Hire Krish Goswami',
              'Krish Goswami Portfolio',
              'Krish Goswami LinkedIn',
              'Krish Goswami GitHub',
              'Krish Goswami Fiverr',
              'Web Development Services',
              'AI Automation Expert',
              'Professional Web Developer',
              'Freelance Developer India',
              'Modern Web Design',
              'Responsive Websites',
              'Custom Web Applications',
              'E-commerce Development',
              'SaaS Development',
              'API Integration',
              'ChatGPT Integration',
              'OpenAI Development',
              'Machine Learning',
              'TypeScript Expert',
              'Tailwind CSS',
              'UI/UX Design',
              'Front-end Development',
              'Back-end Development',
              '3D Animation',
              'Motion Graphics',
              'Video Editing',
              'Digital Solutions',
              'Business Websites',
              'Portfolio Websites',
              'Landing Pages',
              'Web App Development',
              'Mobile-First Design',
              'SEO Optimization',
              'Performance Optimization',
              'Progressive Web Apps',
              'PWA Development',
              'Cloud Solutions',
              'Firebase Authentication',
              'Database Design',
              'API Development',
              'REST APIs',
              'GraphQL',
            ].map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-background/80 border border-primary/20 rounded-full text-xs text-muted-foreground hover:bg-primary/10 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Location & Service Area */}
        <div className="border-t border-primary/10 pt-8 mt-8">
          <h3 className="text-sm font-bold text-primary-foreground mb-3">Service Areas:</h3>
          <p className="text-xs text-muted-foreground">
            <strong>Krish Goswami</strong> provides web development, AI automation, and VFX design services worldwide, 
            serving clients in the United States, United Kingdom, Canada, Australia, Europe, Asia, and beyond. 
            Remote collaboration available 24/7. Based in India, serving global markets.
          </p>
        </div>

        {/* Professional Associations & Platforms */}
        <div className="border-t border-primary/10 pt-8 mt-8">
          <h3 className="text-sm font-bold text-primary-foreground mb-3">Find Krish Goswami On:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
            <div>
              <strong className="text-primary-foreground">Professional Networks:</strong>
              <ul className="mt-2 space-y-1">
                <li>• LinkedIn - Krish Goswami</li>
                <li>• GitHub - Hunter28-lucky</li>
                <li>• Fiverr - Top Rated Seller</li>
              </ul>
            </div>
            <div>
              <strong className="text-primary-foreground">Expertise Areas:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Web Development</li>
                <li>• AI Automation</li>
                <li>• VFX Design</li>
                <li>• Full-Stack Solutions</li>
              </ul>
            </div>
            <div>
              <strong className="text-primary-foreground">Technologies:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Next.js & React</li>
                <li>• TypeScript</li>
                <li>• Firebase</li>
                <li>• Blender</li>
              </ul>
            </div>
            <div>
              <strong className="text-primary-foreground">Services:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Custom Websites</li>
                <li>• AI Integration</li>
                <li>• 3D Animation</li>
                <li>• API Development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-primary/10 pt-8 mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Ready to start your project with <strong className="text-primary-foreground">Krish Goswami</strong>?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#contact" className="text-primary hover:text-primary/80 transition-colors">
              Contact Krish Goswami
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a href="#projects" className="text-primary hover:text-primary/80 transition-colors">
              View Portfolio
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a href="#services" className="text-primary hover:text-primary/80 transition-colors">
              Explore Services
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a href="#about" className="text-primary hover:text-primary/80 transition-colors">
              About Krish Goswami
            </a>
          </div>
        </div>

        {/* Copyright with Name */}
        <div className="border-t border-primary/10 pt-8 mt-8 text-center text-xs text-muted-foreground/60">
          <p>
            © 2025 <strong>Krish Goswami</strong> (Krish Yogi). All rights reserved. 
            Professional Web Developer | AI Automation Expert | VFX Designer | Based in India | Serving Worldwide
          </p>
          <p className="mt-2">
            Keywords: Krish Goswami, Krish Yogi, Web Developer, AI Expert, VFX Designer, Next.js, React, Firebase, Blender, 
            Top Rated Fiverr Developer, Full Stack Developer, Freelance Developer, Hire Krish Goswami
          </p>
        </div>
      </div>
    </div>
  );
}
