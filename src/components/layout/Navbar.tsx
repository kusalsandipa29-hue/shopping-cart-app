'use client';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { ShoppingCart, Store, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { logout } from '@/app/(auth)/actions';

export function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useStore((state) => state.cart);
  const profile = useStore((state) => state.profile);
  const user = useStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/home" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
            <Store className="h-6 w-6" />
            <span>FreshCart</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/home" className="hover:text-blue-600 transition-colors">Shop</Link>
            {profile?.role === 'admin' && (
              <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Admin</Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isMounted && user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <UserIcon className="w-4 h-4" /> {profile?.full_name || user.email}
              </span>
              <form action={logout}>
                <Button type="submit" variant="ghost" size="sm">Logout</Button>
              </form>
            </div>
          ) : isMounted ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          ) : null}

          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {isMounted && cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full" variant="destructive">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
