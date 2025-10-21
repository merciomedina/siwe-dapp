// src/middleware.ts
import { NextResponse } from 'next/server'

export function middleware() {
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
    // Desabilitado temporariamente para debug
    // '/api/:path*',
    // '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
