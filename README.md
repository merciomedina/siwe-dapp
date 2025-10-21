# 🚀 SIWE DApp - Web3 Authentication & Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-2.12-purple?style=for-the-badge&logo=ethereum)](https://wagmi.sh/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4-green?style=for-the-badge)](https://next-auth.js.org/)

---

## 🇧🇷 Português

### 📖 Sobre o Projeto

Uma aplicação Web3 moderna que implementa autenticação descentralizada usando **Sign-In with Ethereum (SIWE)** com um dashboard elegante e responsivo. Esta aplicação demonstra as melhores práticas para integração de carteiras Web3, autenticação segura e interface de usuário moderna.

### ✨ Funcionalidades

- 🔐 **Autenticação SIWE**: Login seguro usando assinatura de mensagem Ethereum
- 👛 **Integração de Carteira**: Suporte completo para MetaMask e carteiras injetadas
- 🎨 **Interface Moderna**: Dashboard responsivo com tema dark/light
- 🌐 **Multi-rede**: Suporte para Ethereum Mainnet e Sepolia Testnet
- 💰 **Saldo em Tempo Real**: Visualização de saldo ETH via wagmi
- 🔒 **Sessões Seguras**: Gerenciamento de sessão com NextAuth
- 📱 **Responsivo**: Design otimizado para desktop e mobile
- 🌍 **Multi-idioma**: Suporte completo para Português e Inglês
- 🎭 **Tema Dinâmico**: Alternância entre modo claro e escuro
- 🚀 **UX Moderna**: Interface inspirada nas melhores práticas de Web3
- 📋 **Roadmap Claro**: Estrutura preparada para futuras funcionalidades Web3
- 🔒 **Segurança Robusta**: Headers de segurança, rate limiting e validações rigorosas

### 🛠️ Stack Tecnológica

- **Frontend**: Next.js 14 (Pages Router) + TypeScript
- **Autenticação**: NextAuth.js + SIWE (EIP-4361)
- **Web3**: Wagmi v2.12 + Viem v2.12
- **Estilização**: CSS-in-JS com styled-jsx
- **Carteiras**: MetaMask e carteiras injetadas
- **Redes**: Ethereum Mainnet + Sepolia Testnet

### 🚀 Como Executar

#### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- MetaMask ou carteira Web3

#### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd siwe-dapp

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env.example .env.local
```

#### Configuração do .env.local

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu_secret_super_seguro_aqui
ALCHEMY_API_KEY=sua_chave_alchemy_opcional
```

#### Executar em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 📱 Como Usar

1. **Instalar Carteira**: Se não tiver MetaMask, a aplicação fornecerá instruções
2. **Conectar**: Clique em "Conectar carteira" e autorize a conexão
3. **Autenticar**: Assine a mensagem SIWE para fazer login
4. **Dashboard**: Explore seu saldo e informações da carteira
5. **Tema**: Use o botão 🌙/☀️ para alternar entre dark/light mode
6. **Idioma**: Use o botão 🇧🇷/🇺🇸 para alternar entre português e inglês

### 🎨 Interface Moderna

A aplicação foi redesenhada com foco na experiência do usuário:

- **Página Inicial**: Hero section com animações e seção de funcionalidades
- **Login**: Interface intuitiva com detecção automática de carteira
- **Dashboard**: Cards organizados com informações em tempo real
- **Responsivo**: Design adaptável para todos os dispositivos
- **Acessibilidade**: Contraste adequado e navegação por teclado

### 📋 Status do Projeto

**Fase 1 - Autenticação e Interface Base (Atual)**
- ✅ Sistema de autenticação SIWE completo
- ✅ Interface moderna e responsiva
- ✅ Suporte multi-idioma (PT/EN)
- ✅ Temas dark/light
- ✅ Integração com carteiras Web3
- 🔄 **Quick Actions**: Seção preparada para futuras funcionalidades (Enviar, Receber, Trocar, Histórico)

**Próximas Fases Planejadas:**
- 📤 **Envio de Transações**: Implementação de transferências ETH
- 📥 **Recebimento**: QR Code e endereços de recebimento
- 🔄 **Swap de Tokens**: Integração com DEXs
- 📊 **Histórico**: Visualização de transações on-chain
- 🎯 **NFTs**: Suporte para visualização de coleções

