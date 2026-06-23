import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ isLoading }: { isLoading?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Set up spring physics for an organic tracking lag
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isLoading) return;

    // Verify hover support (exclude touch devices)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
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
        target.closest('.clickable') ||
        target.classList.contains('mobile-menu-link')
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
        target.closest('.clickable') ||
        target.classList.contains('mobile-menu-link')
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
  }, [isLoading, isVisible]);

  if (isLoading || !isVisible) return null;

  return (
    <motion.div
      className={`custom-cursor ${isHovered ? 'expanded' : ''}`}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 10000,
      }}
    />
  );
}
