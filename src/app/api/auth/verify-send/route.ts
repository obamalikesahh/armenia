import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendVerificationCodeEmail } from '@/lib/email'

function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email, lang = 'en' } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Delete any previous unverified codes for this email
    await db.emailVerification.deleteMany({
      where: { email: normalizedEmail, verified: false },
    })

    // Generate a new 6-digit code
    const code = generate6DigitCode()

    // Save the code to DB (expires in 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await db.emailVerification.create({
      data: {
        email: normalizedEmail,
        code,
        verified: false,
        expiresAt,
      },
    })

    // Send the verification email
    await sendVerificationCodeEmail(normalizedEmail, code, lang as 'en' | 'ru' | 'de')

    return NextResponse.json(
      { message: 'Verification code sent to your email', email: normalizedEmail },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Verification send error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