### 🔒 Segurança

O projeto implementa múltiplas camadas de segurança:

- **Headers de Segurança**: X-Frame-Options, CSP, HSTS, etc.
- **Rate Limiting**: Proteção contra ataques de força bruta
- **Validação SIWE**: Verificações rigorosas de assinatura e domínio
- **Validação de Entrada**: Sanitização e validação de todos os dados
- **Logs de Segurança**: Monitoramento de tentativas de autenticação
- **Proteção CSRF**: Tokens únicos para cada sessão

Para mais detalhes, consulte o arquivo [SECURITY.md](./SECURITY.md).

### 🎓 Objetivo Educacional

Este projeto faz parte de uma jornada de aprendizado em desenvolvimento Web3. A **Fase 1** foca na implementação de autenticação descentralizada e interface moderna, estabelecendo uma base sólida para futuras funcionalidades.

**Evolução Planejada:**
- **Fase 1** (Atual): Autenticação SIWE + Interface base
- **Fase 2**: Transações e operações básicas
- **Fase 3**: DeFi e integrações avançadas
- **Fase 4**: NFTs e funcionalidades premium

### 🏗️ Arquitetura

```
src/
├── pages/
│   ├── index.tsx          # Página inicial moderna
│   ├── login.tsx          # Autenticação SIWE
│   ├── dashboard.tsx      # Dashboard principal
│   └── api/
│       └── auth/
│           └── [...nextauth].ts  # Configuração NextAuth
├── lib/
│   ├── wagmi.ts           # Configuração Wagmi
│   └── i18n.ts            # Sistema de internacionalização
├── hooks/
│   ├── useSessionGuard.ts # Hook de proteção de rota
│   └── useLanguage.ts     # Hook de gerenciamento de idioma
└── types/
    └── next-auth.d.ts     # Tipos NextAuth estendidos
```

### 🔧 Configurações Avançadas

#### Adicionando Novas Redes

```typescript
// src/lib/wagmi.ts
import { polygon, arbitrum } from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  // ... resto da configuração
})
```

#### Personalizando o Dashboard

O dashboard é totalmente customizável através dos estilos CSS-in-JS. Modifique as variáveis CSS para personalizar cores e temas.

#### Adicionando Novos Idiomas

Para adicionar um novo idioma, edite o arquivo `src/lib/i18n.ts`:

```typescript
// Adicione o novo idioma ao tipo Language
export type Language = 'pt' | 'en' | 'es' // exemplo: espanhol

// Adicione as traduções
export const translations: Record<Language, Translations> = {
  // ... idiomas existentes
  es: {
    // ... traduções em espanhol
  }
}
```

---

## 🇺🇸 English

### 📖 About the Project

A modern Web3 application implementing decentralized authentication using **Sign-In with Ethereum (SIWE)** with an elegant and responsive dashboard. This application demonstrates best practices for Web3 wallet integration, secure authentication, and modern user interface design.

### ✨ Features

- 🔐 **SIWE Authentication**: Secure login using Ethereum message signing
- 👛 **Wallet Integration**: Full support for MetaMask and injected wallets
- 🎨 **Modern Interface**: Responsive dashboard with dark/light theme
- 🌐 **Multi-chain**: Support for Ethereum Mainnet and Sepolia Testnet
- 💰 **Real-time Balance**: ETH balance visualization via wagmi
- 🔒 **Secure Sessions**: Session management with NextAuth
- 📱 **Responsive**: Design optimized for desktop and mobile
- 🌍 **Multi-language**: Full support for Portuguese and English
- 🎭 **Dynamic Theme**: Toggle between light and dark modes
- 🚀 **Modern UX**: Interface inspired by Web3 best practices
- 📋 **Clear Roadmap**: Structure prepared for future Web3 features
- 🔒 **Robust Security**: Security headers, rate limiting and rigorous validations

### 🛠️ Tech Stack

- **Frontend**: Next.js 14 (Pages Router) + TypeScript
- **Authentication**: NextAuth.js + SIWE (EIP-4361)
- **Web3**: Wagmi v2.12 + Viem v2.12
- **Styling**: CSS-in-JS with styled-jsx
- **Wallets**: MetaMask and injected wallets
- **Networks**: Ethereum Mainnet + Sepolia Testnet

