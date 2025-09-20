// src/components/Product/ProductCard.tsx

import React from 'react';

// (Optional but good practice) Define the shape of a single product
interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  // ... any other properties
}

// Define the props for THIS component
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

// --- THIS IS THE FIX ---
// Add this line at the very end of the file.
export default ProductCard;