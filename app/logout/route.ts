import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(
   _req: Request
) {
   const jar = await cookies();
   jar.set('__Secure-authjs.session-token', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(0),
   })
   jar.set('authjs.session-token', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      expires: new Date(0),
   })

   return NextResponse.json({ redirect: true }, { status: 200 })
}