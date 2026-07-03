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

    const mousePos = { x: -1, y: -1 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const checkInteractive = (element: HTMLElement | null): boolean => {
      if (!element) return false;
      return !!(
        element.closest('a') || 
        element.closest('button') || 
        element.closest('.premium-card') || 
        element.closest('.industry-item') ||
        element.closest('input') ||
        element.closest('textarea') ||
        element.closest('.clickable') ||
        element.classList.contains('mobile-menu-link')
      );
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (checkInteractive(target)) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (checkInteractive(target)) {
        setIsHovered(false);
      }
    };

    const onScroll = () => {
      if (mousePos.x === -1 || mousePos.y === -1) return;
      const element = document.elementFromPoint(mousePos.x, mousePos.y) as HTMLElement | null;
      if (checkInteractive(element)) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLoading, isVisible, cursorX, cursorY]);

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
