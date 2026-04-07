import { CategoryCard } from '@/components/shop/CategoryCard';
import { ShoppingBag } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: CATEGORIES, error } = await supabase.from('categories').select('*').order('name');

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12 text-center flex flex-col items-center">
        <div className="bg-blue-100 p-4 rounded-full mb-6 relative hover:scale-105 transition-transform">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 drop-shadow-sm">Shop Categories</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Browse our selection of farm-fresh produce and delicious artisan baked goods. 
          Select a category to view items.
        </p>
      </div>

      {error ? (
        <div className="text-center text-red-500">Failed to load categories. Make sure Supabase is configured properly.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {CATEGORIES?.map((category: any) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
