import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.toLowerCase();
  
  const isPublicPath = ['/login', '/signup', '/forgot-password'].includes(path);
  const isApiPath = path.startsWith('/api/');
  
  const token = request.cookies.get('token')?.value;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/tradecommodities', request.url));
  }

  if (!isPublicPath && !isApiPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  
  return response;
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/tradecommodities/:path*',
    '/profilesetup/:path*',
    '/api/auth/:path*'
  ]
};
