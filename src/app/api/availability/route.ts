import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tourId = searchParams.get('tourId')
    const tourDate = searchParams.get('date')

    if (!tourId || !tourDate) {
      return NextResponse.json({ error: 'tourId and date are required' }, { status: 400 })
    }

    let availability = await db.tourAvailability.findUnique({
      where: { tourId_date: { tourId, tourDate } },
    })

    if (!availability) {
      // Default: 20 seats, none reserved
      availability = {
        id: 'default',
        tourId,
        tourDate,
        maxSeats: 20,
        reservedSeats: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    return NextResponse.json({
      tourId,
      tourDate,
      maxSeats: availability.maxSeats,
      reservedSeats: availability.reservedSeats,
      availableSeats: availability.maxSeats - availability.reservedSeats,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
