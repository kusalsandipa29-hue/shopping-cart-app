import Link from 'next/link';
import { Category } from '@/store/useStore';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.id}`}>
      <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow group cursor-pointer border border-black/5 bg-gray-100 flex items-center justify-center">
        <img 
          src={category.image_url || `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800`} 
          alt={category.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 opacity-80 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider text-center drop-shadow-md">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
