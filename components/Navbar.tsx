"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary flex-shrink-0">
            VENDORA
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search items, brands, and categories..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="hidden md:flex items-center gap-1 text-gray-700 hover:text-primary">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Account</span>
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <Link href="/seller/dashboard" className="block text-gray-700">Sell on Vendora</Link>
          <Link href="/auth/login" className="block text-gray-700">Login / Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
