import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll-triggered animations using GSAP
 * Provides various animation presets for portfolio sections
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  const {
    animation = 'fadeInUp',
    duration = 1,
    delay = 0,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animations = {
      // Fade in from bottom
      fadeInUp: {
        from: { opacity: 0, y: 80 },
        to: { opacity: 1, y: 0 },
      },
      // Fade in from top
      fadeInDown: {
        from: { opacity: 0, y: -80 },
        to: { opacity: 1, y: 0 },
      },
      // Slide from left with fade
      slideFromLeft: {
        from: { opacity: 0, x: -100 },
        to: { opacity: 1, x: 0 },
      },
      // Slide from right with fade
      slideFromRight: {
        from: { opacity: 0, x: 100 },
        to: { opacity: 1, x: 0 },
      },
      // Scale up with fade
      scaleUp: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      // Scale down with fade
      scaleDown: {
        from: { opacity: 0, scale: 1.2 },
        to: { opacity: 1, scale: 1 },
      },
      // Rotate in from left
      rotateFromLeft: {
        from: { opacity: 0, x: -80, rotation: -10 },
        to: { opacity: 1, x: 0, rotation: 0 },
      },
      // Rotate in from right
      rotateFromRight: {
        from: { opacity: 0, x: 80, rotation: 10 },
        to: { opacity: 1, x: 0, rotation: 0 },
      },
      // Flip in
      flipIn: {
        from: { opacity: 0, rotationY: 90 },
        to: { opacity: 1, rotationY: 0 },
      },
      // Blur in
      blurIn: {
        from: { opacity: 0, filter: 'blur(10px)' },
        to: { opacity: 1, filter: 'blur(0px)' },
      },
    };

    const animConfig = animations[animation] || animations.fadeInUp;

    gsap.set(element, animConfig.from);

    const tween = gsap.to(element, {
      ...animConfig.to,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [animation, duration, delay, start, end, scrub, markers, once]);

  return elementRef;
};

/**
 * Hook for staggered animations on child elements
 */
export const useStaggerAnimation = (options = {}) => {
  const containerRef = useRef(null);

  const {
    childSelector = '.stagger-item',
    animation = 'fadeInUp',
    stagger = 0.1,
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
    once = true,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const animations = {
      fadeInUp: { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } },
      fadeInDown: { from: { opacity: 0, y: -50 }, to: { opacity: 1, y: 0 } },
      slideFromLeft: { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0 } },
      slideFromRight: { from: { opacity: 0, x: 50 }, to: { opacity: 1, x: 0 } },
      scaleUp: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
      rotateIn: { from: { opacity: 0, rotation: -15, y: 30 }, to: { opacity: 1, rotation: 0, y: 0 } },
    };

    const animConfig = animations[animation] || animations.fadeInUp;

    gsap.set(children, animConfig.from);

    const tween = gsap.to(children, {
      ...animConfig.to,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [childSelector, animation, stagger, duration, delay, start, once]);

  return containerRef;
};

/**
 * Hook for parallax effect on elements
 */
export const useParallax = (options = {}) => {
  const elementRef = useRef(null);

  const {
    speed = 0.5,
    direction = 'vertical', // 'vertical' or 'horizontal'
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const distance = 100 * speed;
    const property = direction === 'vertical' ? 'y' : 'x';

    const tween = gsap.fromTo(
      element,
      { [property]: -distance },
      {
        [property]: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [speed, direction, start, end]);

  return elementRef;
};

/**
 * Hook for text reveal animation (line by line or word by word)
 */
export const useTextReveal = (options = {}) => {
  const elementRef = useRef(null);

  const {
    type = 'lines', // 'lines', 'words', or 'chars'
    duration = 1,
    stagger = 0.05,
    start = 'top 80%',
    once = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Simple approach: animate the whole element with clip-path
    gsap.set(element, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 1,
    });

    const tween = gsap.to(element, {
      clipPath: 'inset(0 0% 0 0)',
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [type, duration, stagger, start, once]);

  return elementRef;
};

/**
 * Hook for section reveal with alternating directions
 */
export const useSectionReveal = (sectionIndex = 0, options = {}) => {
  const elementRef = useRef(null);

  const {
    duration = 1,
    delay = 0,
    start = 'top 85%',
    once = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Alternate direction based on section index
    const isEven = sectionIndex % 2 === 0;
    const xOffset = isEven ? 100 : -100;
    const rotation = isEven ? 3 : -3;

    gsap.set(element, {
      opacity: 0,
      x: xOffset,
      rotation,
    });

    const tween = gsap.to(element, {
      opacity: 1,
      x: 0,
      rotation: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [sectionIndex, duration, delay, start, once]);

  return elementRef;
};

export default useScrollAnimation;
