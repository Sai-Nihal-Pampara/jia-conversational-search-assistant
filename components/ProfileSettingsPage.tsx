
import React, { useState } from 'react';
import type { User } from '../types';

interface ProfileSettingsPageProps {
    currentUser: User;
    onUpdateProfile: (details: Partial<User>) => void;
}

export const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({ currentUser, onUpdateProfile }) => {
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateProfile({ name, email, phone });
    };

    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500";

    return (
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Login & Security</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={inputClasses} />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} />
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Mobile Phone Number</label>
                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className={inputClasses} />
                </div>
                 <div>
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Save Changes
                    </button>
                </div>
            </form>

            <div className="mt-8 border-t pt-6">
                 <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
                 <p className="text-sm text-gray-600 mt-1">For security, this feature is not available in this demo.</p>
                 <button disabled className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed">
                    Change Password
                </button>
            </div>
        </div>
    );
};
