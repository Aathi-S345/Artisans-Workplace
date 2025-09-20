import { NextRequest, NextResponse } from 'next/server';

// Mock database of artisan products
const mockProducts = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Mug',
    price: 24.99,
    image: '/placeholder-mug.jpg',
    artisan: "Potter's Studio",
    rating: 4.8,
    category: 'Mug',
  },
  {
    id: 2,
    name: 'Handwoven Scarf',
    price: 42.00,
    image: '/placeholder-scarf.jpg',
    artisan: 'Weaver Studio',
    rating: 4.9,
    category: 'Scarf',
  },
  {
    id: 3,
    name: 'Handmade Leather Journal',
    price: 38.00,
    image: '/placeholder-journal.jpg',
    artisan: 'Leather Crafts',
    rating: 4.6,
    category: 'Journal',
  },
  {
    id: 4,
    name: 'Hand-painted Ceramic Bowl',
    price: 45.00,
    image: '/placeholder-bowl.jpg',
    artisan: "Potter's Studio",
    rating: 4.9,
    category: 'Bowl',
  },
  {
    id: 5,
    name: 'Wooden Doll',
    price: 30.00,
    image: '/placeholder-doll.jpg',
    artisan: 'Doll Maker',
    rating: 4.7,
    category: 'Doll',
  },
  {
    id: 6,
    name: 'Traditional Saree',
    price: 120.00,
    image: '/placeholder-saree.jpg',
    artisan: 'Textile House',
    rating: 5.0,
    category: 'Clothing',
  },
  {
    id: 7,
    name: 'Macramé Wall Hanging',
    price: 55.00,
    image: '/placeholder-macrame.jpg',
    artisan: 'Knot Artisans',
    rating: 4.8,
    category: 'Macrame',
  },
  {
    id: 8,
    name: 'Handmade Basket',
    price: 28.00,
    image: '/placeholder-basket.jpg',
    artisan: 'Basketry Co.',
    rating: 4.5,
    category: 'Basket',
  },
];

// Emoji to product category mapping
const emojiMap: Record<string, string[]> = {
  '🧵': ['Scarf', 'Clothing'],
  '🪡': ['Journal', 'Clothing'],
  '🧶': ['Scarf', 'Macrame'],
  '🪆': ['Doll'],
  '🪔': ['Mug', 'Bowl'],
  '🧺': ['Basket'],
  '👗': ['Clothing'],
  '👜': ['Journal'],
  '🪢': ['Macrame'],
  '🖼️': ['Macrame'],
  '🏺': ['Bowl', 'Mug'],
};

export async function POST(req: NextRequest) {
  try {
    const { emoji } = await req.json();
    if (!emoji) {
      return NextResponse.json({ products: mockProducts });
    }

    // Find all categories matching any emoji in the input
    let categories: string[] = [];
    for (const char of emoji) {
      if (emojiMap[char]) {
        categories = categories.concat(emojiMap[char]);
      }
    }
    // Remove duplicates
    categories = [...new Set(categories)];

    // Filter products by category
    const filtered = mockProducts.filter(p => categories.includes(p.category));
    return NextResponse.json({ products: filtered });
  } catch (error) {
    return NextResponse.json({ error: error?.toString() }, { status: 500 });
  }
}
