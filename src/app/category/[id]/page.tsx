import { ProductCard } from '@/components/shop/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.id;
  
  const supabase = await createClient();
  
  const { data: category, error: catError } = await supabase.from('categories').select('*').eq('id', categoryId).single();
  
  if (catError || !category) {
    return notFound();
  }

  const { data: categoryProducts, error: prodError } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('name');

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-hidden whitespace-nowrap">
        <Link href="/home" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-500 text-lg">{category.description}</p>
      </div>

      {prodError ? (
        <div className="text-red-500 text-center py-10">Failed to load products.</div>
      ) : categoryProducts && categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
