export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Left Group: Logo */}
        <div className="footer-left-group">
          <div className="footer-logo">
            <img src="/download.svg?v=23" alt="Vyom Ventures" className="footer-logo-svg" style={{ objectFit: 'contain', height: '28px', width: 'auto' }} />
          </div>
        </div>

        {/* Middle Group: Social Links */}
        <div className="footer-social-links">
          <a 
            href="https://www.instagram.com/vyomnexus" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-icon-link" 
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-icon-link" 
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a 
            href="https://www.youtube.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-icon-link" 
            aria-label="YouTube"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
          </a>
        </div>

        {/* Right Group: Copyright */}
        <div className="footer-copyright font-mono-accent">
          © {new Date().getFullYear()} Vyom Ventures. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
