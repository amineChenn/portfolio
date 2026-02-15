import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SectionTransition from '../ui/SectionTransition';
import { personalInfo, education } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t, language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the image container
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Content slide from right with rotation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: 120,
          rotateY: 8,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats cards stagger animation with scale
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards?.length) {
        gsap.fromTo(
          statCards,
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotateX: 20,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Info cards slide from left alternating
      const infoCards = cardsRef.current?.querySelectorAll('.info-card');
      if (infoCards?.length) {
        infoCards.forEach((card, index) => {
          const isEven = index % 2 === 0;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isEven ? -80 : 80,
              rotation: isEven ? -5 : 5,
            },
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.9,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '10+', label: t('about.yearsExp') },
    { value: '15+', label: t('about.projectsDelivered') },
    { value: '99.9%', label: t('about.uptime') },
    { value: '40%', label: t('about.perfGain') },
  ];

  // Parse bio text into paragraphs with formatting
  const bioText = t('about.bio');
  const formatBio = (text) => {
    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      if (section.includes('**')) {
        const parts = section.split('**');
        return (
          <div key={index} className="mb-4">
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                return <span key={i} className="text-blue-400 font-semibold">{part}</span>;
              }
              if (part.includes('\n-')) {
                const listItems = part.split('\n').filter(item => item.trim());
                return (
                  <span key={i}>
                    {listItems.map((item, j) => {
                      if (item.trim().startsWith('-')) {
                        return (
                          <span key={j} className="block ml-4 text-gray-300">
                            <span className="text-blue-500 mr-2">-</span>
                            {item.trim().substring(1).trim()}
                          </span>
                        );
                      }
                      return <span key={j}>{item}</span>;
                    })}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </div>
        );
      }
      return <p key={index} className="mb-4 text-gray-300">{section}</p>;
    });
  };

  // Animation variants for image container
  const imageContainerVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  // Badge animation variants
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.2,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }
    })
  };

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden">
      <SectionTransition
        sectionId="about"
        sectionName="About"
        command="render --section about --profile"
      >
        <div className="container mx-auto px-6">
          <SectionTitle title={t('about.title')} subtitle={t('about.subtitle')} />

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image/Visual Side */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={imageContainerVariants}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <div
                ref={imageRef}
                className="relative aspect-square max-w-md mx-auto"
              >
                {/* Abstract shape background with parallax */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-500/20 to-cyan-500/20 rounded-3xl transform rotate-6"
                  animate={{
                    rotate: [6, 8, 6],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 glass-effect rounded-3xl overflow-hidden">
                  {/* Decorative code pattern */}
                  <div className="absolute inset-0 p-8 font-mono text-xs text-blue-500/30 leading-relaxed overflow-hidden">
                    <pre className="whitespace-pre-wrap">
{`@Component({
  selector: 'app-developer',
  template: \`
    <passion>coding</passion>
    <expertise>fullstack</expertise>
  \`
})
export class DeveloperComponent {
  skills = [
    'Java', 'Spring Boot',
    'Angular', 'React',
    'TypeScript', 'Node.js'
  ];

  constructor() {
    this.buildAmazingThings();
  }

  buildAmazingThings() {
    return innovation + creativity;
  }
}

public class Developer {
  private String passion = "building";
  private List<String> expertise;

  @Autowired
  public void createSolutions() {
    while (true) {
      innovate();
      improve();
      deliver();
    }
  }
}`}
                    </pre>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

                  {/* Profile visualization */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-2xl font-bold"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        AC
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{personalInfo.name}</h3>
                        <p className="text-gray-400">{t('hero.title')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges with spring animation */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={badgeVariants}
                  className="absolute -top-4 -right-4 glass-effect px-4 py-2 rounded-full"
                >
                  <motion.span
                    className="text-sm font-medium text-blue-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Java Expert
                  </motion.span>
                </motion.div>

                <motion.div
                  custom={1}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={badgeVariants}
                  className="absolute -bottom-4 -left-4 glass-effect px-4 py-2 rounded-full"
                >
                  <motion.span
                    className="text-sm font-medium text-cyan-400"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    Angular Master
                  </motion.span>
                </motion.div>

                <motion.div
                  custom={2}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={badgeVariants}
                  className="absolute -bottom-4 -right-4 glass-effect px-4 py-2 rounded-full"
                >
                  <motion.span
                    className="text-sm font-medium text-sky-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    React Enthusiast
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Side */}
            <div ref={contentRef} style={{ perspective: '1000px' }}>
              {/* Bio */}
              <div className="text-base text-gray-300 leading-relaxed mb-8 bio-text">
                {formatBio(bioText)}
              </div>

              {/* Info cards */}
              <div ref={cardsRef} className="space-y-4 mb-8">
                <motion.div
                  className="info-card flex items-center gap-4 p-4 glass-effect rounded-xl"
                  whileHover={{ x: 10, boxShadow: '0 0 30px rgba(37, 99, 235, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Briefcase className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('about.currentlyAt')}</p>
                    <p className="font-medium">{t('about.freelance')}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="info-card flex items-center gap-4 p-4 glass-effect rounded-xl"
                  whileHover={{ x: 10, boxShadow: '0 0 30px rgba(37, 99, 235, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-3 bg-blue-400/20 rounded-lg">
                    <MapPin className="text-blue-300" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('about.basedIn')}</p>
                    <p className="font-medium">{personalInfo.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="info-card flex items-center gap-4 p-4 glass-effect rounded-xl"
                  whileHover={{ x: 10, boxShadow: '0 0 30px rgba(37, 99, 235, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <GraduationCap className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('about.education')}</p>
                    <p className="font-medium">{education[0]?.school}</p>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="stat-card text-center p-4 glass-effect rounded-xl"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="text-2xl md:text-3xl font-bold gradient-text mb-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default About;
