# Copilot Instructions for Krish Goswami Portfolio

## Project Overview
Next.js 14 portfolio with Firebase backend, PWA capabilities, and AI-powered project curation. Deployed on Firebase App Hosting with aggressive SEO optimization targeting "Krish Goswami" search queries. Features include: admin CMS for project management, Google Auth protected routes, AI-curated project display (Genkit), interactive 3D Spline models, custom cursor system, and synthwave audio on hover.

## Architecture & Key Patterns

### Firebase Dual-Init Pattern (Critical)
Two separate Firebase initialization files prevent conflicts:
- **Client**: `src/lib/firebase/client.ts` exports `{ auth, db }` - use with `'use client'`
- **Server**: `src/lib/firebase/server.ts` exports only `{ db }` - no auth instance
- Both check `!getApps().length` before `initializeApp()` to prevent duplicate app errors
- **Never** import client-side auth in server components

### Dynamic Import Strategy (Performance Critical)
All heavy components use `dynamic()` with `ssr: false` to prevent hydration mismatches and improve initial load:
```tsx
const SplineSection = dynamic(() => import('@/components/spline-section'), {
  ssr: false,  // Required for browser-only APIs (WebGL, Audio API, Intersection Observer)
  loading: () => <div className="h-screen animate-pulse bg-gray-900" />
});
```
**Apply to**: 3D components (Spline), audio players (Tone.js), custom cursors, PWA prompts, animated backgrounds.
**Files**: `src/app/layout.tsx` (cursor, background, PWA), `src/app/page.tsx` (Spline, audio, mobile CTA).

### Project Data Flow (Auto-Seeding Pattern)
1. **Seed data**: `src/data/projects.ts` - TypeScript array with initial projects
2. **Service layer**: `src/services/project-service.ts` - auto-seeds Firestore if collection is empty (runs on first `getProjects()` call)
3. **Admin CMS**: `/admin` route with full CRUD via `project-service.ts` functions
4. **AI curation**: `src/ai/flows/smart-project-display.ts` - Genkit flow selects top projects based on skills + metrics
5. **Display**: Portfolio section fetches from Firestore (not seed data directly)

**Important**: Seed runs once per empty DB. To re-seed, manually delete Firestore `projects` collection.

### Auth Pattern (Google OAuth)
- **Provider**: `src/context/auth-context.tsx` wraps app in `layout.tsx`
- **Hook**: `const { user, loading, isAuthenticated, login, logout } = useAuth()`
- **Protected route**: `src/app/admin/page.tsx` checks `authorizedAdminEmails` array (hardcoded: `['krrishyogi18@gmail.com']`)
- **Login flow**: Supports popup (default) and redirect (mobile fallback) - see `login(useRedirect?: boolean)`
- **Always** check `loading` state before rendering auth-dependent UI to prevent flash of wrong content

## Development Commands
```bash
npm run dev        # Port 9002 (non-standard - likely avoiding local conflicts)
npm run build      # Builds despite errors (ignoreBuildErrors: true)
npm run typecheck  # Manual TypeScript validation (bypassed in build)
npm run lint       # ESLint (also ignored during builds)
```
**Critical**: Build ignores TypeScript/ESLint errors via `next.config.mjs`. Always run `typecheck` manually before deploying to catch real issues.

## Design System & Styling

### Color Tokens (Neon Cyberpunk Theme)
From `docs/blueprint.md`:
- `#4D70FA` - Primary (neon blue) - text, borders, interactive states
- `#BF5FFF` - Accent (electric purple) - CTAs, hover effects, highlights  
- `#121212` - Background (dark gray) - base layer with bluish overlays
- `.glass-panel` - Frosted glass effect with neon borders (defined in `globals.css`)

### Typography System
Three font families loaded via `next/font/google` in `layout.tsx`:
```tsx
className="font-headline"  // Space Grotesk - headings, hero text
className="font-body"      // Inter - paragraphs, descriptions
className="font-code"      // Source Code Pro - code snippets, technical content
```
These are CSS variable classes, not direct font families.

### Mobile Detection Pattern
`src/hooks/use-mobile.tsx` provides responsive behavior:
```tsx
const isMobile = useIsMobile();  // 768px breakpoint
// Returns undefined during SSR, then boolean after mount
// Always check truthiness: if (isMobile) { ... }
```
Used in 16+ components for conditional rendering (cursor, Spline quality, CTA button visibility).

## SEO Implementation (Do Not Modify Without Documentation)

