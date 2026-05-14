import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendConfirmationEmails, DISCOUNT_CODE } from '@/lib/email'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tourId,
      tourName,
      tourDate,
      guideLanguage,
      adults,
      children,
      totalPriceEUR,
      userId,
      lang = 'en',
    } = body

    // Verify user is authenticated
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || ''
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user info — try multiple lookup strategies
    let user = null
    // 1. Try explicit userId from request body
    if (userId) {
      user = await db.user.findUnique({ where: { id: userId } })
    }
    // 2. Try userId from JWT token
    if (!user && payload.userId) {
      user = await db.user.findUnique({ where: { id: payload.userId } })
    }
    // 3. Try email from JWT token
    if (!user && payload.email) {
      user = await db.user.findUnique({ where: { email: payload.email } })
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
    }

    // Check availability
    const totalPeople = adults + children
    let availability = await db.tourAvailability.findUnique({
      where: { tourId_tourDate: { tourId, tourDate } },
    })

    if (!availability) {
      // Create availability record if not exists (default max 20)
      availability = await db.tourAvailability.create({
        data: { tourId, tourDate, maxSeats: 20, reservedSeats: 0 },
      })
    }

    const remainingSeats = availability.maxSeats - availability.reservedSeats
    if (totalPeople > remainingSeats) {
      return NextResponse.json(
        { error: `Not enough seats available. Only ${remainingSeats} seats left.` },
        { status: 400 }
      )
    }

    // Create booking with confirmed status (no payment needed)
    const booking = await db.booking.create({
      data: {
        tourId,
        tourName: tourName || '',
        tourDate,
        guideLanguage,
        adults,
        children,
        totalPriceAMD: 0, // Legacy field, not used
        totalPriceEUR,
        status: 'confirmed',
        discountCode: DISCOUNT_CODE,
        userId: user.id,
      },
    })

    // Update availability (reserve seats)
    await db.tourAvailability.update({
      where: { id: availability.id },
      data: { reservedSeats: availability.reservedSeats + totalPeople },
    })

    // Send confirmation emails (don't await to avoid blocking response)
    sendConfirmationEmails(
      {
        bookingId: booking.id,
        tourName,
        tourDate,
        guideLanguage,
        adults,
        children,
        totalPriceAMD: 0, // Legacy
        totalPriceEUR,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userEmail: user.email,
        userPhone: user.phone,
        discountCode: DISCOUNT_CODE,
      },
      lang as 'en' | 'ru' | 'de'
    ).catch((err) => {
      console.error('Failed to send confirmation emails:', err)
    })

    return NextResponse.json({ booking, message: 'Reservation confirmed! Check your email for details.' }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Reservation error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// Get user's bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const bookings = await db.booking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ bookings })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
