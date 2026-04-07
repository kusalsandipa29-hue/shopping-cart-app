import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Grid, AlertCircle } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  
  if (profile?.role !== 'admin') {
    redirect('/home');
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
            <h2 className="font-bold text-lg mb-6 text-gray-900 border-b pb-2">Admin Panel</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/admin/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link href="/admin/products" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Package className="w-4 h-4" /> Products
              </Link>
              <Link href="/admin/categories" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Grid className="w-4 h-4" /> Categories
              </Link>
            </nav>
            
            <div className="mt-8 p-4 bg-green-50 text-green-800 text-sm rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Successfully connected to Supabase backend.</p>
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
