import React from 'react';
import { supabase } from '@/lib/supabase';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';

export default async function SellerDashboard() {
  // Mock logged in user for showcase
  const sellerId = 'placeholder-id'; 

  // In a real app, we'd fetch this from auth.getUser()
  const { data: earnings } = await supabase
    .from('earnings')
    .select('seller_amount')
    // .eq('seller_id', sellerId); // Filter for real user

  const totalRevenue = earnings?.reduce((acc, curr) => acc + Number(curr.seller_amount), 0) || 0;

  const stats = [
    { label: 'Total Earnings', value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Active Products', value: '12', icon: Package, color: 'bg-blue-500' },
    { label: 'Conversion Rate', value: '4.2%', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Shop Followers', value: '1,284', icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black">Seller Dashboard</h1>
        <p className="text-gray-500">Welcome back, let's see how your shop is performing today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold mb-4">Recent Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-4 font-mono">#ORD-2938</td>
                  <td className="py-4">Wireless Headphones G7</td>
                  <td className="py-4 font-bold">₦14,000</td>
                  <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold">PAID</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-mono">#ORD-1102</td>
                  <td className="py-4">Smart Watch Series 5</td>
                  <td className="py-4 font-bold">₦32,500</td>
                  <td className="py-4"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[10px] font-bold">PENDING</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold mb-4">Verification Status</h3>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
            <p className="text-sm text-amber-800">Your Identity verification (NIN) is currently <strong>Pending Review</strong>. Most reviews take 48 hours.</p>
          </div>
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
            Upload Documents
          </button>
        </div>
      </div>
    </div>
  );
}
