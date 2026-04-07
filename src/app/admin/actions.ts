'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image_url = formData.get('image_url') as string;
  const description = formData.get('description') as string;

  const { error } = await supabase.from('categories').insert({ name, slug, image_url, description });
  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  revalidatePath('/home');
  return { success: true };
}

export async function editCategory(formData: FormData) {
  const supabase = await createClient();
  const id = parseInt(formData.get('id') as string, 10);
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image_url = formData.get('image_url') as string;
  const description = formData.get('description') as string;

  const { error } = await supabase.from('categories').update({ name, slug, image_url, description }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/categories');
  revalidatePath('/home');
  return { success: true };
}

export async function deleteCategory(id: string | number) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    if (error.code === '23503') { // Postgres Foreign Key Violation
      return { error: 'Cannot delete this category because there are active products linked to it! Delete or move the products first.' };
    }
    return { error: error.message };
  }
  revalidatePath('/admin/categories');
  revalidatePath('/home');
  return { success: true };
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient();
  const category_id = parseInt(formData.get('category_id') as string, 10);
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const image_url = formData.get('image_url') as string;
  const description = formData.get('description') as string;
  const stock = parseInt(formData.get('stock') as string, 10) || 50;

  const { error } = await supabase.from('products').insert({ category_id, name, price, image_url, description, stock });
  if (error) return { error: error.message };
  
  revalidatePath('/admin/products');
  revalidatePath('/home');
  return { success: true };
}

export async function deleteProduct(id: string | number) {
  const supabase = await createClient();
  await supabase.from('products').delete().eq('id', id);
  revalidatePath('/admin/products');
  revalidatePath('/home');
}
