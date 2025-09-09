
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div onClick={() => onClick(product.id)} className="group cursor-pointer">
      <div className="w-full aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-center object-cover transition-all duration-300 ease-in-out group-hover:opacity-75 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 text-left">
          <h3 className="text-sm font-bold text-gray-900 uppercase">{product.brand}</h3>
          <p className="mt-1 text-sm text-gray-500 truncate">{product.name}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="ml-2 text-xs text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="ml-2 text-xs font-bold text-orange-500">{product.discount}</span>
          </p>
      </div>
    </div>
  );
};
