import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    
    const protectedRoutes = ['/profile', '/wishlist', '/allorders', '/checkout']
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
    
    if (isProtected) {
        const sessionToken = 
            req.cookies.get('__Secure-next-auth.session-token')?.value ||
            req.cookies.get('next-auth.session-token')?.value

        if (!sessionToken) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        const sessionToken = 
            req.cookies.get('__Secure-next-auth.session-token')?.value ||
            req.cookies.get('next-auth.session-token')?.value

        if (sessionToken) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/login',
        '/register',
        '/wishlist/:path*',
        '/wishlist',
        '/allorders/:path*',
        '/allorders',
        '/checkout',
    ]
}