import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const MicIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    {...props}
  >
    <defs>
      <radialGradient id="attractive-bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#2d1950" />
        <stop offset="100%" stopColor="#1b0f30" />
      </radialGradient>
      <linearGradient id="attractive-mic-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff79c6" />
        <stop offset="100%" stopColor="#bd93f9" />
      </linearGradient>
      <filter id="attractive-glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="64" cy="64" r="62" fill="url(#attractive-bg)" stroke="#bd93f9" strokeWidth="1.5" />

    {/* Microphone Icon */}
    <g style={{ filter: 'url(#attractive-glow)' }}>
      {/* Stand */}
      <path d="M 52 98 C 52 104, 76 104, 76 98" stroke="#f8f8f2" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <line x1="64" y1="84" x2="64" y2="98" stroke="#f8f8f2" strokeWidth="5" strokeLinecap="round"/>
      
      {/* Body */}
      <rect x="44" y="28" width="40" height="56" rx="20" fill="url(#attractive-mic-body)" stroke="#f8f8f2" strokeWidth="4" />

      {/* Grill Lines */}
      <line x1="54" y1="42" x2="74" y2="42" stroke="rgba(248, 248, 242, 0.5)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="54" y1="52" x2="74" y2="52" stroke="rgba(248, 248, 242, 0.5)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="54" y1="62" x2="74" y2="62" stroke="rgba(248, 248, 242, 0.5)" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  </svg>
);

