// src/pages/login-no-i18n.tsx
import { GetServerSideProps } from 'next'
import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { useAccount, useChainId, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { SiweMessage } from 'siwe'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

type Props = { csrfToken: string }

function LoginComponentNoI18n({ csrfToken }: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const { connect, isPending: isConnecting, error: connectError } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  const [error, setError] = useState<string | null>(null)
  const [hasWallet, setHasWallet] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentCsrfToken, setCurrentCsrfToken] = useState<string>(csrfToken)

  useEffect(() => {
    if ((session as { address?: string })?.address) {
      router.replace('/dashboard')
    }
  }, [session, router])

  // Obter novo token CSRF se necessário
  useEffect(() => {
    if (!currentCsrfToken) {
      fetch('/api/auth/csrf')
        .then(res => res.json())
        .then(data => {
          if (data.csrfToken) {
            setCurrentCsrfToken(data.csrfToken)
          }
        })
        .catch(err => {
          console.error('Erro ao obter CSRF token:', err)
        })
    }
  }, [currentCsrfToken])

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light')
  }

  useEffect(() => {
    // Check if wallet is available
    const checkWallet = () => {
      if (typeof window !== 'undefined') {
        const ethereum = (window as { ethereum?: unknown }).ethereum
        setHasWallet(!!ethereum)
      }
    }
    
    checkWallet()
    
    // Listen for wallet events
    if (typeof window !== 'undefined') {
      window.addEventListener('ethereum#initialized', checkWallet)
      return () => window.removeEventListener('ethereum#initialized', checkWallet)
    }
  }, [])

  const handleSiwe = async () => {
    try {
      if (!isConnected || !address) {
        connect({ connector: injected() })
        return
      }

      if (!currentCsrfToken) {
        setError('Token CSRF não encontrado. Recarregue a página.')
        return
      }

      const currentOrigin = window.location.origin
      const nextAuthUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? currentOrigin)

      const message = new SiweMessage({
        domain: nextAuthUrl.host,
        address,
        statement: 'Sign-In with Ethereum to the app.',
        uri: nextAuthUrl.origin,
        version: '1',
        chainId,
        nonce: currentCsrfToken,
        issuedAt: new Date().toISOString(),
      })

      const prepared = message.prepareMessage()
      const signature = await signMessageAsync({ message: prepared })

      const res = await signIn('credentials', {
        message: prepared,
        signature,
        csrfToken: currentCsrfToken,
        redirect: false,
      })

      if (res?.error) {
        setError(res.error)
        return
      }
      
      if (res?.ok) {
        router.replace('/dashboard')
      }
    } catch (e: unknown) {
      console.error('SIWE error:', e)
      setError('Falha ao assinar/verificar SIWE. Tente novamente.')
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Login Test (No i18n)</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={toggleTheme}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {!hasWallet ? (
        <div>
          <h3>MetaMask não encontrado</h3>
          <p>Instale o MetaMask para continuar</p>
          <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
            Instalar MetaMask
          </a>
        </div>
      ) : !isConnected ? (
        <div>
          <h3>Conectar Carteira</h3>
          <button 
            onClick={() => connect({ connector: injected() })}
            disabled={isConnecting}
          >
            {isConnecting ? 'Conectando...' : 'Conectar MetaMask'}
          </button>
        </div>
      ) : (
        <div>
          <h3>Carteira Conectada</h3>
          <p>Endereço: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}</p>
          <p>Rede: Chain {chainId}</p>
          <button onClick={handleSiwe}>
            Assinar e Entrar
          </button>
          <button onClick={() => disconnect()}>
            Desconectar
          </button>
        </div>
      )}

      {connectError && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          Erro de conexão: {connectError.message}
        </div>
      )}
      
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          Erro: {error}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>Debug Info</h3>
        <p>CSRF Token: {currentCsrfToken ? 'Present' : 'Missing'}</p>
        <p>Has Wallet: {hasWallet ? 'Yes' : 'No'}</p>
        <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p>Address: {address || 'None'}</p>
        <p>Chain ID: {chainId}</p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const csrfToken = await getCsrfToken(ctx)
    return {
      props: {
        csrfToken: csrfToken ?? '',
      },
    }
  } catch (error) {
    console.error('getServerSideProps error:', error)
    return {
      props: {
        csrfToken: '',
      },
    }
  }
}

export default dynamic(() => Promise.resolve(LoginComponentNoI18n), {
  ssr: false,
})
