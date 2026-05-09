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

    // Get the user from our DB
    const user = await db.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
    })

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Create our custom JWT token for the booking system
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
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
