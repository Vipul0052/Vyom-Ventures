export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Logo left */}
        <div className="footer-logo">
          <svg viewBox="0 0 100 100" className="footer-logo-svg" fill="none">
            <path d="M25 35 L50 75" stroke="var(--color-gold)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M50 75 L75 15" stroke="var(--color-gold)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M62 25 L75 15 L77 31" stroke="var(--color-gold)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="footer-brand font-mono-accent">VYOM</span>
        </div>

        {/* © center */}
        <div className="footer-copyright font-mono-accent">
          © {new Date().getFullYear()} Vyom Ventures. All rights reserved.
        </div>

        {/* Location right */}
        <div className="footer-location font-mono-accent">
          Gurugram, India
        </div>
      </div>
    </footer>
  );
}
