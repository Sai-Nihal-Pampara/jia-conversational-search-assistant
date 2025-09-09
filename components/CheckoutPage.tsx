import React, { useState } from 'react';
import type { CartItem, ShippingInfo } from '../types';
// FIX: Updated import path for View type.
import type { View } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  placeOrder: (shippingInfo: ShippingInfo, paymentMethod: 'Online' | 'Cash on Delivery') => void;
  navigateTo: (view: View) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, placeOrder, navigateTo }) => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '', phone: '', address: '', city: '', pincode: '', state: '', country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState<'Online' | 'Cash on Delivery'>('Online');
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(shippingInfo).some(field => field.trim() === '')) {
      alert('Please fill out all shipping details.');
      return;
    }
    placeOrder(shippingInfo, paymentMethod);
  };

  if (cartItems.length === 0) {
      return (
          <div className="text-center py-20">
              <p className="text-lg text-gray-600">Your bag is empty. Nothing to checkout.</p>
              <button onClick={() => navigateTo({ page: 'home' })} className="mt-4 bg-gray-900 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700">Go Shopping</button>
          </div>
      )
  }

  return (
    <div className="max-w-screen-lg mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" placeholder="Full Name" onChange={handleInputChange} className="p-2 border rounded-md" required />
            <input name="phone" placeholder="Phone Number" type="tel" onChange={handleInputChange} className="p-2 border rounded-md" required />
            <input name="address" placeholder="Address" onChange={handleInputChange} className="p-2 border rounded-md sm:col-span-2" required />
            <input name="city" placeholder="City" onChange={handleInputChange} className="p-2 border rounded-md" required />
            <input name="pincode" placeholder="Pincode" type="tel" pattern="[0-9]{6}" maxLength={6} title="Pincode must be 6 digits." onChange={handleInputChange} className="p-2 border rounded-md" required />
            <input name="state" placeholder="State" onChange={handleInputChange} className="p-2 border rounded-md" required />
            <input name="country" placeholder="Country" value="India" readOnly className="p-2 border rounded-md bg-gray-100" />
          </div>
           <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>
            <div className="flex space-x-4">
                <label className={`flex-1 p-4 border rounded-lg cursor-pointer ${paymentMethod === 'Online' ? 'border-gray-900 bg-gray-100' : ''}`}>
                    <input type="radio" name="payment" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="sr-only"/>
                    <span className="font-medium">Online Payment</span>
                </label>
                <label className={`flex-1 p-4 border rounded-lg cursor-pointer ${paymentMethod === 'Cash on Delivery' ? 'border-gray-900 bg-gray-100' : ''}`}>
                    <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={() => setPaymentMethod('Cash on Delivery')} className="sr-only"/>
                    <span className="font-medium">Cash on Delivery</span>
                </label>
            </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Order Summary</h2>
            <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate pr-2">{item.name} (x{item.quantity})</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <button type="submit" className="w-full mt-6 bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600 transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};