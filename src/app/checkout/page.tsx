'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/context/CartContext'

export default function Checkout() {
  // CORRECTED: The context now provides `items`, not `cartItems`.
  // Also getting `totalPrice` directly from the context.
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Simplified totals using `totalPrice` from context
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // CORRECTED: Use `items` here
    console.log('Order placed:', { items, formData, total });
    alert('Order submitted! (Check the console for details)');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // CORRECTED: Check `items.length`
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600">Add some items to your cart before checking out.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Customer Information Column */}
        <div className="lg:col-span-2">
            {/* ... your form inputs ... */}
        </div>

        {/* Order Summary Column */}
        <div>
          <div className="card sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {/* CORRECTED: Map over `items` */}
              {items.map((item: CartItem) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {/* CORRECTED: Use `item.image` for the src */}
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        Qty: 
                        <input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-12 ml-2 border rounded px-1 text-center"
                        />
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="w-full btn-primary mt-6">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}