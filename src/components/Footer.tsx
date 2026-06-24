export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Left Group: Logo */}
        <div className="footer-left-group">
          <div className="footer-logo">
            <img src="/download.svg?v=23" alt="Vyom Nexus" className="footer-logo-svg" style={{ objectFit: 'contain', height: '28px', width: 'auto' }} />
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
