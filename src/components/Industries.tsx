import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function Industries() {
  const industries = [
    { 
      num: '01', 
      name: 'Premium Restaurants',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    },
    { 
      num: '02', 
      name: 'Bespoke Cafes & Bakeries',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80'
    },
    { 
      num: '03', 
      name: 'Multi-Brand Cloud Kitchens',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80'
    },
    { 
      num: '04', 
      name: 'Modern Gaming & Tech Arenas',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
    },
    { 
      num: '05', 
      name: 'Luxury Hospitality & Resorts',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
    },
    { 
      num: '06', 
      name: 'Corporate Food Courts',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
    },
  ];

  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section id="industries" className="industries-section">
      <div className="industries-container">
        {/* Section tag */}
        <div className="section-tag-container" style={{ paddingLeft: '4rem' }}>
          <span className="font-mono-accent">04 // Core Verticals</span>
        </div>

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
                <div className="industry-arrow-box">
                  <ArrowUpRight className="industry-arrow" size={32} strokeWidth={1} />
                </div>
              </div>

              {/* Inline image wrapper for mobile view */}
              <div className="industry-mobile-image-wrapper">
                <img 
                  src={ind.image} 
                  alt={ind.name} 
                  className="industry-mobile-image" 
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          {/* Bottom border line for final item */}
          <div className="industry-list-bottom-line" />
        </div>
      </div>

      {/* Floating Image Preview overlay for desktop cursor-following reveal */}
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
    </section>
  );
}
