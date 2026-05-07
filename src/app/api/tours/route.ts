import { NextRequest, NextResponse } from 'next/server'
import { tours, convertAMDtoEUR } from '@/lib/tours-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  let filteredTours = [...tours]

  const category = searchParams.get('category')
  const region = searchParams.get('region')
  const duration = searchParams.get('duration')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  if (category && category !== 'All') {
    filteredTours = filteredTours.filter(t => t.category === category)
  }
  if (region && region !== 'All') {
    filteredTours = filteredTours.filter(t => t.region === region)
  }
  if (duration) {
    filteredTours = filteredTours.filter(t => t.duration === duration)
  }
  if (search) {
    const q = search.toLowerCase()
    filteredTours = filteredTours.filter(
      t =>
        t.name.en.toLowerCase().includes(q) ||
        t.name.ru.toLowerCase().includes(q) ||
        t.name.de.toLowerCase().includes(q) ||
        t.shortDescription.en.toLowerCase().includes(q)
    )
  }
  if (featured === 'true') {
    filteredTours = filteredTours.filter(t => t.featured)
  }

  // Add EUR prices
  const toursWithEUR = filteredTours.map(t => ({
    ...t,
    priceEUR: convertAMDtoEUR(t.priceAMD),
    priceForeignEUR: convertAMDtoEUR(t.priceForeignAMD),
  }))

  return NextResponse.json({ tours: toursWithEUR, total: toursWithEUR.length })
}
