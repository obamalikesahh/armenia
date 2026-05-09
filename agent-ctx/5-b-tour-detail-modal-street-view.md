# Task 5-b: Tour Detail Modal + Street View - Work Record

## Summary
Updated `/home/z/my-project/src/components/tours/tour-detail-modal.tsx` to add Google Maps Street View embeds, replace hardcoded English strings with t() translation calls, and fix existing issues.

## Changes Made

### 1. New Imports Added
- `Eye` icon from lucide-react (for Street View section header)
- `ExternalLink` icon from lucide-react (for "Explore this location" button)

### 2. Street View Section
Added a new visual section after "Available Days & Best Period" and before the booking section:
- **Header**: Shows an Eye icon in amber-400 with `t('tours.streetView')` translation
- **Grid layout**: Responsive 2-column grid (`sm:grid-cols-2`) with gap-4
- **Location cards**: Each card contains:
  - A Google Maps iframe embed with 16:9 aspect ratio (`paddingBottom: 56.25%`)
  - URL format: `https://maps.google.com/maps?q=LAT,LNG&t=k&z=16&ie=UTF8&iwloc=&output=embed`
  - Hover overlay gradient effect
  - Location name with MapPin icon
  - "Explore this location" button (`t('tours.exploreLocation')`) that opens Google Maps in a new tab
- **Performance**: Limited to max 6 locations using `useMemo` with `.slice(0, 6)`
- **Security**: iframes have `sandbox="allow-scripts allow-same-origin allow-popups"`, `loading="lazy"`, and `referrerPolicy="no-referrer"`
- **Glassmorphism styling**: `border-white/10 bg-white/5 backdrop-blur-sm` with hover effects
- **Empty state**: Section only renders when `streetViewLocations.length > 0`

### 3. Hardcoded Strings Replaced
- `"Want a private tour?"` → `t('tours.wantPrivate')`
- `"Book Privately"` → `t('tours.bookPrivately')`

### 4. Translation Keys Used
All translation keys were already present in `/home/z/my-project/src/lib/i18n.ts`:
- `tours.streetView` — "Street View" / "Панорама улиц" / "Street View"
- `tours.exploreLocation` — "Explore this location" / "Исследуйте это место" / "Diesen Ort erkunden"
- `tours.wantPrivate` — "Want a private tour?" / "Хотите индивидуальную экскурсию?" / "Möchten Sie eine private Tour?"
- `tours.bookPrivately` — "Book Privately" / "Забронировать лично" / "Privat buchen"

### 5. Preserved
- `'use client'` directive
- All existing functionality (image gallery, booking flow, etc.)
- All existing imports
- All existing state management and callbacks

## Verification
- ESLint passes with no errors
- Dev server compiles successfully with no errors
- All existing translations confirmed present in i18n.ts for en/ru/de locales
