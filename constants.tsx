import React from 'react';

// Using SVG components directly
export const Icons = {
  Check: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  X: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  CheckCircle: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Lock: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Shield: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  SafetyBadge: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  ),
  CreditCard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  ),
  Sun: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="M4.93 4.93l1.41 1.41"></path>
        <path d="M17.66 17.66l1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="M6.34 17.66l-1.41 1.41"></path>
        <path d="M19.07 4.93l-1.41 1.41"></path>
        {/* Adjusted circle to look a bit more like the logo */}
        <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
        <path d="M12 16a4 4 0 0 0 0-8 2 2 0 0 1 0 4 2 2 0 0 1 0 4 2 2 0 0 1 0 4z" fill="currentColor" opacity="0.2"></path>
      </svg>
  ),
  Pix: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  Visa: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="20" className="fill-blue-800">
      <path d="M10.15 15.65h-2.5L5.75 3.5h2.6l1.2 7.75 2.85-7.75h2.7l-4.95 12.15zm6.85-11.8c-.85-.35-2.2-.7-3.95-.7-4.35 0-7.4 2.3-7.45 5.6-.05 2.45 2.2 3.8 3.85 4.6 1.7.85 2.3 1.4 2.3 2.15 0 1.15-1.4 1.7-2.7 1.7-1.8 0-2.8-.25-4.25-.9l-.6-.3-.65 3c1.1.5 3.1.95 5.15.95 4.85 0 8-2.35 8.05-6 .05-2-1.2-3.5-3.8-4.75-1.6-.8-2.55-1.35-2.55-2.15 0-.75.85-1.5 2.7-1.5 1.5 0 2.6.35 3.45.7l.4.2.4-2.9zM22.75 3.5h-2c-.6 0-1.05.35-1.35 1.05l-3.8 9.1-1.3-6.6c-.25-1.15-1-2.4-2.65-3.05l1.75 8.6L16.25 3.5h2.6l3.9 12.15h2.7L22.75 3.5zM3.45 3.5H.2L0 4.65C2.5 5.6 5.3 6.15 6.65 7.1L7.55 3.5H3.45z"/>
    </svg>
  ),
  Mastercard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="20">
      <g fill="none" fillRule="evenodd">
        <rect width="32" height="20" rx="2" fill="#252525"/>
        <circle cx="9" cy="10" r="6" fill="#EB001B"/>
        <circle cx="15" cy="10" r="6" fill="#F79E1B" fillOpacity=".9"/>
      </g>
    </svg>
  ),
  Amex: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="20" className="fill-blue-500">
       <rect width="32" height="20" rx="2" fill="#006FCF"/>
       <path d="M4.5 5.5h2l1 2 1-2h2l-2 4 2 4h-2l-1-2-1 2h-2l2-4-2-4zm6.5 0h6v1h-4v2h4v1h-4v3h-2v-7zm7.5 0h2l1.5 3 1.5-3h2l-2.5 4.5 2.5 4.5h-2l-1.5-3-1.5 3h-2l2.5-4.5-2.5-4.5z" fill="#FFF"/>
    </svg>
  ),
  Elo: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="20">
      <rect width="32" height="20" rx="2" fill="#000"/>
      <circle cx="8" cy="6" r="2" fill="#FF0000"/>
      <circle cx="16" cy="14" r="2" fill="#FFFF00"/>
      <circle cx="24" cy="6" r="2" fill="#00FF00"/>
      <path d="M6 14h20v2H6z" fill="#FFF"/>
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  )
};

export const PRODUCT_NAME = "Solar sem Limites";
export const UNIT_PRICE = 2800; // Numeric value for calculations
export const CREDIT_CARD_SURCHARGE = 0.10; // 10% increase

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};