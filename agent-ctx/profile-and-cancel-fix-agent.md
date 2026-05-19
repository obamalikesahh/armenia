# Fix: User Profile Access & Booking Cancellation

## Task ID: profile-and-cancel-fix

## Summary
Fixed two issues:
1. **Users can't access their profile**: "Profile" and "My Bookings" links in the navbar had no click handlers, so clicking them did nothing.
2. **Users can't cancel bookings**: There was no UI to view or cancel bookings.

## Changes Made

### New Files
- **`src/components/auth/bookings-modal.tsx`** — New BookingsModal component that:
  - Fetches user's bookings from `/api/bookings` API with auth token
  - Displays each booking with tour name, date, status, guide language, price, and discount code
  - Shows status badges (Confirmed/Cancelled)
  - Shows 24-hour cancellation countdown timer
  - Has a cancel button on confirmed bookings within the 24-hour window
  - Shows confirmation dialog (AlertDialog) before cancelling
  - Calls `/api/bookings/cancel` API with auth token
  - Updates UI after successful cancellation
  - Shows success/error messages
  - Fully i18n translated (en, ru, de)

### Modified Files

1. **`src/components/layout/navbar.tsx`**:
   - Added `onMyBookingsClick` and `onProfileClick` props to NavbarProps interface
   - Added `CalendarCheck` to lucide-react imports
   - Wired up "Profile" dropdown menu item to `onProfileClick`
   - Wired up "My Bookings" dropdown menu item to `onMyBookingsClick`
   - Changed mobile menu "Profile" button to "My Bookings" button (more useful action) with CalendarCheck icon

2. **`src/app/page.tsx`**:
   - Added dynamic import for BookingsModal
   - Added `isBookingsModalOpen` state
   - Added `handleMyBookingsClick` handler (opens auth modal if not logged in, otherwise opens bookings modal)
   - Passed `onMyBookingsClick` and `onProfileClick` to Navbar
   - Rendered BookingsModal component alongside existing modals
   - Close bookings modal on logout

3. **`src/lib/i18n.ts`**:
   - Added 16 new translation keys under `bookings.*` namespace
   - Added translations for en, ru, and de locales

4. **`src/app/api/bookings/route.ts`**:
   - Added auth verification to GET endpoint (was previously unauthenticated)
   - Added user authorization check (users can only view their own bookings)

## API Endpoints Used
- `GET /api/bookings?userId=XXX` — Fetches user's bookings (now requires auth)
- `POST /api/bookings/cancel` — Cancels a booking (already had auth)
