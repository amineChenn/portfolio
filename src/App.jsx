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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-background)]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
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

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
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

      {/* 3D Background Scene - Lazy loaded */}
      <Suspense fallback={null}>
        <Scene mousePositionRef={normalizedPositionRef} />
      </Suspense>

      {/* Noise overlay for texture */}
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
