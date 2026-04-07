'use client';
import Link from 'next/link';
import { Product } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} has been added to your shopping cart.`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
       <Link href={`/product/${product.id}`} className="flex-1">
          <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center text-gray-300">
           <img 
             src={product.image_url || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e'} 
             alt={product.name} 
             className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
             onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'; }}
           />
         </div>
       </Link>
       <div className="p-4 flex flex-col flex-1 justify-end bg-white">
         <Link href={`/product/${product.id}`}>
           <h3 className="font-semibold text-lg line-clamp-1 hover:text-blue-600 transition-colors">{product.name}</h3>
         </Link>
         <p className="text-gray-500 text-sm mt-1 mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>
         <div className="flex items-center justify-between mt-auto">
           <span className="font-bold text-xl text-gray-900">${product.price.toFixed(2)}</span>
           <Button onClick={handleAddToCart} size="sm" className="rounded-full shadow-sm">
             <ShoppingCart className="w-4 h-4 mr-2" /> Add
           </Button>
         </div>
       </div>
    </div>
  );
}
