# Task 3 - Main Page Rebuilder

## Summary
Completely rewrote `/home/z/my-project/src/app/page.tsx` with all required changes for the Ev2-style Armenian tour booking website.

## Changes Made

### Hero Section (Ev2-style)
- Made heading MUCH larger: `text-5xl sm:text-7xl md:text-8xl lg:text-9xl` (was `text-4xl sm:text-6xl lg:text-7xl`)
- Split "ARMENIA TOURS" into two dramatic lines with different styles:
  - "ARMENIA" in pure white with gradient (white to white/60)
  - "TOURS" with the existing gradient-text animated style
- Tighter line height `leading-[0.9]` for dramatic impact
- Reduced tagline font weight to `font-light` for clean Ev2 feel
- Changed scroll indicator from circle to ChevronDown icon with `t('hero.scrollDown')` text
- Used `t('hero.discoverArmenia')` for the decorative label above heading
- Updated background gradient to use `#0a0a1a` (deeper dark space feel)

### Internationalization (i18n) - ALL hardcoded English replaced with t() calls
- `Discover Armenia` → `t('hero.discoverArmenia')`
- `Scroll` → `t('hero.scrollDown')`
- `Why Choose Us` → `t('whyChoose.title')`
- `Experience the best of Armenia...` → `t('whyChoose.subtitle')`
- `Expert Local Guides` → `t('whyChoose.guides.title')`
- Guide description → `t('whyChoose.guides.description')`
- `Best Price Guarantee` → `t('whyChoose.price.title')`
- Price description → `t('whyChoose.price.description')`
- `Flexible Booking` → `t('whyChoose.booking.title')`
- Booking description → `t('whyChoose.booking.description')`
- `About Armenia` → `t('about.title')`
- About paragraphs → `t('about.p1')`, `t('about.p2')`, `t('about.p3')`
- `Explore Tours` → `t('about.exploreTours')`
- `Stay Updated` → `t('newsletter.title')`
- Newsletter subtitle → `t('newsletter.subtitle')`
- Newsletter placeholder → `t('newsletter.placeholder')`
- `Subscribe` / `✓ Subscribed!` → `t('newsletter.subscribe')` / `t('newsletter.subscribed')`
- `your@email.com` → `t('newsletter.placeholder')`

### TourDetailModal
- Already had t() calls for `tours.wantPrivate` and `tours.bookPrivately` — no changes needed

### Imports
- Added `ChevronDown` import from lucide-react (for scroll indicator)
- Removed unused `LogOut` and `User` imports
- Kept all critical dynamic imports (HeroScene, AboutScene, MagneticCursor, MouseSpotlight)
- Kept all component imports (Navbar, Footer, TourCard, TourFilters, etc.)

### Structural Integrity
- Maintained `'use client'` at top
- Kept all state management patterns (isLoggedIn, userName, selectedTour, etc.)
- Kept all handlers (handleBookNow, handleLoginClick, etc.)
- Footer is sticky at bottom via `min-h-screen flex flex-col` + `mt-auto` on footer
- Mobile responsive throughout
- Glassmorphism effects preserved (glass, glass-strong, glass-card CSS classes)
- Framer-motion animations preserved throughout

## Verification
- ESLint passes with no errors
- Dev server compiles successfully (200 status)
- All translation keys verified against `/home/z/my-project/src/lib/i18n.ts`
