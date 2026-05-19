import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'armenia-tours-secret-key-2024'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(payload: Record<string, unknown>): string {
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  ).toString('base64url')

  const now = Math.floor(Date.now() / 1000)
  const body = { ...payload, iat: now, exp: now + 60 * 60 * 24 * 7 } // 7 days
  const payloadEncoded = Buffer.from(JSON.stringify(body)).toString(
    'base64url'
  )

  const signatureInput = `${header}.${payloadEncoded}`
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(signatureInput)
    .digest('base64url')

  return `${header}.${payloadEncoded}.${signature}`
}

interface TokenPayload {
  userId: string
  email: string
  iat: number
  exp: number
  [key: string]: unknown
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, payloadEncoded, signature] = parts
    const signatureInput = `${header}.${payloadEncoded}`

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(signatureInput)
      .digest('base64url')

    if (signature !== expectedSignature) return null

    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadEncoded, 'base64url').toString()
    )

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null

    return payload
  } catch {
    return null
  }
}
