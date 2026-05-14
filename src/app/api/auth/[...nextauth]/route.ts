import { nextauthconfig } from "@/lib/nextauth.cofig";
import NextAuth from "next-auth";
const handler = NextAuth(nextauthconfig);

export { handler as GET, handler as POST };