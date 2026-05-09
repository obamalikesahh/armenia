import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    currency: 'EUR',
    updatedAt: new Date().toISOString(),
  })
}
