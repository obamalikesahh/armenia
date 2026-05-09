import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, emailVerified } =
      await request.json()

    // Validate required fields (phone is now required)
    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: 'Email, password, firstName, lastName, and phone are required' },
        { status: 400 }
      )
    }

    // Check that emailVerified flag is provided
    if (emailVerified !== true) {
      return NextResponse.json(
        { error: 'Email verification required' },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Verify that email has been verified via EmailVerification system
    const verification = await db.emailVerification.findFirst({
      where: {
        email: normalizedEmail,
        verified: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!verification) {
      return NextResponse.json(
        { error: 'Email not verified. Please verify your email first.' },
        { status: 400 }
      )
    }

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

    // Hash the password
    const passwordHash = await hashPassword(password)

    // Create user in DB
    const user = await db.user.create({
      data: {
        email: normalizedEmail,
        firstName,
        lastName,
        phone,
        passwordHash,
      },
    })

    // Clean up email verification records after successful registration
    await db.emailVerification.deleteMany({
      where: { email: normalizedEmail },
    })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        },
        message: 'Registration successful',
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
