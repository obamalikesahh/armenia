import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { isValidEmail, isHoneypotTriggered, isSpamContent, isRateLimited, getClientIp } from '@/lib/security'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // 1. Honeypot check - silently ignore spam bots
    if (isHoneypotTriggered(body)) {
      console.warn('[Security] Contact form honeypot triggered')
      return NextResponse.json({ success: true })
    }

    // 2. Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Strict email validation & header injection prevention
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      )
    }

    // 4. Phishing & Spam keyword filtering
    if (isSpamContent(name, email, subject, message)) {
      console.warn(`[Security] Spam content detected from email: ${email}`)
      // Silently accept without sending email so spam bots don't retry
      return NextResponse.json({ success: true })
    }

    // 5. IP Rate limiting (5 contact submissions per 10 mins per IP)
    const clientIp = getClientIp(request)
    if (isRateLimited(clientIp, 'contact_form', 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please try again later.' },
        { status: 429 }
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
