// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SiweMessage } from 'siwe'
import { z } from 'zod'

const SiweSchema = z.object({
  message: z.string(),
  signature: z.string(),
})

export const authOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Ethereum',
      credentials: { message: { type: 'text' }, signature: { type: 'text' } },
      async authorize(credentials) {
        try {
          console.log('Authorize called with credentials:', !!credentials)
          
          const parsed = SiweSchema.safeParse(credentials)
          if (!parsed.success) {
            console.warn('SIWE validation failed:', parsed.error)
            return null
          }

          const { message, signature } = parsed.data
          
          // Validação básica
          if (!message || !signature) {
            console.warn('Missing message or signature')
            return null
          }

          const siweMessage = new SiweMessage(message)
          
          // Verificação básica
          if (!siweMessage.address) {
            console.warn('Missing address in SIWE message')
            return null
          }

          const result = await siweMessage.verify({ signature })
          if (!result.success) {
            console.warn('SIWE verification failed:', result.error)
            return null
          }

          console.log('SIWE authentication successful')

          return {
            id: siweMessage.address,
            address: siweMessage.address,
            chainId: siweMessage.chainId || 1,
          }
        } catch (err) {
          console.error('Authorize error:', err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      if (user?.address) {
        token.address = (user as { address: string; chainId: number }).address
        token.chainId = (user as { address: string; chainId: number }).chainId
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      ;(session as { address?: string; chainId?: number }).address = token.address
      ;(session as { address?: string; chainId?: number }).chainId = token.chainId
      return session
    },
  },
  pages: { signIn: '/login' },
}

// @ts-expect-error - NextAuth type issue
export default NextAuth(authOptions)
