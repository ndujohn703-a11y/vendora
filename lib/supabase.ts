import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  image_url: string;
  category_id: string;
  seller_id: string;
  is_flash_sale: boolean;
  stock: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
};
