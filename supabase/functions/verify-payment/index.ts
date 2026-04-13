import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { reference } = await req.json()
    const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY')
    
    // Verify with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    })
    
    const data = await response.json()

    if (data.status && data.data.status === 'success') {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      const amount = data.data.amount / 100 // Convert from kobo
      const orderId = data.data.metadata.order_id

      // 1. Update Order Status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status: 'paid', payment_ref: reference })
        .eq('id', orderId)
        .select('*, order_items(*)')
        .single()

      if (orderError) throw orderError

      // 2. Calculate and Insert Earnings (80/20 split per seller)
      // Logic: For each item in order, calculate seller share
      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)

      if (items) {
        for (const item of items) {
          const totalItemPrice = item.price_at_purchase * item.quantity
          const sellerShare = totalItemPrice * 0.8
          const platformShare = totalItemPrice * 0.2

          await supabase.from('earnings').insert({
            order_id: orderId,
            seller_id: item.seller_id,
            seller_amount: sellerShare,
            platform_amount: platformShare,
            status: 'completed'
          })
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: false, message: 'Payment verification failed' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
