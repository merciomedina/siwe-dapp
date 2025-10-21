// src/pages/api/health.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      nextAuthUrl: process.env.NEXTAUTH_URL ? 'Set' : 'Missing',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
      publicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL ? 'Set' : 'Missing',
      alchemyKey: process.env.ALCHEMY_API_KEY ? 'Set' : 'Missing',
    })
  } catch (error) {
    console.error('Health check error:', error)
    res.status(500).json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
}
