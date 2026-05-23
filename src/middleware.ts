import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminAuthCookie = request.cookies.get('admin_auth')?.value;
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminPath && !adminAuthCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
