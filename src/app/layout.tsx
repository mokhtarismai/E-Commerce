import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import AuthProvider from "./_components/AuthProvider";
import ContextCart from "./_context/ContextCart";
import WishlistProvider from "./_context/WishlistContext";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart E-commerce Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${exo.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning={true}>
        <AuthProvider>
          {/* الـ Providers يفضل يكونوا فوق بعض والـ children في الآخر خالص جواهم */}
          <WishlistProvider>
            <ContextCart>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="grow">
                  {children}
                </main>
                <Toaster richColors position="top-right" /> {/* ضفتلك شوية تحسينات للـ toaster */}
                <Footer />
              </div>
            </ContextCart>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}