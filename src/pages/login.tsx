// src/pages/login.tsx
import { GetServerSideProps } from 'next'
import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { useAccount, useChainId, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { SiweMessage } from 'siwe'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/hooks/useLanguage'

type Props = { csrfToken: string }

function LoginComponent({ csrfToken }: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const { connect, connectors, isPending: isConnecting, error: connectError } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()
  const { language, translations, toggleLanguage } = useLanguage()

  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')
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

  useEffect(() => {
    // Debug info
    setDebugInfo(`
      Connectors: ${connectors.length}
      Connected: ${isConnected}
      Address: ${address || 'none'}
      ChainId: ${chainId}
      ConnectError: ${connectError?.message || 'none'}
      HasWallet: ${hasWallet}
      CSRF Token: ${currentCsrfToken ? 'Present' : 'Missing'}
    `)
  }, [connectors, isConnected, address, chainId, connectError, hasWallet, currentCsrfToken])

  const handleSiwe = async () => {
    try {
      if (!isConnected || !address) {
        connect({ connector: injected() })
        return
      }

      // Validação de segurança no cliente
      if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
        setError('Endereço de carteira inválido')
        return
      }

      if (!chainId || ![1, 11155111].includes(chainId)) {
        setError('Rede não suportada. Use Ethereum Mainnet ou Sepolia Testnet')
        return
      }

      if (!currentCsrfToken) {
        setError('Token CSRF não encontrado. Recarregue a página.')
        return
      }

      // Validação de domínio
      const currentOrigin = window.location.origin
      const allowedOrigins = [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://siwe-dapp-o7uziweqw-mercios-projects-24963103.vercel.app'
        // Adicione seus domínios de produção aqui
        // 'https://yourdomain.com',
        // 'https://www.yourdomain.com'
      ]

      // Permitir domínios do Vercel
      const isVercelDomain = currentOrigin.includes('.vercel.app')
      const isAllowedOrigin = allowedOrigins.includes(currentOrigin)

      if (!isAllowedOrigin && !isVercelDomain) {
        setError('Domínio não autorizado')
        return
      }

      const nextAuthUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? currentOrigin)

      const message = new SiweMessage({
        domain: nextAuthUrl.host,
        address,
        statement: 'Sign-In with Ethereum to the app.',
        uri: nextAuthUrl.origin,
        version: '1',
        chainId,
        nonce: currentCsrfToken,
        issuedAt: new Date().toISOString(), // Adiciona timestamp
      })

      const prepared = message.prepareMessage()
      
      // Validação adicional da mensagem preparada
      if (!prepared || prepared.length > 10000) {
        setError('Mensagem SIWE inválida')
        return
      }

      const signature = await signMessageAsync({ message: prepared })

      if (!signature || signature.length > 200) {
        setError('Assinatura inválida')
        return
      }

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
      
      // Mensagens de erro mais específicas
      const errorMessage = e instanceof Error ? e.message : String(e)
      if (errorMessage.includes('User rejected')) {
        setError('Assinatura rejeitada pelo usuário')
      } else if (errorMessage.includes('network')) {
        setError('Erro de rede. Verifique sua conexão.')
      } else {
        setError('Falha ao assinar/verificar SIWE. Tente novamente.')
      }
    }
  }

  return (
    <div className="login-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      {/* Header */}
      <header className="login-header">
        <div className="header-left">
          <h1 className="login-title">
            <span className="wallet-icon">🔐</span>
            {translations.login.title}
          </h1>
        </div>
        <div className="header-right">
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'pt' ? '🇺🇸' : '🇧🇷'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-card">
          <div className="card-header">
            <h2>{translations.login.subtitle}</h2>
          </div>
          
          <div className="card-content">
            {!hasWallet ? (
              <div className="wallet-not-found">
                <div className="wallet-icon-large">🔗</div>
                <h3>{translations.login.walletNotFound}</h3>
                <p>{translations.login.walletNotFoundDesc}</p>
                <div className="wallet-actions">
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="install-btn"
                  >
                    {translations.login.installMetaMask}
                  </a>
                  <button 
                    className="reload-btn" 
                    onClick={() => window.location.reload()}
                  >
                    {translations.login.reloadPage}
                  </button>
                </div>
              </div>
            ) : !isConnected ? (
              <div className="connect-section">
                <div className="wallet-icon-large">🔗</div>
                <h3>MetaMask</h3>
                <p>Conecte sua carteira MetaMask para continuar</p>
                <button 
                  className="connect-btn" 
                  onClick={() => connect({ connector: injected() })}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <div className="spinner-small"></div>
                      {translations.login.connecting}
                    </>
                  ) : (
                    translations.login.connectWalletMetaMask
                  )}
                </button>
              </div>
            ) : (
              <div className="connected-section">
                <div className="connection-status">
                  <div className="status-indicator online"></div>
                  <span>{translations.login.connected}</span>
                </div>
                <div className="wallet-info">
                  <div className="info-item">
                    <span className="label">{translations.dashboard.address}:</span>
                    <span className="value">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">{translations.dashboard.network}:</span>
                    <span className="value">Chain {chainId}</span>
                  </div>
                </div>
                <div className="wallet-actions">
                  <button 
                    className="sign-btn" 
                    onClick={handleSiwe} 
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <div className="spinner-small"></div>
                        {translations.login.connecting}
                      </>
                    ) : (
                      translations.login.signAndLogin
                    )}
                  </button>
                  <button 
                    className="disconnect-btn" 
                    onClick={() => disconnect()}
                  >
                    {translations.login.disconnect}
                  </button>
                </div>
              </div>
            )}

            {/* Error Messages */}
            {connectError && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{translations.login.connectError}: {connectError.message}</span>
              </div>
            )}
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{translations.login.error}: {error}</span>
              </div>
            )}

            {/* Debug Info */}
            <div className="debug-section">
              <details>
                <summary>{translations.login.debugInfo}</summary>
                <pre className="debug-content">{debugInfo}</pre>
              </details>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .login-container[data-theme="dark"] {
          --bg-primary: #0a0a0a;
          --bg-secondary: #1a1a1a;
          --bg-card: #2a2a2a;
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --border-color: #333333;
          --accent-color: #6366f1;
          --success-color: #10b981;
          --error-color: #ef4444;
        }

        .login-container[data-theme="light"] {
          --bg-primary: #f8fafc;
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
          --accent-color: #3b82f6;
          --success-color: #059669;
          --error-color: #dc2626;
        }

        .login-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .wallet-icon {
          font-size: 1.8rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .language-toggle, .theme-toggle {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 0.5rem;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s ease;
        }

        .language-toggle:hover, .theme-toggle:hover {
          background: var(--accent-color);
          color: white;
        }

        .login-main {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 80px);
          padding: 2rem;
        }

        .login-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          overflow: hidden;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          padding: 2rem 2rem 1rem;
          text-align: center;
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .card-content {
          padding: 1rem 2rem 2rem;
        }

        .wallet-not-found, .connect-section, .connected-section {
          text-align: center;
        }

        .wallet-icon-large {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .wallet-not-found h3, .connect-section h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .wallet-not-found p, .connect-section p {
          margin: 0 0 2rem 0;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .wallet-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .install-btn, .connect-btn, .sign-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          border-radius: 0.75rem;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
          width: 100%;
        }

        .install-btn:hover, .connect-btn:hover, .sign-btn:hover {
          background: var(--accent-color);
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .connect-btn:disabled, .sign-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .reload-btn {
          background: var(--success-color);
          color: white;
          border: none;
          border-radius: 0.75rem;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .reload-btn:hover {
          background: var(--success-color);
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .connection-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 0.75rem;
          border: 1px solid var(--border-color);
        }

        .status-indicator {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .status-indicator.online {
          background: var(--success-color);
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .wallet-info {
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .value {
          font-weight: 600;
          font-family: 'Courier New', monospace;
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }

        .disconnect-btn {
          background: var(--error-color);
          color: white;
          border: none;
          border-radius: 0.75rem;
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .disconnect-btn:hover {
          background: var(--error-color);
          opacity: 0.9;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error-color);
          border-radius: 0.75rem;
          color: var(--error-color);
          margin: 1rem 0;
        }

        .error-icon {
          font-size: 1.2rem;
        }

        .debug-section {
          margin-top: 1.5rem;
        }

        .debug-section details {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .debug-section summary {
          cursor: pointer;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .debug-content {
          margin: 1rem 0 0 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: pre-wrap;
          font-family: 'Courier New', monospace;
        }

        .spinner-small {
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .login-header {
            padding: 1rem;
          }
          
          .login-main {
            padding: 1rem;
          }
          
          .card-header, .card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const csrfToken = await getCsrfToken(ctx)
  // Exponha uma base URL pública para o client montar domain/uri
  const baseUrl = process.env.NEXTAUTH_URL
  return {
    props: {
      csrfToken: csrfToken ?? '',
      // Para o client acessar:
      ...(baseUrl ? { NEXT_PUBLIC_BASE_URL: baseUrl } : {}),
    } as { csrfToken: string; NEXT_PUBLIC_BASE_URL?: string },
  }
}

export default dynamic(() => Promise.resolve(LoginComponent), {
  ssr: false,
})
