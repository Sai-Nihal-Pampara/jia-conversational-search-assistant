import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon, PinterestIcon } from './icons/Socials';
import type { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <li>
    <button onClick={onClick} className="text-base text-gray-600 hover:text-gray-900 text-left">
      {children}
    </button>
  </li>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const showDemoAlert = (feature: string) => alert(`${feature} page is a demo and not yet implemented.`);

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Ajio</h3>
            <ul className="space-y-2">
              <FooterLink onClick={() => onNavigate({ page: 'about' })}>Who We Are</FooterLink>
              <FooterLink onClick={() => showDemoAlert('Join Our Team')}>Join Our Team</FooterLink>
              <FooterLink onClick={() => showDemoAlert('Terms & Conditions')}>Terms & Conditions</FooterLink>
              <FooterLink onClick={() => showDemoAlert('We Respect Your Privacy')}>We Respect Your Privacy</FooterLink>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Help</h3>
            <ul className="space-y-2">
              <FooterLink onClick={() => onNavigate({ page: 'placeholder', payload: 'Join Our Team' })}>Join Our Team</FooterLink>
              <FooterLink onClick={() => onNavigate({ page: 'placeholder', payload: 'Terms & Conditions' })}>Terms & Conditions</FooterLink>
              <FooterLink onClick={() => onNavigate({ page: 'placeholder', payload: 'We Respect Your Privacy' })}>We Respect Your Privacy</FooterLink>
              <FooterLink onClick={() => onNavigate({ page: 'placeholder', payload: 'Cancellations' })}>Cancellations</FooterLink>
              <FooterLink onClick={() => onNavigate({ page: 'placeholder', payload: 'New Arrivals' })}>New Arrivals</FooterLink>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Shop by</h3>
            <ul className="space-y-2">
              <FooterLink onClick={() => onNavigate({ page: 'category', payload: 'Men' })}>Men</FooterLink>
              <FooterLink onClick={() => onNavigate({ page: 'category', payload: 'Women' })}>Women</FooterLink>
              <FooterLink onClick={() => onNavigate({ page: 'category', payload: 'Kids' })}>Kids</FooterLink>
              <FooterLink onClick={() => showDemoAlert('New Arrivals')}>New Arrivals</FooterLink>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Follow us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Facebook</span><FacebookIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Instagram</span><InstagramIcon /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span><TwitterIcon /></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Pinterest</span><PinterestIcon /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; 2024 JIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};