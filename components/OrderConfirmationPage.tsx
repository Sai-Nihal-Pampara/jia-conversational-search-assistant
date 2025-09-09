
import React from 'react';
import type { Order, Product } from '../types';
import { ProductCard } from './ProductCard';

interface OrderConfirmationPageProps {
  order: Order;
  allProducts: Product[];
  navigateTo: (view: any) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, allProducts, navigateTo }) => {
  const orderedProductIds = new Set(order.items.map(item => item.id));
  const primaryCategory = order.items[0]?.category;
  
  const recommendedProducts = allProducts.filter(p => p.category === primaryCategory && !orderedProductIds.has(p.id)).slice(0, 6);

  return (
    <div className="max-w-screen-lg mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-8" role="alert">
        <p className="font-bold">Order Placed Successfully!</p>
        <p>Thank you for your purchase. Your Order ID is <span className="font-mono">{order.id}</span>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded-md" />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-gray-900">{item.brand}</h3>
                  <p className="text-sm text-gray-600">{item.name}</p>
                  <p className="text-sm text-gray-800">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
           <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total Paid</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
             <p className="text-sm text-gray-500 mt-1">Payment Method: {order.paymentMethod}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Shipping To</h2>
          <div className="space-y-1 text-gray-700">
            <p className="font-bold">{order.shippingInfo.name}</p>
            <p>{order.shippingInfo.address}</p>
            <p>{order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}</p>
            <p>{order.shippingInfo.country}</p>
            <p>Phone: {order.shippingInfo.phone}</p>
          </div>
        </div>
      </div>
      
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
                {recommendedProducts.map(product => (
                    <ProductCard key={product.id} product={product} onClick={(id) => navigateTo({ page: 'product', payload: id })} />
                ))}
            </div>
        </div>
      )}

      <div className="text-center mt-12">
        <button
          onClick={() => navigateTo({ page: 'home' })}
          className="bg-gray-900 text-white font-bold py-3 px-8 rounded-md hover:bg-gray-700 transition-colors"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};
