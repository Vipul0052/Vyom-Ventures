export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Left Group: Logo */}
        <div className="footer-left-group">
          <div className="footer-logo">
            <img src="/Vyom Logo.svg" alt="Vyom Nexus" className="footer-logo-svg" />
          </div>
        </div>

        {/* Middle Group: Social Links */}
        <div className="footer-social-links">
          <a 
            href="https://www.instagram.com/nexusvyom/" 
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
            href="https://www.facebook.com/profile.php?id=61591272341504" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-icon-link" 
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
        </div>

        {/* Right Group: Copyright & Agency Credit */}
        <div className="footer-copyright font-mono-accent">
          <div>© {new Date().getFullYear()} Vyom Nexus. All rights reserved.</div>
          <div className="footer-credits">
            Developed & Managed by{' '}
            <a 
              href="https://polygonshift.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="agency-link"
            >
              Polygon Shift
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
