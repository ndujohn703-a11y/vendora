import { supabase } from '@/lib/supabase';
import FlashDeals from '@/components/FlashDeals';
import ProductCard from '@/components/ProductCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Fresh data on every load

export default async function Home() {
  const { data: flashProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_flash_sale', true)
    .limit(6);

  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .limit(12);

  const { data: categories } = await supabase
    .from('categories')
    .select('*');

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Banner */}
      <section className="mt-6 relative h-[300px] md:h-[400px] rounded-2xl bg-gradient-to-r from-primary to-orange-400 overflow-hidden">
        <div className="absolute inset-0 flex items-center px-8 md:px-16 z-10">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              EVERYTHING <br /> YOU LOVE.
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-90 mb-8">
              Up to 90% OFF on first 1,000 orders!
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all">
              Shop Now
            </button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
          alt="Hero"
        />
      </section>

      {/* Categories Horizontal */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Shop by Category</h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories?.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="flex-shrink-0 group">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-transparent group-hover:border-primary transition-all">
                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-xs font-semibold text-gray-700">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      {flashProducts && flashProducts.length > 0 && (
        <FlashDeals products={flashProducts} />
      )}

      {/* General Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allProducts?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
