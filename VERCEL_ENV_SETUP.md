# Configuração de Variáveis de Ambiente no Vercel

## ✅ Variáveis Já Configuradas
- `NODE_ENV`: `production`
- `NEXTAUTH_URL`: `https://siwe-dapp-o7uziweqw-me...`
- `NEXTAUTH_SECRET`: `qUP0aJ1hmfG10wsMwSyJASr5j/H1Z9uk...`

## ❌ Variáveis que Precisam ser Adicionadas

### 1. NEXT_PUBLIC_BASE_URL
- **Name**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://siwe-dapp-o7uziweqw-mercios-projects-24963103.vercel.app`
- **Scope**: All Environments

### 2. ALCHEMY_API_KEY
- **Name**: `ALCHEMY_API_KEY`
- **Value**: `[Sua chave da API do Alchemy]`
- **Scope**: All Environments

## Como Adicionar

1. Clique no botão **"Add Environment Variable"**
2. Preencha os campos:
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://siwe-dapp-o7uziweqw-mercios-projects-24963103.vercel.app`
   - **Environment**: All Environments
3. Clique em **Save**
4. Repita para `ALCHEMY_API_KEY`

## Após Adicionar

1. Faça um novo deploy (ou aguarde o deploy automático)
2. Teste a rota `/login`
3. Verifique se não há mais erros 500

## Obter Chave do Alchemy

1. Acesse [Alchemy.com](https://www.alchemy.com/)
2. Crie uma conta ou faça login
3. Crie um novo app
4. Copie a API Key
5. Adicione no Vercel
