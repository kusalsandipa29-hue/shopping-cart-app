import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  image_url?: string;
  description?: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  price: number;
  image_url?: string;
  description: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  // Auth state
  user: any | null;
  profile: any | null;
  setUser: (user: any, profile: any) => void;

  // Cart state
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth State Init
      user: null,
      profile: null,
      setUser: (user, profile) => set({ user, profile }),

      // Cart State Init
      cart: [],
      setCart: (cart) => set({ cart }),
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),
      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            cart: state.cart.filter((item) => item.id !== productId),
          };
        }
        return {
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        };
      }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
);
