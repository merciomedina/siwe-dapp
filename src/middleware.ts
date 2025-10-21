// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (em produção, use Redis ou similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Limpar store a cada 5 minutos para evitar acúmulo
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

// Configurações de rate limiting
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  maxRequests: 50, // máximo 50 requests por IP
  authMaxRequests: 20, // máximo 20 tentativas de auth por IP
}

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Headers de segurança adicionais
  const response = NextResponse.next()
  
  // Previne clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Previne MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Política de referrer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Previne XSS
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
