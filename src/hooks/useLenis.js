import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent ScrollTrigger from refreshing on iOS address bar resize
ScrollTrigger.config({
  ignoreMobileResize: true,
});

// Detect mobile/touch devices
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 0 && window.innerWidth < 1024)
  );
};

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const mobile = isMobile();

    // On mobile: skip Lenis entirely, let native scroll handle everything
    if (mobile) {
      // Prevent iOS scroll-to-top on page load
      ScrollTrigger.clearScrollMemory();
      window.history.scrollRestoration = 'manual';
      return;
    }

    // Desktop only: initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Only refresh ScrollTrigger on width changes (not height from address bar)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return lenisRef;
};

export default useLenis;
