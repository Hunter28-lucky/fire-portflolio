# Copilot Instructions for Krish Goswami Portfolio

## Project Overview
A Next.js 14 portfolio website with Firebase backend, PWA capabilities, and AI-powered features. Built for a freelance developer showcasing VFX, web development, and AI automation expertise. Deployed on Firebase App Hosting with heavy SEO optimization for "Krish Goswami" search ranking.

## Architecture & Key Patterns

### Firebase Dual-Init Pattern
- **Client-side**: `src/lib/firebase/client.ts` (auth + Firestore)
- **Server-side**: `src/lib/firebase/server.ts` (Firestore only)
- Always use `'use client'` for components importing `client.ts`
- Check `getApps().length` before initializing to prevent duplicate apps

### Dynamic Component Loading Strategy
Heavy components are lazy-loaded in `src/app/layout.tsx` and `src/app/page.tsx`:
```tsx
const SplineSection = dynamic(() => import('@/components/spline-section'), {
  ssr: false,  // 3D/interactive components disable SSR
  loading: () => <div>...</div>
});
```
Apply this pattern for: 3D models, audio players, custom cursors, PWA prompts.

### Project Data Flow
1. **Seed data**: `src/data/projects.ts` (fallback only)
2. **Service layer**: `src/services/project-service.ts` auto-seeds Firestore on first load
3. **Admin CMS**: `/admin` route with Google Auth (restricted to `krrishyogi18@gmail.com`)
4. **AI curation**: `src/ai/flows/smart-project-display.ts` uses Genkit to curate top projects

### Auth Pattern
- Protected route: `src/app/admin/page.tsx` checks `authorizedAdminEmails` array
- Context: `src/context/auth-context.tsx` provides `useAuth()` hook
- Always wrap admin features with: `const { user, loading } = useAuth()`
- Handle loading state before checking authentication

## Development Commands
```bash
npm run dev        # Port 9002 (non-standard)
npm run build      # TypeScript/ESLint errors ignored (see next.config.mjs)
npm run typecheck  # Manual type checking
```

## Design System & Styling

### Color Tokens (from blueprint.md)
- **Primary**: `#4D70FA` (neon blue) - main text, interactive elements
- **Accent**: `#BF5FFF` (electric purple) - CTAs, highlights
- **Background**: `#121212` (dark gray) with bluish-neon overlays
- Use `.glass-panel` class for frosted glass effect with neon borders

### Typography
```tsx
className="font-headline"  // Space Grotesk - headers
className="font-body"      // Inter - body text
className="font-code"      // Source Code Pro - code blocks
```

### Custom Cursor
Mobile detection via `useIsMobile()` hook - cursor only renders on desktop. Body gets `.custom-cursor-loaded` class when active.

## SEO Implementation

### Aggressive Keyword Strategy
`src/app/layout.tsx` contains 90+ keyword variations in metadata:
- Primary: "Krish Goswami", "Krish Yogi", "Krishna Goswami"
- Long-tail: "Krish Goswami developer", "hire Krish Goswami", etc.
- **Do not remove keywords** - see `SEO_OPTIMIZATION_REPORT.md` for rationale

### Schema Markup
14 Schema.org types in `src/app/page.tsx` (Person, WebSite, FAQ, etc.) and dedicated components:
- `src/components/faq-schema.tsx` - FAQ structured data
- `src/components/advanced-schema.tsx` - additional rich results
- `src/components/seo-footer.tsx` - footer schema + links

### PWA Configuration
`next.config.mjs` exports `withPWA(nextConfig)` with:
- Service worker: auto-generated to `/public/sw.js`
- Runtime caching strategies for fonts, images, audio, Next.js data
- Disabled in development: `disable: process.env.NODE_ENV === 'development'`
- Manifest: `src/app/manifest.ts` (dynamic Next.js 14 format)
- Install prompt: Non-intrusive bottom banner on mobile (no blur overlay)

## Component Conventions

### UI Components
Shadcn/ui components in `src/components/ui/` - **never modify these directly**. Use `components.json` for config.

### Email Components
React Email templates in `src/components/emails/`:
```tsx
<ContactFormEmail message={message} name={name} fromEmail={fromEmail} />
```
Sent via Resend (`src/lib/resend.ts`) - requires `RESEND_API_KEY`, `SENDER_EMAIL`, `RECIPIENT_EMAIL` env vars.

### Mobile-First Patterns
- `src/hooks/use-mobile.tsx` provides `useIsMobile()` - uses media query + client-side detection
- `src/components/mobile-cta.tsx` - floating CTA button for mobile devices
- Check mobile state before rendering desktop-only features

## AI Integration (Genkit)

### Setup
Genkit instance: `src/ai/genkit.ts` with `googleai/gemini-2.0-flash` model. All flows must import this instance.

### Flow Structure
```typescript
export async function myFunction(input: InputType): Promise<OutputType> {
  return myFlow(input);  // Call the flow, not the prompt
}

const prompt = ai.definePrompt({ /* ... */ });
const myFlow = ai.defineFlow({ /* ... */ }, async input => {
  const { output } = await prompt(input);
  return output!;
});
```

### Running Genkit Flows
Flows in `src/ai/flows/` are server actions (`'use server'`). Access via `src/ai/dev.ts` in development mode.

## Performance Optimizations

### Image Configuration
`next.config.mjs` specifies allowed domains:
- `placehold.co`, `jbovnxfrghdhitszaiiu.supabase.co`, `krishgoswami.me`
- Formats: AVIF → WebP fallback
- Add new domains to `remotePatterns` array before using external images

### Build Optimizations
```javascript
swcMinify: true,              // Fast minification
compress: true,               // Gzip compression
removeConsole: production,    // Strip console logs in prod
optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
```

### Headers & Security
Security headers in `next.config.mjs` headers():
- CSP, HSTS, X-Frame-Options, etc.
- **Canonical link** injected via Link header for all routes
- Sitemap/robots.txt get specific cache headers

## Deployment

### Firebase App Hosting
- Config: `apphosting.yaml` (maxInstances: 1)
- Next.js adapter handles SSR/ISR automatically
- Google verification: `googlef5d3e1a7dd88b250.html` in public/

### Vercel (Alternative)
`vercel.json` minimal config - framework auto-detected

## Important Quirks

1. **Port 9002**: Dev server runs on non-standard port - likely avoiding conflicts
2. **Build errors ignored**: `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` in next.config.mjs - fix underlying issues, don't rely on this
3. **Admin email hardcoded**: Change `authorizedAdminEmails` array in `src/app/admin/page.tsx` for new admins
4. **Projects auto-seed**: First Firestore query triggers one-time seed from `src/data/projects.ts`
5. **Audio on hover**: Synthwave audio (Tone.js) plays on specific component hovers - see `src/components/audio-player.tsx`

## Documentation References
- `docs/blueprint.md` - Original design requirements
- `PWA_ARCHITECTURE.md` - PWA implementation details
- `SEO_OPTIMIZATION_REPORT.md` - Keyword strategy & ranking goals
- `docs/*.md` - Various optimization reports (performance, SEO fixes, deployment)

## When Making Changes

**Always preserve**:
- SEO keywords in metadata (rationale documented)
- Firebase initialization patterns (prevents duplicate app errors)
- Dynamic imports for heavy components (affects lighthouse scores)
- Authorized admin email checks (security boundary)

**Always test**:
- Mobile responsiveness (primary target audience)
- PWA install prompts (core feature)
- Admin CMS project CRUD operations
- Build output (ignore flags hide real errors)
