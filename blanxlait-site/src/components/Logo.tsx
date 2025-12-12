import React from 'react';

interface LogoProps {
  onNavigateHome?: () => void;
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ onNavigateHome, variant = 'dark' }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = '';
    }
  };

  const className = variant === 'light' ? 'logo logo-light' : 'logo';

  return (
    <a href="/" onClick={handleClick} className={className}>
      <div className="logo-icon">
        <div className="logo-dot"></div>
      </div>
      <span>
        BLANXL
        <span className="logo-ai">AI</span>
        T
      </span>
    </a>
  );
};

export default Logo;
