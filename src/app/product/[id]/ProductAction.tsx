'use client';

import { Product } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export function ProductAction({ product }: { product: Product }) {
  const addToCart = useStore((state) => state.addToCart);
  const user = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);

  const handleAddToCart = async () => {
    addToCart(product);
    
    if (user) {
      const supabase = createClient();
      const existing = cart.find(c => c.id === product.id);
      const newQty = existing ? existing.quantity + 1 : 1;
      
      const { error } = await supabase.from('cart_items').upsert({
        user_id: user.id,
        product_id: product.id,
        quantity: newQty
      }, { onConflict: 'user_id, product_id' });
      
      if (error) {
        toast.error("Cart sync error: " + error.message);
      }
    }
    
    toast.success(`${product.name} has been added to your shopping cart.`);
  };

  return (
    <Button 
      size="lg" 
      onClick={handleAddToCart} 
      className="w-full md:w-auto h-14 px-8 text-lg rounded-full"
    >
      <ShoppingCart className="w-5 h-5 mr-3" /> Add to Cart
    </Button>
  );
}
