
import React, { useState } from 'react';
// FIX: Updated import path for View type.
import type { View } from '../types';

interface LoginPageProps {
    onLogin: (email: string, password: string) => boolean;
    onNavigate: (view: View) => void;
    fromPage?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate, fromPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = onLogin(email, password);
        if (!success) {
            setError('Invalid email or password. Please try again.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    {fromPage && (
                        <p className="mt-2 text-center text-sm text-yellow-600">
                            You need to sign in to continue.
                        </p>
                    )}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <span className="text-gray-600">Not a member?</span>{' '}
                    <button onClick={() => onNavigate({ page: 'signup' })} className="font-medium text-gray-900 hover:text-gray-700">
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    );
}