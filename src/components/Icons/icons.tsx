import React from 'react';

interface IconProps {
  className?: string;
  fillColor?: string;
}

export const ChainIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ActionIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 4L7 20M17 4L11 20" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChainQueryIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WebIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M12 3V21M12 12C12 12 16 8.5 16 6C16 3.5 14.2091 2 12 2C9.79086 2 8 3.5 8 6C8 8.5 12 12 12 12Z" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AppsIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); 