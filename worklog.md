---
Task ID: 1
Agent: main
Task: Complete overhaul - email service, Google OAuth, EUR pricing, remove AMD

Work Log:
- Created missing `src/lib/email.ts` with Gmail SMTP support (thebeautyofarmenia@gmail.com)
  - Includes sendVerificationCodeEmail, sendConfirmationEmails, sendCancellationEmails
  - Multi-language support (EN/RU/DE) for all email templates
  - DISCOUNT_CODE = "Armen5" export
  - Admin notifications sent to thebeautyofarmenia@gmail.com
- Updated `.env` with new email and app password (meqi vgwk gnbm tgai)
- Removed conflicting old email service at `src/lib/email/index.ts`
- Fixed Google OAuth callback in `src/lib/nextauth-config.ts`
  - Improved redirect callback to handle proxy scenarios
- Updated `src/lib/tours-data.ts`:
  - Changed interface from priceAMD/priceForeignAMD to priceEUR/priceForeignEUR
  - All prices converted from AMD to EUR with 30% markup
  - Removed AMD_TO_EUR_RATE and convertAMDtoEUR function
  - Updated "Birds Cave entrance fee — 1500 AMD" to "Birds Cave entrance fee — €4"
- Updated all component files:
  - `tour-card.tsx`: Uses tour.priceEUR/priceForeignEUR directly, no AMD conversion
  - `tour-detail-modal.tsx`: Uses EUR prices directly, removed AMD display, shows "EUR" label
  - `booking-form.tsx`: Uses EUR prices, hotel pickup fee in EUR (€8), no AMD
  - `navbar.tsx`: Removed AMD currency switcher, EUR only
- Updated API routes:
  - `/api/tours/route.ts`: Removed convertAMDtoEUR import, returns EUR prices directly
  - `/api/tours/[id]/route.ts`: Same as above
  - `/api/bookings/route.ts`: Uses totalPriceEUR, totalPriceAMD set to 0 (legacy)
  - `/api/currency/rate/route.ts`: Returns EUR only, no AMD rate
- Updated `src/lib/i18n.ts`:
  - Removed all AMD-related translations (currencyAMD, armenianDram, common.amd)
  - Updated nav.email to thebeautyofarmenia@gmail.com in all 3 languages
- Lint check passes with no errors

Stage Summary:
- Email verification now works with Gmail SMTP (thebeautyofarmenia@gmail.com + app password)
- Google OAuth callback fixed for proxy environments
- All prices are now in EUR with 30% markup (no AMD anywhere on the website)
- Currency switcher removed from navbar (EUR only)
- Armen5 discount code preserved in booking flow and confirmation emails
- Site compiles and runs without errors

---
Task ID: 2-a
Agent: css-email-silver
Task: Replace gold with silver in globals.css and email.ts

Work Log:
- Replaced `#c9a84c` → `#94A3B8` in globals.css (10 occurrences: --primary, --ring, --sidebar-primary, --sidebar-ring in both :root and .dark, plus gradient-text and taraz-gradient)
- Replaced `#e8d48b` → `#CBD5E1` in globals.css (2 occurrences: gradient-text and taraz-gradient)
- Replaced `rgba(201, 168, 76,` → `rgba(148, 163, 184,` in globals.css (10 occurrences: --accent, --sidebar-accent, section-divider, space-divider, glow-amber, glow-burgundy, armenian-glow, ornamental-divider, animate-shimmer)
- Updated comment "single gold" → "single silver" in globals.css (line 144)
- Replaced `#c9a84c` → `#94A3B8` in email.ts (17 occurrences across all 3 language templates for verification, confirmation, and admin emails)
- Replaced `rgba(201,168,76,` → `rgba(148,163,184,` in email.ts (20+ occurrences across all email templates: borders, backgrounds, text colors)
- Verified zero remaining gold colors in both files via grep search
- Other mapped colors (`#b8973e`, `#8a7535`, `#F59E0B`, `#FBBF24`, `rgba(212,175,55,`) were not present in either file

Stage Summary:
- All gold colors successfully replaced with silver equivalents in both globals.css and email.ts
- CSS variables (--primary, --ring, --sidebar-primary, --sidebar-ring, --accent, --sidebar-accent) now use silver palette
- Gradient classes (gradient-text, taraz-gradient) updated to silver gradient
- Utility classes (glow-amber, glow-burgundy, armenian-glow, animate-shimmer, section-divider, etc.) updated to silver
- All 3 language email templates (EN/RU/DE) updated: borders, headings, code boxes, discount sections now silver
- Comment updated from "gold" to "silver"

