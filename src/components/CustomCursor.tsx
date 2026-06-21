import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on mobile/tablet devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let isVisible = false;

    // Set initial position out of screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(cursor, { scale: 1, duration: 0.15 });
      }
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // Smooth lag
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to(cursor, { scale: 0, duration: 0.15 });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.premium-card') || 
        target.closest('.industry-item') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.clickable')
      )) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.premium-card') || 
        target.closest('.industry-item') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.clickable')
      )) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []); // Empty dependencies ensures this setup runs exactly once

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? 'expanded' : ''}`}
      style={{ display: 'block', transform: 'translate(-50%, -50%) scale(0)' }}
    />
  );
}
