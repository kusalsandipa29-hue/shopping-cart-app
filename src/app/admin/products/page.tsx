import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { deleteProduct } from '@/app/admin/actions';
import ProductFormClient from './ProductFormClient';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: PRODUCTS } = await supabase.from('products').select('*').order('name');
  const { data: CATEGORIES } = await supabase.from('categories').select('id, name');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
        <h2 className="font-semibold text-lg mb-4">Add New Product</h2>
        <ProductFormClient categories={CATEGORIES || []} />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-500 text-sm">
              <th className="py-4 px-4 font-medium">Product Name</th>
              <th className="py-4 px-4 font-medium">Category ID</th>
              <th className="py-4 px-4 font-medium">Price</th>
              <th className="py-4 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS?.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{p.name}</td>
                <td className="py-3 px-4 text-gray-500 capitalize">{p.category_id}</td>
                <td className="py-3 px-4 text-gray-900">${p.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-right">
                  <form action={async () => {
                    'use server';
                    await deleteProduct(p.id);
                  }}>
                    <Button type="submit" variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
