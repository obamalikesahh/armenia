import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { convertAMDtoEUR } from '@/lib/tours-data'

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
      totalPriceAMD,
      userId,
    } = body

    const totalPriceEUR = convertAMDtoEUR(totalPriceAMD)

    const booking = await db.booking.create({
      data: {
        tourId,
        tourName: tourName || '',
        tourDate,
        guideLanguage,
        adults,
        children,
        totalPriceAMD,
        totalPriceEUR,
        status: 'pending',
        userId,
      },
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
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
