
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (id: string) => void;
  title: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, title }) => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-6">
          {products.length > 0 ? (
             products.map((product) => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
             ))
          ) : (
            <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">No products found. Try a different search!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
