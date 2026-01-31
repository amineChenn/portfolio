import { useEffect, useRef, useState } from 'react';

/**
 * Subtle animated particle background for developer portfolio
 * Uses Canvas 2D for optimal performance
 * - 30-50 small particles with slow movement
 * - Connections between nearby particles
 * - Subtle cursor interaction
 * - Animated gradient background
 * - Disabled/reduced on mobile
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const gradientPhaseRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 ||
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 1.5; // 1.5-3px
        this.speedX = (Math.random() - 0.5) * 0.3; // Very slow
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.2 + 0.3; // 0.3-0.5
        // Mix between white and pale violet
        this.isViolet = Math.random() > 0.5;
      }

      update() {
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle mouse repulsion
        if (mouseRef.current.x !== null && !mobile) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 0.5;
            this.y += Math.sin(angle) * force * 0.5;
          }
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (this.isViolet) {
          ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`; // #a78bfa
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        }

        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      const particleCount = mobile ? 15 : 40; // Reduce on mobile
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      const particles = particlesRef.current;
      const maxDistance = mobile ? 80 : 120;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.1; // Max 0.1 opacity
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Draw animated gradient background
    const drawBackground = () => {
      gradientPhaseRef.current += 0.002; // Very slow shift

      const phase = gradientPhaseRef.current;
      const shift = Math.sin(phase) * 0.5 + 0.5; // 0 to 1

      // Interpolate between #0a0a0a and #1a1a2e
      const r = Math.round(10 + shift * 16); // 10 to 26
      const g = Math.round(10 + shift * 16); // 10 to 26
      const b = Math.round(10 + shift * 36); // 10 to 46

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );

      gradient.addColorStop(0, `rgb(${r + 5}, ${g + 5}, ${b + 10})`);
      gradient.addColorStop(1, `rgb(${r}, ${g}, ${b})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Animation loop
    const animate = () => {
      // Draw gradient background
      drawBackground();

      // Draw connections first (behind particles)
      if (!mobile) {
        drawConnections();
      }

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
