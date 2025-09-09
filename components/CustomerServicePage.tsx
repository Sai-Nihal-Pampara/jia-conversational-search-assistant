
import React from 'react';
import type { User, View } from '../types';
import { PackageIcon, ReturnIcon, AddressIcon, PrimeIcon, PaymentIcon, AccountSettingsIcon, DeviceSupportIcon, SearchIcon, ChevronRightIcon } from './icons/Icons';

interface CustomerServicePageProps {
    currentUser: User | null;
    navigateTo: (view: View) => void;
}

const HelpCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-start text-left p-4 border rounded-lg hover:shadow-md hover:border-gray-300 transition-all cursor-pointer space-x-4 h-full"
    >
        <div className="flex-shrink-0 text-gray-700 w-8 h-8">{icon}</div>
        <div>
            <h3 className="text-md font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
    </button>
);


const HelpTopicSection: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
    <div>
        <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
        <ul className="space-y-2">
            {links.map(link => (
                <li key={link}>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert("This is a demo link."); }} className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

export const CustomerServicePage: React.FC<CustomerServicePageProps> = ({ currentUser, navigateTo }) => {
    const helpOptions = [
        { 
            icon: <PackageIcon className="w-8 h-8" />, 
            title: 'Your Orders', 
            description: 'Track packages, Edit or cancel orders', 
            onClick: () => navigateTo({ page: 'account', subpage: 'orders' }) 
        },
        { 
            icon: <ReturnIcon className="w-8 h-8" />, 
            title: 'Returns and Refunds', 
            description: 'Return or exchange items, Print mailing labels', 
            onClick: () => navigateTo({ page: 'placeholder', payload: 'Returns and Refunds' }) 
        },
        { 
            icon: <AddressIcon className="w-8 h-8" />, 
            title: 'Manage Addresses', 
            description: 'Update your addresses, Add address, landmark details', 
            onClick: () => navigateTo({ page: 'placeholder', payload: 'Returns and Refunds' }) 
        },
        { 
            icon: <PrimeIcon className="w-12 h-8" />, 
            title: 'Manage Prime', 
            description: 'View your benefits, Membership details', 
            onClick: () => navigateTo({ page: 'placeholder', payload: 'Returns and Refunds' }) 
        },
        { 
            icon: <PaymentIcon className="w-8 h-8" />, 
            title: 'Payment Settings', 
            description: 'Add or edit payment methods, Change expired debit or credit card', 
            onClick: () => navigateTo({ page: 'placeholder', payload: 'Returns and Refunds' }) 
        },        
        { 
            icon: <AccountSettingsIcon className="w-8 h-8" />, 
            title: 'Account Settings', 
            description: 'Change your email or password, Update login information', 
            onClick: () => navigateTo({ page: 'account', subpage: 'profile' })
        },
        { 
            icon: <DeviceSupportIcon className="w-8 h-8" />, 
            title: 'Digital Services and Device Support', 
            description: 'Find device help and support, Troubleshoot device issues', 
            onClick: () => navigateTo({ page: 'placeholder', payload: 'Returns and Refunds' }) 
        },
    ];
    
    const browseTopics = {
        recommended: [
            "Shipping & Delivery", "Returns, Refunds, Replacement", "Ordering", "Managing Your Account", "AJIO Prime", "Payments & Pricing", "Product Troubleshooting"
        ],
        learnHowTo: [
            "Tracking your Package", "Product Troubleshooting - All Help Topics", "Damaged and Defective Products - FAQ", "Returns and Replacements - FAQ", "Checking the Status of your Refund", "Return Pick-up Issues"
        ],
        tryItYourself: [
            "Track your order", "Manage Your Returns", "Check the Status of your Refund", "Change Your Language Preference", "Manage Your Payment Methods"
        ]
    };


    return (
        <div className="max-w-screen-xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
                {currentUser ? `Hi, ${currentUser.name.split(' ')[0]}.` : 'Hello.'} What can we help you with?
            </h1>
            
            <div className="mt-10 border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Some things you can do here</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {helpOptions.map(option => (
                        <HelpCard key={option.title} {...option} />
                    ))}
                </div>
            </div>

            <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find more solutions</h2>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder='Type something like, "question about a charge"'
                        className="block w-full bg-white border border-gray-300 rounded-md py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    />
                </div>
            </div>

            <div className="mt-12 border-t pt-8">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">Browse Help Topics</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex justify-between items-center font-semibold text-gray-800 mb-3 cursor-pointer hover:text-gray-900">
                             <h4>Recommended Topics</h4>
                             <ChevronRightIcon className="h-4 w-4" />
                        </div>
                        <ul className="space-y-2 border-l pl-4">
                            {browseTopics.recommended.map(link => (
                                <li key={link}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); alert("This is a demo link."); }} className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                                        {link}
                                    </a>
                                </li>
                             ))}
                        </ul>
                    </div>
                    <HelpTopicSection title="Learn how to..." links={browseTopics.learnHowTo} />
                    <HelpTopicSection title="Try it Yourself" links={browseTopics.tryItYourself} />
                 </div>
            </div>
        </div>
    );
};