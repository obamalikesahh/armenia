import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendContactEmail(name, email, phone, subject, message)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
