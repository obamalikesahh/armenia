import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      phone?: string
      authProvider: string
      customToken: string
      image?: string | null
      name?: string | null
    }
  }

  interface User {
    id: string
    firstName: string
    lastName: string
    phone?: string
    authProvider: string
    customToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    firstName: string
    lastName: string
    phone: string
    authProvider: string
    customToken: string
  }
}
