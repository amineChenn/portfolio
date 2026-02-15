import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Database, Cloud } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SectionTransition from '../ui/SectionTransition';
import { skills } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Tech logo URLs from devicon CDN (official SVG logos)
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const techLogoUrls = {
  angular: `${DEVICON_BASE}/angular/angular-original.svg`,
  react: `${DEVICON_BASE}/react/react-original.svg`,
  typescript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  javascript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  html5: `${DEVICON_BASE}/html5/html5-original.svg`,
  tailwind: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  rxjs: `${DEVICON_BASE}/rxjs/rxjs-original.svg`,
  java: `${DEVICON_BASE}/java/java-original.svg`,
  spring: `${DEVICON_BASE}/spring/spring-original.svg`,
  nodejs: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  postgresql: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  oracle: `${DEVICON_BASE}/oracle/oracle-original.svg`,
  mongodb: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  redis: `${DEVICON_BASE}/redis/redis-original.svg`,
  docker: `${DEVICON_BASE}/docker/docker-original.svg`,
  kubernetes: `${DEVICON_BASE}/kubernetes/kubernetes-original.svg`,
  git: `${DEVICON_BASE}/git/git-original.svg`,
  gitlab: `${DEVICON_BASE}/gitlab/gitlab-original.svg`,
  jenkins: `${DEVICON_BASE}/jenkins/jenkins-original.svg`,
  sonarqube: `${DEVICON_BASE}/sonarqube/sonarqube-original.svg`,
};

// Fallback SVG components for technologies without devicon logos
const TechLogosFallback = {
  api: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <rect fill="#2563eb" width="128" height="128" rx="20"/>
      <path fill="#fff" d="M40 90h-8L50 38h8l18 52h-8l-4-14H44l-4 14zm6-20h14l-7-24-7 24zM80 38h20c10 0 16 6 16 14s-4 13-10 15l12 23h-9l-11-22h-10v22h-8V38zm8 24h11c6 0 9-3 9-8s-3-8-9-8H88v16z"/>
    </svg>
  ),
  microservices: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <circle fill="#3b82f6" cx="64" cy="64" r="56"/>
      <circle fill="#fff" cx="64" cy="40" r="12"/>
      <circle fill="#fff" cx="40" cy="80" r="12"/>
      <circle fill="#fff" cx="88" cy="80" r="12"/>
      <path fill="#fff" stroke="#3b82f6" strokeWidth="2" d="M64 52v16M52 74L64 68M76 74L64 68"/>
    </svg>
  ),
};

// Unified logo component - uses CDN image or fallback SVG
const TechLogo = ({ icon }) => {
  const url = techLogoUrls[icon];
  const FallbackComponent = TechLogosFallback[icon];

  if (url) {
    return <img src={url} alt={icon} className="w-full h-full" loading="lazy" />;
  }
  if (FallbackComponent) {
    return <FallbackComponent />;
  }
  return <div className="w-full h-full rounded-full bg-blue-500/30" />;
};

// Skill card with animated logo and GSAP scroll animations
const SkillCard = ({ skill, index, isInView, categoryKey }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isInView) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotateX: 20,
      });

      // Animate in with stagger based on index
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: 'back.out(1.5)',
      });
    });

    return () => ctx.revert();
  }, [isInView, index, categoryKey]);

  return (
    <motion.div
      ref={cardRef}
      className="skill-card glass-effect rounded-2xl p-6 cursor-pointer group"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -10,
        scale: 1.05,
        rotateY: 5,
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo */}
        <div
          className="skill-icon w-16 h-16 md:w-20 md:h-20 relative spin-once-on-hover"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-full h-full tech-logo" style={{ animationDelay: `${index * 0.2}s` }}>
            <TechLogo icon={skill.icon} />
          </div>
        </div>

        {/* Skill name */}
        <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors text-center">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('frontend');
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      const title = sectionRef.current?.querySelector('.section-title-container');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Tabs container slide from left
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      key: 'frontend',
      title: t('skills.frontend'),
      icon: Code2,
      skills: skills.frontend,
      color: '#2563eb',
    },
    {
      key: 'backend',
      title: t('skills.backend'),
      icon: Server,
      skills: skills.backend,
      color: '#3b82f6',
    },
    {
      key: 'database',
      title: t('skills.database'),
      icon: Database,
      skills: skills.database,
      color: '#0ea5e9',
    },
    {
      key: 'devops',
      title: t('skills.devops'),
      icon: Cloud,
      skills: skills.devops,
      color: '#06b6d4',
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden">
      <SectionTransition
        sectionId="skills"
        sectionName="Skills"
        command="npm run list:skills --all"
      >
        <div className="container mx-auto px-6">
          <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />

        {/* Category tabs - horizontal scroll on mobile, wrapped on larger screens */}
        <div
          ref={tabsRef}
          className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-3 sm:gap-4 md:gap-5 mb-12 sm:mb-16 px-2 sm:px-4 pb-2 sm:pb-0 -mx-2 sm:mx-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full transition-all text-sm sm:text-base md:text-lg font-medium whitespace-nowrap flex-shrink-0 ${
                activeCategory === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'glass-effect text-gray-400 hover:text-white hover:border-blue-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <category.icon size={18} className="sm:w-5 sm:h-5" />
              {category.title}
            </motion.button>
          ))}
        </div>

        {/* Skills display - Grid of animated logos */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {categories.map(
              (category) =>
                activeCategory === category.key && (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Category header */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <category.icon size={32} style={{ color: category.color }} />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                        <p className="text-gray-400">
                          {category.skills.length} {t('skills.technologies')}
                        </p>
                      </div>
                    </div>

                    {/* Skills grid with animated logos */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                      {category.skills.map((skill, index) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          index={index}
                          isInView={true}
                          categoryKey={category.key}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 overflow-hidden"
        >
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10" />

            {/* Scrolling content - CSS animation for seamless loop */}
            <div
              className="flex gap-8 py-4 marquee-track"
            >
              {[...skills.frontend, ...skills.backend, ...skills.database, ...skills.devops].map(
                (skill, index) => (
                    <div
                      key={`${skill.name}-${index}`}
                      className="flex items-center gap-3 px-6 py-3 glass-effect rounded-full whitespace-nowrap flex-shrink-0"
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        <TechLogo icon={skill.icon} />
                      </div>
                      <span className="text-gray-300">{skill.name}</span>
                    </div>
                  )
              )}
              {/* Duplicate for seamless loop */}
              {[...skills.frontend, ...skills.backend, ...skills.database, ...skills.devops].map(
                (skill, index) => (
                    <div
                      key={`${skill.name}-dup-${index}`}
                      className="flex items-center gap-3 px-6 py-3 glass-effect rounded-full whitespace-nowrap flex-shrink-0"
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        <TechLogo icon={skill.icon} />
                      </div>
                      <span className="text-gray-300">{skill.name}</span>
                    </div>
                  )
              )}
            </div>
          </div>
        </motion.div>
        </div>
      </SectionTransition>

      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />
    </section>
  );
};

export default Skills;