### 🚀 Getting Started

#### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or Web3 wallet

#### Installation

```bash
# Clone the repository
git clone <repository-url>
cd siwe-dapp

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
```

#### .env.local Configuration

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secure_secret_here
ALCHEMY_API_KEY=your_optional_alchemy_key
```

#### Run in Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 📱 How to Use

1. **Install Wallet**: If you don't have MetaMask, the app will provide instructions
2. **Connect**: Click "Connect wallet" and authorize the connection
3. **Authenticate**: Sign the SIWE message to log in
4. **Dashboard**: Explore your balance and wallet information
5. **Theme**: Use the 🌙/☀️ button to toggle between dark/light mode
6. **Language**: Use the 🇧🇷/🇺🇸 button to toggle between Portuguese and English

### 🎨 Modern Interface

The application has been redesigned with a focus on user experience:

- **Home Page**: Hero section with animations and features section
- **Login**: Intuitive interface with automatic wallet detection
- **Dashboard**: Organized cards with real-time information
- **Responsive**: Design adaptable for all devices
- **Accessibility**: Proper contrast and keyboard navigation

### 📋 Project Status

**Phase 1 - Authentication and Base Interface (Current)**
- ✅ Complete SIWE authentication system
- ✅ Modern and responsive interface
- ✅ Multi-language support (PT/EN)
- ✅ Dark/light themes
- ✅ Web3 wallet integration
- 🔄 **Quick Actions**: Section prepared for future features (Send, Receive, Swap, History)

**Planned Next Phases:**
- 📤 **Transaction Sending**: ETH transfer implementation
- 📥 **Receiving**: QR Code and receiving addresses
- 🔄 **Token Swapping**: DEX integration
- 📊 **History**: On-chain transaction visualization
- 🎯 **NFTs**: Collection viewing support

### 🔒 Security

The project implements multiple security layers:

- **Security Headers**: X-Frame-Options, CSP, HSTS, etc.
- **Rate Limiting**: Protection against brute force attacks
- **SIWE Validation**: Rigorous signature and domain verification
- **Input Validation**: Sanitization and validation of all data
- **Security Logs**: Authentication attempt monitoring
- **CSRF Protection**: Unique tokens for each session

For more details, see the [SECURITY.md](./SECURITY.md) file.

### 🎓 Educational Purpose

This project is part of a Web3 development learning journey. **Phase 1** focuses on implementing decentralized authentication and modern interface, establishing a solid foundation for future features.

**Planned Evolution:**
- **Phase 1** (Current): SIWE Authentication + Base interface
- **Phase 2**: Transactions and basic operations
- **Phase 3**: DeFi and advanced integrations
- **Phase 4**: NFTs and premium features

### 🏗️ Architecture

```
src/
├── pages/
│   ├── index.tsx          # Modern home page
│   ├── login.tsx          # SIWE authentication
│   ├── dashboard.tsx      # Main dashboard
│   └── api/
│       └── auth/
│           └── [...nextauth].ts  # NextAuth configuration
├── lib/
│   ├── wagmi.ts           # Wagmi configuration
│   └── i18n.ts            # Internationalization system
├── hooks/
│   ├── useSessionGuard.ts # Route protection hook
│   └── useLanguage.ts     # Language management hook
└── types/
    └── next-auth.d.ts     # Extended NextAuth types
```

### 🔧 Advanced Configuration

#### Adding New Networks

```typescript
// src/lib/wagmi.ts
import { polygon, arbitrum } from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  // ... rest of configuration
})
```

#### Customizing the Dashboard

The dashboard is fully customizable through CSS-in-JS styles. Modify CSS variables to customize colors and themes.

#### Adding New Languages

To add a new language, edit the `src/lib/i18n.ts` file:

```typescript
// Add the new language to the Language type
export type Language = 'pt' | 'en' | 'es' // example: Spanish

// Add the translations
export const translations: Record<Language, Translations> = {
  // ... existing languages
  es: {
    // ... Spanish translations
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [SIWE Specification](https://eips.ethereum.org/EIPS/eip-4361)
- [Wagmi Documentation](https://wagmi.sh/)
- [NextAuth Documentation](https://next-auth.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Built with ❤️ for the Web3 community**