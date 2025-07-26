import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PROTECTED = /^\/dashboard(\/|$)/;

export default auth((req) => {
   const { pathname, origin } = req.nextUrl;

   // If this is a /dashboard URL, enforce authentication.
   //
   if (PROTECTED.test(pathname)) {
      if (!req.auth) {
         // If the user is not logged in, redirect to the login page.
         return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, origin)
         );
      }

      // Else allow the request to continue.
      return NextResponse.next();
   }

   // Everything else just continues normally.
   //
   return NextResponse.next();
});

export const config = {
   matcher: [
      // We removed "dashboard” from this list so that /dashboard… actually runs
      // through the middleware. Everything else (except _next, favicon, seed, logout, api/auth)
      // still matches.
      "/((?!_next|favicon.ico|seed|logout|api/auth).*)",
   ],
};
