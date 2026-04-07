'use client';
import { useStore } from '@/store/useStore';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function CartClient() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const user = useStore((state) => state.user);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="container mx-auto px-4 py-24 min-h-[60vh] flex items-center justify-center">Loading cart...</div>;
  }

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handleClearCart = async () => {
    clearCart();
    if (user) {
      const supabase = createClient();
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6 relative">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-lg">Looks like you haven't added any fresh groceries to your cart yet.</p>
        <Link href="/home">
          <Button size="lg" className="rounded-full px-8 h-14 text-lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">{cart.length} Items</span>
            <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
          {cart.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-gray-600 mb-6 border-b pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full rounded-xl h-14 text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
