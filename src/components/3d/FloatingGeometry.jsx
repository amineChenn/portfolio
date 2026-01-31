import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const FloatingGeometry = ({ position, scale = 1, speed = 1, color = '#2563eb' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
    }
  });

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus = ({ position, scale = 1, speed = 1, color = '#3b82f6' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2 * speed;
    }
  });

  return (
    <Float
      speed={1.5 * speed}
      rotationIntensity={0.5}
      floatIntensity={1.5}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.3}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = ({ position, scale = 1, speed = 1, color = '#0ea5e9' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speed;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2 * speed;
    }
  });

  return (
    <Float
      speed={2.5 * speed}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
};

const GeometryCluster = () => {
  return (
    <group>
      {/* Main decorative shapes - Blue color scheme */}
      <FloatingGeometry position={[-6, 2, -5]} scale={1.5} speed={0.8} color="#2563eb" />
      <FloatingGeometry position={[7, -1, -4]} scale={1} speed={1.2} color="#3b82f6" />
      <FloatingTorus position={[5, 3, -6]} scale={1.2} speed={0.6} color="#0ea5e9" />
      <FloatingTorus position={[-4, -2, -3]} scale={0.8} speed={1} color="#2563eb" />
      <FloatingOctahedron position={[-7, -3, -5]} scale={0.9} speed={0.9} color="#3b82f6" />
      <FloatingOctahedron position={[6, 4, -7]} scale={1.1} speed={0.7} color="#0ea5e9" />

      {/* Smaller accent shapes */}
      <FloatingGeometry position={[3, -4, -4]} scale={0.5} speed={1.5} color="#0ea5e9" />
      <FloatingTorus position={[-3, 4, -5]} scale={0.6} speed={1.3} color="#3b82f6" />
      <FloatingOctahedron position={[0, -3, -6]} scale={0.4} speed={1.8} color="#2563eb" />
    </group>
  );
};

export { FloatingGeometry, FloatingTorus, FloatingOctahedron, GeometryCluster };
export default GeometryCluster;
