import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { createClient } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Online Grocery",
  description: "Your one-stop shop for fresh vegetables, fruits, cakes, and delicious biscuits.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  let cart: any[] = [];

  if (user) {
    const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = profileData;
    
    const { data: cartData } = await supabase.from('cart_items').select('quantity, products(*)').eq('user_id', user.id);
    if (cartData) {
      cart = cartData.map((c: any) => ({
        ...c.products,
        quantity: c.quantity
      }));
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50/50">
        <AuthProvider initialUser={user} initialProfile={profile} initialCart={cart}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
