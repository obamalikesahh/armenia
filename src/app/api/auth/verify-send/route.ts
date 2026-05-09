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

    // Try to send the verification email
    let emailSent = false
    let emailError = ''

    try {
      await sendVerificationCodeEmail(normalizedEmail, code, lang as 'en' | 'ru' | 'de')
      emailSent = true
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error'
      console.error('Email send failed:', msg)
      emailError = msg
    }

    // Always return success with the code (for development/fallback)
    // In production with proper email service, emailSent will be true
    return NextResponse.json(
      {
        message: emailSent
          ? 'Verification code sent to your email'
          : 'Verification code generated. Check your email or use the code shown.',
        email: normalizedEmail,
        emailSent,
        // Only include code in response when email failed to send (fallback)
        ...(process.env.NODE_ENV !== 'production' || !emailSent ? { code } : {}),
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Verification send error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (message.includes('535') || message.includes('Authentication') || message.includes('EAUTH') || message.includes('Invalid login')) {
      return NextResponse.json(
        { error: 'Email service is currently unavailable. Please try again later or contact support.' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Failed to send verification code. Please try again.' }, { status: 500 })
  }
}
