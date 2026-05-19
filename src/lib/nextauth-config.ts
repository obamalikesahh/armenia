import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/lib/db'
import { createToken } from '@/lib/auth'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  debug: false,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email.toLowerCase() },
          })

          if (!existingUser) {
            const nameParts = (user.name || 'User').split(' ')
            await db.user.create({
              data: {
                email: user.email.toLowerCase(),
                firstName: nameParts[0] || 'User',
                lastName: nameParts.slice(1).join(' ') || '',
                phone: '',
                passwordHash: null,
                authProvider: 'google',
                image: user.image || null,
              },
            })
          } else if (existingUser.authProvider === 'email') {
            await db.user.update({
              where: { id: existingUser.id },
              data: {
                authProvider: 'google',
                image: user.image || existingUser.image,
              },
            })
          }
          return true
        } catch (error) {
          console.error('Google OAuth sign-in error:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user?.email) {
        try {
          const dbUser = await db.user.findUnique({
            where: { email: user.email.toLowerCase() },
          })
          if (dbUser) {
            token.userId = dbUser.id
            token.firstName = dbUser.firstName
            token.lastName = dbUser.lastName
            token.phone = dbUser.phone
            token.authProvider = dbUser.authProvider
            token.customToken = createToken({
              userId: dbUser.id,
              email: dbUser.email,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
            })
          }
        } catch (error) {
          console.error('JWT callback error:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.phone = token.phone as string
        session.user.authProvider = token.authProvider as string
        session.user.customToken = token.customToken as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      try {
        if (new URL(url).origin === baseUrl) return url
      } catch {
        // Invalid URL, fall through
      }
      // If the URL is from the same host but different protocol/port (behind proxy)
      if (url.includes('localhost:3000') || url.includes('127.0.0.1:3000')) {
        return baseUrl
      }
      return baseUrl
    },
  },
}
