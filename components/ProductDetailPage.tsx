import React, { useState } from 'react';
import type { Product, User, View } from '../types';
import { HeartIcon } from './icons/Icons';

interface ProductDetailPageProps {
  product: Product;
  addToCart: (product: Product) => void;
  navigateTo: (view: View) => void;
  currentUser: User | null;
  handleAddToWishlist: (product: Product) => void; // This prop is now used
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, addToCart, navigateTo, currentUser, handleAddToWishlist }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);

  const handleAddToCart = () => {
      addToCart(product);
  };

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {/* Image gallery */}
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 uppercase">{product.brand}</h1>
          <h2 className="text-xl text-gray-600 mt-1">{product.name}</h2>
          
          <p className="text-3xl text-gray-900 mt-4">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="ml-3 text-lg text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="ml-3 text-lg font-bold text-orange-500">{product.discount}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">inclusive of all taxes</p>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-2 text-base text-gray-700 space-y-4">
              <p>{product.description}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex items-center space-x-2 mt-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-full py-2 px-4 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-md transition-colors text-center"
            >
              Add to Bag
            </button>
             {currentUser && (
                <button
                    // This now calls the correct function from App.tsx
                    onClick={() => handleAddToWishlist(product)}
                    className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-3 px-5 rounded-md transition-colors"
                >
                    <HeartIcon className="w-5 h-5 mr-2" />
                    Wishlist
                </button>
             )}
          </div>
           <button
              onClick={() => navigateTo({ page: 'cart'})}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-md transition-colors text-center"
            >
              Go to Bag
            </button>
        </div>
      </div>
    </div>
  );
};

