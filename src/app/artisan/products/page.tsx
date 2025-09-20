'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useUIStore } from '@/store/uiStore';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import ProductForm from '@/components/Form/ProductForm';
import { Product } from '@/types';




// Mock data for the artisan's products
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Mug',
    image: 'public/products/placeholder-mug.jpg',
    price: 24.99,
    stock: 15,
    status: 'Active',
    description: 'A beautiful, one-of-a-kind ceramic mug.',
  },
  {
    id: 7,
    name: 'Hand-painted Ceramic Bowl',
    image: '/placeholder-bowl.jpg',
    price: 45.00,
    stock: 8,
    status: 'Active',
    description: 'Perfect for soups or as a decorative piece.',
  },
  {
    id: 9,
    name: 'Clay Sculpture "The Thinker"',
    image: '/placeholder-sculpture.jpg',
    price: 150.00,
    stock: 0,
    status: 'Sold Out',
    description: 'A thoughtful and intricate sculpture.',
  },
  {
    id: 10,
    name: 'Glazed Dinner Plate Set',
    image: '/placeholder-plate.jpg',
    price: 85.00,
    stock: 22,
    status: 'Draft',
    description: 'A set of 4 handmade dinner plates.',
  }
];

export default function ManageArtisanProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { openModal, closeModal } = useUIStore();

  const handleSaveProduct = (productToSave: Omit<Product, 'id' | 'image'> & { id?: number }) => {
    // In a real app, you'd send this to your API
    if (productToSave.id) {
      // Update existing product
      setProducts(products.map(p => p.id === productToSave.id ? { ...p, ...productToSave } : p));
      console.log('Updating product:', productToSave);
    } else {
      // Add new product
      const newProduct: Product = { 
        ...productToSave, 
        id: Math.max(...products.map(p => p.id)) + 1, // mock new ID
        image: '/placeholder-new.jpg' // mock new image
      };
      setProducts([...products, newProduct]);
      console.log('Creating new product:', newProduct);
    }
    closeModal();
  };

  const handleOpenForm = (product: Product | null) => {
    openModal(
      <ProductForm 
        product={product} 
        onClose={closeModal} 
        onSave={handleSaveProduct} 
      />
    );
  };

  const handleDeleteProduct = (productId: number) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      console.log('Deleting product ID:', productId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Button onClick={() => handleOpenForm(null)}>Add New Product</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      product.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end space-x-2">
                      <Button variant="secondary" className="text-sm py-1 px-3" onClick={() => handleOpenForm(product)}>
                        Edit
                      </Button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm p-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}