// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login', // tu ruta personalizada
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // if (isOnDashboard) {
      //   return isLoggedIn;
      // }

      // Si ya está logueado y va a la home, lo mandamos al dashboard
      if (isLoggedIn && nextUrl.pathname === '/') {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  providers: [], // <- completado dinámicamente desde auth.ts
} satisfies NextAuthConfig;
