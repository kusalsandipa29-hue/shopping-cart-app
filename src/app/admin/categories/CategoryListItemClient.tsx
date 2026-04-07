'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteCategory } from '@/app/admin/actions';
import CategoryFormClient from './CategoryFormClient';
import { toast } from 'sonner';

export default function CategoryListItemClient({ category }: { category: any }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const res = await deleteCategory(category.id);
    if (res?.error) toast.error(res.error);
    else toast.success('Deleted category successfully');
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm col-span-1 md:col-span-2">
        <h3 className="font-semibold mb-3">Edit Category</h3>
        <CategoryFormClient initialData={category} onCancel={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center text-gray-400">
        <img 
          src={category.image_url || `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200`} 
          alt={category.name} 
          className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'; }}
        />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-bold text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{category.description || category.slug}</p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="flex-1 sm:flex-none">Edit</Button>
        <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-700 flex-1 sm:flex-none">Delete</Button>
      </div>
    </div>
  );
}
