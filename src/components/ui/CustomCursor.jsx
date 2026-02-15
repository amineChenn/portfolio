import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const cursorVariants = {
  default: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    border: '2px solid rgba(37, 99, 235, 0.8)',
    mixBlendMode: 'normal',
  },
  hover: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    border: '2px solid rgba(37, 99, 235, 1)',
    mixBlendMode: 'normal',
  },
};

const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Event delegation instead of MutationObserver + querySelectorAll
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setCursorVariant('hover');
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorVariant}
        variants={cursorVariants}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-blue-600 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 0 : 1,
        }}
      />

      {/* Cursor glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
