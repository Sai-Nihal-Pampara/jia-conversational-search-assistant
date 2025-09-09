import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const JiaNewLogo: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    {...props}
  >
    <defs>
      <radialGradient id="attractive-logo-bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#2d1950" />
        <stop offset="100%" stopColor="#1b0f30" />
      </radialGradient>
      <linearGradient id="attractive-logo-text" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8f8f2" />
        <stop offset="100%" stopColor="#e0e0e0" />
      </linearGradient>
      <filter id="attractive-logo-glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="64" cy="64" r="62" fill="url(#attractive-logo-bg)" stroke="#bd93f9" strokeWidth="1.5" />

    {/* Text */}
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="48"
      fontWeight="300"
      fontFamily="'Segoe UI Light', 'Roboto', sans-serif"
      fill="url(#attractive-logo-text)"
      letterSpacing="1"
      style={{ filter: 'url(#attractive-logo-glow)' }}
    >
      JIA
    </text>
  </svg>
);

