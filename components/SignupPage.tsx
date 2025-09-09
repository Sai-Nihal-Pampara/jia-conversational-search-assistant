
import React, { useState } from 'react';
import type { User } from '../types';
// FIX: Updated import path for View type.
import type { View } from '../types';

interface SignupPageProps {
    onSignup: (details: Omit<User, 'id' | 'cart'>) => boolean;
    onNavigate: (view: View) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        const success = onSignup({ name, email, password, phone });
        if (!success) {
            setError('An account with this email already exists.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                     <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                           <input name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                         <div>
                           <input name="phone" type="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <input name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                     <span className="text-gray-600">Already have an account?</span>{' '}
                    <button onClick={() => onNavigate({ page: 'login' })} className="font-medium text-gray-900 hover:text-gray-700">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}