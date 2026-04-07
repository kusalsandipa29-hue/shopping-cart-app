'use client';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function CheckoutClient() {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order Confirmed:', {
      cart,
      total,
      // mock data capture
    });
    clearCart();
    toast.success("Order Placed Successfully! This is a mock checkout.");
    router.push('/home');
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Shipping Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input required placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input required type="tel" placeholder="(555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input required placeholder="123 Fresh St, City, ST 12345" />
            </div>
            <Button type="submit" size="lg" className="w-full h-14 mt-6 text-lg bg-blue-600 hover:bg-blue-700">
              Confirm Order
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Note: No payment is required. This is a mock checkout.
            </p>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-black/5">
            <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto mb-6 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden shrink-0 flex items-center justify-center text-gray-400">
                    <img 
                      src={item.image_url || item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'; }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-4 text-gray-600 border-t border-gray-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%)</span>
                <span className="font-medium">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