---
Task ID: 2-c
Agent: tours-silver
Task: Replace gold with silver in tour-card, tour-filters, tour-detail-modal

Work Log:
- Replaced all `#c9a84c` (main gold) → `#94A3B8` (main silver) in tour-card.tsx (9 occurrences)
- Replaced all `#c9a84c` (main gold) → `#94A3B8` (main silver) in tour-filters.tsx (6 occurrences)
- Replaced all `#c9a84c` (main gold) → `#94A3B8` (main silver) in tour-detail-modal.tsx (47 occurrences)
- Replaced all `#b8973e` (hover gold) → `#7E8FA3` (hover silver) in tour-card.tsx (1 occurrence)
- Replaced all `#b8973e` (hover gold) → `#7E8FA3` (hover silver) in tour-detail-modal.tsx (2 occurrences)
- Updated comment "Subtle gold glow on hover" → "Subtle silver glow on hover" in tour-card.tsx
- Verified zero remaining `#c9a84c`, `#b8973e`, `#e8d48b`, `#8a7535`, or `rgba(201, 168, 76,` in all three files
- No `#e8d48b`, `#8a7535`, or `rgba(201, 168, 76,` patterns were present in any of the files

Stage Summary:
- All gold accent colors replaced with silver equivalents across 3 tour component files
- Color mapping applied: main gold (#c9a84c→#94A3B8), hover gold (#b8973e→#7E8FA3)
- Zero gold color references remain in tour-card.tsx, tour-filters.tsx, tour-detail-modal.tsx
- Total replacements: 65 instances across 3 files

---
Task ID: 2-d
Agent: auth-booking-silver
Task: Replace gold/amber with silver in auth-modal.tsx and booking-form.tsx

Work Log:
- Replaced all `#c9a84c` (main gold) → `#94A3B8` (main silver) in auth-modal.tsx (20+ occurrences: step indicators, tab triggers, buttons, OTP slots, links, checkboxes, info banners, focus borders)
- Replaced all `#b8973e` (hover gold) → `#7E8FA3` (hover silver) in auth-modal.tsx (3 occurrences: login button, send-code button, verify-code button, register button hover states)
- Replaced `amber-500` → `slate-400` in booking-form.tsx (4 occurrences: radio group borders/bgs, price breakdown border/bg, total price shadow)
- Replaced `amber-400` → `slate-300` in booking-form.tsx (2 occurrences: price breakdown heading, total price text)
- Replaced `orange-500` → `slate-500` in booking-form.tsx (1 occurrence: payment button gradient from)
- Replaced `orange-600` → `slate-600` in booking-form.tsx (2 occurrences: payment button hover gradient from/to)
- Verified zero remaining gold/amber/orange color references in both files via grep

Stage Summary:
- auth-modal.tsx: All gold (#c9a84c, #b8973e) colors replaced with silver (#94A3B8, #7E8FA3)
- booking-form.tsx: All Tailwind amber/orange classes replaced with slate equivalents
- No remaining gold, amber, or orange color references in either file

---
Task ID: 2-b
Agent: layout-silver
Task: Replace gold with silver in page.tsx, navbar.tsx, footer.tsx

Work Log:
- Verified page.tsx: all `#c9a84c` → `#94A3B8` (13 occurrences) and `#b8973e` → `#7E8FA3` (3 occurrences) already replaced
- Verified navbar.tsx: all `#c9a84c` → `#94A3B8` (9 occurrences) and `#b8973e` → `#7E8FA3` (2 occurrences) already replaced
- Verified footer.tsx: all `#c9a84c` → `#94A3B8` (9 occurrences) and `#b8973e` → `#7E8FA3` (1 occurrence) already replaced
- Confirmed zero remaining `#c9a84c`, `#b8973e`, `#e8d48b`, `#8a7535`, or `rgba(201, 168, 76,` across all three files via grep
- No `#e8d48b`, `#8a7535`, or `rgba(201, 168, 76,` patterns existed in any of these files
- Silver colors confirmed present: `#94A3B8` (main), `#7E8FA3` (hover)

Stage Summary:
- All gold accent colors successfully replaced with silver equivalents across 3 layout files
- page.tsx: 16 replacements (13 main + 3 hover), navbar.tsx: 11 replacements (9 main + 2 hover), footer.tsx: 10 replacements (9 main + 1 hover)
- Zero gold color references remain in page.tsx, navbar.tsx, footer.tsx
- Total verified replacements: 37 instances across 3 files

---
Task ID: 2-e
Agent: 3d-animations-silver
Task: Replace gold/amber with silver in all 3D and animation components

Work Log:
- hero-scene.tsx: Replaced `rgba(212, 175, 55, 1)` → `rgba(148, 163, 184, 1)` (warm gold glow → silver glow), updated comments "warm gold" → "cool silver", "warm glow" → "cool glow"
- tour-route-fluid.tsx: Replaced `#c9a84c` → `#94A3B8` (3 occurrences: FlowingParticle color, FluidLine color, node markers), `#8a7535` → `#64748B` (1 occurrence: alternate route color), comment "warm gold" → "cool silver"
- about-scene.tsx: Replaced `#F59E0B` → `#94A3B8` (5 occurrences: colorA, attenuationColor, pointLight, OrbitRing, GlassShape), `#FBBF24` → `#CBD5E1` (1 occurrence: GlassShape icosa)
- background-particles.tsx: Replaced `#F59E0B` → `#94A3B8` (1 occurrence: palette color), `#fbbf24` → `#CBD5E1` (1 occurrence: palette color), comments "lighter amber" → "lighter silver", "Warm color mix" → "Cool color mix"
- tour-globe.tsx: Replaced `#F59E0B` → `#94A3B8` (3 occurrences: marker palette, trail palette, pointLight)
- glass-card-3d.tsx: Replaced `#F59E0B` → `#94A3B8` (1 occurrence: default color prop)
- floating-card.tsx: Replaced `rgba(245,158,11,0.3)` → `rgba(148,163,184,0.3)` (1 occurrence), `rgba(245,158,11,0.1)` → `rgba(148,163,184,0.1)` (1 occurrence), `rgba(245,158,11,0.15)` → `rgba(148,163,184,0.15)` (1 occurrence)
- hero-particles.tsx: Replaced `#F59E0B` → `#94A3B8` (1 occurrence: COLORS array), `#FBBF24` → `#CBD5E1` (1 occurrence: COLORS array), `rgba(245, 158, 11, ${alpha})` → `rgba(148, 163, 184, ${alpha})` (1 occurrence: connection lines), `rgba(245, 158, 11, 0.03)` → `rgba(148, 163, 184, 0.03)` (1 occurrence: mouse glow), comments "amber" → "silver", "amber-400" → "silver-400"
- mouse-spotlight.tsx: Replaced `rgba(245, 158, 11, ...)` → `rgba(148, 163, 184, ...)` (4 occurrences across amber and mixed gradient cases), updated type `'amber'` → `'silver'`, comment "default amber" → "default silver"
- magnetic-cursor.tsx: Replaced `#F59E0B` → `#94A3B8` (1 occurrence: dot gradient), `rgba(245, 158, 11, ...)` → `rgba(148, 163, 184, ...)` (6 occurrences: borderColor, background, boxShadow hover, boxShadow default, dot boxShadow x2), all in both dynamic and static style strings
- Verified zero remaining gold/amber colors (`#c9a84c`, `#b8973e`, `#e8d48b`, `#8a7535`, `#F59E0B`, `#FBBF24`, `#fbbf24`, `rgba(245,...11,...)`, `rgba(201,168,76,...)`, `rgba(212,175,55,...)`) across all 10 files via grep
- Verified zero remaining "gold", "warm", "amber" text references in comments across all 10 files

Stage Summary:
- All gold/amber colors replaced with silver equivalents across all 10 3D and animation component files
- Color mappings applied: #c9a84c→#94A3B8, #8a7535→#64748B, #F59E0B→#94A3B8, #FBBF24→#CBD5E1, #fbbf24→#CBD5E1, rgba(212,175,55,...)→rgba(148,163,184,...), rgba(245,158,11,...)→rgba(148,163,184,...)
- Comments updated: "warm gold"→"cool silver", "warm glow"→"cool glow", "Warm color mix"→"Cool color mix", "lighter amber"→"lighter silver", "amber"→"silver", "default amber"→"default silver", type union 'amber'→'silver'
- Zero gold/amber color references remain in any 3D or animation component
- Total replacements: ~30+ instances across 10 files

---
Task ID: 3
Agent: main
Task: Fix Prisma tourAvailability.findUnique() error + verify silver replacement

Work Log:
- Fixed Prisma compound unique constraint name in 3 API routes:
  - `availability/route.ts`: Changed `tourId_date` → `tourId_tourDate` (matches @@unique([tourId, tourDate]) in schema)
  - `bookings/route.ts`: Same fix
  - `bookings/cancel/route.ts`: Same fix
- The error was: Prisma generates the compound unique name as `tourId_tourDate` (both field names), not `tourId_date`
- Verified all silver replacements are complete: zero remaining `#c9a84c`, `#F59E0B`, `#FBBF24`, `#b8973e` across all source files
- Silver color `#94A3B8` confirmed present in 16 files with 190+ occurrences
- Lint check passes with no errors
- Dev server running successfully

Stage Summary:
- Fixed the Prisma error that was shown in the user's screenshot (Invalid 'prisma.tourAvailability.findUnique()' invocation)
- All gold → silver replacements complete and verified
- No remaining gold/amber colors anywhere in the codebase

---
Task ID: 4-c
Agent: theme-aware-page
Task: Update page.tsx to use theme-aware CSS classes instead of hardcoded dark-mode colors

Work Log:
- Replaced all hardcoded color classes in src/app/page.tsx with Tailwind theme-aware equivalents
- Background colors: `bg-[#0a0a0a]` → `bg-background`, `bg-[#0a0a0a]/80` → `bg-background/80`
- Text colors: `text-white` → `text-foreground`, `text-white/40` → `text-muted-foreground`, `text-white/35` → `text-muted-foreground`, `text-white/30` → `text-muted-foreground`, `text-white/25` → `text-muted-foreground`, `text-white/20` → `text-foreground/20`, `text-white/15` → `text-foreground/15`, `text-white/10` → `text-foreground/10`, `text-white/60` → `text-foreground/60`, `text-white/80` → `text-foreground/80`
- Silver accent colors: `bg-[#94A3B8]` → `bg-primary`, `text-[#94A3B8]` → `text-primary`, `text-[#94A3B8]/60` → `text-primary/60`, `bg-[#94A3B8]/8` → `bg-primary/8`, `bg-[#94A3B8]/30` → `bg-primary/30`, `hover:bg-[#7E8FA3]` → `hover:bg-primary/80`, `border-[#94A3B8]` → `border-primary`, `ring-[#94A3B8]` → `ring-primary`
- Button text on primary buttons: `text-[#0a0a0a]` → `text-primary-foreground`
- Border colors: `border-white/6` → `border-border`, `border-white/8` → `border-border`, `border-white/10` → `border-border`
- Background overlays: `bg-white/3` → `bg-secondary`, `bg-white/5` (hover) → `hover:bg-secondary`, `bg-white/15` → `bg-foreground/15`
- Gradient overlays: `from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]` → `from-background/40 via-transparent to-background`, `from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/20` → `from-background/50 via-transparent to-background/20`
- HeroScene loading state: `bg-[#0a0a0a]` → `bg-background`, `bg-white/5` → `bg-foreground/5`
- Hero section headings: Added `dark:text-white` to h1 and stat values for proper visibility in both light and dark modes (`text-foreground dark:text-white`)
- Verified zero remaining hardcoded hex colors (#0a0a0a, #94A3B8, #7E8FA3) in page.tsx
- Verified zero remaining `text-white`, `bg-white`, `border-white` patterns (except intentional `dark:text-white` for hero headings)
- Confirmed all CSS variables (--background, --foreground, --primary, --primary-foreground, --secondary, --muted-foreground, --border, --ring) exist in globals.css
- TypeScript compilation passes with no new errors

Stage Summary:
- All hardcoded dark-mode colors in page.tsx replaced with theme-aware Tailwind CSS classes
- 28 distinct class replacements applied across the file (~60+ individual occurrences)
- Hero section uses `dark:text-white` pattern for headings to ensure visibility on dark 3D backgrounds
- File is now fully theme-aware and will respond to light/dark mode via CSS variables

---
Task ID: 4-d
Agent: theme-aware-tours
Task: Update tour components to use theme-aware CSS classes

Work Log:
- Updated `src/components/tours/tour-card.tsx` with theme-aware CSS classes:
  - `bg-[#94A3B8]/8` → `bg-primary/8` (hover glow), `bg-[#94A3B8]` → `bg-primary` (nav dot, button), `bg-[#94A3B8]/90` → `bg-primary/90` (featured badge)
  - `bg-[#0a0a0a]/60` → `bg-background/60` (duration badge), `bg-[#0a0a0a]/50` → `bg-background/50` (category badge)
  - `from-[#0a0a0a]/80 via-[#0a0a0a]/20` → `from-background/80 via-background/20` (gradient overlay)
  - `text-[#0a0a0a]` → `text-primary-foreground` (featured badge, button)
  - `text-[#94A3B8]` → `text-primary` (price), `hover:text-[#94A3B8]` → `hover:text-primary` (tour name)
  - `hover:bg-[#7E8FA3]` → `hover:bg-primary/80` (button), `hover:shadow-[#94A3B8]/10` → `hover:shadow-primary/10`
  - `border-white/6` → `border-border`, `border-white/8` → `border-border`, `border-white/10` → `border-border`
  - `bg-white/3` → `bg-secondary` (card background)
  - `text-white/35` → `text-muted-foreground` (description, labels), `text-white/45` → `text-muted-foreground` (region)
  - `text-white/60` → `text-foreground/60` (price, category), `text-white/70` → `text-foreground/70` (duration)
  - `text-white` → `text-foreground` (tour name)
  - Kept `bg-white/50 hover:bg-white/80` on image overlay navigation dots for contrast

- Updated `src/components/tours/tour-filters.tsx` with theme-aware CSS classes:
  - `bg-[#94A3B8]` → `bg-primary` (active pill), `text-[#0a0a0a]` → `text-primary-foreground` (active pill text)
  - `shadow-[#94A3B8]/10` → `shadow-primary/10` (active pill shadow)
  - `border-[#94A3B8]/30` → `border-primary/30`, `ring-[#94A3B8]/10` → `ring-primary/10` (input focus)
  - `border-white/6` → `border-border` (container, input, pills, badges)
  - `bg-white/3` → `bg-secondary` (container, input, pills, badges, buttons), `bg-white/5` → `bg-secondary` (hover)
  - `text-white/20` → `text-foreground/20` (placeholder), `text-white/30` → `text-foreground/30` (labels)
  - `text-white/35` → `text-muted-foreground` (clear button, close X), `text-white/45` → `text-muted-foreground` (inactive pills)
  - `text-white/50` → `text-foreground/50` (filter badges), `text-white/60` → `text-foreground/60` (hover states)
  - `text-white` → `text-foreground` (input text, select trigger)
  - Left `hover:bg-white/8` on badge hover (not in mapping)

- Updated `src/components/tours/tour-detail-modal.tsx` with theme-aware CSS classes:
  - `bg-[#0a0a0a]/95` → `bg-background/95` (dialog backgrounds), `bg-[#0a0a0a]/80` → `bg-background/80` (thumbnail strip)
  - `bg-[#0a0a0a]/50` → `bg-background/50` (gallery nav, image counter), `bg-[#0a0a0a]/70` → `bg-background/70` (nav hover)
  - `from-[#0a0a0a] via-[#0a0a0a]/40` → `from-background via-background/40` (gallery gradient)
  - `ring-offset-[#0a0a0a]` → `ring-offset-background` (thumbnail ring offset)
  - `bg-[#94A3B8]` → `bg-primary` (buttons, check icon, route markers, active street view)
  - `bg-[#94A3B8]/10` → `bg-primary/10` (success circle, street view active), `bg-[#94A3B8]/8` → `bg-primary/8` (route markers)
  - `bg-[#94A3B8]/5` → `bg-primary/5` (discount notice), `bg-[#94A3B8]/3` → `bg-primary/3` (price breakdown)
  - `text-[#94A3B8]` → `text-primary` (check, ticket, route numbers, tab, discount code, total price, street view labels)
  - `text-[#94A3B8]/70` → `text-primary/70` (route check, street view labels), `text-[#94A3B8]/60` → `text-primary/60` (discount ticket)
  - `border-[#94A3B8]/15` → `border-primary/15` (discount border, price breakdown), `border-[#94A3B8]/20` → `border-primary/20` (route markers)
  - `border-[#94A3B8]/30` → `border-primary/30` (radio selected, focus), `ring-[#94A3B8]` → `ring-primary` (thumbnail)
  - `ring-[#94A3B8]/20` → `ring-primary/20` (street view active), `shadow-[#94A3B8]/10` → `shadow-primary/10` (button)
  - `from-[#94A3B8]/30 to-[#94A3B8]/5` → `from-primary/30 to-primary/5` (route gradient)
  - `hover:bg-[#7E8FA3]` → `hover:bg-primary/80` (buttons)
  - `text-[#0a0a0a]` → `text-primary-foreground` (featured badge, buttons)
  - `border-white/6` → `border-border`, `border-white/8` → `border-border`, `border-white/10` → `border-border`
  - `border-white/15` → `border-foreground/15` (gallery nav hover)
  - `bg-white/3` → `bg-secondary`, `bg-white/5` → `bg-secondary`, `bg-white/6` → `bg-secondary` (separators)
  - `text-white/10` → `text-foreground/10`, `text-white/20` → `text-foreground/20`, `text-white/25` → `text-foreground/25`
  - `text-white/30` → `text-foreground/30`, `text-white/35` → `text-muted-foreground`, `text-white/40` → `text-muted-foreground`
  - `text-white/45` → `text-muted-foreground`, `text-white/50` → `text-foreground/50`, `text-white/55` → `text-foreground/55`
  - `text-white/60` → `text-foreground/60`, `text-white/70` → `text-foreground/70`
  - `text-white` → `text-foreground` (all non-overlay text: headings, labels, counts, calendar)
  - Preserved `text-white` on image overlay tour name (h2 over gallery), `hover:text-white` on gallery nav buttons
  - `border-white/30` → `border-foreground/30`, `border-t-[#0a0a0a]` → `border-t-primary-foreground` (spinner)
  - Left `hover:bg-white/[0.04]` (not in mapping, very subtle hover)

Stage Summary:
- All three tour component files updated with theme-aware CSS classes
- tour-card.tsx: 25 theme-aware class instances, zero remaining hardcoded hex colors
- tour-filters.tsx: 46 theme-aware class instances, zero remaining hardcoded hex colors
- tour-detail-modal.tsx: 170 theme-aware class instances, zero remaining hardcoded hex colors
- Image overlay text (tour name in modal gallery, gallery nav buttons) preserved as `text-white` for contrast
- Image overlay navigation dots in tour-card preserved as `bg-white/50 hover:bg-white/80` for contrast
- All components will now respond to light/dark mode via CSS variables

---
Task ID: 5
Agent: redesign-fix
Task: Fix broken buttons and redesign 3D scene

Work Log:
- Removed MagneticCursor dynamic import and component usage from page.tsx (was breaking click events by hiding system cursor and applying magnetic transforms)
- Removed FloatingGlassScene dynamic import and component usage from page.tsx (random floating glass spheres looked bad)
- Removed cursor-hiding CSS from globals.css (`cursor: none !important` on all interactive elements)
- Kept MouseSpotlight component (already had `pointer-events-none` class, doesn't interfere with clicks)
- Completely rewrote hero-scene.tsx with a single iridescent glass sphere:
  - Custom GLSL vertex + fragment shaders for thin-film iridescent interference effect
  - Fresnel-Schlick approximation for edge reflectivity
  - GGX specular distribution for studio-light highlights
  - Two bright specular highlights (oval studio reflections)
  - Animated iridescence: rainbow colors shift with viewing angle and time
  - Very slow, barely-noticeable floating animation (0.08 amplitude, 0.2 speed)
  - Extremely slow rotation (0.03 speed) to catch light differently
  - Sphere scale 2.8, 128-segment geometry for smooth surface
  - Removed all orbiting spheres, sparkle particles, orbit rings
  - Changed Environment preset from "night" to "city" for better reflections
  - Added warm accent light for subtle color variation
- Changed hero scene background from hardcoded `#0a0a0a` to transparent (no inline background style)
- Updated hero section gradient overlay: `from-background/40 via-transparent to-background` → `from-background/20 via-transparent to-background/60` (lighter/more transparent for bright design)
- Removed hardcoded gradient overlays (bottom/top gradients and vignette) from hero scene that used `#0a0a0a`
- Canvas already had `pointerEvents: 'none'` style (preserved)
- Lint check passes with no errors
- Dev server compiles successfully

Stage Summary:
- Buttons now work: MagneticCursor removed, cursor hiding CSS removed, system cursor restored
- Floating glass spheres removed from page (FloatingGlassScene deleted from page.tsx)
- Hero 3D scene completely redesigned: single large iridescent glass sphere with rainbow thin-film interference
- Custom GLSL shader creates photorealistic soap bubble / crystal ball effect
- Scene is minimalist and Apple-style: just the sphere with studio lighting
- Hero scene background is now transparent (works in both light and dark mode)
- Gradient overlays lightened for better transparency
