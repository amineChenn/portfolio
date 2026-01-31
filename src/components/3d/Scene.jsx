import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

// Subtle dust particles - very discrete background effect
const SubtleParticles = ({ count = 300 }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a large area, pushed back in z
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 30 - 10; // Pushed further back
    }

    return { positions };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      // Very slow rotation for subtle movement
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.008;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.005) * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#5a7faa"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Secondary layer of even more subtle particles for depth
const DepthParticles = ({ count = 150 }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 20; // Even further back
    }

    return { positions };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      // Even slower rotation
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6a8aaa"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Scene = ({ mousePosition }) => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Scene background color */}
        <color attach="background" args={['#030712']} />

        {/* Minimal lighting - no intense colored lights */}
        <ambientLight intensity={0.3} />

        {/* Subtle particle layers */}
        <SubtleParticles count={300} />
        <DepthParticles count={150} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#030712', 20, 60]} />

        <Preload all />
      </Canvas>
    </div>
  );
};

export default Scene;
