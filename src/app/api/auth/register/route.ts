import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone } =
      await request.json()

    // Validate required fields (phone is now required)
    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: 'Email, password, firstName, lastName, and phone are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
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
        email,
        firstName,
        lastName,
        phone,
        passwordHash,
      },
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
