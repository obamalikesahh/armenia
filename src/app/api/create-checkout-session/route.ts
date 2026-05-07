import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    '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',
  {
    apiVersion: '2025-04-30.basil',
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tourName,
      tourDate,
      guideLanguage,
      adults,
      children,
      totalAmountEUR,
      totalAmountAMD,
      customerEmail,
    } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${tourName} - ${guideLanguage} Guide`,
              description: `Date: ${tourDate} | ${adults} adult(s)${children > 0 ? `, ${children} child(ren)` : ''}`,
            },
            unit_amount: totalAmountEUR * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/?booking=success`,
      cancel_url: `${request.headers.get('origin')}/?booking=cancelled`,
      metadata: {
        tourDate,
        guideLanguage,
        adults: String(adults),
        children: String(children),
        totalAmountAMD: String(totalAmountAMD),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
