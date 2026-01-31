import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Linkedin, Github, CheckCircle, Loader2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SectionTransition from '../ui/SectionTransition';
import { personalInfo } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info section slide from left
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          {
            opacity: 0,
            x: -100,
            rotateY: -10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Contact methods stagger
        const methods = infoRef.current.querySelectorAll('.contact-method');
        if (methods.length) {
          gsap.fromTo(
            methods,
            { opacity: 0, x: -50, rotation: -5 },
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: infoRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // Form slide from bottom with fade
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Form fields stagger
        const fields = formRef.current.querySelectorAll('.form-field');
        if (fields.length) {
          gsap.fromTo(
            fields,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: formRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Contact methods without email - LinkedIn is primary
  const contactMethods = [
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: t('contact.connectWithMe'),
      href: personalInfo.linkedin,
      color: '#0A66C2',
      primary: true,
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: t('contact.viewCode'),
      href: personalInfo.github,
      color: '#ffffff',
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: personalInfo.location,
      href: '#',
      color: '#06b6d4',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32">
      <SectionTransition
        sectionId="contact"
        sectionName="Contact"
        command="npm run connect --hire-me"
      >
        <div className="container mx-auto px-6">
          <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div
            ref={infoRef}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-3xl font-bold mb-6">
              {t('contact.workTogether')} <span className="gradient-text">{t('contact.together')}</span>
            </h3>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t('contact.intro')}
            </p>

            {/* Contact methods - LinkedIn highlighted as primary */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`contact-method flex items-center gap-4 p-4 glass-effect rounded-xl group transition-all ${
                    method.primary
                      ? 'border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/10'
                      : 'hover:border-blue-500/30'
                  }`}
                  whileHover={{ x: 10, boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)' }}
                >
                  <div
                    className="p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    <method.icon
                      size={24}
                      style={{ color: method.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{method.label}</p>
                    <p className="font-medium group-hover:text-blue-400 transition-colors">
                      {method.value}
                    </p>
                  </div>
                  {method.primary && (
                    <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                      Preferred
                    </span>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Availability status */}
            <div className="inline-flex items-center gap-3 px-4 py-3 glass-effect rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-gray-300">
                {t('contact.available')}
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email row */}
              <div className="form-field grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    {t('contact.yourName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    {t('contact.yourEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-field">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder={t('contact.projectInquiry')}
                />
              </div>

              {/* Message */}
              <div className="form-field">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  placeholder={t('contact.tellMe')}
                />
              </div>

              {/* Submit button */}
              <motion.button
                className="form-field"
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:opacity-90'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    {t('contact.messageSent')}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t('contact.sendMessage')}
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
        </div>
      </SectionTransition>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default Contact;
