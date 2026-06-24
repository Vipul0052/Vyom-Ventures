import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';

export default function Navbar({ isLoading }: { isLoading?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animate overlay open
      gsap.to(menuOverlayRef.current, {
        y: '0%',
        duration: 0.6,
        ease: 'power4.inOut',
      });
      // Stagger animate links in
      const links = menuLinksRef.current?.querySelectorAll('.mobile-menu-link');
      if (links) {
        gsap.fromTo(
          links,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
        );
      }
    } else {
      document.body.style.overflow = '';
      // Animate overlay close
      gsap.to(menuOverlayRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar-main ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''} ${!isLoading ? 'visible' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#" className="nav-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
            <img src="/download.svg?v=23" alt="Vyom Nexus" className="logo-svg" style={{ objectFit: 'contain', height: '26px', width: 'auto' }} />
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop">
            <a href="#about" className="nav-link-underline" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
            <a href="#services" className="nav-link-underline" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
            <a href="#process" className="nav-link-underline" onClick={(e) => handleLinkClick(e, 'process')}>Process</a>
            <a href="#industries" className="nav-link-underline" onClick={(e) => handleLinkClick(e, 'industries')}>Industries</a>
            <a href="#why-us" className="nav-link-underline" onClick={(e) => handleLinkClick(e, 'why-us')}>Why Us</a>
          </div>

          {/* CTA Button */}
          <div className="nav-cta-desktop">
            <Magnetic>
              <a href="#contact" className="bordered-pill-btn" onClick={(e) => handleLinkClick(e, 'contact')}>
                <span>Let's Build</span>
                <span className="btn-arrow">→</span>
              </a>
            </Magnetic>
          </div>

          {/* Hamburger Menu Icon */}
          <button className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div ref={menuOverlayRef} className="mobile-menu-overlay" style={{ transform: 'translateY(-100%)' }}>
        <div ref={menuLinksRef} className="mobile-menu-links">
          <a href="#about" className="mobile-menu-link" onClick={(e) => handleLinkClick(e, 'about')}>
            <span className="mono-num">01.</span> About
          </a>
          <a href="#services" className="mobile-menu-link" onClick={(e) => handleLinkClick(e, 'services')}>
            <span className="mono-num">02.</span> Services
          </a>
          <a href="#process" className="mobile-menu-link" onClick={(e) => handleLinkClick(e, 'process')}>
            <span className="mono-num">03.</span> Process
          </a>
          <a href="#industries" className="mobile-menu-link" onClick={(e) => handleLinkClick(e, 'industries')}>
            <span className="mono-num">04.</span> Industries
          </a>
          <a href="#why-us" className="mobile-menu-link" onClick={(e) => handleLinkClick(e, 'why-us')}>
            <span className="mono-num">05.</span> Why Us
          </a>
          <a href="#contact" className="mobile-menu-link contact-menu-link" onClick={(e) => handleLinkClick(e, 'contact')}>
            <span className="mono-num">06.</span> Contact
          </a>
        </div>
      </div>
    </>
  );
}
