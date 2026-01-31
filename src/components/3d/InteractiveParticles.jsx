import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shader for more dynamic particles
const vertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;

  attribute float aSize;
  attribute float aSpeed;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Spiral motion based on time
    float angle = uTime * aSpeed * 0.5;
    float radius = length(pos.xy);
    pos.x += sin(angle + radius) * 0.5;
    pos.y += cos(angle + radius * 0.5) * 0.5;

    // Scroll-based movement
    pos.z += uScrollProgress * 5.0;

    // Mouse interaction - particles move away from cursor
    vec2 mouseOffset = pos.xy - uMouse * 10.0;
    float mouseDistance = length(mouseOffset);
    float mouseInfluence = smoothstep(5.0, 0.0, mouseDistance);
    pos.xy += normalize(mouseOffset) * mouseInfluence * 2.0;

    // Calculate alpha based on distance from camera
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float distance = length(mvPosition.xyz);
    vAlpha = smoothstep(30.0, 5.0, distance) * 0.8;

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (20.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Create circular particles with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;

    // Add glow effect
    vec3 glow = vColor * (1.0 - dist * 2.0);

    gl_FragColor = vec4(vColor + glow * 0.3, alpha);
  }
`;

const InteractiveParticles = ({ count = 2000, mouse, scrollProgress = 0 }) => {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useRef({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  });

  // Generate particle attributes
  const { positions, sizes, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#10b981'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * 20 + 5;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 3 + 1;
      speeds[i] = Math.random() * 2 + 0.5;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, sizes, speeds, colors };
  }, [count]);

  // Update uniforms
  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.getElapsedTime();
      uniforms.current.uScrollProgress.value = scrollProgress;

      if (mouse) {
        uniforms.current.uMouse.value.x = THREE.MathUtils.lerp(
          uniforms.current.uMouse.value.x,
          mouse.x,
          0.1
        );
        uniforms.current.uMouse.value.y = THREE.MathUtils.lerp(
          uniforms.current.uMouse.value.y,
          mouse.y,
          0.1
        );
      }

      // Gentle rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default InteractiveParticles;
