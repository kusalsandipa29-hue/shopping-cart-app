import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { ProductAction } from './ProductAction';
import { createClient } from '@/lib/supabase/server';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const supabase = await createClient();

  const { data: product, error: prodError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (prodError || !product) {
    return notFound();
  }

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('id', product.category_id)
    .single();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-hidden whitespace-nowrap">
        <Link href="/home" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        {category && (
          <>
            <Link href={`/category/${category.id}`} className="hover:text-blue-600">
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          </>
        )}
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-12 p-6 md:p-10">
          <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-6 md:mb-0 flex items-center justify-center text-gray-300">
            <img 
              src={product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-extrabold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-gray mb-10">
              <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-auto pt-8 border-t">
              <ProductAction product={product} />
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-500 border-t pt-8">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-900">Category</span>
                <span className="capitalize">{category?.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-900">Delivery</span>
                <span>Within 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
