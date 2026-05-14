"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    // متبعتش أي props هنا إلا لو محتاجها فعلاً
    <SessionProvider refetchOnWindowFocus={true}> 
      {children}
    </SessionProvider>
  );
}