
import React from 'react';
import type { CartItem } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './icons/Icons';
// FIX: Updated import path for View type.
import type { View } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  updateCartQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  navigateTo: (view: View) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cartItems, updateCartQuantity, removeFromCart, navigateTo }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-screen-lg mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Your Bag ({totalItems} items)</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-600">Your shopping bag is empty.</p>
          <button
            onClick={() => navigateTo({ page: 'home' })}
            className="mt-4 bg-gray-900 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-md" />
                <div className="ml-4 flex-grow">
                  <h2 className="font-bold text-gray-900">{item.brand}</h2>
                  <p className="text-sm text-gray-600">{item.name}</p>
                  <p className="font-semibold text-gray-800 mt-2">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                   <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><MinusIcon className="w-4 h-4" /></button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                    <TrashIcon className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Order Summary</h2>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                onClick={() => navigateTo({ page: 'checkout' })}
                className="w-full mt-6 bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};