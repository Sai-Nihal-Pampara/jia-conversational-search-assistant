
import React, { useState } from 'react';
import type { User } from '../types';
// FIX: Updated import path for View type.
import type { View } from '../types';
import { UserCircleIcon, XIcon, ChevronRightIcon, ChevronDownIcon } from './icons/Icons';
import { SIDEBAR_DATA } from '../constants';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User | null;
    onNavigate: (view: View) => void;
    onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentUser, onNavigate, onLogout }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const handleItemClick = (action: View | 'signout' | { type: 'alert', message: string }) => {
        if (typeof action === 'string' && action === 'signout') {
            onLogout();
            onClose();
        } else if (typeof action === 'object' && 'type' in action && action.type === 'alert') {
            alert(action.message);
        } else if (typeof action === 'object' && 'page' in action) {
            onNavigate(action as View);
        }
    };
    
    const toggleSection = (title: string) => {
        setExpandedSections(prev => ({...prev, [title]: !prev[title]}));
    }

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Sidebar Panel */}
            <aside
                className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sidebar-title"
            >
                <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
                     <div className="flex items-center">
                        <UserCircleIcon className="h-8 w-8" />
                        <h2 id="sidebar-title" className="text-xl font-bold ml-3">
                            Hello, {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                        </h2>
                    </div>
                     <button onClick={onClose} className="p-1 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>
                
                <nav className="overflow-y-auto h-[calc(100%-72px)] pb-10">
                    {SIDEBAR_DATA.map((section, sectionIndex) => (
                        <div key={section.title} className={sectionIndex > 0 ? 'border-t border-gray-200' : ''}>
                           <h3 className="px-5 pt-5 pb-2 text-xl font-bold text-gray-900">{section.title}</h3>
                            <ul>
                                {section.items.map(item => (
                                    <li key={item.label}>
                                        <a onClick={() => handleItemClick(item.action)} className="flex justify-between items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                                            <span>{item.label}</span>
                                            {item.hasArrow && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
                                        </a>
                                    </li>
                                ))}
                                {section.collapsible && !expandedSections[section.title] && (
                                    <li>
                                        <a onClick={() => toggleSection(section.title)} className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                                            <span>{section.collapsible.label}</span>
                                            <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2" />
                                        </a>
                                    </li>
                                )}
                                {section.collapsible && expandedSections[section.title] && (
                                     <>
                                        {section.collapsible.items.map(item => (
                                             <li key={item.label}>
                                                <a onClick={() => handleItemClick(item.action)} className="flex justify-between items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                                                    <span>{item.label}</span>
                                                     {item.hasArrow && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
                                                </a>
                                            </li>
                                        ))}
                                         <li>
                                            <a onClick={() => toggleSection(section.title)} className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                                                <span>See less</span>
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2 transform rotate-180" />
                                            </a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};