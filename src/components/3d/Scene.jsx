import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D particle background for developer portfolio
 * - Particles moving in 3D space with depth
 * - Smooth orbital/flowing movement
 * - Connections between nearby particles
 * - Subtle cursor interaction
 * - Animated gradient background
 */

// 3D Animated Particles with orbital movement
const AnimatedParticles3D = ({ mouse, isMobile }) => {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  const particleCount = isMobile ? 25 : 50;
  const connectionDistance = 2.5;

  // Initialize particles in 3D sphere distribution
  const { positions, velocities, colors, angles } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);
    const angles = [];

    const white = new THREE.Color('#ffffff');
    const violet = new THREE.Color('#a78bfa');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distribute in 3D space - sphere-like distribution
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 5;

      // Store angle data for orbital movement
      angles.push({
        radius,
        theta,
        phi,
        thetaSpeed: (Math.random() - 0.5) * 0.008,
        phiSpeed: (Math.random() - 0.5) * 0.004,
        radiusOscillation: Math.random() * Math.PI * 2,
      });

      // Individual drift velocities (for additional organic movement)
      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
      });

      // Mix white and violet
      const color = Math.random() > 0.4 ? violet : white;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, velocities, colors, angles };
  }, [particleCount]);

  // Line geometry for connections
  const linePositions = useMemo(() => {
    const maxConnections = (particleCount * (particleCount - 1)) / 2;
    return new Float32Array(maxConnections * 6);
  }, [particleCount]);

  const lineColors = useMemo(() => {
    const maxConnections = (particleCount * (particleCount - 1)) / 2;
    return new Float32Array(maxConnections * 6);
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotate entire group slowly for 3D effect
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }

    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position.array;

    // Update particle positions with orbital movement
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = angles[i];

      // Update angles for orbital movement
      angle.theta += angle.thetaSpeed;
      angle.phi += angle.phiSpeed;

      // Oscillate radius for breathing effect
      const currentRadius = angle.radius + Math.sin(time * 0.5 + angle.radiusOscillation) * 0.5;

      // Calculate new 3D position
      posArray[i3] = currentRadius * Math.sin(angle.phi) * Math.cos(angle.theta);
      posArray[i3 + 1] = currentRadius * Math.sin(angle.phi) * Math.sin(angle.theta);
      posArray[i3 + 2] = currentRadius * Math.cos(angle.phi) - 5;

      // Add organic drift
      posArray[i3] += velocities[i].x;
      posArray[i3 + 1] += velocities[i].y;
      posArray[i3 + 2] += velocities[i].z;

      // Subtle mouse interaction (push particles away in 3D)
      if (mouse && !isMobile && mouse.x !== undefined) {
        const mouseX = mouse.x * 8;
        const mouseY = mouse.y * 5;
        const dx = posArray[i3] - mouseX;
        const dy = posArray[i3 + 1] - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 3 && dist > 0) {
          const force = (3 - dist) / 3 * 0.03;
          posArray[i3] += (dx / dist) * force;
          posArray[i3 + 1] += (dy / dist) * force;
          posArray[i3 + 2] += force * 0.5; // Push back in Z too
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connection lines
    if (linesRef.current) {
      const linePos = linesRef.current.geometry.attributes.position.array;
      const lineCol = linesRef.current.geometry.attributes.color.array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance && lineIndex < linePos.length - 6) {
            const opacity = (1 - dist / connectionDistance) * 0.12;

            // Line vertices
            linePos[lineIndex] = posArray[i3];
            linePos[lineIndex + 1] = posArray[i3 + 1];
            linePos[lineIndex + 2] = posArray[i3 + 2];
            linePos[lineIndex + 3] = posArray[j3];
            linePos[lineIndex + 4] = posArray[j3 + 1];
            linePos[lineIndex + 5] = posArray[j3 + 2];

            // Violet color with fade
            const intensity = opacity * 2.5;
            lineCol[lineIndex] = 0.65 * intensity;
            lineCol[lineIndex + 1] = 0.55 * intensity;
            lineCol[lineIndex + 2] = 0.98 * intensity;
            lineCol[lineIndex + 3] = 0.65 * intensity;
            lineCol[lineIndex + 4] = 0.55 * intensity;
            lineCol[lineIndex + 5] = 0.98 * intensity;

            lineIndex += 6;
          }
        }
      }

      // Clear unused lines
      for (let i = lineIndex; i < linePos.length; i++) {
        linePos[i] = 0;
        lineCol[i] = 0;
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.1 : 0.12}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

// Floating 3D geometric shapes (very subtle)
const FloatingShapes = ({ isMobile }) => {
  const group1Ref = useRef();
  const group2Ref = useRef();
  const group3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (group1Ref.current) {
      group1Ref.current.rotation.x = time * 0.1;
      group1Ref.current.rotation.y = time * 0.15;
      group1Ref.current.position.y = Math.sin(time * 0.3) * 0.5;
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = time * 0.08;
      group2Ref.current.rotation.z = time * 0.12;
      group2Ref.current.position.y = Math.cos(time * 0.25) * 0.4;
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.y = time * 0.07;
      group3Ref.current.rotation.z = time * 0.1;
      group3Ref.current.position.x = Math.sin(time * 0.2) * 0.3;
    }
  });

  if (isMobile) return null;

  return (
    <>
      {/* Wireframe Icosahedron */}
      <group ref={group1Ref} position={[-7, 2, -8]}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </group>

      {/* Wireframe Octahedron */}
      <group ref={group2Ref} position={[8, -1, -10]}>
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>

      {/* Wireframe Torus */}
      <group ref={group3Ref} position={[-5, -3, -12]}>
        <mesh>
          <torusGeometry args={[0.7, 0.2, 8, 16]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
      </group>
    </>
  );
};

// Animated gradient background with depth
const GradientBackground = () => {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#0a0a0a') },
    uColor2: { value: new THREE.Color('#1a1a2e') },
    uColor3: { value: new THREE.Color('#0f0f1a') },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    void main() {
      // Animated gradient shift
      float shift = sin(uTime * 0.1) * 0.5 + 0.5;
      float shift2 = cos(uTime * 0.08) * 0.5 + 0.5;

      // Multi-point gradient
      vec3 color = mix(uColor1, uColor2, vUv.y * shift);
      color = mix(color, uColor3, (1.0 - vUv.x) * shift2 * 0.3);

      // Animated radial pulse
      float dist = distance(vUv, vec2(0.5 + sin(uTime * 0.1) * 0.1, 0.5 + cos(uTime * 0.12) * 0.1));
      float pulse = sin(uTime * 0.2) * 0.02 + 0.02;
      color = mix(color, uColor2, smoothstep(0.5, 0.0, dist) * pulse);

      // Vignette
      color = mix(color, uColor1, dist * 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh position={[0, 0, -20]}>
      <planeGeometry args={[80, 50]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

// Main Scene
const Scene = ({ mousePosition }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <Suspense fallback={null}>
          {/* Animated gradient background */}
          <GradientBackground />

          {/* Floating wireframe shapes */}
          <FloatingShapes isMobile={isMobile} />

          {/* 3D Animated particles with connections */}
          <AnimatedParticles3D mouse={mousePosition} isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default Scene;
