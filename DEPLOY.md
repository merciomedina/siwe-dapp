# Deploy no Vercel - Configuração

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no painel do Vercel:

### 1. NEXTAUTH_URL
```
https://siwe-dapp-o7uziweqw-mercios-projects-24963103.vercel.app
```

### 2. NEXTAUTH_SECRET
Gere uma chave secreta segura:
```bash
openssl rand -base64 32
```

### 3. NEXT_PUBLIC_BASE_URL
```
https://siwe-dapp-o7uziweqw-mercios-projects-24963103.vercel.app
```

### 4. ALCHEMY_API_KEY
Sua chave da API do Alchemy para Ethereum.

## Como Configurar no Vercel

1. Acesse o painel do Vercel
2. Vá para o projeto `siwe-dapp`
3. Clique em **Settings** > **Environment Variables**
4. Adicione cada variável:
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://siwe-dapp-o7uziweqw-mercios-projects-24963103.vercel.app`
   - **Environment**: Production, Preview, Development

5. Repita para todas as variáveis

## Após Configurar

1. Faça um novo deploy
2. Teste a funcionalidade de login
3. Verifique os logs do Vercel se houver problemas

## Troubleshooting

Se ainda houver problemas:

1. Verifique se todas as variáveis estão configuradas
2. Verifique os logs do Vercel
3. Teste localmente com as mesmas variáveis
4. Verifique se o domínio está correto em todas as validações
