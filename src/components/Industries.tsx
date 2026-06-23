import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function Industries() {
  const industries = [
    { 
      num: '01', 
      name: 'Restaurants',
      image: '/prem restaurent.png'
    },
    { 
      num: '02', 
      name: 'Cafes',
      image: '/cafes and bakeries.png'
    },
    { 
      num: '03', 
      name: 'Cloud Kitchens',
      image: '/cloud kitchen.png'
    },
    { 
      num: '04', 
      name: 'Gaming Zones',
      image: '/gaming zone.png'
    },
    { 
      num: '05', 
      name: 'Hospitality Businesses',
      image: '/resort.png'
    },
    { 
      num: '06', 
      name: 'Food Courts',
      image: '/food court.png'
    },
  ];

  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ── Desktop: cursor-following image preview ──
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (previewRef.current) {
        gsap.to(previewRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // ── Mobile: auto-cycling carousel ──
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const mobileTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setMobileActiveIndex(prev => (prev + 1) % industries.length);
  }, [industries.length]);

  useEffect(() => {
    mobileTimerRef.current = setInterval(goNext, 3500);
    return () => {
      if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    };
  }, [goNext]);

  const handleDotClick = (idx: number) => {
    setMobileActiveIndex(idx);
    // Reset timer on manual interaction
    if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    mobileTimerRef.current = setInterval(goNext, 3500);
  };

  return (
    <section id="industries" className="industries-section">
      <div className="industries-container">
        {/* Section tag */}
        <div className="section-tag-container" style={{ paddingLeft: '4rem' }}>
          <span className="font-mono-accent">04 // Core Verticals</span>
        </div>

        {/* Desktop: Full-width industry list with cursor-following photo */}
        <div ref={listRef} className="industries-list">
          {industries.map((ind, idx) => (
            <div 
              key={ind.num} 
              className="industry-item clickable"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              tabIndex={0}
            >
              {/* Soft background color wash on hover */}
              <div className="industry-bg-wash" />
              
              <div className="industry-content-row">
                <div className="industry-left-group">
                  <span className="industry-num font-mono-accent">{ind.num}</span>
                  <h3 className="industry-name">{ind.name}</h3>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border line for final item */}
          <div className="industry-list-bottom-line" />
        </div>

        {/* Desktop: Floating cursor-following Image Preview */}
        <div 
          ref={previewRef} 
          className={`industry-image-preview ${hoveredIndex !== null ? 'visible' : ''}`}
        >
          <div 
            className="preview-slides-container" 
            style={{ 
              transform: `translateY(-${(hoveredIndex || 0) * 100}%)`,
              height: '100%', 
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' 
            }}
          >
            {industries.map((ind) => (
              <div key={ind.num} className="preview-slide" style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={ind.image} 
                  alt={ind.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Auto-scrolling horizontal photo carousel */}
        <div className="industries-mobile-carousel">
          <div className="mobile-carousel-viewport">
            <div 
              className="mobile-carousel-strip"
              style={{ transform: `translateX(-${mobileActiveIndex * 100}%)` }}
            >
              {industries.map((ind) => (
                <div key={ind.num} className="mobile-carousel-slide">
                  <img 
                    src={ind.image} 
                    alt={ind.name} 
                    className="mobile-carousel-img"
                    loading="lazy"
                  />
                  <div className="mobile-carousel-overlay">
                    <span className="mobile-carousel-num">{ind.num}</span>
                    <span className="mobile-carousel-label">{ind.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dot indicators */}
          <div className="mobile-carousel-dots">
            {industries.map((_, idx) => (
              <button 
                key={idx} 
                className={`mobile-dot ${mobileActiveIndex === idx ? 'mobile-dot-active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
