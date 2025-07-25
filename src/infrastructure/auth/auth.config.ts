import type { NextAuthConfig } from "next-auth";
import { NextResponse } from 'next/server';
import Credentials from "next-auth/providers/credentials" 
 
export const protectedRoutes = [
  '/cart',
  '/checkout',
  '/account',
  '/manager'
]

export const authConfig = {
  pages: { signIn: '/login' },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = protectedRoutes
        .some((route) => nextUrl.pathname.startsWith(route));
      const isOnLoginPage = nextUrl.pathname === '/login';

      if (isOnProtectedRoute) return isLoggedIn;

      if (isLoggedIn && isOnLoginPage)
        return NextResponse.redirect(new URL('/', nextUrl));

      return true;
    },
  },

  providers: [Credentials], 
} satisfies NextAuthConfig;
