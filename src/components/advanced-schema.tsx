/**
 * Advanced Schema Markup for Maximum SEO Impact
 * Includes: Review Schema, Course Schema, Video Schema, How-To Schema
 */

export default function AdvancedSchema() {
  // Review Schema - Shows star ratings in search results
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Service",
      "name": "Krish Goswami (Krish Goswmi) Web Development & Video Editing Services",
      "image": "https://krishgoswami.me/icon.png",
      "description": "Professional web development, AI automation, cinematic video editing, and VFX design services by Krish Goswami"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": "Multiple Clients"
    },
    "reviewBody": "Krish Goswami consistently delivers exceptional web development and AI automation solutions. Top-rated developer with excellent communication and technical expertise.",
    "publisher": {
      "@type": "Organization",
      "name": "Fiverr"
    }
  };

  // Aggregate Rating Schema
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krish Goswami (Krish Goswmi)",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Offer Schema - Services offered
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Web Development, AI Automation & Video Editing by Krish Goswami",
    "description": "Professional web development, AI automation, cinematic video editing, and VFX design services",
    "seller": {
      "@type": "Person",
      "name": "Krish Goswami"
    },
    "price": "Variable",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://krishgoswami.me",
    "itemOffered": {
      "@type": "Service",
      "name": "Custom Web & Video Experiences",
      "description": "Full-stack web builds paired with cinematic video editing using Next.js, React, Firebase, Premiere Pro, and DaVinci Resolve"
    }
  };

  // Video Object Schema (for future video content)
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Krish Goswami (Krish Goswmi) - Web & Video Portfolio Showcase",
    "description": "Explore the portfolio and projects of Krish Goswami, a top-rated web developer, AI automation expert, and cinematic video editor",
    "thumbnailUrl": "https://krishgoswami.me/icon.png",
    "uploadDate": "2025-01-10",
    "duration": "PT2M",
    "contentUrl": "https://krishgoswami.me",
    "embedUrl": "https://krishgoswami.me"
  };

  // How-To Schema for "How to hire Krish Goswami"
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Hire Krish Goswami (Krish Goswmi) for Web & Video Projects",
    "description": "Step-by-step guide to hiring Krish Goswami for your web development, AI, or video editing project",
    "image": "https://krishgoswami.me/icon.png",
    "totalTime": "PT10M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Visit Portfolio",
        "text": "Visit Krish Goswami's portfolio at krishgoswami.me to view projects and expertise",
        "url": "https://krishgoswami.me"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Review Services",
        "text": "Review available services including web development, AI automation, cinematic video editing, and VFX design",
        "url": "https://krishgoswami.me/#services"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Contact",
        "text": "Contact Krish Goswami (Krish Goswmi) through the contact form or visit the Fiverr profile",
        "url": "https://krishgoswami.me/#contact"
      }
    ]
  };

  // Course Schema - Skills and expertise
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Web Development & Video Editing with Krish Goswami (Krish Goswmi)",
    "description": "Learn web development, AI automation, and cinematic video editing techniques from Krish Goswami's expertise in Next.js, React, Premiere Pro, and modern creative tools",
    "provider": {
      "@type": "Person",
      "name": "Krish Goswami",
      "sameAs": "https://krishgoswami.me"
    },
    "offers": {
      "@type": "Offer",
      "category": "Web Development"
    }
  };

  // ItemList Schema - Portfolio projects
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Krish Goswami Portfolio Projects",
    "description": "Collection of web development, AI automation, cinematic video editing, and VFX design projects by Krish Goswami",
    "numberOfItems": 10,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "AI Automation Projects"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Web Development Projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Video Editing & VFX Design Projects"
      }
    ]
  };

  // LocalBusiness Schema (if applicable)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://krishgoswami.me",
    "name": "Krish Goswami - Web Development Services",
    "image": "https://krishgoswami.me/icon.png",
    "description": "Professional web development, AI automation, cinematic video editing, and VFX design services in India",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6139,
      "longitude": 77.2090
    },
    "url": "https://krishgoswami.me",
    "telephone": "+91-XXX-XXX-XXXX",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
