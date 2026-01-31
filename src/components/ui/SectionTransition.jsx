import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Terminal-style command line that appears when entering section
const TerminalCommand = ({ command, isVisible }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= command.length) {
        setDisplayedText(command.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, command]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono text-sm mb-6 flex items-center gap-2"
    >
      <span className="text-green-400">$</span>
      <span className="text-blue-300">{displayedText}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-2 h-4 bg-blue-400 inline-block"
        />
      )}
    </motion.div>
  );
};

// Opening/closing tags animation
const CodeTags = ({ sectionName, position, isVisible }) => {
  const isOpening = position === 'opening';

  return (
    <motion.div
      initial={{ opacity: 0, x: isOpening ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: isOpening ? 0 : 0.3 }}
      className="font-mono text-sm text-blue-500/50 py-2"
    >
      {isOpening ? (
        <>
          <span className="text-pink-400/70">{'<'}</span>
          <span className="text-cyan-400/70">{sectionName}</span>
          <span className="text-yellow-400/70">{' className'}</span>
          <span className="text-white/50">{'='}</span>
          <span className="text-green-400/70">{'"section"'}</span>
          <span className="text-pink-400/70">{'>'}</span>
        </>
      ) : (
        <>
          <span className="text-pink-400/70">{'</'}</span>
          <span className="text-cyan-400/70">{sectionName}</span>
          <span className="text-pink-400/70">{'>'}</span>
        </>
      )}
    </motion.div>
  );
};

// Compilation status bar
const CompilationBar = ({ isVisible, sectionName }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('compiling');

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStatus('compiling');
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('complete');
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between text-xs font-mono mb-1">
        <span className={status === 'complete' ? 'text-green-400' : 'text-yellow-400'}>
          {status === 'complete' ? `[OK] ${sectionName} loaded` : `[...] Loading ${sectionName}...`}
        </span>
        <span className="text-gray-500">{Math.round(Math.min(progress, 100))}%</span>
      </div>
      <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${status === 'complete' ? 'bg-green-500' : 'bg-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

// Function signature decorator
const FunctionSignature = ({ name, isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="font-mono text-xs text-gray-500/60 mb-2"
    >
      <span className="text-blue-400/60">function</span>
      <span className="text-yellow-400/60"> render{name}</span>
      <span className="text-white/40">{'() {'}</span>
    </motion.div>
  );
};

// Main Section Transition Wrapper
const SectionTransition = ({
  children,
  sectionId,
  sectionName,
  showTerminal = true,
  showTags = true,
  showCompilation = false,
  command = null
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const [hasEntered, setHasEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax effect for the content
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  useEffect(() => {
    if (isInView && !hasEntered) {
      setHasEntered(true);
    }
  }, [isInView, hasEntered]);

  const terminalCommand = command || `render --section ${sectionId}`;

  return (
    <div ref={sectionRef} className="relative">
      {/* Decorative line number gutter - visible on large screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={hasEntered ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="absolute left-0 top-0 bottom-0 w-12 border-r border-blue-500/5 hidden xl:block"
      >
        <div className="sticky top-32 font-mono text-[10px] text-blue-500/20 leading-5 pl-2">
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i}>{String(i + 1).padStart(2, '0')}</div>
          ))}
        </div>
      </motion.div>

      {/* Main content wrapper */}
      <div className="xl:pl-16">
        {/* Terminal command */}
        {showTerminal && (
          <div className="px-6 md:px-8">
            <TerminalCommand command={terminalCommand} isVisible={hasEntered} />
          </div>
        )}

        {/* Compilation bar */}
        {showCompilation && (
          <div className="px-6 md:px-8">
            <CompilationBar isVisible={hasEntered} sectionName={sectionName} />
          </div>
        )}

        {/* Opening tag */}
        {showTags && (
          <div className="px-6 md:px-8">
            <CodeTags sectionName={sectionName} position="opening" isVisible={hasEntered} />
          </div>
        )}

        {/* Content with parallax */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>

        {/* Closing tag */}
        {showTags && (
          <div className="px-6 md:px-8">
            <CodeTags sectionName={sectionName} position="closing" isVisible={hasEntered} />
          </div>
        )}
      </div>

      {/* Decorative bracket on the side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={hasEntered ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="absolute -right-4 top-1/2 -translate-y-1/2 font-mono text-8xl text-blue-500 pointer-events-none select-none hidden lg:block"
      >
        {'}'}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
