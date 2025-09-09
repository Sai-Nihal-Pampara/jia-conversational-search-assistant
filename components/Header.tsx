import React, { useState } from 'react';
import {
  SearchIcon,
  HeartIcon,
  ShoppingBagIcon,
  MenuIcon
} from './icons/Icons';
import type { User, View } from '../types';
import { MegaMenu } from './MegaMenu';
import { MEGA_MENU_DATA } from '../constants';

interface HeaderProps {
  onNavigate: (view: View) => void;
  cartCount: number;
  currentUser: User | null;
  onLogout: () => void;
  onSearchSubmit: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  cartCount,
  currentUser,
  onLogout,
  onSearchSubmit
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    {
      label: 'MEN',
      view: { page: 'category', payload: 'Men' } as View,
      menuKey: 'Men'
    },
    { 
      label: 'WOMEN', 
      view: { page: 'category', payload: 'Women' } as View,
      menuKey: 'Women' // Added menuKey
    },
    { 
      label: 'KIDS', 
      view: { page: 'category', payload: 'Kids' } as View,
      menuKey: 'Kids' // Added menuKey
    },
    { 
      label: 'BEAUTY', 
      view: { page: 'category', payload: 'Beauty' } as View, 
      menuKey: 'Beauty' // Converted to menu button
    },
    { 
      label: 'HOME & KITCHEN', 
      view: { page: 'category', payload: 'Home' } as View, 
      menuKey: 'Home' // Converted to menu button
    },
  ];

  return (
    <header
      className='bg-white sticky top-0 z-30 shadow-sm'
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-24'>
          {/* --- LOGO (Left Side) --- */}
          <div className='flex items-center'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 -ml-2 mr-2 text-gray-600'
            >
              <MenuIcon className='h-6 w-6' />
            </button>
            <div
              className='cursor-pointer'
              onClick={() => onNavigate({ page: 'home' })}
            >
              <span className='text-5xl font-sans font-semibold tracking-tighter text-slate-800'>
                AJIA
              </span>
            </div>
          </div>

          {/* --- RIGHT SIDE CONTAINER --- */}
          <div className='flex flex-col items-end'>
            {/* --- Top Bar (Desktop Only) --- */}
            <div className='hidden md:flex items-center space-x-4 text-sm text-slate-700 mb-2'>
              {currentUser ? (
                <>
                  <span>Hi, {currentUser.name.split(' ')[0]}</span>
                  <button
                    onClick={() =>
                      onNavigate({ page: 'account', subpage: 'home' })
                    }
                    className='hover:text-black'
                  >
                    My Account
                  </button>
                  <button onClick={onLogout} className='hover:text-black'>
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate({ page: 'login' })}
                  className='hover:text-black'
                >
                  Sign In / Join
                </button>
              )}
              <button
                onClick={() => onNavigate({ page: 'customer-service' })}
                className='hover:text-black'
              >
                Customer Care
              </button>
              <button
                onClick={() => alert('AJIOLUXE page coming soon!')}
                className='bg-black text-white px-3 py-1.5 text-xs font-bold tracking-widest'
              >
                VISIT AJIALUXE
              </button>
            </div>

            {/* --- Main Nav & Actions (Desktop Only) --- */}
            <div className='hidden md:flex items-center space-x-6'>
              <nav className='flex items-center space-x-6'>
                {navItems.map(item =>
                  item.isLink ? (
                    <a
                      key={item.label}
                      href='#'
                      onMouseEnter={() => setActiveMenu(null)}
                      className='text-sm font-medium text-slate-700 hover:text-black'
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.label}
                      onMouseEnter={() => setActiveMenu(item.menuKey || null)}
                      onClick={() => onNavigate(item.view)}
                      className={`text-sm font-medium text-slate-700 hover:text-black pb-1 border-b-2 transition-colors ${
                        activeMenu === item.menuKey
                          ? 'border-pink-500'
                          : 'border-transparent'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </nav>
              <form onSubmit={handleSearch} className='relative w-72'>
                <input
                  className='block w-full bg-yellow-50 border border-slate-400 rounded-full py-2 pl-5 pr-10 text-sm placeholder-slate-500 focus:outline-none focus:bg-white focus:border-slate-600'
                  placeholder='Search AJIO'
                  type='search'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button
                  type='submit'
                  aria-label='Submit search'
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                >
                  <SearchIcon className='h-5 w-5 text-slate-500' />
                </button>
              </form>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() =>
                    onNavigate({ page: 'account', subpage: 'wishlists' })
                  }
                  className='bg-slate-800 text-white rounded-full p-2 hover:bg-slate-600'
                >
                  <HeartIcon className='h-6 w-6' />
                </button>
                <button
                  onClick={() => onNavigate({ page: 'cart' })}
                  className='relative bg-slate-800 text-white rounded-full p-2 hover:bg-slate-600'
                >
                  <ShoppingBagIcon className='h-6 w-6' />
                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-medium'>
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Icons (Cart) */}
          <div className='md:hidden flex items-center space-x-2'>
            <button
              onClick={() => onNavigate({ page: 'cart' })}
              className='relative p-2 text-gray-700 hover:text-gray-900'
            >
              <ShoppingBagIcon className='h-6 w-6' />
              {cartCount > 0 && (
                <span
                  className='absolute top-0 right-0 block h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-medium'
                  style={{ transform: 'translate(40%, -40%)' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {activeMenu && MEGA_MENU_DATA[activeMenu] && (
        <MegaMenu data={MEGA_MENU_DATA[activeMenu]} />
      )}

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden border-t`}
      >
        {/* --- Mobile Search Bar --- */}
        <div className='p-4'>
          <form onSubmit={handleSearch} className='relative'>
            <input
              className='block w-full bg-gray-100 border border-transparent rounded-lg py-2 pl-5 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-400'
              placeholder='Search AJIO'
              type='search'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              aria-label='Submit search'
              className='absolute inset-y-0 right-0 pr-4 flex items-center'
            >
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </button>
          </form>
        </div>
        {/* --- Mobile Nav Links --- */}
        <nav className='px-2 pt-2 pb-4 border-t'>
          {navItems.map(item =>
            item.isLink ? (
              <a
                key={item.label}
                href='#'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
              >
                {item.label}
              </a>
            ) : (
              <button
                onClick={() => {
                  onNavigate(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
};