'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addProduct } from '@/app/admin/actions';
import { toast } from 'sonner';

export default function ProductFormClient({ categories }: { categories: any[] }) {
  async function clientAction(formData: FormData) {
    const response = await addProduct(formData);
    if (response?.error) {
      toast.error('Failed to add product: ' + response.error);
    } else if (response?.success) {
      toast.success('Product successfully added!');
    }
  }

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* We no longer send explicit ID, DB generates it! */}
        <Input required name="name" placeholder="Product Name" />
        <Input required name="price" type="number" step="0.01" placeholder="Price" />
        <select name="category_id" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background md:col-span-1">
          <option value="">Select Category</option>
          {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <Input required name="image_url" placeholder="Image URL (e.g. https://...)" className="md:col-span-2" />
        <Input required name="description" placeholder="Description" className="md:col-span-2" />
        <Input required name="stock" type="number" placeholder="Initial Stock Quantity" className="md:col-span-1" defaultValue={50} />
      </div>
      <Button type="submit" className="w-full md:w-auto self-start bg-blue-600 hover:bg-blue-700">Add Product</Button>
    </form>
  );
}
