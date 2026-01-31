import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Code snippets that will float in the background
const codeSnippets = [
  'const buildSuccess = () => true;',
  'import { creativity } from "mind";',
  'export default Innovation;',
  'async function solve(problem) {',
  '  return elegant.solution;',
  '}',
  'class Developer extends Human {',
  '  constructor() { super(); }',
  '}',
  '<Component props={skills} />',
  'npm run build:production',
  'git commit -m "feature: magic"',
  '@Autowired private Coffee coffee;',
  'SELECT * FROM solutions;',
  'docker-compose up -d',
  '.then(success => celebrate())',
  'interface Props { passion: true }',
  'return <Excellence />;',
];

// Single floating code line
const FloatingCodeLine = ({ text, index, scrollProgress }) => {
  const y = useTransform(
    scrollProgress,
    [0, 1],
    [index * 50, -index * 30 - 200]
  );

  const opacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.7, 1],
    [0.05, 0.15, 0.15, 0.05]
  );

  const x = useTransform(
    scrollProgress,
    [0, 1],
    [index % 2 === 0 ? -50 : 50, index % 2 === 0 ? 50 : -50]
  );

  return (
    <motion.div
      style={{ y, opacity, x }}
      className="absolute font-mono text-xs md:text-sm text-blue-500/30 whitespace-nowrap pointer-events-none select-none"
      initial={{
        left: `${(index * 17) % 80 + 10}%`,
        top: `${(index * 23) % 90 + 5}%`
      }}
    >
      {text}
    </motion.div>
  );
};

// Matrix-style vertical code rain
const CodeRainColumn = ({ index, scrollProgress }) => {
  const characters = '01アイウエオカキクケコ<>/{}[]()=+-*';
  const [chars, setChars] = useState([]);

  useEffect(() => {
    const newChars = Array.from({ length: 15 }, () =>
      characters[Math.floor(Math.random() * characters.length)]
    );
    setChars(newChars);
  }, []);

  const y = useTransform(
    scrollProgress,
    [0, 1],
    [-100, 500 + index * 50]
  );

  const opacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.3, 0.3, 0]
  );

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute font-mono text-[10px] text-green-500/20 leading-tight pointer-events-none select-none"
      initial={{ left: `${index * 5 + 2}%` }}
    >
      {chars.map((char, i) => (
        <div
          key={i}
          style={{
            opacity: 1 - (i * 0.06),
            color: i === 0 ? 'rgba(34, 197, 94, 0.6)' : undefined
          }}
        >
          {char}
        </div>
      ))}
    </motion.div>
  );
};

// Bracket decorations that appear on scroll
const ScrollBrackets = ({ scrollProgress }) => {
  const leftBracketY = useTransform(scrollProgress, [0, 0.5, 1], [100, 0, -100]);
  const rightBracketY = useTransform(scrollProgress, [0, 0.5, 1], [-100, 0, 100]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0]);

  return (
    <>
      <motion.div
        style={{ y: leftBracketY, opacity }}
        className="fixed left-4 md:left-8 top-1/2 font-mono text-6xl md:text-8xl text-blue-500/10 pointer-events-none select-none"
      >
        {'{'}
      </motion.div>
      <motion.div
        style={{ y: rightBracketY, opacity }}
        className="fixed right-4 md:right-8 top-1/2 font-mono text-6xl md:text-8xl text-blue-500/10 pointer-events-none select-none"
      >
        {'}'}
      </motion.div>
    </>
  );
};

// Line numbers sidebar
const ScrollLineNumbers = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0]);
  const y = useTransform(scrollProgress, [0, 1], [0, -500]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed left-2 top-1/4 font-mono text-xs text-blue-500/20 leading-6 pointer-events-none select-none hidden lg:block"
    >
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i}>{String(i + 1).padStart(3, '0')}</div>
      ))}
    </motion.div>
  );
};

// Main scroll-aware code background
const ScrollCodeBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Floating code snippets */}
      {codeSnippets.map((snippet, index) => (
        <FloatingCodeLine
          key={index}
          text={snippet}
          index={index}
          scrollProgress={smoothProgress}
        />
      ))}

      {/* Matrix code rain - subtle */}
      {Array.from({ length: 8 }, (_, i) => (
        <CodeRainColumn
          key={`rain-${i}`}
          index={i}
          scrollProgress={smoothProgress}
        />
      ))}

      {/* Scroll brackets */}
      <ScrollBrackets scrollProgress={smoothProgress} />

      {/* Line numbers */}
      <ScrollLineNumbers scrollProgress={smoothProgress} />

      {/* Scanline effect */}
      <motion.div
        style={{
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.5, 0])
        }}
        className="scanline"
      />
    </div>
  );
};

export default ScrollCodeBackground;
