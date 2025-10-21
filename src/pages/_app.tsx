// src/pages/_app.tsx
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/wagmi'
import { useState } from 'react'

interface PagePropsWithSession {
  session?: unknown
  [key: string]: unknown
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={(pageProps as PagePropsWithSession).session as never}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
