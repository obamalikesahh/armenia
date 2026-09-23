import { NextResponse } from 'next/server'
import { sendNewsletterSubscriptionEmail } from '@/lib/email'
import { isValidEmail, isHoneypotTriggered, isRateLimited, getClientIp } from '@/lib/security'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, lang = 'en' } = body

    // 1. Honeypot check for bots
    if (isHoneypotTriggered(body)) {
      console.warn('[Security] Newsletter honeypot triggered')
      return NextResponse.json({ success: true })
    }

    // 2. Validate email presence & syntax
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      )
    }

    // 3. IP Rate limiting (3 newsletter requests per 10 mins per IP)
    const clientIp = getClientIp(request)
    if (isRateLimited(clientIp, 'newsletter_subscribe', 3, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    await sendNewsletterSubscriptionEmail(email.trim(), lang)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