### Aggressive Keyword Strategy
`src/app/layout.tsx` metadata contains 90+ keyword variations:
- Name variants: "Krish Goswami", "Krish Yogi", "Krishna Goswami"  
- Long-tail SEO: "hire Krish Goswami", "Krish Goswami developer", "Krish Goswami portfolio"
- **DO NOT remove keywords** - rationale documented in `SEO_OPTIMIZATION_REPORT.md`
- Strategy: Dominate Google SERPs for all name variations

### Schema Markup (14 Types)
Rich results via JSON-LD scripts:
- `src/app/page.tsx` - Person, WebSite, Organization, BreadcrumbList schemas
- `src/components/faq-schema.tsx` - FAQ structured data for knowledge panel
- `src/components/advanced-schema.tsx` - ProfessionalService, CreativeWork, Review schemas
- `src/components/seo-footer.tsx` - Additional footer links + social profiles schema

### PWA Configuration (Production Only)
`next.config.mjs` exports `withPWA(nextConfig)`:
```javascript
const pwaConfig = withPWA({
  dest: 'public',  // Generates /public/sw.js
  disable: process.env.NODE_ENV === 'development',  // No SW in dev
  runtimeCaching: [ /* 10 cache strategies for fonts/images/audio/Next.js data */ ]
});
```
- **Manifest**: `src/app/manifest.ts` - dynamic Next.js 14 API route
- **Install prompt**: `src/components/pwa-install-prompt.tsx` - non-intrusive bottom banner (mobile only)
- **Service worker**: Auto-generated, includes Workbox strategies (CacheFirst, StaleWhileRevalidate, NetworkFirst)
- **To test PWA**: Build production (`npm run build && npm start`), open DevTools > Application > Service Workers

## Component Conventions

### Shadcn/ui Integration
UI primitives in `src/components/ui/` built from Radix UI + Tailwind:
- **Never edit UI components directly** - regenerate via `npx shadcn@latest add <component>`
- Config: `components.json` - baseColor: neutral, cssVariables: true, prefix: ""
- Import pattern: `import { Button } from '@/components/ui/button'`
- Customization: Override in `globals.css` CSS variables or wrap with custom components

### Email System (Resend)
React Email templates in `src/components/emails/`:
```tsx
<ContactFormEmail 
  message={message} 
  name={name} 
  fromEmail={fromEmail} 
/>
```
- **Service**: `src/lib/resend.ts` - initializes Resend client
- **Required env vars**: `RESEND_API_KEY`, `SENDER_EMAIL`, `RECIPIENT_EMAIL`
- **Sending**: Import resend instance and call `resend.emails.send()`
- Templates use `@react-email/components` - preview with React Email dev tools

### Mobile-First Patterns
- `src/components/mobile-cta.tsx` - Fixed bottom CTA (only renders on mobile)
- `src/components/custom-cursor.tsx` - Desktop only (no mobile render)
- `src/hooks/use-mobile.tsx` - Single source of truth for breakpoint (768px)
- **Pattern**: Check `isMobile` before rendering desktop-specific features (3D, cursor, hover effects)

## AI Integration (Genkit + Gemini)

### Setup & Architecture
- **Config**: `src/ai/genkit.ts` - initializes Genkit with `googleai/gemini-2.0-flash`
- **Model**: Gemini 2.0 Flash via `@genkit-ai/googleai` plugin
- **Env var**: Requires `GOOGLE_API_KEY` (Gemini API key)
- **Dev tool**: `src/ai/dev.ts` - runs Genkit dev UI (not used in production)

### Flow Pattern (Required Structure)
All flows must follow this exact pattern:
```typescript
'use server';  // REQUIRED - flows are server actions

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// 1. Define schemas
const InputSchema = z.object({ /* ... */ });
const OutputSchema = z.object({ /* ... */ });

// 2. Export main function (what consumers call)
export async function myFunction(input: z.infer<typeof InputSchema>) {
  return myFlow(input);  // Call flow, not prompt
}

// 3. Define prompt
const prompt = ai.definePrompt({
  name: 'myPrompt',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  prompt: `Your prompt template here...`
});

// 4. Define flow (wraps prompt)
const myFlow = ai.defineFlow(
  { name: 'myFlow', inputSchema: InputSchema, outputSchema: OutputSchema },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
```
**Example**: `src/ai/flows/smart-project-display.ts` - curates top projects based on skills/metrics.

