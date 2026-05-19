# Task 2: Luxury Booking Modal

## Summary
Created a `LuxuryBookingModal` component that allows users to reserve/book luxury tours, integrated it into the existing luxury tours section, and updated the backend to support luxury-specific booking fields.

## Files Created
- `/home/z/my-project/src/components/luxury/luxury-booking-modal.tsx` — The main modal component

## Files Modified
1. `/home/z/my-project/prisma/schema.prisma` — Added `luxuryTour`, `hotelCategory`, `singleSupplement` fields to Booking model
2. `/home/z/my-project/src/app/api/bookings/route.ts` — Updated POST handler to accept and store luxury-specific fields
3. `/home/z/my-project/src/components/luxury/luxury-tours-section.tsx` — Integrated LuxuryBookingModal, added props for auth state, changed CTA button
4. `/home/z/my-project/src/app/page.tsx` — Passed `isLoggedIn` and `onLoginClick` props to LuxuryToursSection
5. `/home/z/my-project/src/lib/i18n.ts` — Added `luxury.bookNow` translation keys for all 3 languages

## Key Design Decisions

### Pricing Logic
- For a given number of persons, finds the closest pricing tier by iterating through sorted tiers
- If persons count <= tier.pax, uses that tier's price
- If persons exceeds all tiers, uses the largest available tier
- Price is per person × number of persons + single supplement (if selected)

### Component Structure
- `'use client'` component with hooks for state management
- Gold color palette (GOLD=#D6B36A, GOLD_DARK=#C88A3D) matching luxury section
- Bodoni_Moda font for headings matching luxury section style
- Uses shadcn/ui Dialog, RadioGroup, Calendar, Popover components
- Uses `useLocale` hook for translations, `formatPrice` from tours-data

### UI Features
1. Tour name, duration, and badges at top (gold gradient header)
2. Calendar date picker (same as regular tours)
3. Hotel category selection via radio buttons (4★ Superior vs 3★ & 4★ Standard)
4. Group size selector with +/- buttons (2-12 range)
5. Single supplement toggle with custom checkbox
6. Dynamic price breakdown showing per-person rate and total
7. Reserve button with login check
8. Success state with Armen5 discount code

### API Integration
- POSTs to `/api/bookings` with luxury-specific fields:
  - `hotelCategory`: '4star' or '3star'
  - `singleSupplement`: boolean
  - `luxuryTour`: true
  - `guideLanguage`: 'german' (always included for luxury)
  - `adults`: persons count
  - `children`: 0 (not applicable for luxury)

### Schema Changes
Added to Booking model:
- `luxuryTour Boolean @default(false)` 
- `hotelCategory String @default("")`
- `singleSupplement Boolean @default(false)`

## Lint & Build Status
- ESLint: PASS (no errors)
- Dev server: Running successfully on port 3000
- Database: Schema pushed successfully
