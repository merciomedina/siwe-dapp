// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SiweMessage } from 'siwe'
import { z } from 'zod'

const SiweSchema = z.object({
  message: z.string(),
  signature: z.string(),
})

function getOriginSafe(req: { headers?: { origin?: string; host?: string } }): URL {
  // Lista de domínios permitidos
  const allowedDomains = [
    'localhost:3000',
    '127.0.0.1:3000',
    // Adicione seus domínios de produção aqui
    // 'yourdomain.com',
    // 'www.yourdomain.com'
  ]

  // Tenta descobrir o origin a partir do request primeiro
  const headerOrigin = req?.headers?.origin as string | undefined
  const host = req?.headers?.host as string | undefined
  
  // Validação de domínio
  if (headerOrigin) {
    try {
      const url = new URL(headerOrigin)
      if (allowedDomains.includes(url.host)) {
        return url
      }
           } catch {
             console.warn('Invalid origin header:', headerOrigin)
           }
  }
  
  if (host && allowedDomains.includes(host)) {
    return new URL(`http://${host}`)
  }
  
  // Fallback para env ou localhost (apenas em desenvolvimento)
  const envUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const fallbackUrl = new URL(envUrl)
  
  // Em produção, rejeitar se não estiver na lista de domínios permitidos
  if (process.env.NODE_ENV === 'production' && !allowedDomains.includes(fallbackUrl.host)) {
    throw new Error('Unauthorized domain')
  }
  
  return fallbackUrl
}

export const authOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Ethereum',
      credentials: { message: { type: 'text' }, signature: { type: 'text' } },
             async authorize(credentials, req: { headers?: { origin?: string; host?: string }; body?: { csrfToken?: string } }) {
        const parsed = SiweSchema.safeParse(credentials)
        if (!parsed.success) {
          console.warn('SIWE validation failed:', parsed.error)
          return null
        }

        const { message, signature } = parsed.data
        
        // Validação básica de entrada
        if (!message || !signature || message.length > 10000 || signature.length > 200) {
          console.warn('SIWE input validation failed')
          return null
        }

        try {
          const originUrl = getOriginSafe(req)
          const siweMessage = new SiweMessage(message)

          // Validações de segurança adicionais
          if (!siweMessage.address || !siweMessage.chainId) {
            console.warn('SIWE message missing required fields')
            return null
          }

          // Validação de endereço Ethereum
          if (!/^0x[a-fA-F0-9]{40}$/.test(siweMessage.address)) {
            console.warn('SIWE invalid address format')
            return null
          }

          // Validação de chain ID (apenas redes suportadas)
          const supportedChains = [1, 11155111] // Mainnet e Sepolia
          if (!supportedChains.includes(siweMessage.chainId)) {
            console.warn('SIWE unsupported chain ID:', siweMessage.chainId)
            return null
          }

          // Valida domínio/URI somente se estiverem coerentes
          if (siweMessage.domain && siweMessage.domain !== originUrl.host) {
            console.warn('SIWE domain mismatch:', siweMessage.domain, 'vs', originUrl.host)
            return null
          }
          if (siweMessage.uri && !siweMessage.uri.toString().startsWith(originUrl.origin)) {
            console.warn('SIWE URI mismatch:', siweMessage.uri, 'vs', originUrl.origin)
            return null
          }

                 // Validação de nonce (csrfToken)
                 const csrfToken = req.body?.csrfToken
          if (!csrfToken || siweMessage.nonce !== csrfToken) {
            console.warn('SIWE nonce validation failed')
            return null
          }

                 // Validação de tempo (não permitir mensagens muito antigas)
                 const messageTime = new Date(siweMessage.issuedAt || new Date())
          const now = new Date()
          const timeDiff = now.getTime() - messageTime.getTime()
          const maxAge = 5 * 60 * 1000 // 5 minutos
          
          if (timeDiff > maxAge) {
            console.warn('SIWE message too old:', timeDiff, 'ms')
            return null
          }

          const result = await siweMessage.verify({ signature, time: new Date().toISOString() })
          if (!result.success) {
            console.warn('SIWE signature verification failed:', result.error)
            return null
          }

          // Log de sucesso (sem dados sensíveis)
          console.log('SIWE authentication successful for address:', siweMessage.address.slice(0, 6) + '...')

          return {
            id: siweMessage.address,
            address: siweMessage.address,
            chainId: siweMessage.chainId,
          }
        } catch (err) {
          console.error('SIWE authorize error:', err)
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
