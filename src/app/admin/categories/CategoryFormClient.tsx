'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addCategory, editCategory } from '@/app/admin/actions';
import { toast } from 'sonner';

import { useState } from 'react';

export default function CategoryFormClient({ initialData, onCancel }: { initialData?: any, onCancel?: () => void }) {
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setLoading(true);
    if (isEditing) {
      formData.append('id', initialData.id);
    }
    const response = isEditing ? await editCategory(formData) : await addCategory(formData);
    setLoading(false);
    
    if (response?.error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} category: ` + response.error);
    } else if (response?.success) {
      toast.success(`Category successfully ${isEditing ? 'updated' : 'added'}!`);
      if (onCancel) onCancel(); // Close form if in edit mode
    }
  }

  return (
    <form action={clientAction} className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input required name="name" placeholder="Name (e.g. Snacks)" defaultValue={initialData?.name} />
        <Input required name="slug" placeholder="Slug (e.g. snacks)" defaultValue={initialData?.slug} />
        <Input name="image_url" placeholder="Image URL (e.g. https://...)" defaultValue={initialData?.image_url} />
        <Input name="description" placeholder="Description" defaultValue={initialData?.description} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
          {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Category')}
        </Button>
        {isEditing && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  );
}
