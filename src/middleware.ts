import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { Roles } from '@domain/enums/roles';

const protectedRoutes = ['/profile', '/cart'];

const adminRoutes = ['/manager'];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (!isLoggedIn) {
    if (isOnProtectedRoute || isOnAdminRoute) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    return NextResponse.next();
  }

  if (isOnAdminRoute) {
    const response = await fetch(`${nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    });

    const session = await response.json();

    console.log(session.user);
    const userRole = session?.user?.role;

    if (userRole !== Roles.admin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/api/cart/:path',
  ],
};
