import { NextResponse } from 'next/server'

// Approximate AMD to EUR rate (updated periodically)
const AMD_EUR_RATE = 0.0024

export async function GET() {
  return NextResponse.json({
    rate: AMD_EUR_RATE,
    from: 'AMD',
    to: 'EUR',
    updatedAt: new Date().toISOString(),
  })
}
