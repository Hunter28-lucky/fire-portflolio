/**
 * SEO Footer Component - Hidden from view but indexed by search engines
 * Provides SEO benefits without cluttering the UI
 * Uses CSS 'hidden' class to hide from users while keeping content accessible to crawlers
 */

export default function SEOFooter() {
  return (
    <>
      {/* Hidden SEO content - Google can read it, users won't see it */}
      <div className="hidden" aria-hidden="true">
        <article itemScope itemType="https://schema.org/Person">
          <h2>Krish Goswami - Professional Web Developer & AI Expert</h2>
          <p>
            Krish Goswami is a highly skilled professional web developer, AI automation expert, and VFX designer based in India. 
            With expertise in Next.js, React, TypeScript, Firebase, and Blender, Krish Goswami delivers cutting-edge digital solutions.
          </p>
          <p>
            As a top-rated Fiverr developer, Krish Goswami specializes in Custom Web Development, AI Automation, VFX Design, 
            Full-Stack Development, Firebase Integration, and UI/UX Design.
          </p>
          <p>
            Krish Goswami (also known as Krish Yogi) maintains active profiles on LinkedIn, GitHub, and Fiverr.
          </p>
          
          {/* SEO Keywords - Completely hidden but indexed */}
          <p>
            Keywords: Krish Goswami, Krish Yogi, Krish Goswami developer, Krish Goswami web developer, 
            Krish Goswami portfolio, hire Krish Goswami, Krish Goswami LinkedIn, Krish Goswami GitHub, 
            Krish Goswami Fiverr, Krish Goswami AI expert, Krish Goswami VFX designer, web developer India, 
            Next.js developer, React specialist, Firebase expert, AI automation, top rated developer, 
            full stack developer, freelance developer, professional web developer, UI/UX designer
          </p>
        </article>
      </div>
    </>
  );
}
