
"use client";
import ProductGrid from '@/components/Product/ProductGrid'

// Mock data - replace with real data from your API
const initialProducts = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Mug',
    price: 24.99,
    image: '/placeholder-mug.jpg',
    artisan: "Potter's Studio",
    rating: 4.8,
    category: 'Home & Kitchen'
  },
  {
    id: 2,
    name: 'Wooden Cutting Board',
    price: 35.50,
    image: '/placeholder-board.jpg',
    artisan: 'Woodcraft by John',
    rating: 4.5,
    category: 'Home & Kitchen'
  },
  {
    id: 3,
    name: 'Handwoven Scarf',
    price: 42.00,
    image: '/placeholder-scarf.jpg',
    artisan: 'Weaver Studio',
    rating: 4.9,
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Silver Pendant Necklace',
    price: 68.00,
    image: '/placeholder-necklace.jpg',
    artisan: 'Silver Arts',
    rating: 4.7,
    category: 'Jewelry'
  },
  {
    id: 5,
    name: 'Handmade Leather Journal',
    price: 38.00,
    image: '/placeholder-journal.jpg',
    artisan: 'Leather Crafts',
    rating: 4.6,
    category: 'Stationery'
  },
  {
    id: 6,
    name: 'Artisanal Soy Candle',
    price: 22.50,
    image: '/placeholder-candle.jpg',
    artisan: 'Candle Co.',
    rating: 4.8,
    category: 'Home & Kitchen'
  },
  {
    id: 7,
    name: 'Hand-painted Ceramic Bowl',
    price: 45.00,
    image: '/placeholder-bowl.jpg',
    artisan: "Potter's Studio",
    rating: 4.9,
    category: 'Home & Kitchen'
  },
  {
    id: 8,
    name: 'Hand-forged Chef Knife',
    price: 120.00,
    image: '/placeholder-knife.jpg',
    artisan: 'Metal Works',
    rating: 5.0,
    category: 'Kitchen'
  }
]

import React, { useState } from 'react'

export default function Marketplace() {
  const [emoji, setEmoji] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Call backend Gemini API route
  async function fetchProductsByEmoji(emoji: string) {
    setLoading(true);
    setError("");
    try {
      if (!emoji) {
        setProducts(initialProducts);
        setLoading(false);
        return;
      }
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to fetch products.");
        setProducts([]);
      } else {
        const data = await res.json();
        // Expecting data.products or similar from Gemini API
        setProducts(data.products || []);
      }
    } catch (e) {
      setError('Failed to fetch products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Marketplace</h1>
      </div>

      {/* Emoji input for product search */}
      <div className="flex flex-col items-center mb-8">
        <input
          type="text"
          className="input-field w-40 text-2xl text-center"
          placeholder="🔍 Enter emoji(s)..."
          value={emoji}
          onChange={e => {
            setEmoji(e.target.value);
            fetchProductsByEmoji(e.target.value);
          }}
          maxLength={8}
        />
        <span className="text-xs text-gray-500 mt-2">
          Try 🧵 🪡 🧶 🪆 🪔 🧺 👗 👜 🪢 🖼️ 🪘 � (mix for artisan crafts, dolls, clothes, etc)
        </span>
      </div>

      {loading ? (
        <div className="text-center text-lg py-12">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : (
        <ProductGrid products={products} />
      )}

      <div className="flex justify-center mt-12">
        <button className="btn-secondary">Load More</button>
      </div>
    </div>
  )
}