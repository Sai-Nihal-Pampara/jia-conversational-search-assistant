import React from 'react';
import type { Wishlist, Product, View } from '../types';
import { ShoppingBagIcon, TrashIcon } from './icons/Icons';

interface WishlistPageProps {
    wishlists: Wishlist[];
    allProducts: Product[];
    navigateTo: (view: View) => void;
    onRemoveFromWishlist: (productId: string) => void;
    onMoveToBag: (productId: string) => void;
}

const WishlistProductCard: React.FC<{ product: Product; onRemove: () => void; onMove: () => void; onClick: () => void; }> = ({ product, onRemove, onMove, onClick }) => (
    <div className="border rounded-lg overflow-hidden group">
        <div onClick={onClick} className="cursor-pointer">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="p-4">
                <h3 className="font-bold text-gray-800 truncate">{product.brand}</h3>
                <p className="text-sm text-gray-600 truncate">{product.name}</p>
                <p className="font-semibold mt-2">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
        </div>
        <div className="p-2 border-t grid grid-cols-2 gap-2">
            <button onClick={onMove} className="flex items-center justify-center gap-2 text-sm font-medium bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600">
                <ShoppingBagIcon className="w-4 h-4" /> Move to Bag
            </button>
            <button onClick={onRemove} className="flex items-center justify-center gap-2 text-sm font-medium bg-gray-200 py-2 rounded-md hover:bg-gray-300">
                <TrashIcon className="w-4 h-4" /> Remove
            </button>
        </div>
    </div>
);

export const WishlistPage: React.FC<WishlistPageProps> = ({ wishlists, allProducts, navigateTo, onRemoveFromWishlist, onMoveToBag }) => {
    const defaultWishlist = wishlists.length > 0 ? wishlists[0] : { items: [] };
    const wishlistProducts = defaultWishlist.items
        .map(item => {
            const product = allProducts.find(p => p.id === item.productId);
            return product ? { ...product, addedAt: item.addedAt } : null;
        })
        .filter((p): p is Product & { addedAt: string } => p !== null)
        .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());

    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Wishlist ({wishlistProducts.length} items)</h2>
            </div>
             {wishlistProducts.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-lg text-gray-600">Your wishlist is empty.</p>
                    <p className="mt-2 text-sm text-gray-500">Add items you love to your wishlist to save them for later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistProducts.map(product => (
                        <WishlistProductCard 
                            key={product.id} 
                            product={product} 
                            onClick={() => navigateTo({ page: 'product', payload: product.id })}
                            onRemove={() => onRemoveFromWishlist(product.id)}
                            onMove={() => onMoveToBag(product.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};