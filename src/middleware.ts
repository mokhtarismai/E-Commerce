import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. اقرأ الـ Token مرة واحدة بس لكل الطلبات
  const sessionToken =
    req.cookies.get("_Secure-next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value;

  const protectedRoutes = ["/profile", "/wishlist", "/allorders", "/checkout"];
  
  // تحقق لو المسار الحالي محمي
  const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // لو المسار محمي واليوزر مش مسجل دخول -> واديه الـ login
  if (isProtected && !sessionToken) {
    // ميزة صايعة: بنحفظ هو كان رايح فين عشان نرجعه لنفس الصفحة بعد ما يعمل login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // لو رايح صفحات الـ Auth وهو مسجل دخول أصلاً -> رجعه للصفحة الرئيسية
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// 2. تنظيم الـ matcher بشكل احترافي ومختصر
export const config = {
  matcher: [
    "/profile/:path*",
    "/wishlist/:path*",
    "/allorders/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
};