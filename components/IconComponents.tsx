import React from 'react';

export const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const LanguageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 9.8c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="10" r="3" />
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
  </svg>
);

export const SaveIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
    </svg>
);

export const HistoryIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M1 4v6h6" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
);


export const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const GrowFuseLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Poppins, sans-serif"
      fontSize="24"
      fontWeight="600"
      letterSpacing="1"
      fill="url(#logoGradient)"
    >
      GrowFuse
    </text>
  </svg>
);

export const LeafIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.5.38C7.16 19.11 8 18.05 8 17c0-1.1-.9-2-2-2s-2 .9-2 2c0 .34.08.66.23.94L3.5 22l-1.09-.32c.5-1.57 1.44-3.53 2.72-5.4C7.38 12.67 10.38 8 17 8z"/>
    </svg>
);

export const LeftIllustration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-50 250 Q 150 210, 350 250" />
    <path d="M-50 260 Q 150 225, 350 255" opacity="0.6" />
    <path d="M80 247C75 200 105 180 110 140" />
    <path d="M110 140C115 160 95 170 105 185" />
    <path d="M110 140C105 160 125 170 115 185" />
    <path d="M112 140C117 155 105 165 110 175" />
    <path d="M180 250C175 210 205 200 210 170" />
    <path d="M210 170C215 185 195 190 205 205" />
  </svg>
);

export const RightIllustration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-50 250 Q 150 210, 350 250" />
    <path d="M-50 260 Q 150 225, 350 255" opacity="0.6" />
    <g transform="translate(150, 155) scale(1.2)">
      <path d="M0 95 L 0 55" />
      <path d="M0 55 C -20 55, -15 30, 0 30 C 15 30, 20 55, 0 55" />
      <circle cx="0" cy="22" r="6" />
      <path d="M-20 80 C -10 70, 10 70, 20 80" />
      <path d="M-20 80 L -25 95" />
      <path d="M20 80 L 25 95" />
      <path d="M0 75 C -30 70, -40 85, -40 95" />
    </g>
  </svg>
);

export const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const FarmIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 20H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h8" />
        <path d="M12 20V11" />
        <path d="M12 11h9a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-9" />
        <path d="M12 11V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v5" />
        <path d="M18 9h-3" />
    </svg>
);

export const ListIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

export const SproutIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7 20h10" />
        <path d="M12 20V4" />
        <path d="M12 4c-1.5 0-3 1.2-3 2.5S10.5 9 12 9s3-1.2 3-2.5S13.5 4 12 4z" />
        <path d="M7 11h10" />
    </svg>
);