import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 75, strength = 0.28 }: MagneticProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Disable on mobile/tablet devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - elCenterX;
      const distanceY = e.clientY - elCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Move element toward cursor
        gsap.to(el, {
          x: distanceX * strength,
          y: distanceY * strength,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        // Snap back to original position
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, strength]);

  return React.cloneElement(children, {
    ref: containerRef,
  } as any);
}
