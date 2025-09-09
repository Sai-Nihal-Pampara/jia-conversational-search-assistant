import React from 'react';
import type { View, User, Order, Wishlist, Product } from '../types';
import { AccountHomePage } from './AccountHomePage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { WishlistPage } from './WishlistPage';
import { ProfileSettingsPage } from './ProfileSettingsPage';

interface AccountPageProps {
    view: Extract<View, { page: 'account' }>;
    navigateTo: (view: View) => void;
    currentUser: User;
    orders: Order[];
    wishlists: Wishlist[];
    allProducts: Product[];
    onUpdateProfile: (details: Partial<User>) => void;
    onRemoveFromWishlist: (productId: string) => void;
    onMoveToBag: (productId: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = (props) => {
    const { view, navigateTo, currentUser } = props;

    const navItems = [
        { key: 'home', label: 'Account Home' },
        { key: 'orders', label: 'Your Orders' },
        { key: 'wishlists', label: 'Your Wishlists' },
        { key: 'profile', label: 'Login & Security' },
    ];

    const renderSubPage = () => {
        switch (view.subpage) {
            case 'home':
                return <AccountHomePage navigateTo={navigateTo} currentUser={currentUser} />;
            case 'orders':
                return <OrderHistoryPage orders={props.orders} />;
            case 'wishlists':
                return (
                    <WishlistPage 
                        wishlists={props.wishlists} 
                        allProducts={props.allProducts}
                        navigateTo={props.navigateTo}
                        onRemoveFromWishlist={props.onRemoveFromWishlist}
                        onMoveToBag={props.onMoveToBag}
                    />
                );
            case 'profile':
                return <ProfileSettingsPage currentUser={props.currentUser} onUpdateProfile={props.onUpdateProfile} />;
            default:
                return <AccountHomePage navigateTo={navigateTo} currentUser={currentUser} />;
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Your Account</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                    <nav className="space-y-1">
                        {navItems.map(item => (
                            <button
                                key={item.key}
                                onClick={() => navigateTo({ page: 'account', subpage: item.key as any })}
                                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    view.subpage === item.key
                                        ? 'bg-gray-200 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>
                <main className="md:col-span-3">
                    {renderSubPage()}
                </main>
            </div>
        </div>
    );
};
