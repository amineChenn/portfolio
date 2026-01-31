import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

// Wireframe sphere container
const WireframeSphere = ({ radius = 1.2 }) => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      // Slow rotation of the sphere
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color="#2563eb"
        emissive="#2563eb"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Inner glowing sphere for depth effect
const InnerGlow = ({ radius = 0.3 }) => {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      // Pulsing glow effect
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      glowRef.current.material.emissiveIntensity = intensity;
    }
  });

  return (
    <mesh ref={glowRef}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#60a5fa"
        emissiveIntensity={0.3}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

// Orbiting letter A
const OrbitingLetterA = () => {
  const groupRef = useRef();
  const letterRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around Y axis
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      // Slight tilt variation
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (letterRef.current) {
      // Counter-rotate the letter so it always faces outward
      letterRef.current.rotation.y = -state.clock.elapsedTime * 0.5 + Math.PI;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0.55, 0, 0]} ref={letterRef}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.35}
            height={0.08}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.015}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={5}
          >
            A
            <meshStandardMaterial
              color="#2563eb"
              emissive="#3b82f6"
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </Text3D>
        </Center>
      </group>
    </group>
  );
};

// Orbiting letter C
const OrbitingLetterC = () => {
  const groupRef = useRef();
  const letterRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around Y axis with offset (opposite side of A)
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5 + Math.PI;
      // Different tilt pattern
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (letterRef.current) {
      // Counter-rotate the letter so it always faces outward (add Math.PI to face camera)
      letterRef.current.rotation.y = -state.clock.elapsedTime * 0.5 - Math.PI;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0.55, 0, 0]} ref={letterRef}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.35}
            height={0.08}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.015}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={5}
          >
            C
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </Text3D>
        </Center>
      </group>
    </group>
  );
};

// Orbiting particles around the sphere
const OrbitingParticles = ({ count = 30 }) => {
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 1.4 + Math.random() * 0.3;
      temp.push({
        theta,
        phi,
        radius,
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      particles.forEach((particle, i) => {
        const time = state.clock.elapsedTime * particle.speed + particle.offset;
        const theta = particle.theta + time;
        const phi = particle.phi + Math.sin(time * 0.5) * 0.2;
        const radius = particle.radius + Math.sin(time * 2) * 0.1;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.cos(phi);
        positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      });
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const initialPositions = useMemo(() => {
    return new Float32Array(particles.flatMap((p) => {
      const x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
      const y = p.radius * Math.cos(p.phi);
      const z = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
      return [x, y, z];
    }));
  }, [particles]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#60a5fa"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Orbital rings decoration
const OrbitalRing = ({ radius, speed, tiltX = 0, tiltZ = 0, color = "#2563eb" }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.008, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Main scene composition
const Logo3DScene = () => {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#2563eb" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#0ea5e9" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#60a5fa" />

      {/* Main logo group with float effect */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group>
          {/* Wireframe sphere container */}
          <WireframeSphere radius={1.1} />

          {/* Inner glow */}
          <InnerGlow radius={0.25} />

          {/* Orbiting letters */}
          <OrbitingLetterA />
          <OrbitingLetterC />

          {/* Decorative orbital rings */}
          <OrbitalRing radius={1.3} speed={0.2} tiltX={Math.PI / 6} color="#2563eb" />
          <OrbitalRing radius={1.35} speed={-0.15} tiltX={-Math.PI / 4} tiltZ={Math.PI / 8} color="#0ea5e9" />
        </group>
      </Float>

      {/* Orbiting particles */}
      <OrbitingParticles count={35} />
    </>
  );
};

const Logo3D = ({ className = "" }) => {
  return (
    <div className={`w-full h-40 md:h-48 lg:h-56 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Logo3DScene />
      </Canvas>
    </div>
  );
};

export default Logo3D;