### Genkit Type Suppression
All Genkit files use `// @ts-nocheck` or `// @ts-ignore` because Genkit packages aren't in `package.json` (external CLI-managed dependency). This is intentional.

## Performance Optimizations

### Image Configuration (next.config.mjs)
Allowed remote domains (add new sources here before using):
```javascript
remotePatterns: [
  { hostname: 'placehold.co' },  // Placeholder images
  { hostname: '*.supabase.co' },  // Supabase storage (legacy)
  { hostname: 'krishgoswami.me' },  // Production domain
]
```
- Formats: AVIF → WebP fallback (automatic)
- Sizes: deviceSizes [640...3840], imageSizes [16...384]
- Cache TTL: 60 seconds minimum
- **CSP for SVG**: `dangerouslyAllowSVG: true` with sandboxing

### Build Optimizations
```javascript
swcMinify: true,              // Rust-based minifier (faster than Terser)
compress: true,               // Gzip compression
removeConsole: production,    // Strip console.* in prod only
optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']  // Tree-shake icon libraries
```

### Security Headers (next.config.mjs headers())
Comprehensive security via `headers()` function:
- **CSP**: Content Security Policy for SVG images
- **HSTS**: Strict-Transport-Security with 1-year max-age
- **X-Frame-Options**: SAMEORIGIN (clickjacking protection)
- **Canonical**: Link header injected for all routes (`<https://krishgoswami.me>; rel="canonical"`)
- **Cache-Control**: Specific rules for sitemap.xml (1hr) and robots.txt (1hr)

## Deployment

### Firebase App Hosting (Primary)
- **Config**: `apphosting.yaml` - `maxInstances: 1` (cost optimization)
- **Build**: Firebase uses Next.js adapter automatically (no manual config)
- **SSR/ISR**: Handled by Firebase's Node.js runtime
- **Google verification**: `public/googlef5d3e1a7dd88b250.html` - do not delete
- **Deploy**: Firebase CLI (`firebase deploy --only hosting`) or GitHub Actions

### Vercel (Alternative/Unused)
`vercel.json` exists but is minimal - framework auto-detected. Likely not used in production.

## Important Quirks & Gotchas

1. **Port 9002**: Dev server runs on non-standard port - check for conflicts with local services
2. **Build errors ignored**: `ignoreBuildErrors: true` in `next.config.mjs` - **fix underlying issues**, don't rely on this
3. **Admin email hardcoded**: Single authorized email in `src/app/admin/page.tsx` - update `authorizedAdminEmails` array to add admins
4. **Projects auto-seed once**: First Firestore query triggers seed if collection is empty - no re-seeding without manual DB clear
5. **Audio on hover**: Synthwave synth (Tone.js) plays on specific component hovers - see `src/components/audio-player.tsx`
6. **Custom cursor**: Adds `.custom-cursor-loaded` class to `<body>` when active - used for cursor-specific CSS
7. **Genkit not in package.json**: Managed via separate Genkit CLI - `// @ts-ignore` comments are intentional

## Documentation References
- `docs/blueprint.md` - Original design requirements (neon cyberpunk aesthetic, 3D interactions)
- `PWA_ARCHITECTURE.md` - PWA implementation details (service worker, caching strategies)
- `SEO_OPTIMIZATION_REPORT.md` - Keyword strategy & Google ranking goals
- `docs/PERFORMANCE-OPTIMIZATIONS.md` - Lighthouse score improvements
- `docs/DEPLOYMENT-COMPLETE.md` - Firebase deployment steps
- Root `*.md` files - Various reports (backlinks, SEO v2, mobile performance)

## When Making Changes

**Always preserve**:
- SEO keywords in `layout.tsx` metadata (documented rationale)
- Firebase `!getApps().length` checks (prevents duplicate app errors)
- Dynamic imports with `ssr: false` (affects Lighthouse/Core Web Vitals scores)
- Authorized admin email checks (security boundary)
- PWA caching strategies (offline functionality)

**Always test after changes**:
- Mobile responsiveness (primary target - portfolio for mobile hiring managers)
- PWA install prompt (core differentiator)
- Admin CMS CRUD operations (project management)
- Build output (`npm run typecheck` - ignore flags hide real errors)
- Google Auth flow (popup + redirect modes)

**Before deploying**:
- Run `npm run typecheck` manually (build ignores TypeScript errors)
- Test PWA in production build (`npm run build && npm start`)
- Verify all environment variables are set (Resend, Google API key for Genkit)
- Check Firebase Firestore rules in `firestore.rules`

