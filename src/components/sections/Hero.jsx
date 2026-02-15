import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';
import Logo3D from '../3d/Logo3D';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Check if mobile - disable scrub on touch devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches ||
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll - disabled on mobile to prevent scroll blocking
      gsap.to(titleRef.current, {
        yPercent: isMobile ? 0 : 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: isMobile ? false : 1, // Disable scrub on mobile
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const name = personalInfo.name;

  const socialLinks = [
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)]" />

      {/* Content */}
      <motion.div
        className="container relative z-10 text-center px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 3D Logo */}
        <motion.div variants={itemVariants} className="mb-4">
          <Logo3D />
        </motion.div>

        {/* Greeting with proper padding - increased size for better visibility */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 px-4">
          <span className="inline-block px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            {t('hero.greeting')}
          </span>
        </motion.div>

        {/* Name with letter animation - improved mobile sizes */}
        <div ref={titleRef} className="mb-6 sm:mb-8 overflow-hidden px-2">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight sm:leading-none"
            variants={containerVariants}
          >
            {name.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterAnimation}
                className={letter === ' ' ? 'inline-block w-2 sm:w-4 md:w-8' : 'inline-block gradient-text'}
                style={{
                  display: letter === ' ' ? 'inline-block' : 'inline-block',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Title - No company mention - improved mobile sizes */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-medium mb-2 sm:mb-4 px-4">
            {t('hero.title')}
          </h2>
        </motion.div>

        {/* Subtitle - improved mobile sizes */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto mb-3 sm:mb-4 px-4"
        >
          {personalInfo.subtitle}
        </motion.p>

        {/* Tagline - improved mobile sizes */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-xl text-gray-400 max-w-xl mx-auto mb-6 sm:mb-10 italic px-4"
        >
          "{personalInfo.tagline[language]}"
        </motion.p>

        {/* CTA Buttons with Social Links integrated elegantly */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-8"
        >
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.viewWork')}
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.getInTouch')}
            </motion.a>
          </div>

          {/* Social Links - Integrated with CTA area */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500 hidden sm:block">{language === 'fr' ? 'Me retrouver sur' : 'Find me on'}</span>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-gray-500 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-widest mb-2">{t('hero.scroll')}</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>

      {/* Decorative elements - Blue theme */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default Hero;
