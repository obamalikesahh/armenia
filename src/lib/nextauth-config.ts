import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/lib/db'
import { createToken } from '@/lib/auth'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/', // We use our own modal, redirect back to home
    error: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user already exists
          const existingUser = await db.user.findUnique({
            where: { email: user.email.toLowerCase() },
          })

          if (!existingUser) {
            // Create new user from Google profile
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
            // User exists with email auth, update to include Google
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
      // On first sign in, add our custom fields
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
            // Also create our custom JWT for the booking system
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
  },
}
