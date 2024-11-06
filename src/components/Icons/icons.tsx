import React from 'react';

interface IconProps {
  className?: string;
  fillColor?: string;
}



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

export const CodeIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6L2 12L8 18" stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BuildIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15H8.5C7.11929 15 6 13.8807 6 12.5C6 11.1193 7.11929 10 8.5 10H12M12 15H15.5C16.8807 15 18 13.8807 18 12.5C18 11.1193 16.8807 10 15.5 10H12M12 15V10" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 19L15.5 21M9.5 19L8.5 21M12 17V19" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 5L15.5 3M9.5 5L8.5 3M12 7V5" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PublishIcon: React.FC<IconProps> = ({ className = "h-6 w-6", fillColor = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15V3M12 3L8 7M12 3L16 7" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 21H4M4 12H8M16 12H20" 
      stroke={fillColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);