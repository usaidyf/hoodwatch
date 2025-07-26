import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { findUserByEmail } from '@/app/lib/data';

export const { auth, signIn, signOut } = NextAuth({
   ...authConfig,
   session: { strategy: 'jwt' },
   trustHost: true,
   useSecureCookies: true,
   cookies: {
      sessionToken: {
         // prod uses the secure cookie, dev falls back to plain HTTP
         name: process.env.NODE_ENV === 'production'
            ? '__Secure-authjs.session-token'
            : 'authjs.session-token',
         options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
         },
      },
   },
   providers: [
      Credentials({
         /* fields rendered on the default sign-in page
            won’t be used in the custom page, but required */
         credentials: { email: {}, password: {} },

         async authorize(raw) {
            /* validate shape ─────────────────────────────── */
            const creds = z.object({
               email: z.email(),
               password: z.string().min(8),
            }).safeParse(raw);
            if (!creds.success) return null;

            /* fetch user ─────────────────────────────────── */
            const user = await findUserByEmail(creds.data.email);
            if (!user) return null;

            /* compare hashes ─────────────────────────────── */
            const ok = await bcryptjs.compare(creds.data.password, user.password);
            if (!ok) return null;

            /* return minimal user object ─────────────────── */
            return { id: user.id, full_name: user.full_name, email: user.email };
         },
      }),
   ],
});
