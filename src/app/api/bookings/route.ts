import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { convertAMDtoEUR } from '@/lib/tours-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tourId,
      tourDate,
      guideLanguage,
      adults,
      children,
      totalPriceAMD,
      userId,
    } = body

    const totalPriceEUR = convertAMDtoEUR(totalPriceAMD)

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        tour_id: tourId,
        user_id: userId,
        tour_date: tourDate,
        guide_language: guideLanguage,
        num_adults: adults,
        num_children: children,
        total_price_amd: totalPriceAMD,
        total_price_eur: totalPriceEUR,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ booking: data })
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

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ bookings: data })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
