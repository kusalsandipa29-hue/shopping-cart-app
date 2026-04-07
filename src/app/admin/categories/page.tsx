import { createClient } from '@/lib/supabase/server';
import CategoryFormClient from './CategoryFormClient';
import CategoryListItemClient from './CategoryListItemClient';

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: CATEGORIES } = await supabase.from('categories').select('*').order('name');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
        <h2 className="font-semibold text-lg mb-4">Add New Category</h2>
        <CategoryFormClient />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES?.map(c => (
          <CategoryListItemClient key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
}
