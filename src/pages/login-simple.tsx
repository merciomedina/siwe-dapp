// src/pages/login-simple.tsx
import { GetServerSideProps } from 'next'
import { getCsrfToken } from 'next-auth/react'

type Props = { csrfToken: string }

export default function LoginSimple({ csrfToken }: Props) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Login Simple Test</h1>
      <p>CSRF Token: {csrfToken ? 'Present' : 'Missing'}</p>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>NextAuth URL: {process.env.NEXTAUTH_URL ? 'Set' : 'Missing'}</p>
      <p>NextAuth Secret: {process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing'}</p>
      <p>Public Base URL: {process.env.NEXT_PUBLIC_BASE_URL ? 'Set' : 'Missing'}</p>
      <p>Alchemy Key: {process.env.ALCHEMY_API_KEY ? 'Set' : 'Missing'}</p>
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
