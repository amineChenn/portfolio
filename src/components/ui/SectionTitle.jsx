import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div
      ref={containerRef}
      className={`mb-16 md:mb-24 px-4 ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      {/* Subtitle - increased padding and size for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <span className="inline-block px-6 py-3 text-base md:text-lg font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
          {subtitle}
        </span>
      </motion.div>

      {/* Title with gradient - larger mobile size */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        style={{ transformOrigin: align === 'center' ? 'center' : 'left' }}
      />
    </div>
  );
};

export default SectionTitle;
