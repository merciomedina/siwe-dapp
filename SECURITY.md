# 🔒 Security Guide - SIWE DApp

## Implemented Security Measures

### 1. **Headers de Segurança**
- `X-Frame-Options: DENY` - Previne clickjacking
- `X-Content-Type-Options: nosniff` - Previne MIME sniffing
- `X-XSS-Protection: 1; mode=block` - Proteção XSS
- `Strict-Transport-Security` - Força HTTPS
- `Content-Security-Policy` - Política de conteúdo restritiva
- `Referrer-Policy` - Controle de referrer
- `Permissions-Policy` - Controle de permissões

### 2. **Validação SIWE Robusta**
- ✅ Validação de endereço Ethereum (formato 0x...)
- ✅ Validação de chain ID (apenas redes suportadas)
- ✅ Validação de domínio/URI
- ✅ Validação de nonce (CSRF protection)
- ✅ Validação de timestamp (mensagens não podem ser muito antigas)
- ✅ Validação de tamanho de entrada
- ✅ Verificação de assinatura criptográfica

### 3. **Rate Limiting**
- ✅ Limite de 5 tentativas de autenticação por IP (15 min)
- ✅ Limite de 10 requests por IP para API (15 min)
- ✅ Middleware de proteção contra força bruta

### 4. **Validação de Domínio**
- ✅ Lista de domínios permitidos
- ✅ Validação de origin/host headers
- ✅ Rejeição de domínios não autorizados em produção

### 5. **Logs de Segurança**
- ✅ Logs de tentativas de autenticação
- ✅ Logs de falhas de validação
- ✅ Logs de sucesso (sem dados sensíveis)

### 6. **Proteção de Dados**
- ✅ Variáveis de ambiente protegidas (.env.local no .gitignore)
- ✅ Secrets não expostos no código
- ✅ Validação de entrada em todas as APIs

## Configuração para Produção

### 1. **Variáveis de Ambiente**
```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_super_secure_secret_here
NODE_ENV=production
```

### 2. **Domínios Permitidos**
Atualize as listas de domínios permitidos em:
- `src/pages/api/auth/[...nextauth].ts` (função `getOriginSafe`)
- `src/pages/login.tsx` (array `allowedOrigins`)

### 3. **Headers de Segurança**
Os headers estão configurados em `next.config.ts` e `src/middleware.ts`.

### 4. **Rate Limiting**
Para produção, considere usar Redis para armazenar os dados de rate limiting:
```typescript
// Exemplo com Redis (implementar conforme necessário)
import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)
```

## Checklist de Segurança

### ✅ Implementado
- [x] Headers de segurança
- [x] Validação SIWE robusta
- [x] Rate limiting
- [x] Validação de domínio
- [x] Logs de segurança
- [x] Proteção de dados sensíveis
- [x] Validação de entrada
- [x] CSRF protection

### 🔄 Recomendações Futuras
- [ ] Implementar Redis para rate limiting
- [ ] Adicionar monitoramento de segurança
- [ ] Implementar 2FA para operações sensíveis
- [ ] Adicionar auditoria de logs
- [ ] Implementar backup de chaves
- [ ] Adicionar testes de segurança automatizados

## Vulnerabilidades Conhecidas

### ⚠️ Limitações Atuais
1. **Rate Limiting em Memória**: Em produção, use Redis
2. **Logs Locais**: Implemente sistema de logs centralizado
3. **Monitoramento**: Adicione alertas de segurança

### 🛡️ Mitigações
- Rate limiting básico implementado
- Logs estruturados para análise
- Validações múltiplas em cada camada

## Contato de Segurança

Para reportar vulnerabilidades de segurança, entre em contato através de:
- Email: security@yourdomain.com
- GitHub Issues (para bugs não críticos)

## Atualizações de Segurança

Este documento deve ser atualizado sempre que:
- Novas vulnerabilidades forem descobertas
- Novas medidas de segurança forem implementadas
- Dependências forem atualizadas
- Configurações de produção forem alteradas

---

**Última atualização**: $(date)
**Versão**: 1.0.0
