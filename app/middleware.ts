
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const isLoggedIn = Boolean(request.cookies.get('session'));

  if (!isLoggedIn && (pathname === '/execute' || pathname === '/workflow')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && pathname === '/') {
    url.pathname = '/workflow';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/execute', '/workflow', '/'],
};
