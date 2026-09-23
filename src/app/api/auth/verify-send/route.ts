import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendVerificationCodeEmail } from '@/lib/email'

import { isValidEmail, isHoneypotTriggered, isRateLimited, getClientIp } from '@/lib/security'

function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const isDevMode = () => {
  const smtpPass = process.env.SMTP_PASS || ''
  return !smtpPass || smtpPass === 'PLACEHOLDER_NEED_APP_PASSWORD'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, lang = 'en' } = body

    // 1. Honeypot check
    if (isHoneypotTriggered(body)) {
      console.warn('[Security] Verify-send honeypot triggered')
      return NextResponse.json({ message: 'Verification code sent to your email', emailSent: true }, { status: 200 })
    }

    // 2. Validate email presence & syntax
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 })
    }

    // 3. IP Rate limiting (5 verification requests per 10 mins per IP)
    const clientIp = getClientIp(request)
    if (isRateLimited(clientIp, 'auth_verify_send', 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many verification requests. Please try again later.' },
        { status: 429 }
      )
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

    // SECURITY: Never return the verification code in the API response.
    // The code must ONLY be sent to the user's email address.
    // If email fails to send, we return an error instead of exposing the code.
    if (!emailSent) {
      // In DEV_MODE (SMTP not configured), the code is still stored in DB
      // but we return an error asking user to configure email or contact support.
      // The code is NEVER exposed in the response.
      if (isDevMode()) {
        console.warn(
          `[DEV_MODE] SMTP not configured. Verification code generated and stored in DB for ${normalizedEmail}, but email could not be sent. Configure SMTP_PASS to enable email delivery.`
        )
        return NextResponse.json(
          {
            error: 'Email service is not configured yet. Please contact support at thebeautyofarmenia@gmail.com to complete your registration.',
            devMode: true,
          },
          { status: 503 }
        )
      }

      // Production: Check for auth-related errors and provide helpful messages
      if (
        emailError.includes('Missing credentials') ||
        emailError.includes('EAUTH') ||
        emailError.includes('Invalid login') ||
        emailError.includes('535') ||
        emailError.includes('Authentication')
      ) {
        return NextResponse.json(
          { error: 'Email service is currently unavailable. Please try again later or contact support at thebeautyofarmenia@gmail.com.' },
          { status: 503 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again or contact support at thebeautyofarmenia@gmail.com.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Verification code sent to your email',
        email: normalizedEmail,
        emailSent: true,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Verification send error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (message.includes('535') || message.includes('Authentication') || message.includes('EAUTH') || message.includes('Invalid login')) {
      return NextResponse.json(
        { error: 'Email service is currently unavailable. Please try again later or contact support at thebeautyofarmenia@gmail.com.' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Failed to send verification code. Please try again or contact support at thebeautyofarmenia@gmail.com.' }, { status: 500 })
  }
}
