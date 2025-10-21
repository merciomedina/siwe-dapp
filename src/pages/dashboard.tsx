// src/pages/dashboard.tsx
import { signOut } from 'next-auth/react'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { useState } from 'react'
import { useSessionGuard } from '@/hooks/useSessionGuard'
import { useLanguage } from '@/hooks/useLanguage'
import { formatEther } from 'viem'
import dynamic from 'next/dynamic'

function DashboardComponent() {
  const { status, session } = useSessionGuard()
  const { address } = useAccount()
  const chainId = useChainId()
  const { language, translations, toggleLanguage } = useLanguage()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Saldo nativo (ETH) via wagmi
  const { data: nativeBalance } = useBalance({ address })

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light')
  }

  // Get chain info
  const getChainInfo = (chainId: number) => {
    switch (chainId) {
      case 1: return { name: translations.networks.ethereum, color: '#627EEA', icon: '🔷' }
      case 11155111: return { name: translations.networks.sepolia, color: '#FF6B6B', icon: '🧪' }
      default: return { name: `${translations.networks.unknown} ${chainId}`, color: '#666', icon: '⛓️' }
    }
  }

  const chainInfo = getChainInfo(chainId)

  if (status === 'loading') {
    return (
      <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{translations.dashboard.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">
            <span className="wallet-icon">🔐</span>
            {translations.dashboard.title}
          </h1>
        </div>
        <div className="header-right">
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'pt' ? '🇺🇸' : '🇧🇷'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="logout-btn" onClick={() => signOut({ callbackUrl: '/login' })}>
            <span>🚪</span>
            {translations.nav.logout}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Wallet Info Card */}
        <div className="card wallet-card">
          <div className="card-header">
            <h2>{translations.dashboard.walletInfo}</h2>
          </div>
          <div className="card-content">
            <div className="info-row">
              <span className="label">{translations.dashboard.address}:</span>
              <span className="value address">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="label">{translations.dashboard.network}:</span>
              <span className="value chain" style={{ color: chainInfo.color }}>
                {chainInfo.icon} {chainInfo.name}
              </span>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="card balance-card">
          <div className="card-header">
            <h2>{translations.dashboard.balance}</h2>
          </div>
          <div className="card-content">
            <div className="balance-display">
              <div className="balance-amount">
                {nativeBalance ? formatEther(nativeBalance.value) : '0.0000'}
              </div>
              <div className="balance-currency">ETH</div>
            </div>
            <div className="balance-usd">
              ≈ $0.00 USD
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card actions-card">
          <div className="card-header">
            <h2>{translations.dashboard.quickActions}</h2>
          </div>
          <div className="card-content">
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">📤</span>
                <span>{translations.dashboard.send}</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📥</span>
                <span>{translations.dashboard.receive}</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">🔄</span>
                <span>{translations.dashboard.swap}</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span>{translations.dashboard.history}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div className="card network-card">
          <div className="card-header">
            <h2>{translations.dashboard.networkStatus}</h2>
          </div>
          <div className="card-content">
            <div className="network-status">
              <div className="status-indicator online"></div>
              <span>{translations.dashboard.connectedTo} {chainInfo.name}</span>
            </div>
            <div className="network-details">
              <div className="detail-item">
                <span>{translations.dashboard.chainId}:</span>
                <span>{chainId}</span>
              </div>
              <div className="detail-item">
                <span>{translations.dashboard.status}:</span>
                <span className="status-online">{translations.dashboard.online}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .dashboard-container[data-theme="dark"] {
          --bg-primary: #0a0a0a;
          --bg-secondary: #1a1a1a;
          --bg-card: #2a2a2a;
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --border-color: #333333;
          --accent-color: #6366f1;
        }

        .dashboard-container[data-theme="light"] {
          --bg-primary: #f8fafc;
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
          --accent-color: #3b82f6;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .dashboard-title {
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

        .logout-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        .dashboard-main {
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          padding: 1.5rem 1.5rem 0;
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .card-content {
          padding: 1.5rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .value {
          font-weight: 600;
        }

        .address {
          font-family: 'Courier New', monospace;
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }

        .balance-display {
          text-align: center;
          margin-bottom: 1rem;
        }

        .balance-amount {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-color);
        }

        .balance-currency {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .balance-usd {
          text-align: center;
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .action-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          padding: 1.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .action-btn:hover {
          background: var(--accent-color);
          color: white;
          transform: translateY(-2px);
        }

        .action-icon {
          font-size: 1.5rem;
        }

        .network-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .status-indicator {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .status-indicator.online {
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .network-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-online {
          color: #10b981;
          font-weight: 600;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 1rem;
        }

        .spinner {
          width: 3rem;
          height: 3rem;
          border: 3px solid var(--border-color);
          border-top: 3px solid var(--accent-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1rem;
          }
          
          .dashboard-main {
            padding: 1rem;
            grid-template-columns: 1fr;
          }
          
          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default dynamic(() => Promise.resolve(DashboardComponent), {
  ssr: false,
})
