# Task 1 — Fix 3 Issues (Verification Email, Tour Switching, Section Nesting)

## Summary
Fixed three issues in the Armenian tour booking website:

1. **Verification code email clarification** — Added explicit comment in `email.ts` that verification codes are ONLY sent to the registering user, never to admin. Confirmed by inspecting both `sendVerificationCodeEmail` and `/api/auth/verify-send/route.ts`.

2. **Luxury tour switching fix** — Changed `AnimatePresence` key from `tour.id` to `activeTourIndex` for guaranteed re-render on switch. Added `onExitComplete` callback. Reduced transition from 0.5s to 0.4s.

3. **Duplicate section nesting** — Removed the outer `<section id="luxury">` wrapper in `page.tsx` since `LuxuryToursSection` already renders its own `<section id="luxury">` internally. This was creating invalid HTML with duplicate IDs.

## Files Modified
- `/src/app/page.tsx` — Removed duplicate section wrapper
- `/src/components/luxury/luxury-tours-section.tsx` — Changed AnimatePresence key and added onExitComplete
- `/src/lib/email.ts` — Added clarifying comment about verification code email scope

## Verification
- `bun run lint` — Clean pass, no errors
- Dev server — No compilation errors
