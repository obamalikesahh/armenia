import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/nextauth-config'
import { db } from '@/lib/db'
import { createToken } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Get the user from our DB by email (lowercased for consistency)
    const user = await db.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
    })

    if (!user) {
      // User signed in via Google OAuth but doesn't exist in our DB yet.
      // This shouldn't happen because the signIn callback creates the user,
      // but handle it gracefully.
      console.error(`[Session] Google OAuth user ${session.user.email} not found in DB. This should not happen — the signIn callback should have created the user.`)
      return NextResponse.json(
        { authenticated: false, error: 'User account not found. Please try signing in again.' },
        { status: 401 }
      )
    }

    // Create our custom JWT token for the booking system
    // This token is used by the frontend for booking API calls
    const token = createToken({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        authProvider: user.authProvider,
        image: user.image,
      },
      token,
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ authenticated: false, error: 'Session lookup failed' }, { status: 500 })
  }
}
