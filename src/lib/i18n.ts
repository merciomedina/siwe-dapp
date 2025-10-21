// src/lib/i18n.ts
export type Language = 'pt' | 'en'

export interface Translations {
  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    confirm: string
    back: string
    next: string
    close: string
  }
  
  // Navigation
  nav: {
    home: string
    login: string
    dashboard: string
    logout: string
  }
  
  // Login page
  login: {
    title: string
    subtitle: string
    connectWallet: string
    connectWalletMetaMask: string
    walletNotFound: string
    walletNotFoundDesc: string
    installMetaMask: string
    reloadPage: string
    signAndLogin: string
    connectError: string
    error: string
    debugInfo: string
    connected: string
    disconnect: string
    connecting: string
  }
  
  // Dashboard
  dashboard: {
    title: string
    walletInfo: string
    address: string
    network: string
    balance: string
    quickActions: string
    send: string
    receive: string
    swap: string
    history: string
    networkStatus: string
    connectedTo: string
    chainId: string
    status: string
    online: string
    loading: string
  }
  
  // Home page
  home: {
    title: string
    subtitle: string
    description: string
    getStarted: string
    features: {
      title: string
      auth: {
        title: string
        desc: string
      }
      wallet: {
        title: string
        desc: string
      }
      modern: {
        title: string
        desc: string
      }
      secure: {
        title: string
        desc: string
      }
    }
  }
  
  // Network names
  networks: {
    ethereum: string
    sepolia: string
    unknown: string
  }
}

export const translations: Record<Language, Translations> = {
  pt: {
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      back: 'Voltar',
      next: 'Próximo',
      close: 'Fechar'
    },
    nav: {
      home: 'Início',
      login: 'Entrar',
      dashboard: 'Dashboard',
      logout: 'Sair'
    },
    login: {
      title: 'Login Web3',
      subtitle: 'Conecte sua carteira e entre com segurança',
      connectWallet: 'Conectar carteira',
      connectWalletMetaMask: 'Conectar carteira (MetaMask)',
      walletNotFound: '🔗 Carteira não encontrada',
      walletNotFoundDesc: 'Para usar esta aplicação, você precisa de uma carteira Web3 instalada.',
      installMetaMask: '📥 Instalar MetaMask',
      reloadPage: '🔄 Recarregar página',
      signAndLogin: 'Assinar e entrar (SIWE)',
      connectError: 'Erro de Conexão',
      error: 'Erro',
      debugInfo: 'Informações de Debug',
      connected: 'Conectado',
      disconnect: 'Desconectar',
      connecting: 'Conectando...'
    },
    dashboard: {
      title: 'Web3 Dashboard',
      walletInfo: '💼 Informações da Carteira',
      address: 'Endereço',
      network: 'Rede',
      balance: '💰 Saldo',
      quickActions: '⚡ Ações Rápidas',
      send: 'Enviar',
      receive: 'Receber',
      swap: 'Trocar',
      history: 'Histórico',
      networkStatus: '🌐 Status da Rede',
      connectedTo: 'Conectado à',
      chainId: 'Chain ID',
      status: 'Status',
      online: 'Online',
      loading: 'Carregando sessão...'
    },
    home: {
      title: 'Bem-vindo ao SIWE DApp',
      subtitle: 'Autenticação Web3 Descentralizada',
      description: 'Conecte sua carteira, assine uma mensagem e acesse um dashboard moderno com suas informações on-chain.',
      getStarted: 'Começar Agora',
      features: {
        title: 'Funcionalidades',
        auth: {
          title: '🔐 Autenticação SIWE',
          desc: 'Login seguro usando assinatura de mensagem Ethereum'
        },
        wallet: {
          title: '👛 Integração de Carteira',
          desc: 'Suporte completo para MetaMask e carteiras injetadas'
        },
        modern: {
          title: '🎨 Interface Moderna',
          desc: 'Dashboard responsivo com tema dark/light'
        },
        secure: {
          title: '🔒 Sessões Seguras',
          desc: 'Gerenciamento de sessão com NextAuth'
        }
      }
    },
    networks: {
      ethereum: 'Ethereum Mainnet',
      sepolia: 'Sepolia Testnet',
      unknown: 'Rede Desconhecida'
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      close: 'Close'
    },
    nav: {
      home: 'Home',
      login: 'Login',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    login: {
      title: 'Web3 Login',
      subtitle: 'Connect your wallet and sign in securely',
      connectWallet: 'Connect wallet',
      connectWalletMetaMask: 'Connect wallet (MetaMask)',
      walletNotFound: '🔗 Wallet not found',
      walletNotFoundDesc: 'To use this application, you need a Web3 wallet installed.',
      installMetaMask: '📥 Install MetaMask',
      reloadPage: '🔄 Reload page',
      signAndLogin: 'Sign and login (SIWE)',
      connectError: 'Connection Error',
      error: 'Error',
      debugInfo: 'Debug Info',
      connected: 'Connected',
      disconnect: 'Disconnect',
      connecting: 'Connecting...'
    },
    dashboard: {
      title: 'Web3 Dashboard',
      walletInfo: '💼 Wallet Information',
      address: 'Address',
      network: 'Network',
      balance: '💰 Balance',
      quickActions: '⚡ Quick Actions',
      send: 'Send',
      receive: 'Receive',
      swap: 'Swap',
      history: 'History',
      networkStatus: '🌐 Network Status',
      connectedTo: 'Connected to',
      chainId: 'Chain ID',
      status: 'Status',
      online: 'Online',
      loading: 'Loading session...'
    },
    home: {
      title: 'Welcome to SIWE DApp',
      subtitle: 'Decentralized Web3 Authentication',
      description: 'Connect your wallet, sign a message, and access a modern dashboard with your on-chain information.',
      getStarted: 'Get Started',
      features: {
        title: 'Features',
        auth: {
          title: '🔐 SIWE Authentication',
          desc: 'Secure login using Ethereum message signing'
        },
        wallet: {
          title: '👛 Wallet Integration',
          desc: 'Full support for MetaMask and injected wallets'
        },
        modern: {
          title: '🎨 Modern Interface',
          desc: 'Responsive dashboard with dark/light theme'
        },
        secure: {
          title: '🔒 Secure Sessions',
          desc: 'Session management with NextAuth'
        }
      }
    },
    networks: {
      ethereum: 'Ethereum Mainnet',
      sepolia: 'Sepolia Testnet',
      unknown: 'Unknown Network'
    }
  }
}

export const getTranslations = (language: Language): Translations => {
  return translations[language]
}
