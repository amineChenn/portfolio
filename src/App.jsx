import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Smooth scrolling
import useLenis from './hooks/useLenis';
import useMousePosition from './hooks/useMousePosition';

// i18n
import { useLanguage } from './i18n/LanguageContext';

// Lazy-loaded 3D Scene (large Three.js bundle)
const Scene = lazy(() => import('./components/3d/Scene'));

// UI Components
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';

// Eagerly load Hero (above the fold), lazy load the rest
import Hero from './components/sections/Hero';
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));
import Footer from './components/sections/Footer';

// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      // Use hardcoded color instead of CSS variable to prevent FOUC if
      // the stylesheet hasn't loaded yet when React first paints.
      style={{ backgroundColor: '#030712' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo — explicit initial scale:0 prevents framer-motion flash
          (known issue #725: elements briefly render at scale:1 before
          the animation kicks in if initial isn't set to match the first
          keyframe) */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1 }}
        className="mb-8"
      >
        <div className="text-6xl md:text-8xl font-bold gradient-text">AC</div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 mb-4"
      >
        {t('loading.text')}
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Percentage */}
      <motion.span
        className="mt-2 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Math.round(Math.min(progress, 100))}%
      </motion.span>

      {/* Decorative blurred elements — use overflow:clip on parent and
          scale trick to prevent the blur from creating visible edges.
          Also wrap in a container that clips the halo. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 -translate-x-4 -translate-y-4 bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 translate-x-4 translate-y-4 bg-blue-500/20 rounded-full blur-[100px]" />
      </div>
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { normalizedPositionRef } = useMousePosition();

  // Stable callback to prevent LoadingScreen effect re-runs
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  // Initialize smooth scrolling
  useLenis();

  // Preload fonts
  useEffect(() => {
    document.fonts.ready.then(() => {
      console.log('Fonts loaded');
    });
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Background Scene - Lazy loaded.
          Hidden with visibility:hidden during loading to prevent the WebGL
          canvas from flashing a black rectangle as the GL context initializes
          (alpha:false means the default clear color is opaque black).
          Using visibility:hidden instead of display:none so the canvas still
          initializes in the background and is ready when loading completes. */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Suspense fallback={null}>
          <Scene mousePositionRef={normalizedPositionRef} />
        </Suspense>
      </div>

      {/* Noise overlay for texture — fades in via CSS animation after 0.5s
          delay to prevent the SVG feTurbulence filter from briefly rendering
          as a visible rectangle on iOS before the filter processes */}
      <div className="noise-overlay" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Navigation */}
        <Navbar />

        {/* Page Sections */}
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
