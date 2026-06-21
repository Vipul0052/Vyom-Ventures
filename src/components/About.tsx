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
              “We don’t just engineer layouts; we translate ambitious visions into highly profitable operational realities.”
            </h2>
          </div>

          {/* Right Column: Narrative + Stats Pills */}
          <div className="about-right">
            <p className="about-description">
              Vyom Ventures is a premier project delivery and business consulting partner for the modern food, hospitality, and entertainment sectors. We serve as the singular bridge between a creative business spark and a high-yielding physical ecosystem.
            </p>
            <p className="about-description">
              By aligning concept curation, space planning, construction management, and metric-driven operational analysis, we ensure every detail of your brand is built to perform.
            </p>

            {/* Feature stats pills container */}
            <div className="about-stats-grid">
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
