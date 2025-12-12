import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onNavigatePrivacy?: () => void;
  onNavigateTerms?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigatePrivacy, onNavigateTerms }) => {
  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigatePrivacy) {
      onNavigatePrivacy();
    } else {
      window.location.hash = 'privacy';
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateTerms) {
      onNavigateTerms();
    } else {
      window.history.pushState({}, '', '/terms');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="light" />
            <p className="footer-description">
              Developing AI-native software solutions that transform how small and medium businesses operate. 
              AI at the core, not as an afterthought.
            </p>
            <div className="footer-social">
              <a href="https://linkedin.com/company/blanxlait" className="social-link" target="_blank" rel="noopener noreferrer">
                <span>in</span>
              </a>
              <a href="https://twitter.com/blanxlait" className="social-link" target="_blank" rel="noopener noreferrer">
                <span>𝕏</span>
              </a>
              <a href="https://github.com/blanxlait" className="social-link" target="_blank" rel="noopener noreferrer">
                <span>⚡</span>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">AI-Native Applications</a></li>
              <li><a href="#" className="footer-link">Process Automation</a></li>
              <li><a href="#" className="footer-link">AI Strategy Consulting</a></li>
              <li><a href="#" className="footer-link">Implementation Support</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#about" className="footer-link">About Us</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Case Studies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 BLANXLAIT. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="/privacy" onClick={handlePrivacyClick} className="footer-link">Privacy Policy</a>
            <a href="/terms" onClick={handleTermsClick} className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
