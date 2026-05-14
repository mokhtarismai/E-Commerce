import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextauthconfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "FreshCart",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );

        const FinalRes = await res.json();

        if (res.ok && FinalRes.message === "success") {
          return {
            id: FinalRes.user._id,
            name: FinalRes.user.name,
            email: FinalRes.user.email,
            realTokenFromBackEnd: FinalRes.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.realTokenFromBackEnd = (
          params.user as any
        ).realTokenFromBackEnd;
      }

      console.log("params from jwt", params);
      return params.token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session as any).token = token.realTokenFromBackEnd;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
