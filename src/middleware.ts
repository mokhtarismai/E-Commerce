import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: '/login',
    },
})

export const config = {
    matcher: [
        '/profile/:path*',
        '/wishlist/:path*',
        '/wishlist',
        '/orders/:path*',
        '/order',
        '/checkout',
    ]
}