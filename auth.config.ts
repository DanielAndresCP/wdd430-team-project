// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn && nextUrl.pathname === '/') {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // guarda el role en el token
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string; 
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
