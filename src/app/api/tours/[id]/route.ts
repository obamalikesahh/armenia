import { NextRequest, NextResponse } from 'next/server'
import { tours } from '@/lib/tours-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const tour = tours.find(t => t.id === parseInt(id))

  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
  }

  return NextResponse.json(tour)
}
