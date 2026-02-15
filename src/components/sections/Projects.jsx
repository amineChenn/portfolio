import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronRight, X, Users, TrendingUp, Zap } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SectionTransition from '../ui/SectionTransition';
import { projects } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index, isInView, onClick, language, t }) => {
  const cardRef = useRef(null);
  const title = typeof project.title === 'object' ? project.title[language] : project.title;
  const category = typeof project.category === 'object' ? project.category[language] : project.category;
  const description = typeof project.description === 'object' ? project.description[language] : project.description;

  // Determine animation direction based on grid position
  const isLeftColumn = index % 2 === 0;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Card slide-up with rotation effect
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          x: isLeftColumn ? -50 : 50,
          rotateY: isLeftColumn ? -10 : 10,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Tech tags stagger
      const techTags = card.querySelectorAll('.tech-tag');
      if (techTags.length) {
        gsap.fromTo(
          techTags,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isLeftColumn]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      role="button"
      tabIndex={0}
      onClick={() => onClick(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project); } }}
      aria-label={`${t('projects.viewDetails')}: ${title}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden rounded-2xl glass-effect cursor-pointer transition-all duration-500 hover:border-blue-500/30">
        {/* Project visual */}
        <div
          className="aspect-video relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, transparent 100%)`,
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 rounded-full opacity-30"
              style={{ backgroundColor: project.color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Code preview mockup */}
          <div className="absolute inset-4 glass-effect rounded-lg p-4 transform group-hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2 font-mono text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">const</span>
                <span className="text-cyan-400">project</span>
                <span className="text-gray-500">=</span>
                <span className="text-green-400">{`"${title}"`}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">export</span>
                <span className="text-yellow-400">function</span>
                <span className="text-cyan-400">build</span>
                <span className="text-gray-500">()</span>
                <span className="text-gray-500">{'{'}</span>
              </div>
              <div className="pl-4 text-blue-400">// Innovation in progress...</div>
              <div className="text-gray-500">{'}'}</div>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content - More padding */}
        <div className="p-6 md:p-8">
          {/* Category tag */}
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
            style={{
              backgroundColor: `${project.color}20`,
              color: project.color,
            }}
          >
            {category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="tech-tag px-2 py-1 text-xs bg-white/5 text-gray-300 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="tech-tag px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* View more */}
          <div className="flex items-center text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
            <span>{t('projects.viewDetails')}</span>
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose, language, t }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Save current scroll position before locking
    const scrollY = window.scrollY;
    document.documentElement.classList.add('modal-open');
    document.body.style.top = `-${scrollY}px`;

    // Prevent background scroll on touch devices
    const preventTouchMove = (e) => {
      // Allow scrolling inside the modal content
      if (scrollRef.current && scrollRef.current.contains(e.target)) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventTouchMove);
      document.documentElement.classList.remove('modal-open');
      // Restore scroll position
      const top = document.body.style.top;
      document.body.style.top = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    };
  }, []);

  if (!project) return null;

  const title = typeof project.title === 'object' ? project.title[language] : project.title;
  const category = typeof project.category === 'object' ? project.category[language] : project.category;
  const longDescription = typeof project.longDescription === 'object' ? project.longDescription[language] : project.longDescription;
  const features = typeof project.features === 'object' && !Array.isArray(project.features) ? project.features[language] : project.features;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay fixed inset-0 z-[60] flex items-start md:items-center justify-center p-0 md:p-8"
      onClick={onClose}
      style={{ touchAction: 'none' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      {/* Modal */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        className="modal-content relative w-full max-w-4xl md:max-h-[85vh] md:rounded-2xl glass-effect overflow-y-auto"
        style={{
          maxHeight: '100dvh',
          height: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky close button - always visible */}
        <div className="sticky top-0 z-20 flex justify-end p-3 md:p-4">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-colors border border-white/20"
            aria-label="Close modal"
          >
            <X size={22} className="text-white" />
          </button>
        </div>

        {/* Header */}
        <div
          className="relative h-36 md:h-56 overflow-hidden -mt-14 md:-mt-16"
          style={{
            background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}10 100%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl md:text-8xl font-bold opacity-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {title.charAt(0)}
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent h-32" />
        </div>

        {/* Content */}
        <div className="px-6 pb-8 md:px-12 md:pb-12 -mt-12 relative">
          {/* Category */}
          <span
            className="inline-block px-4 py-2 text-sm font-medium rounded-full mb-4"
            style={{
              backgroundColor: `${project.color}20`,
              color: project.color,
            }}
          >
            {category}
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>

          {/* Long description */}
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            {longDescription}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {Object.entries(project.metrics).map(([key, value], index) => {
              const icons = { users: Users, organizations: Users, modules: Zap, clients: Users, experts: Users, aum: TrendingUp, team: Users, duration: Zap, methodology: Zap, apps: Zap, marketShare: TrendingUp };
              const Icon = icons[key] || Zap;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 glass-effect rounded-xl"
                >
                  <Icon size={24} className="mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Features */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">{t('projects.keyFeatures')}</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('projects.technologiesUsed')}</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="px-4 py-2 text-sm bg-white/5 text-gray-300 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);
  const { t, language } = useLanguage();

  return (
    <section id="projects" ref={sectionRef} className="relative md:py-40">
      <SectionTransition
        sectionId="projects"
        sectionName="Projects"
        command="ls -la ./projects --showcase"
      >
        <div className="container mx-auto px-6 md:px-8">
          <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />

        {/* Projects grid - More padding */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={setSelectedProject}
              language={language}
              t={t}
            />
          ))}
        </div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 mb-4">
            {t('projects.moreWork')}
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('projects.discussProject')}
          </motion.a>
        </motion.div>
        </div>
      </SectionTransition>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            language={language}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
    </section>
  );
};

export default Projects;
