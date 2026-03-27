import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createStarShape() {
  const shape = new THREE.Shape();
  const outerRadius = 0.5;
  const innerRadius = 0.2;
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    if (i === 0)
      shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  shape.closePath();
  return shape;
}

function Star({
  position,
  scale,
  speed,
}: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const shape = createStarShape();
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += speed * 0.01;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color="#C8A25A"
        emissive="#C8A25A"
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function Particles({ count = 80 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#E8C97A" size={0.05} transparent opacity={0.6} />
    </points>
  );
}

const stars = [
  {
    id: "s1",
    position: [-6, 2, -2] as [number, number, number],
    scale: 0.6,
    speed: 0.5,
  },
  {
    id: "s2",
    position: [6, -1, -3] as [number, number, number],
    scale: 0.8,
    speed: -0.3,
  },
  {
    id: "s3",
    position: [-3, -2, -1] as [number, number, number],
    scale: 0.4,
    speed: 0.7,
  },
  {
    id: "s4",
    position: [4, 3, -2] as [number, number, number],
    scale: 0.5,
    speed: -0.6,
  },
  {
    id: "s5",
    position: [0, -3, -2] as [number, number, number],
    scale: 0.7,
    speed: 0.4,
  },
  {
    id: "s6",
    position: [-7, 0, -3] as [number, number, number],
    scale: 0.35,
    speed: -0.8,
  },
  {
    id: "s7",
    position: [7, 1, -1] as [number, number, number],
    scale: 0.45,
    speed: 0.6,
  },
  {
    id: "s8",
    position: [2, 4, -2] as [number, number, number],
    scale: 0.55,
    speed: -0.4,
  },
  // 6 additional stars
  {
    id: "s9",
    position: [-5, 3, -4] as [number, number, number],
    scale: 0.5,
    speed: 0.35,
  },
  {
    id: "s10",
    position: [5, -3, -4] as [number, number, number],
    scale: 0.4,
    speed: -0.55,
  },
  {
    id: "s11",
    position: [-1, 4, -3] as [number, number, number],
    scale: 0.65,
    speed: 0.9,
  },
  {
    id: "s12",
    position: [3, -4, -2] as [number, number, number],
    scale: 0.3,
    speed: -0.7,
  },
  {
    id: "s13",
    position: [-4, -3, -2] as [number, number, number],
    scale: 0.55,
    speed: 0.45,
  },
  {
    id: "s14",
    position: [8, 3, -5] as [number, number, number],
    scale: 0.38,
    speed: -0.5,
  },
];

export function HeroStarScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#C8A25A" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#E8C97A" intensity={1} />
      {stars.map((s) => (
        <Star
          key={s.id}
          position={s.position}
          scale={s.scale}
          speed={s.speed}
        />
      ))}
      <Particles count={160} />
    </Canvas>
  );
}

function SmallParticles() {
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#E8C97A" size={0.06} transparent opacity={0.7} />
    </points>
  );
}

export function SectionSparkles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.4,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <SmallParticles />
    </Canvas>
  );
}

function RotatingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(
    () => new THREE.ShapeGeometry(createStarShape()),
    [],
  );
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#C8A25A"
        emissive="#C8A25A"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export function NavStar() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 60 }}
      style={{
        width: 32,
        height: 32,
        pointerEvents: "none",
        display: "inline-block",
      }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} color="#C8A25A" intensity={3} />
      <RotatingStar />
    </Canvas>
  );
}

function GlowOrb({
  position,
  color,
}: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y =
        position[1] + Math.sin(t * 0.5 + position[0]) * 0.5;
      meshRef.current.scale.setScalar(
        1 + Math.sin(t * 0.8 + position[0]) * 0.1,
      );
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

const orbPositions: Array<{
  id: string;
  pos: [number, number, number];
  color: string;
}> = [
  { id: "o1", pos: [-6, 0, -3], color: "#C8A25A" },
  { id: "o2", pos: [0, 0, -4], color: "#E8C97A" },
  { id: "o3", pos: [6, 0, -3], color: "#C8A25A" },
  { id: "o4", pos: [-3, 1, -5], color: "#A07840" },
  { id: "o5", pos: [3, -1, -5], color: "#E8C97A" },
];

export function StatsOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} color="#C8A25A" intensity={2} />
      {orbPositions.map((o) => (
        <GlowOrb key={o.id} position={o.pos} color={o.color} />
      ))}
    </Canvas>
  );
}
