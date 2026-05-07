import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_live_51TGdLNAcM30ck6lwEnLXgdBzVP5ONzAwOc4Xvz693ldDNkjjoEaQCnEfllnlfQ15WEhbBFrMbVvJ15XBjfwqo2hB00U5IakypQ')
