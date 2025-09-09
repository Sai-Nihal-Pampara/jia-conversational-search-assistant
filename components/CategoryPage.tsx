
import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { ProductGrid } from './ProductGrid';

interface CategoryPageProps {
  gender: 'Men' | 'Women' | 'Kids';
  allProducts: Product[];
  navigateTo: (view: any) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ gender, allProducts, navigateTo }) => {
  const [sortOption, setSortOption] = useState('default');

  const productsByGender = useMemo(() => 
    allProducts.filter(p => p.gender === gender || p.gender === 'Unisex'),
    [allProducts, gender]
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...productsByGender];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }  else if (sortOption === 'brand-asc') {
      sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    return sorted;
    }
  }, [productsByGender, sortOption]);


  const onProductClick = (id: string) => {
    navigateTo({ page: 'product', payload: id });
  };
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
       <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{gender}'s Collection</h1>
        <div className="w-full sm:w-48">
          <label htmlFor="sort-category" className="sr-only">Sort products</label>
          <select
            id="sort-category"
            name="sort-category"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="brand-asc">Brand: A to Z</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <ProductGrid 
          products={sortedProducts} 
          onProductClick={onProductClick} 
          title={`${sortedProducts.length} Products`} />
      ) : (
        <div className="text-center py-20">
            <p className="text-lg text-gray-500">No products found in the {gender}'s section.</p>
        </div>
      )}
    </div>
  );
};
