'use client';

export default function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Krish Goswami offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krish Goswami offers professional web development, AI automation solutions, VFX design, UI/UX design, and full-stack development services. Specializing in Next.js, React, Firebase, TypeScript, and Blender VFX."
        }
      },
      {
        "@type": "Question",
        "name": "How can I hire Krish Goswami for a project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can hire Krish Goswami through his Fiverr profile as a top-rated developer, or contact directly through the contact form on this website at krishgoswami.me/#contact"
        }
      },
      {
        "@type": "Question",
        "name": "What technologies does Krish Goswami use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krish Goswami specializes in modern web technologies including Next.js, React, TypeScript, Firebase, Tailwind CSS, Node.js, and Blender for VFX design. Expert in both frontend and backend development."
        }
      },
      {
        "@type": "Question",
        "name": "Is Krish Goswami available for international projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Krish Goswami works with clients worldwide. As a top-rated Fiverr developer based in India, services are available globally for web development, AI automation, and VFX design projects."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Krish Goswami different from other developers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krish Goswami is a top-rated Fiverr developer with expertise in multiple domains: web development, AI automation, and VFX design. This unique combination allows for comprehensive digital solutions with modern technologies and creative visual design."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
