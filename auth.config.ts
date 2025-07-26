import type { NextAuthConfig, Session } from 'next-auth';

export const authConfig = {
   pages: { signIn: '/login' },

   callbacks: {
      async jwt({ token }) {
         return token;
      },
      async session({ session }: { session: Session }) {
         return session;
      },
      authorized({ auth, request: { nextUrl } }) {
         const pathname = nextUrl.pathname;     // '/login', '/dashboard', …

         /* ── decide what is protected or special ─────────────────── */
         const isLoggedIn = !!auth?.user;
         const isLoginPage = pathname === '/login' || pathname === '/login/';
         const isDashboard = pathname.startsWith('/dashboard');

         /* protect the dashboard */
         if (isDashboard) return isLoggedIn;    // ⇢ false → 302 to /login by Middleware

         /* bounce an already-signed-in user only when they visit /login */
         if (isLoginPage && isLoggedIn) {
            return Response.redirect(new URL(`/dashboard`, nextUrl));
         }

         /* everything else is public */
         return true;
      },
   },

   providers: [],    // filled in auth.ts
} satisfies NextAuthConfig;
