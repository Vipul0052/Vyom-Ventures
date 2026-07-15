import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';

interface HeroProps {
  onLoadingComplete?: () => void;
}

export default function Hero({ onLoadingComplete }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const loadingLineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(overlayRef.current, { display: 'flex', opacity: 1 });
      gsap.set(loadingLineRef.current, { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-word-anim', { y: 60, opacity: 0 });
      gsap.set(subtextRef.current, { opacity: 0 });
      gsap.set(ctasRef.current, { y: 20, opacity: 0 });
      gsap.set(rightSideRef.current, { opacity: 0, x: 40 });

      // 2. Timeline Creation
      const tl = gsap.timeline();

      // Step 1: Thin gold line draws left-to-right (0.4s)
      tl.to(loadingLineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // Step 2: Loader mask fades out to reveal dark navy screen
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }
      }, '+=0.1');

      // Step 4: Headline words stagger y:60 -> y:0, opacity 0->1, 80ms delay
      tl.to('.hero-word-anim', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power4.out',
      }, '-=0.1');

      // Step 5: Subtext and dashboard cards fade in
      tl.to([subtextRef.current, rightSideRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.2');

      // Step 6: CTA buttons slide up last
      tl.to(ctasRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3');

    }, containerRef);

    return () => ctx.revert();
  }, [onLoadingComplete]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const line1 = ["Ideas", "Into"];
  const line2 = ["Action"];

  return (
    <section ref={containerRef} id="hero" className="hero-section">
      {/* Intro cinematic loader overlay */}
      <div ref={overlayRef} className="hero-loader-overlay">
        <div className="hero-loader-content">
          <img src="/Vyom Logo.svg" alt="Vyom Nexus" className="loader-logo-svg" />
          <div className="loader-line-wrapper">
            <div ref={loadingLineRef} className="hero-loader-line" />
          </div>
        </div>
      </div>

      <div className="hero-grid">
        {/* Left aligned content column */}
        <div className="hero-content">
          {/* Ambient background gold glow behind text */}
          <div className="hero-headline-glow" />

          {/* Headline */}
          <h1 className="hero-headline" style={{ marginTop: '2rem' }}>
            <div className="headline-line">
              {line1.map((word, idx) => (
                <span key={idx} className="word-wrapper">
                  <span className="hero-word-anim display-serif-italic">{word}</span>
                </span>
              ))}
            </div>
            <div className="headline-line">
              {line2.map((word, idx) => (
                <span key={idx} className="word-wrapper">
                  <span className="hero-word-anim">{word}</span>
                </span>
              ))}
            </div>
          </h1>

          {/* Subtext */}
          <p ref={subtextRef} className="hero-subtext">
            Vyom Nexus is a business consultancy and project management company that helps entrepreneurs, restaurants, cafés, and hospitality businesses build, launch, and grow successful businesses. From business planning and restaurant setup to branding, marketing, and operations, we provide complete end-to-end solutions under one roof.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="hero-ctas">
            <Magnetic>
              <a href="#contact" className="cta-primary-btn" onClick={(e) => handleCtaClick(e, 'contact')}>
                Start Project
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#services" className="cta-secondary-btn" onClick={(e) => handleCtaClick(e, 'services')}>
                Explore Services <span className="arrow-icon">→</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right side floating dashboard cards stack */}
        <div ref={rightSideRef} className="hero-cards-side">
          <div className="hero-cards-wrapper">
            {/* Card 1: Project Progress */}
            <div className="floating-card floating-card-1">
              <div className="card-tag">Project Status</div>
              <h3>Cloud Kitchen Gurugram</h3>
              <div className="progress-label">
                <span>Phase: Launch Checklist</span>
                <span>Week 4/10</span>
              </div>
              <div className="card-progress-bar">
                <div className="progress-fill" style={{ width: '40%' }}></div>
              </div>
            </div>

            {/* Card 2: Revenue Targets */}
            <div className="floating-card floating-card-2">
              <div className="card-tag">Performance metrics</div>
              <h3>Yearly Revenue Growth</h3>
              <div className="stat-value">Upto ₹1 Cr</div>
              <div className="progress-label">
                <span>78% achieved</span>
                <span className="gold-text">+12% vs last month</span>
              </div>
              <div className="card-progress-bar">
                <div className="progress-fill" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Card 3: Active Projects */}
            <div className="floating-card floating-card-3">
              <div className="card-tag">Scale</div>
              <div className="active-projects-layout">
                <div className="circle-pulse-container">
                  <div className="circle-pulse" />
                </div>
                <div>
                  <h3>12 Active Builds</h3>
                  <p className="card-desc">Across NCR & Bengaluru</p>
                </div>
              </div>
            </div>

            {/* Card 4: Marketing Performance */}
            <div className="floating-card floating-card-4">
              <div className="card-tag">Marketing ROI</div>
              <h3>Q3 Digital Campaigns</h3>
              <div className="stat-value">4.2x ROAS</div>
              <div className="progress-label">
                <span>1.2k+ Leads Generated</span>
                <span className="gold-text">+24% vs last month</span>
              </div>
              <div className="card-progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
