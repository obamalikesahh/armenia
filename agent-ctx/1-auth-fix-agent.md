# Task 1 - Auth Fix Agent Work Record

## Task: Fix the broken auth system by replacing Supabase with Prisma-based local auth

## What was done:

### 1. Prisma Schema Update (`prisma/schema.prisma`)
- Removed `Post` model
- Updated `User` model: added `firstName`, `lastName`, `phone` (optional), `passwordHash` fields
- Added `Booking` model with: `id`, `userId`, `tourId`, `tourName`, `tourDate`, `guideLanguage`, `adults`, `children`, `totalPriceAMD`, `totalPriceEUR`, `status`, `stripeSessionId`, `createdAt`
- User-Booking relation via `userId` foreign key

### 2. Installed bcryptjs
- `bun add bcryptjs @types/bcryptjs`

### 3. Created auth utility (`src/lib/auth.ts`)
- `hashPassword(password, saltRounds=12)` - bcryptjs hashing
- `verifyPassword(password, hash)` - bcryptjs comparison
- `createToken(payload)` - HMAC-SHA256 JWT with 7-day expiry
- `verifyToken(token)` - JWT verification and expiration check

### 4. Updated register route (`src/app/api/auth/register/route.ts`)
- Uses Prisma `db.user.findUnique` to check duplicates
- Uses `hashPassword` before storing
- Returns 201 with user info (no passwordHash)
- Returns 409 for duplicate emails

### 5. Updated login route (`src/app/api/auth/login/route.ts`)
- Uses Prisma `db.user.findUnique` to find user
- Uses `verifyPassword` for password check
- Uses `createToken` to generate JWT
- Returns 200 with user info + token
- Returns 401 for invalid credentials

### 6. Updated bookings route (`src/app/api/bookings/route.ts`)
- POST: Uses `db.booking.create` with Prisma
- GET: Uses `db.booking.findMany` with Prisma

### 7. Updated auth modal (`src/components/auth/auth-modal.tsx`)
- Added `UserInfo` interface and `onLoginSuccess` callback prop
- Registration success: shows green checkmark + message, auto-switches to login tab after 2s
- Login success: stores token + user info in localStorage, calls onLoginSuccess, closes modal

## Verification:
- `bun run db:push` - schema synced successfully
- `bun run lint` - zero errors
- curl tests: register (201), login (200 with JWT), duplicate (409), wrong password (401)
- Dev server compiles without errors
