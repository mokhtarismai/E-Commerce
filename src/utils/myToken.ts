import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function myToken() {
  const mycookies = await cookies();

  // 1. هات الـ Token مع مراعاة اسم الكوكيز في الـ Production (ببيكون اسمه __Secure-...)
  const tokenfromcookies =
    mycookies.get("next-auth.session-token")?.value ||
    mycookies.get("__Secure-next-auth.session-token")?.value;

  console.log("Token from cookies:", tokenfromcookies);

  // 2. لو مفيش Token، ارجع null فوراً بدل ما تبعت لـ decode وتعمل Error
  if (!tokenfromcookies) {
    console.warn("No token found in cookies");
    return null;
  }

  try {
    // 3. فك التشفير باستخدام الـ Secret
    const myTokenAfterdecode = await decode({
      token: tokenfromcookies,
      secret: process.env.NEXTAUTH_SECRET!, // تأكد إن ده موجود في الـ .env
    });

    if (myTokenAfterdecode && myTokenAfterdecode.realTokenFromBackEnd) {
      console.log("Decoded Token:", myTokenAfterdecode.realTokenFromBackEnd);
      return myTokenAfterdecode.realTokenFromBackEnd;
    }

    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
