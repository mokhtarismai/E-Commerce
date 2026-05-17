import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    if (!jwt && (
        pathname.startsWith('/profile') || 
        pathname.startsWith('/orders') ||
        pathname.startsWith('/checkout') ||
        pathname.startsWith('/order')
    )) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (jwt && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/login',
        '/register',
        '/orders/:path*',
        '/order',
        '/checkout',
    ]
}