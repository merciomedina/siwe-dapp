// src/pages/login-minimal.tsx
import { GetServerSideProps } from 'next'
import { getCsrfToken } from 'next-auth/react'

type Props = { csrfToken: string }

export default function LoginMinimal({ csrfToken }: Props) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Login Minimal Test</h1>
      <p>CSRF Token: {csrfToken ? 'Present' : 'Missing'}</p>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>NextAuth URL: {process.env.NEXTAUTH_URL ? 'Set' : 'Missing'}</p>
      <p>NextAuth Secret: {process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing'}</p>
      <p>Public Base URL: {process.env.NEXT_PUBLIC_BASE_URL ? 'Set' : 'Missing'}</p>
      <p>Alchemy Key: {process.env.ALCHEMY_API_KEY ? 'Set' : 'Missing'}</p>
      
      <h2>Test Links</h2>
      <ul>
        <li><a href="/api/auth/providers" target="_blank" rel="noopener noreferrer">NextAuth Providers</a></li>
        <li><a href="/api/auth/csrf" target="_blank" rel="noopener noreferrer">CSRF Token</a></li>
        <li><a href="/api/health" target="_blank" rel="noopener noreferrer">Health Check</a></li>
        <li><a href="/api/test" target="_blank" rel="noopener noreferrer">Test Endpoint</a></li>
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    console.log('getServerSideProps called')
    const csrfToken = await getCsrfToken(ctx)
    console.log('CSRF Token:', csrfToken ? 'Present' : 'Missing')
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
