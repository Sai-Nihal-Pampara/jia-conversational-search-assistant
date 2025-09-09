import React, { useState, useMemo } from 'react';
import type { Product, View } from '../types';
import { ProductGrid } from './ProductGrid';

interface SearchResultsPageProps {
  searchQuery: string;
  allProducts: Product[];
  navigateTo: (view: View) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ searchQuery, allProducts, navigateTo }) => {
  const [sortOption, setSortOption] = useState('default');

  const filteredProducts = useMemo(() => 
    allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ), 
    [allProducts, searchQuery]
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  const onProductClick = (id: string) => {
    navigateTo({ page: 'product', payload: id });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Search results for "{searchQuery}"
        </h1>
        <div className="w-full sm:w-48">
          <label htmlFor="sort-search" className="sr-only">Sort products</label>
          <select
            id="sort-search"
            name="sort-search"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {sortedProducts.length > 0 ? (
        <ProductGrid
          products={sortedProducts}
          onProductClick={onProductClick}
          title={`${sortedProducts.length} items found`}
        />
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-600">
            We couldn't find any products matching your search.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try searching for something else.
          </p>
        </div>
      )}
    </div>
  );
};
