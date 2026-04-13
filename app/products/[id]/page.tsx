import React from 'react';
import { supabase } from '@/lib/supabase';
import { ShoppingCart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('*, profiles(full_name)')
    .eq('id', params.id)
    .single();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="py-10">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm grid md:grid-cols-2 gap-8 p-6">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500">Sold by {product.profiles?.full_name}</p>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-bold text-primary">₦{(product.discount_price || product.price).toLocaleString()}</span>
              {product.discount_price && (
                <span className="text-lg text-gray-400 line-through">₦{product.price.toLocaleString()}</span>
              )}
            </div>
            <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
              Flash Deal Price
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <button className="w-full bg-primary text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-opacity-90">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="w-full border-2 border-primary text-primary py-4 rounded-full font-bold hover:bg-primary/5">
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t pt-8">
            <div className="text-center">
              <ShieldCheck className="w-6 h-6 mx-auto text-accent mb-2" />
              <p className="text-[10px] font-bold text-gray-600 uppercase">Secure Payment</p>
            </div>
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto text-accent mb-2" />
              <p className="text-[10px] font-bold text-gray-600 uppercase">Fast Delivery</p>
            </div>
            <div className="text-center">
              <RefreshCcw className="w-6 h-6 mx-auto text-accent mb-2" />
              <p className="text-[10px] font-bold text-gray-600 uppercase">30-Day Return</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </div>
  );
}
