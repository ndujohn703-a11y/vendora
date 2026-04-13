import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/supabase';
import { Zap } from 'lucide-react';

export default function FlashDeals({ products }: { products: Product[] }) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 italic uppercase">Flash Deals</h2>
            <p className="text-xs text-gray-500 font-medium">Limited time offers, ending soon!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-900 text-white px-2 py-1 rounded text-sm font-bold">02</div>
          <span className="font-bold">:</span>
          <div className="bg-gray-900 text-white px-2 py-1 rounded text-sm font-bold">45</div>
          <span className="font-bold">:</span>
          <div className="bg-gray-900 text-white px-2 py-1 rounded text-sm font-bold">12</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
