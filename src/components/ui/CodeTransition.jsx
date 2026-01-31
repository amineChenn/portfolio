import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Blinking cursor component
export const BlinkingCursor = ({ className = '' }) => (
  <motion.span
    className={`inline-block w-[3px] h-[1.2em] bg-blue-400 ml-1 ${className}`}
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
  />
);

// Code typing effect component
export const TypewriterText = ({ text, delay = 0, speed = 50, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayedText}
      {!isComplete && isInView && <BlinkingCursor />}
    </span>
  );
};

// Code brackets reveal animation
export const BracketsReveal = ({ children, type = 'curly' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const brackets = {
    curly: { open: '{', close: '}' },
    angle: { open: '<', close: '/>' },
    square: { open: '[', close: ']' },
    paren: { open: '(', close: ')' },
  };

  const { open, close } = brackets[type] || brackets.curly;

  return (
    <div ref={containerRef} className="relative">
      {/* Opening bracket */}
      <motion.div
        className="absolute -left-8 md:-left-12 top-0 text-4xl md:text-6xl font-mono text-blue-500/30 select-none"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {open}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Closing bracket */}
      <motion.div
        className="absolute -right-8 md:-right-12 bottom-0 text-4xl md:text-6xl font-mono text-blue-500/30 select-none"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        {close}
      </motion.div>
    </div>
  );
};

// Line numbers component
export const LineNumbers = ({ count = 10, startFrom = 1, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`font-mono text-sm text-blue-500/30 select-none ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="leading-6"
        >
          {String(startFrom + i).padStart(3, ' ')}
        </motion.div>
      ))}
    </div>
  );
};

// Glitch effect text
export const GlitchText = ({ children, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      setIsGlitching(true);
      const timeout = setTimeout(() => setIsGlitching(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className={isGlitching ? 'animate-glitch' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0.5 text-cyan-500 opacity-70 animate-glitch-1 clip-glitch-1">
            {children}
          </span>
          <span className="absolute top-0 -left-0.5 text-red-500 opacity-70 animate-glitch-2 clip-glitch-2">
            {children}
          </span>
        </>
      )}
    </span>
  );
};

// Code comment decorator
export const CodeComment = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`font-mono text-gray-500 ${className}`}
    >
      <span className="text-green-500/70">{'// '}</span>
      {children}
    </motion.div>
  );
};

// Terminal-style section header
export const TerminalHeader = ({ title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="mb-8 font-mono">
      {/* Terminal window bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-t-lg border border-blue-500/20 border-b-0"
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-sm text-gray-500">{subtitle}</span>
      </motion.div>

      {/* Terminal content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="px-4 py-3 bg-gray-900/30 rounded-b-lg border border-blue-500/20 border-t-0"
      >
        <span className="text-green-400">$ </span>
        <TypewriterText text={`echo "${title}""`} delay={300} speed={40} className="text-white" />
      </motion.div>
    </div>
  );
};

// Compilation loading effect
export const CompilationLoader = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    'Compiling section...',
    'Resolving dependencies...',
    'Optimizing render...',
    'Build successful!'
  ];

  useEffect(() => {
    if (step >= steps.length) {
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      setStep(s => s + 1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [step, steps.length, onComplete]);

  return (
    <div className="font-mono text-sm space-y-1">
      {steps.slice(0, step + 1).map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={i === step && step < steps.length - 1 ? 'text-yellow-400' : i === steps.length - 1 && step >= steps.length - 1 ? 'text-green-400' : 'text-gray-500'}
        >
          {i < step ? '[OK] ' : i === step && step < steps.length - 1 ? '[...] ' : '[OK] '}
          {s}
        </motion.div>
      ))}
    </div>
  );
};

// Section wrapper with code-themed transition
const CodeTransition = ({ children, sectionId, lineStart = 1 }) => {
  const sectionRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <div ref={sectionRef} className="relative">
      {/* Line numbers on the left - desktop only */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-12 border-r border-blue-500/10">
        {isInView && (
          <div className="sticky top-32 pt-4">
            <LineNumbers count={20} startFrom={lineStart} />
          </div>
        )}
      </div>

      {/* Code decoration - opening tag */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isInView ? { opacity: 1, height: 'auto' } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono text-blue-500/40 text-sm mb-4 pl-4 lg:pl-16"
      >
        <span className="text-pink-400/60">{'<'}</span>
        <span className="text-blue-400/60">{sectionId}</span>
        <span className="text-pink-400/60">{'>'}</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="lg:pl-16"
      >
        {children}
      </motion.div>

      {/* Code decoration - closing tag */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isInView ? { opacity: 1, height: 'auto' } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-mono text-blue-500/40 text-sm mt-4 pl-4 lg:pl-16"
      >
        <span className="text-pink-400/60">{'</'}</span>
        <span className="text-blue-400/60">{sectionId}</span>
        <span className="text-pink-400/60">{'>'}</span>
      </motion.div>
    </div>
  );
};

export default CodeTransition;
