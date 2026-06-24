export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Left Group: Logo and Location */}
        <div className="footer-left-group">
          <div className="footer-logo">
            <img src="/download.svg?v=15" alt="Vyom Nexus" className="footer-logo-svg" style={{ objectFit: 'contain', height: '90px', width: 'auto', margin: '-25px 0' }} />
          </div>
          <div className="footer-location font-mono-accent">
            Gurugram, India
          </div>
        </div>

        {/* Right Group: Copyright */}
        <div className="footer-copyright font-mono-accent">
          © {new Date().getFullYear()} Vyom Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
