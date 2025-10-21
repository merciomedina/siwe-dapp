import { useLanguage } from '@/hooks/useLanguage'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const { language, translations, toggleLanguage } = useLanguage()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light')
  }

    return (
    <div className="home-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      {/* Header */}
      <header className="home-header">
        <div className="header-left">
          <h1 className="home-title">
            <span className="wallet-icon">🔐</span>
            SIWE DApp
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

      {/* Hero Section */}
      <main className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{translations.home.title}</h1>
            <h2 className="hero-subtitle">{translations.home.subtitle}</h2>
            <p className="hero-description">{translations.home.description}</p>
            <Link href="/login" className="cta-button">
              {translations.home.getStarted}
            </Link>
          </div>
          <div className="hero-visual">
            <div className="wallet-animation">
              <div className="wallet-icon-large">🔐</div>
              <div className="connection-lines">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
              </div>
              <div className="blockchain-icon">⛓️</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="features-title">{translations.home.features.title}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>{translations.home.features.auth.title}</h3>
              <p>{translations.home.features.auth.desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👛</div>
              <h3>{translations.home.features.wallet.title}</h3>
              <p>{translations.home.features.wallet.desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>{translations.home.features.modern.title}</h3>
              <p>{translations.home.features.modern.desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>{translations.home.features.secure.title}</h3>
              <p>{translations.home.features.secure.desc}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .home-container[data-theme="dark"] {
          --bg-primary: #0a0a0a;
          --bg-secondary: #1a1a1a;
          --bg-card: #2a2a2a;
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --border-color: #333333;
          --accent-color: #6366f1;
        }

        .home-container[data-theme="light"] {
          --bg-primary: #f8fafc;
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
          --accent-color: #3b82f6;
        }

        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .home-title {
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

        .home-main {
          padding: 0;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          text-align: left;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0 0 1rem 0;
          background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: var(--text-secondary);
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0 0 2.5rem 0;
          color: var(--text-secondary);
        }

        .cta-button {
          display: inline-block;
          background: var(--accent-color);
          color: white;
          text-decoration: none;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.3);
        }

        .cta-button:hover {
          background: var(--accent-color);
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px 0 rgba(99, 102, 241, 0.4);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wallet-animation {
          position: relative;
          width: 300px;
          height: 300px;
        }

        .wallet-icon-large {
          font-size: 6rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: float 3s ease-in-out infinite;
        }

        .blockchain-icon {
          font-size: 4rem;
          position: absolute;
          top: 20%;
          right: 20%;
          animation: pulse 2s ease-in-out infinite;
        }

        .connection-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .line {
          position: absolute;
          background: var(--accent-color);
          opacity: 0.3;
          animation: draw 2s ease-in-out infinite;
        }

        .line-1 {
          width: 2px;
          height: 100px;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0s;
        }

        .line-2 {
          width: 100px;
          height: 2px;
          top: 50%;
          left: 30%;
          animation-delay: 0.5s;
        }

        .line-3 {
          width: 2px;
          height: 80px;
          top: 60%;
          right: 30%;
          animation-delay: 1s;
        }

        .features-section {
          padding: 4rem 2rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }

        .features-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 3rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes draw {
          0% { opacity: 0; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 1rem;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.25rem;
          }

          .wallet-animation {
            width: 200px;
            height: 200px;
          }

          .wallet-icon-large {
            font-size: 4rem;
          }

          .blockchain-icon {
            font-size: 3rem;
          }

          .features-section {
            padding: 2rem 1rem;
          }

          .features-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
      </div>
    )
  }
  