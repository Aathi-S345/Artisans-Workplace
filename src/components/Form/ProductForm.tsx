'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/UI/Button";
import { Product } from '@/types'; // Import the shared type

// This type represents only the data our form can edit.
// It omits properties that are set automatically, like 'id' and 'image'.
type ProductFormData = Omit<Product, 'id' | 'image' | 'status'> & {
  status: 'Active' | 'Draft';
};

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  // onSave only needs to pass back the data from the form
  onSave: (productData: ProductFormData) => void;
}

export default function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  // CORRECTED: The initial state now perfectly matches the ProductFormData type
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    status: 'Draft',
  });

  // If a product is passed, populate the form for editing
  useEffect(() => {
    if (product) {
      // We only set the fields that exist on our form
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        status: product.status === 'Sold Out' ? 'Active' : product.status, // Handle 'Sold Out' case
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEditing = product !== null;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="input-field" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="input-field" step="0.01" min="0" required />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="input-field" min="0" required />
          </div>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className="input-field">
            <option value="Active">Active (Visible in Marketplace)</option>
            <option value="Draft">Draft (Hidden)</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}