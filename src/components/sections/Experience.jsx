import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SectionTransition from '../ui/SectionTransition';
import { experiences } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ experience, index, isInView, language, t }) => {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  const position = typeof experience.position === 'object'
    ? experience.position[language]
    : experience.position;

  const period = typeof experience.period === 'object'
    ? experience.period[language]
    : experience.period;

  const description = typeof experience.description === 'object'
    ? experience.description[language]
    : experience.description;

  const achievements = typeof experience.achievements === 'object' && !Array.isArray(experience.achievements)
    ? experience.achievements[language]
    : experience.achievements;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Card slide animation - alternating directions
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isEven ? -120 : 120,
          rotateY: isEven ? -15 : 15,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline dot pulse animation
      const dot = card.querySelector('.timeline-dot');
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.3,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Technologies stagger
      const techs = card.querySelectorAll('.tech-tag');
      if (techs.length) {
        gsap.fromTo(
          techs,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Achievements stagger
      const achievements = card.querySelectorAll('.achievement-item');
      if (achievements.length) {
        gsap.fromTo(
          achievements,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Timeline connector */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-blue-500 to-transparent hidden md:block" />

      {/* Card */}
      <div className="relative pl-0 md:pl-20">
        {/* Timeline dot */}
        <div className="timeline-dot absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hidden md:block">
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25" />
        </div>

        <motion.div
          className="glass-effect rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-all duration-300 group"
          whileHover={{
            y: -5,
            boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {position}
              </h3>
              <div
                className="text-lg md:text-xl font-semibold mt-1"
                style={{ color: experience.color }}
              >
                {experience.company}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-400" />
                {period}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-300" />
                {experience.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {description}
          </p>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
              {t('experience.keyAchievements')}
            </h4>
            <ul className="space-y-3">
              {achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="achievement-item flex items-start gap-3 text-gray-300"
                >
                  <ChevronRight
                    size={18}
                    className="text-blue-400 mt-0.5 flex-shrink-0"
                  />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              {t('experience.technologies')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <span
                  key={tech}
                  className="tech-tag px-3 py-1 text-sm bg-white/5 text-gray-300 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t, language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      const timelineLine = sectionRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      <SectionTransition
        sectionId="experience"
        sectionName="Experience"
        command="git log --career --oneline"
      >
        <div className="container mx-auto px-6">
          <SectionTitle title={t('experience.title')} subtitle={t('experience.subtitle')} />

          {/* Main timeline line - animated */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-64 bottom-64 w-px">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
          </div>

          {/* Cards container */}
          <div ref={timelineRef} className="space-y-16 max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isInView={isInView}
                language={language}
                t={t}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <motion.a
              href="#contact"
              className="btn-secondary inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('experience.wantMore')}
            </motion.a>
          </motion.div>
        </div>
      </SectionTransition>

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Experience;
