/**
 * Security & Anti-Bot Protection Helper
 */

// In-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; lastReset: number }>()

/**
 * Validates email format and guards against email header injection attacks
 */
export function isValidEmail(email: unknown): boolean {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length < 5 || trimmed.length > 254) return false

  // Reject header injection characters (\r, \n, control chars, quotes, angle brackets)
  if (/[\r\n\0\t<>"']/.test(trimmed)) return false

  // Standard email format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(trimmed)
}

/**
 * Checks if honeypot fields were filled by automated spam bots
 */
export function isHoneypotTriggered(body: Record<string, any>): boolean {
  if (!body || typeof body !== 'object') return false
  
  const honeypotFields = ['website', 'hp_field', 'fax', 'address2', 'company_url']
  for (const field of honeypotFields) {
    if (body[field] && typeof body[field] === 'string' && body[field].trim().length > 0) {
      return true
    }
  }
  return false
}

/**
 * Checks for phishing & spam keywords common in bot submissions
 */
export function isSpamContent(...inputs: (string | undefined | null)[]): boolean {
  const combinedText = inputs.filter(Boolean).join(' ').toLowerCase()
  if (!combinedText) return false

  // Known spam & scam bot triggers
  const spamKeywords = [
    'chatgpt',
    'openai',
    'rinnovo',
    'fattura',
    'pagamento non riuscito',
    'viagra',
    'casino',
    'poker',
    'crypto',
    'binance',
    't.me/',
    'bit.ly/',
    'tinyurl.com',
  ]

  for (const keyword of spamKeywords) {
    if (combinedText.includes(keyword)) {
      return true
    }
  }

  // Count URLs in content - if more than 2 URLs in a single contact message, flag as spam
  const urlMatches = combinedText.match(/https?:\/\//g)
  if (urlMatches && urlMatches.length > 2) {
    return true
  }

  return false
}

/**
 * IP Rate limiter for API routes
 */
export function isRateLimited(
  ip: string,
  action: string,
  maxRequests: number = 5,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): boolean {
  if (!ip || ip === 'unknown') return false

  const key = `${action}:${ip}`
  const now = Date.now()
  const windowStart = now - windowMs

  // Clean old entries periodically
  for (const [k, v] of rateLimitStore.entries()) {
    if (v.lastReset < windowStart) {
      rateLimitStore.delete(k)
    }
  }

  const record = rateLimitStore.get(key) || { count: 0, lastReset: now }
  if (record.count >= maxRequests) {
    return true
  }

  record.count += 1
  rateLimitStore.set(key, record)
  return false
}

/**
 * Extract client IP address from Next.js / Web Request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  return 'unknown'
}
