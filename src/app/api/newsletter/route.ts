import { NextResponse } from 'next/server'
import { sendNewsletterSubscriptionEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, lang = 'en' } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await sendNewsletterSubscriptionEmail(email, lang)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
