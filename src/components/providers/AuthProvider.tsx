'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useStore } from '@/store/useStore';

export function AuthProvider({ 
  children, 
  initialUser, 
  initialProfile, 
  initialCart 
}: { 
  children: React.ReactNode, 
  initialUser: any, 
  initialProfile: any, 
  initialCart: any[] 
}) {
  const setUser = useStore(state => state.setUser);
  const setCart = useStore(state => state.setCart);
  
  useEffect(() => {
    setUser(initialUser, initialProfile);
    if (initialUser && initialCart) {
      setCart(initialCart);
    }
  }, [initialUser, initialProfile, initialCart, setUser, setCart]);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setUser(session.user, profile);
        
        // Merge guest cart to DB
        const localCart = useStore.getState().cart;
        if (localCart.length > 0) {
          for (const item of localCart) {
            await supabase.from('cart_items').upsert({
              user_id: session.user.id,
              product_id: item.id,
              quantity: item.quantity,
            }, { onConflict: 'user_id, product_id' });
          }
        }
        
        // Fetch fresh cart from DB
        const { data: dbCart } = await supabase.from('cart_items').select('quantity, products(*)').eq('user_id', session.user.id);
        if (dbCart) {
          const merged = dbCart.map((c: any) => ({
            ...c.products,
            quantity: c.quantity
          }));
          setCart(merged);
        }
      }
      
      if (event === 'SIGNED_OUT') {
        setUser(null, null);
        setCart([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setCart]);

  return <>{children}</>;
}
