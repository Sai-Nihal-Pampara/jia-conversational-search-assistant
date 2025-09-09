
import React from 'react';
// FIX: Updated import path for View type.
import type { View } from '../types';
import type { User } from '../types';

interface AccountHomePageProps {
    navigateTo: (view: View) => void;
    currentUser: User;
}

const FeatureCard: React.FC<{ title: string; description: string; onClick: () => void; }> = ({ title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="p-6 border rounded-lg hover:shadow-lg hover:border-gray-400 transition-all cursor-pointer"
    >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
);

export const AccountHomePage: React.FC<AccountHomePageProps> = ({ navigateTo, currentUser }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {currentUser.name}!
            </h2>
            <p className="mt-2 text-gray-600">
                From here, you can manage your orders, update your profile information, and view your wishlists.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                    title="Your Orders" 
                    description="Track, return, or buy things again." 
                    onClick={() => navigateTo({ page: 'account', subpage: 'orders' })}
                />
                <FeatureCard 
                    title="Login & Security" 
                    description="Edit login, name, and mobile number." 
                    onClick={() => navigateTo({ page: 'account', subpage: 'profile' })}
                />
                 <FeatureCard 
                    title="Your Wishlists" 
                    description="Manage your wishlists and saved items." 
                    onClick={() => navigateTo({ page: 'account', subpage: 'wishlists' })}
                />
                 <FeatureCard 
                    title="Memberships" 
                    description="View your memberships & subscriptions." 
                    onClick={() => navigateTo({ page: 'placeholder', payload: 'Memberships' })}
                />
                 <FeatureCard 
                    title="Payment Options" 
                    description="Edit or add payment methods." 
                    onClick={() => navigateTo({ page: 'placeholder', payload: 'Payment Options' })}
                />
                 <FeatureCard 
                    title="Contact Us" 
                    description="Get help with your account and orders." 
                    onClick={() => navigateTo({ page: 'customer-service' })}
                />
            </div>
        </div>
    );
};