import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm text-gray-800 line-clamp-2 min-h-[40px] mb-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₦{(product.discount_price || product.price).toLocaleString()}
          </span>
          {product.discount_price && (
            <span className="text-xs text-gray-400 line-through">
              ₦{product.price.toLocaleString()}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="text-secondary flex">
            {"★".repeat(5)}
          </div>
          <span className="text-[10px] text-gray-400">(42)</span>
        </div>
      </div>
    </Link>
  );
}
