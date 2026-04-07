'use client';
import { CartItem } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function CartItemCard({ item }: { item: CartItem }) {
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const user = useStore((state) => state.user);

  const handleUpdate = async (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
    
    if (user) {
      const supabase = createClient();
      if (newQuantity <= 0) {
        await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', item.id);
      } else {
        await supabase.from('cart_items').upsert({
          user_id: user.id,
          product_id: item.id,
          quantity: newQuantity
        }, { onConflict: 'user_id, product_id' });
      }
    }
  };

  const handleRemove = async () => {
    removeFromCart(item.id);
    if (user) {
      const supabase = createClient();
      await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', item.id);
    }
    toast.info("Item removed from cart");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-black/5">
      <Link href={`/product/${item.id}`} className="shrink-0">
        <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center text-gray-300">
          <img 
            src={item.image_url || item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e'} 
            alt={item.name} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'; }}
          />
        </div>
      </Link>
      <div className="flex-1 text-center sm:text-left">
        <Link href={`/product/${item.id}`}>
          <h4 className="font-semibold text-lg hover:underline">{item.name}</h4>
        </Link>
        <p className="text-gray-500 text-sm font-medium">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <QuantitySelector 
          quantity={item.quantity} 
          onIncrease={() => handleUpdate(item.quantity + 1)} 
          onDecrease={() => handleUpdate(item.quantity - 1)} 
        />
        <div className="font-bold w-20 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <Button variant="ghost" size="icon" onClick={handleRemove} className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
