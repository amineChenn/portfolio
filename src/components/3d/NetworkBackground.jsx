import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

// Configuration
const CONFIG = {
  // Grid of connected nodes
  gridSize: 8,
  gridSpacing: 3,
  connectionDistance: 4.5,
  // Floating symbols
  symbolCount: 15,
  // Animation
  rotationSpeed: 0.02,
  floatSpeed: 0.3,
  floatAmplitude: 0.5,
  // Appearance
  nodeOpacity: 0.08,
  lineOpacity: 0.04,
  symbolOpacity: 0.06,
};

// Network grid of connected points
const NetworkGrid = () => {
  const groupRef = useRef();
  const linesRef = useRef();

  // Generate grid points
  const { positions, connections } = useMemo(() => {
    const points = [];
    const half = (CONFIG.gridSize - 1) / 2;

    // Create grid points with some randomness
    for (let x = 0; x < CONFIG.gridSize; x++) {
      for (let y = 0; y < CONFIG.gridSize; y++) {
        const px = (x - half) * CONFIG.gridSpacing + (Math.random() - 0.5) * 1.5;
        const py = (y - half) * CONFIG.gridSpacing + (Math.random() - 0.5) * 1.5;
        const pz = -15 + (Math.random() - 0.5) * 5;
        points.push(new THREE.Vector3(px, py, pz));
      }
    }

    // Create connections between nearby points
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < CONFIG.connectionDistance) {
          lines.push(points[i], points[j]);
        }
      }
    }

    const posArray = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      posArray[i * 3] = p.x;
      posArray[i * 3 + 1] = p.y;
      posArray[i * 3 + 2] = p.z;
    });

    const lineArray = new Float32Array(lines.length * 3);
    lines.forEach((p, i) => {
      lineArray[i * 3] = p.x;
      lineArray[i * 3 + 1] = p.y;
      lineArray[i * 3 + 2] = p.z;
    });

    return { positions: posArray, connections: lineArray };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * CONFIG.rotationSpeed) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * CONFIG.rotationSpeed * 0.7) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Grid points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#3b82f6"
          transparent
          opacity={CONFIG.nodeOpacity}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={CONFIG.lineOpacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

// Floating code symbols using sprites
const FloatingSymbols = () => {
  const groupRef = useRef();

  const symbols = useMemo(() => {
    const codeSymbols = ['<', '>', '/', '{', '}', '[', ']', '(', ')', ';', '#', '=', '+', '-', '*'];
    const items = [];

    for (let i = 0; i < CONFIG.symbolCount; i++) {
      items.push({
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 25,
          -20 + Math.random() * 10
        ),
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {symbols.map((item, i) => (
        <FloatingSymbol key={i} {...item} index={i} />
      ))}
    </group>
  );
};

// Individual floating symbol
const FloatingSymbol = ({ symbol, position, speed, phase, rotationSpeed, index }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position.y +
        Math.sin(state.clock.elapsedTime * speed + phase) * CONFIG.floatAmplitude;
      meshRef.current.position.x = position.x +
        Math.cos(state.clock.elapsedTime * speed * 0.7 + phase) * CONFIG.floatAmplitude * 0.5;

      // Slow rotation
      meshRef.current.rotation.z += rotationSpeed;
    }
  });

  // Create text texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 64, 64);

    ctx.font = 'bold 48px monospace';
    ctx.fillStyle = '#3b82f6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, 32, 32);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [symbol]);

  return (
    <sprite
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      scale={[1.5, 1.5, 1]}
    >
      <spriteMaterial
        map={texture}
        transparent
        opacity={CONFIG.symbolOpacity}
        depthWrite={false}
      />
    </sprite>
  );
};

// Binary rain effect - very subtle
const BinaryRain = () => {
  const groupRef = useRef();

  const particles = useMemo(() => {
    const items = [];
    const columns = 12;

    for (let i = 0; i < columns; i++) {
      items.push({
        x: (i - columns / 2) * 4 + (Math.random() - 0.5) * 2,
        speed: 0.3 + Math.random() * 0.2,
        offset: Math.random() * 20,
        binary: Math.random() > 0.5 ? '0' : '1',
      });
    }

    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -25]}>
      {particles.map((p, i) => (
        <BinaryParticle key={i} {...p} />
      ))}
    </group>
  );
};

const BinaryParticle = ({ x, speed, offset, binary }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Slow falling motion that loops
      const y = 15 - ((state.clock.elapsedTime * speed + offset) % 30);
      meshRef.current.position.y = y;
    }
  });

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#22c55e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(binary, 16, 16);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [binary]);

  return (
    <sprite
      ref={meshRef}
      position={[x, 0, 0]}
      scale={[0.8, 0.8, 1]}
    >
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.03}
        depthWrite={false}
      />
    </sprite>
  );
};

// Main component
const NetworkBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />

        {/* Network grid */}
        <NetworkGrid />

        {/* Floating code symbols */}
        <FloatingSymbols />

        {/* Binary rain - very subtle */}
        <BinaryRain />

        {/* Subtle fog */}
        <fog attach="fog" args={['#030712', 25, 50]} />
      </Canvas>
    </div>
  );
};

export default NetworkBackground;
