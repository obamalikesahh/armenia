import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Find the verification record
    const verification = await db.emailVerification.findFirst({
      where: {
        email: normalizedEmail,
        code,
        verified: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!verification) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    // Mark as verified
    await db.emailVerification.update({
      where: { id: verification.id },
      data: { verified: true },
    })

    return NextResponse.json(
      { message: 'Email verified successfully', email: normalizedEmail, verified: true },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Verification check error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
