import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

function StatItem({ end, prefix = '', suffix = '', decimals = 0, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const duration = 1.5; // 1.5 seconds count duration

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * end;
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end]);

  const isAnimating = count < end;
  // If decimals is 0, but end is 5 or less, show 1 decimal point during animation for smoothness
  const displayDecimals = decimals > 0 ? decimals : (end <= 5 && isAnimating ? 1 : 0);

  return (
    <div ref={elementRef} className="stat-card">
      <div className="stat-number">
        {prefix}
        {count.toFixed(displayDecimals)}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about-section">
      {/* Background Watermark */}
      <div className="about-watermark">∞</div>

      <div className="about-container">
        {/* Monospace section tag */}
        <div className="section-tag-container">
          <span className="font-mono-accent">01 // Who We Are</span>
        </div>

        <div className="about-grid">
          {/* Left Column: Big Quote */}
          <div className="about-left">
            <h2 className="about-quote display-serif-italic">
              “Building businesses through planning, execution & growth.”
            </h2>
          </div>

          {/* Right Column: Narrative + Stats Pills */}
          <div className="about-right">
            <p className="about-description">
              Vyom Nexus is a consultancy and project management company focused on helping entrepreneurs turn their ideas into well-planned and professionally executed businesses.
            </p>
            <p className="about-description">
              We provide end-to-end support for Restaurants, Cafes, Cloud Kitchens, Gaming Zones, and Hospitality Projects. From initial planning and setup to operations and business improvement, we help businesses build strong foundations for long-term growth.
            </p>

            {/* Mission & Vision Block */}
            <div className="about-mission-vision" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(200, 169, 110, 0.15)' }}>
              <div>
                <h4 className="font-mono-accent" style={{ marginBottom: '0.4rem', fontSize: '0.7rem' }}>Our Mission</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: '1.5', textAlign: 'left' }}>
                  To provide practical, professional, and result-oriented business solutions that help entrepreneurs build and manage successful ventures.
                </p>
              </div>
              <div>
                <h4 className="font-mono-accent" style={{ marginBottom: '0.4rem', fontSize: '0.7rem' }}>Our Vision</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: '1.5', textAlign: 'left' }}>
                  To become a trusted consultancy partner for hospitality and entertainment businesses across India.
                </p>
              </div>
            </div>

            {/* Feature stats pills container */}
            <div className="about-stats-grid" style={{ marginTop: '2rem' }}>
              <StatItem end={1} prefix="₹" suffix="Cr+" label="Capital Secured" />
              <StatItem end={20} suffix="+" label="Locations Launched" />
              <StatItem end={4.8} suffix="/5" decimals={1} label="Client Rating" />
              <StatItem end={35} suffix="%" label="Avg Revenue Boost" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
