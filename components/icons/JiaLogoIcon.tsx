import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const JiaLogoIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}
  >
    <defs>
      <linearGradient id="jia-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text
      x="50%"
      y="52%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="32"
      fontWeight="bold"
      fontFamily="Inter, sans-serif"
      letterSpacing="-1.5"
      fill="url(#jia-gradient)"
      style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))' }}
    >
      JIA
    </text>
  </svg>
);