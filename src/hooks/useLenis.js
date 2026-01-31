import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Check if device is mobile/touch
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

// Configure ScrollTrigger for mobile
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const isTouch = isTouchDevice();

    // Initialize Lenis with mobile-safe configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // CRITICAL: Disable smooth touch to prevent mobile scroll blocking
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      // Improve touch responsiveness
      syncTouch: false,
      syncTouchLerp: 0.075,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on resize for mobile
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return lenisRef;
};

export default useLenis;
