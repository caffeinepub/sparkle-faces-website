import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createStarShape() {
  const shape = new THREE.Shape();
  const outerRadius = 0.5;
  const innerRadius = 0.2;
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function FloatingStars({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const shape = createStarShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.05,
      bevelEnabled: false,
    });
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ),
      rotation: Math.random() * Math.PI * 2,
      speed: 0.001 + Math.random() * 0.003,
      scale: 0.05 + Math.random() * 0.18,
      drift: (Math.random() - 0.5) * 0.002,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    stars.forEach((star, i) => {
      star.rotation += star.speed;
      star.position.y += star.drift;
      if (star.position.y > 10) star.position.y = -10;
      if (star.position.y < -10) star.position.y = 10;

      dummy.position.copy(star.position);
      dummy.rotation.z = star.rotation;
      dummy.position.y += Math.sin(t * 0.5 + i) * 0.01;
      const s = star.scale * (1 + Math.sin(t * 0.8 + i * 0.3) * 0.1);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial
        color={0xc0c8e0}
        emissive={0x8090b0}
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return positions;
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xe8eeff,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
      }),
    [],
  );

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

export function HeroStarScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={0xb0c4de} />
        <pointLight position={[-5, -5, 3]} intensity={0.8} color={0x8090c0} />
        <FloatingStars count={100} />
        <FloatingParticles count={180} />
      </Canvas>
    </div>
  );
}

function OrbCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color={0x7090c0}
        emissive={0x3060a0}
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function StatsOrbScene() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color={0xb0c4de} />
        <OrbCore />
        <FloatingParticles count={80} />
      </Canvas>
    </div>
  );
}

function SmallStars({ count = 30 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const shape = createStarShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: false,
    });
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5 - 3,
      ),
      rotation: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.005,
      scale: 0.04 + Math.random() * 0.1,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    stars.forEach((star, i) => {
      star.rotation += star.speed;
      dummy.position.copy(star.position);
      dummy.rotation.z = star.rotation;
      dummy.scale.setScalar(star.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial
        color={0xd0d8f0}
        emissive={0x8090c0}
        emissiveIntensity={0.5}
        metalness={0.6}
        roughness={0.4}
      />
    </instancedMesh>
  );
}

export function SectionSparkles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity: 0.6 }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
        <ambientLight intensity={0.15} />
        <pointLight position={[4, 4, 4]} intensity={0.8} color={0xb0c4de} />
        <SmallStars count={40} />
        <FloatingParticles count={60} />
      </Canvas>
    </div>
  );
}

// ─── Promo-exclusive elements ────────────────────────────────────────────────

function FloatingDiamonds({ count = 25 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.15, 0), []);

  const diamonds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 36,
          Math.random() * 6 - 8,
        ),
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        speedX: 0.003 + Math.random() * 0.007,
        speedY: 0.002 + Math.random() * 0.005,
        drift: (Math.random() - 0.5) * 0.0015,
        scale: 0.6 + Math.random() * 0.8,
      })),
    [count],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    diamonds.forEach((d, i) => {
      d.rotX += d.speedX;
      d.rotY += d.speedY;
      d.position.y += d.drift;
      if (d.position.y > 18) d.position.y = -18;
      if (d.position.y < -18) d.position.y = 18;
      dummy.position.copy(d.position);
      dummy.rotation.set(d.rotX, d.rotY, 0);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial
        color={0xc8d4f0}
        emissive={0x8090c0}
        emissiveIntensity={0.4}
        metalness={0.85}
        roughness={0.1}
      />
    </instancedMesh>
  );
}

function FloatingRings({ count = 20 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(
    () => new THREE.TorusGeometry(0.25, 0.04, 8, 20),
    [],
  );

  const rings = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 36,
          Math.random() * 6 - 8,
        ),
        rotX: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.008,
        speedZ: (Math.random() - 0.5) * 0.006,
        drift: (Math.random() - 0.5) * 0.0012,
        scale: 0.7 + Math.random() * 1.2,
      })),
    [count],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    rings.forEach((r, i) => {
      r.rotX += r.speedX;
      r.rotZ += r.speedZ;
      r.position.y += r.drift;
      if (r.position.y > 18) r.position.y = -18;
      if (r.position.y < -18) r.position.y = 18;
      dummy.position.copy(r.position);
      dummy.rotation.set(r.rotX, 0, r.rotZ);
      dummy.scale.setScalar(r.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial
        color={0xb0c4de}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.75}
      />
    </instancedMesh>
  );
}

function DriftingOrbs({ count = 8 }: { count?: number }) {
  const orbs = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 36,
          Math.random() * 6 - 8,
        ),
        radius: 0.6 + Math.random() * 0.6,
        opacity: 0.04 + Math.random() * 0.04,
        driftX: (Math.random() - 0.5) * 0.001,
        driftY: (Math.random() - 0.5) * 0.0008,
        phase: Math.random() * Math.PI * 2,
        id,
      })),
    [count],
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    orbs.forEach((orb, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      orb.position.x += orb.driftX;
      orb.position.y += orb.driftY;
      if (orb.position.x > 25) orb.position.x = -25;
      if (orb.position.x < -25) orb.position.x = 25;
      if (orb.position.y > 18) orb.position.y = -18;
      if (orb.position.y < -18) orb.position.y = 18;
      mesh.position.copy(orb.position);
      const pulse = 1 + Math.sin(t * 0.4 + orb.phase) * 0.05;
      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={orb.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={orb.position.toArray() as [number, number, number]}
        >
          <sphereGeometry args={[orb.radius, 12, 12]} />
          <meshStandardMaterial
            color={0x7090c0}
            emissive={0x4060a0}
            emissiveIntensity={0.3}
            transparent
            opacity={orb.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

export function PromoSparkles() {
  return (
    <div
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        opacity: 0.7,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 8, 5]} intensity={1.2} color={0xb0c4de} />
        <pointLight position={[-8, -6, 4]} intensity={0.7} color={0x8090c0} />
        <SmallStars count={60} />
        <FloatingParticles count={100} />
        <FloatingDiamonds count={25} />
        <FloatingRings count={20} />
        <DriftingOrbs count={8} />
      </Canvas>
    </div>
  );
}

export function NavStar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="rgba(160,190,230,0.8)"
        stroke="rgba(160,190,230,0.4)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
