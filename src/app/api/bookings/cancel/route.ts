import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendCancellationEmails } from '@/lib/email'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { bookingId, lang = 'en' } = await request.json()

    // Verify user is authenticated
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || ''
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the booking
    const booking = await db.booking.findUnique({ where: { id: bookingId } })
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Verify the booking belongs to the user
    if (booking.userId !== payload.userId) {
      return NextResponse.json({ error: 'You can only cancel your own bookings' }, { status: 403 })
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      return NextResponse.json({ error: 'Booking is already cancelled' }, { status: 400 })
    }

    // Check 24-hour cancellation window
    const bookingTime = new Date(booking.createdAt)
    const now = new Date()
    const hoursSinceBooking = (now.getTime() - bookingTime.getTime()) / (1000 * 60 * 60)
    if (hoursSinceBooking > 24) {
      return NextResponse.json(
        { error: 'Cancellation is only allowed within 24 hours of booking' },
        { status: 400 }
      )
    }

    // Get user info for email
    const user = await db.user.findUnique({ where: { id: booking.userId } })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update booking status
    const updatedBooking = await db.booking.update({
      where: { id: bookingId },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
      },
    })

    // Release seats back to availability
    const totalPeople = booking.adults + booking.children
    const availability = await db.tourAvailability.findUnique({
      where: { tourId_date: { tourId: booking.tourId, tourDate: booking.tourDate } },
    })
    if (availability) {
      await db.tourAvailability.update({
        where: { id: availability.id },
        data: { reservedSeats: Math.max(0, availability.reservedSeats - totalPeople) },
      })
    }

    // Send cancellation emails
    sendCancellationEmails(
      {
        bookingId: booking.id,
        tourName: booking.tourName,
        tourDate: booking.tourDate,
        guideLanguage: booking.guideLanguage,
        adults: booking.adults,
        children: booking.children,
        totalPriceAMD: booking.totalPriceAMD,
        totalPriceEUR: booking.totalPriceEUR,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userEmail: user.email,
        userPhone: user.phone,
        discountCode: booking.discountCode || '',
      },
      lang as 'en' | 'ru' | 'de'
    ).catch((err) => {
      console.error('Failed to send cancellation emails:', err)
    })

    return NextResponse.json({ booking: updatedBooking, message: 'Reservation cancelled successfully.' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Cancellation error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
