import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Industries() {
  const industries = [
    { 
      num: '01', 
      name: 'Restaurants',
      image: '/prem restaurent.webp'
    },
    { 
      num: '02', 
      name: 'Cafes',
      image: '/cafes and bakeries.webp'
    },
    { 
      num: '03', 
      name: 'Cloud Kitchens',
      image: '/cloud kitchen.webp'
    },
    { 
      num: '04', 
      name: 'Gaming Zones',
      image: '/gaming zone.webp'
    },
    { 
      num: '05', 
      name: 'Hospitality Businesses',
      image: '/resort.webp'
    },
    { 
      num: '06', 
      name: 'Food Courts',
      image: '/food court.webp'
    },
  ];

  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ── Desktop: cursor-following image preview & hover tracker ──
  useEffect(() => {
    const isDesktop = window.innerWidth > 1024;
    if (!isDesktop) return;

    const mousePos = { x: -1, y: -1 };

    const updateHoverState = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      if (!element) return;

      const hoveredItem = element.closest('.industry-item');
      if (hoveredItem) {
        const indexAttr = hoveredItem.getAttribute('data-index');
        if (indexAttr !== null) {
          setHoveredIndex(parseInt(indexAttr, 10));
          return;
        }
      }
      setHoveredIndex(null);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (previewRef.current) {
        gsap.to(previewRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      updateHoverState(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (mousePos.x === -1 || mousePos.y === -1) return;
      updateHoverState(mousePos.x, mousePos.y);
    };

    const handleMouseLeave = () => {
      setHoveredIndex(null);
      mousePos.x = -1;
      mousePos.y = -1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.industry-item');

    // 1. Desktop setup (IntersectionObserver)
    const isDesktop = window.innerWidth > 1024;
    let observer: IntersectionObserver | null = null;

    if (isDesktop) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-active');
          } else {
            entry.target.classList.remove('scroll-active');
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '5% 0px 5% 0px'
      });

      items.forEach(item => observer?.observe(item));
    }

    // 2. Mobile/Tablet setup (Center scroll focus calculation)
    const handleMobileScroll = () => {
      const isMobile = window.innerWidth <= 1024;
      if (!isMobile) return;

      const centerY = window.innerHeight / 2;
      let closestItem: Element | null = null;
      let minDistance = Infinity;

      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemMidY = rect.top + rect.height / 2;
        const distance = Math.abs(itemMidY - centerY);
        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      items.forEach(item => {
        if (item === closestItem) {
          item.classList.add('scroll-active');
        } else {
          item.classList.remove('scroll-active');
        }
      });
    };

    if (!isDesktop) {
      handleMobileScroll();
      window.addEventListener('scroll', handleMobileScroll, { passive: true });
      window.addEventListener('resize', handleMobileScroll);
    }

    return () => {
      if (observer) {
        items.forEach(item => observer?.unobserve(item));
      }
      window.removeEventListener('scroll', handleMobileScroll);
      window.removeEventListener('resize', handleMobileScroll);
    };
  }, []);

  return (
    <section id="industries" className="industries-section">
      <div className="industries-container">
        {/* Section tag */}
        <div className="section-tag-container" style={{ paddingLeft: '4rem' }}>
          <span className="font-mono-accent">04 // Core Verticals</span>
        </div>

        {/* Industry list: vertical stack */}
        <div ref={listRef} className="industries-list">
          {industries.map((ind, idx) => (
            <div 
              key={ind.num} 
              data-index={idx}
              className={`industry-item clickable ${hoveredIndex === idx ? 'js-hover' : ''}`}
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

              {/* Mobile inline image - displayed only on mobile/tablet viewport */}
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
      </div>
    </section>
  );
}
