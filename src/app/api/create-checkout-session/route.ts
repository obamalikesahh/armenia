import { NextResponse } from 'next/server'

// This endpoint is no longer used — reservations are handled via /api/bookings
// Kept as a redirect for backwards compatibility
export async function POST() {
  return NextResponse.json(
    { error: 'Payment is no longer required. Please use the reservation system instead.' },
    { status: 410 }
  )
}
