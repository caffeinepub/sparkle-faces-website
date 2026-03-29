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

// ─── GlobalLuxury3D — large prominent 3D elements across the whole site ───────

/** Large spinning gold/platinum diamonds */
function LuxuryDiamonds() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const items = useMemo(
    () =>
      Array.from({ length: 6 }, (_, idx) => ({
        position: new THREE.Vector3(
          [-16, -8, 12, 6, -14, 10][idx],
          [10, -12, 8, -8, 5, -5][idx],
          [-4, -2, -6, -3, -5, -1][idx],
        ),
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        speedX: 0.004 + Math.random() * 0.004,
        speedY: 0.003 + Math.random() * 0.005,
        drift: (Math.random() - 0.5) * 0.003,
        scale: 1.5 + Math.random() * 1.5,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    if (!meshRef.current) return;
    items.forEach((d, i) => {
      d.rotX += d.speedX;
      d.rotY += d.speedY;
      d.position.y += d.drift;
      if (d.position.y > 14) d.position.y = -14;
      if (d.position.y < -14) d.position.y = 14;
      dummy.position.copy(d.position);
      dummy.rotation.set(d.rotX, d.rotY, 0);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, 6]}>
      <meshStandardMaterial
        color={0xd4af37}
        emissive={0xa07810}
        emissiveIntensity={0.5}
        metalness={0.95}
        roughness={0.05}
      />
    </instancedMesh>
  );
}

/** Large platinum spinning torus rings */
function LuxuryRings() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.15, 12, 40), []);
  const items = useMemo(
    () =>
      Array.from({ length: 5 }, (_, idx) => ({
        position: new THREE.Vector3(
          [14, -18, 0, 18, -6][idx],
          [-6, 8, 13, -10, -14][idx],
          [-5, -3, -7, -2, -4][idx],
        ),
        rotX: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: 0.004 + Math.random() * 0.006,
        speedZ: 0.003 + Math.random() * 0.005,
        drift: (Math.random() - 0.5) * 0.003,
        scale: 2.0 + Math.random() * 1.5,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    if (!meshRef.current) return;
    items.forEach((r, i) => {
      r.rotX += r.speedX;
      r.rotZ += r.speedZ;
      r.position.y += r.drift;
      if (r.position.y > 14) r.position.y = -14;
      if (r.position.y < -14) r.position.y = 14;
      dummy.position.copy(r.position);
      dummy.rotation.set(r.rotX, 0, r.rotZ);
      dummy.scale.setScalar(r.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, 5]}>
      <meshStandardMaterial
        color={0xc0c0c0}
        emissive={0x606070}
        emissiveIntensity={0.35}
        metalness={0.95}
        roughness={0.08}
      />
    </instancedMesh>
  );
}

/** Large glowing orbs — blue-white soft glow */
function LuxuryOrbs() {
  const orbs = useMemo(
    () =>
      [
        { x: -10, y: 5, z: -3, r: 1.4, phase: 0.0 },
        { x: 17, y: -4, z: -5, r: 1.1, phase: 1.2 },
        { x: 3, y: -13, z: -2, r: 1.6, phase: 2.4 },
        { x: -19, y: -9, z: -4, r: 1.0, phase: 3.6 },
      ].map((o, id) => ({
        ...o,
        id,
        driftX: (Math.random() - 0.5) * 0.002,
        driftY: (Math.random() - 0.5) * 0.002,
        px: o.x,
        py: o.y,
      })),
    [],
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    orbs.forEach((orb, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      orb.px += orb.driftX;
      orb.py += orb.driftY;
      if (orb.px > 20) orb.px = -20;
      if (orb.px < -20) orb.px = 20;
      if (orb.py > 14) orb.py = -14;
      if (orb.py < -14) orb.py = 14;
      mesh.position.set(orb.px, orb.py, orb.z);
      const pulse = 1 + Math.sin(t * 0.5 + orb.phase) * 0.12;
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
          position={[orb.px, orb.py, orb.z]}
        >
          <sphereGeometry args={[orb.r, 20, 20]} />
          <meshStandardMaterial
            color={0x8ab4f8}
            emissive={0x4080e0}
            emissiveIntensity={0.8}
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

/** Crown shape: cylinder base + spikes using cones */
function LuxuryCrowns() {
  const crownData = useMemo(
    () => [
      { x: -5, y: 12, z: -6, scale: 2.2 },
      { x: 8, y: -10, z: -4, scale: 2.5 },
      { x: -15, y: -2, z: -5, scale: 1.8 },
    ],
    [],
  );
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.y = t * 0.006 + i * 2.1;
      g.position.y = crownData[i].y + Math.sin(t * 0.3 + i) * 0.4;
    });
  });
  return (
    <>
      {crownData.map((c, crownIdx) => (
        <group
          key={`crown-${c.x}-${c.y}`}
          ref={(el) => {
            refs.current[crownIdx] = el;
          }}
          position={[c.x, c.y, c.z]}
          scale={[c.scale, c.scale, c.scale]}
        >
          {/* Crown base band */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 16]} />
            <meshStandardMaterial
              color={0xd4af37}
              emissive={0xa07020}
              emissiveIntensity={0.6}
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
          {/* Crown spikes */}
          {[0, 1, 2, 3, 4].map((j) => {
            const angle = (j / 5) * Math.PI * 2;
            const cx = Math.cos(angle) * 0.55;
            const cz = Math.sin(angle) * 0.55;
            return (
              <mesh key={j} position={[cx, 0.42, cz]}>
                <coneGeometry args={[0.12, 0.55, 6]} />
                <meshStandardMaterial
                  color={0xd4af37}
                  emissive={0xa07020}
                  emissiveIntensity={0.6}
                  metalness={0.95}
                  roughness={0.05}
                />
              </mesh>
            );
          })}
          {/* Gems on crown */}
          {[0, 2, 4].map((j) => {
            const angle = (j / 5) * Math.PI * 2;
            const gx = Math.cos(angle) * 0.55;
            const gz = Math.sin(angle) * 0.55;
            return (
              <mesh key={j} position={[gx, 0.1, gz]}>
                <octahedronGeometry args={[0.1, 0]} />
                <meshStandardMaterial
                  color={0xffffff}
                  emissive={0x8ab4f8}
                  emissiveIntensity={1.0}
                  metalness={0.5}
                  roughness={0.0}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </>
  );
}

/** Crystal shards: elongated cones, platinum color */
function LuxuryCrystalShards() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.ConeGeometry(0.25, 2.5, 6), []);
  const items = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) => ({
        position: new THREE.Vector3(
          [-12, 16, -3, 9, -7, 13, -18][idx],
          [7, -7, -11, 11, -5, 3, 0][idx],
          [-3, -5, -2, -6, -4, -3, -5][idx],
        ),
        rotX: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedX: 0.003 + Math.random() * 0.004,
        speedZ: 0.002 + Math.random() * 0.004,
        drift: (Math.random() - 0.5) * 0.003,
        scale: 1.5 + Math.random() * 1.0,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    if (!meshRef.current) return;
    items.forEach((d, i) => {
      d.rotX += d.speedX;
      d.rotZ += d.speedZ;
      d.position.y += d.drift;
      if (d.position.y > 14) d.position.y = -14;
      if (d.position.y < -14) d.position.y = 14;
      dummy.position.copy(d.position);
      dummy.rotation.set(d.rotX, 0, d.rotZ);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, 7]}>
      <meshStandardMaterial
        color={0xb0c4de}
        emissive={0x5070a0}
        emissiveIntensity={0.45}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

/** Floating gems: tetrahedra with gold/navy metallic */
function LuxuryGems() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.9, 0), []);
  const items = useMemo(
    () =>
      Array.from({ length: 5 }, (_, idx) => ({
        position: new THREE.Vector3(
          [6, -16, 11, -9, 15][idx],
          [-9, 5, -12, 10, 7][idx],
          [-4, -3, -5, -2, -6][idx],
        ),
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        speedX: 0.005 + Math.random() * 0.005,
        speedY: 0.004 + Math.random() * 0.006,
        drift: (Math.random() - 0.5) * 0.003,
        scale: 1.5 + Math.random() * 1.0,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    if (!meshRef.current) return;
    items.forEach((d, i) => {
      d.rotX += d.speedX;
      d.rotY += d.speedY;
      d.position.y += d.drift;
      if (d.position.y > 14) d.position.y = -14;
      if (d.position.y < -14) d.position.y = 14;
      dummy.position.copy(d.position);
      dummy.rotation.set(d.rotX, d.rotY, 0);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, 5]}>
      <meshStandardMaterial
        color={0xd4af37}
        emissive={0x806010}
        emissiveIntensity={0.55}
        metalness={0.9}
        roughness={0.1}
      />
    </instancedMesh>
  );
}

/** Film reel: two stacked torus + inner spoke cylinders */
function LuxuryFilmReel() {
  const reels = useMemo(
    () => [
      { x: 4, y: 8, z: -5, scale: 2.8 },
      { x: -13, y: -10, z: -3, scale: 2.2 },
    ],
    [],
  );
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.z = t * (i % 2 === 0 ? 0.008 : -0.006);
      g.position.y = reels[i].y + Math.sin(t * 0.25 + i * 1.5) * 0.5;
    });
  });
  return (
    <>
      {reels.map((r, i) => (
        <group
          key={`reel-${r.x}-${r.y}`}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[r.x, r.y, r.z]}
          scale={[r.scale, r.scale, r.scale]}
        >
          {/* Outer ring */}
          <mesh>
            <torusGeometry args={[0.85, 0.1, 8, 32]} />
            <meshStandardMaterial
              color={0xc0c0c0}
              emissive={0x606060}
              emissiveIntensity={0.4}
              metalness={0.95}
              roughness={0.08}
            />
          </mesh>
          {/* Inner ring */}
          <mesh>
            <torusGeometry args={[0.35, 0.08, 8, 20]} />
            <meshStandardMaterial
              color={0xc0c0c0}
              emissive={0x606060}
              emissiveIntensity={0.4}
              metalness={0.95}
              roughness={0.08}
            />
          </mesh>
          {/* Spokes */}
          {[0, 1, 2, 3, 4, 5].map((j) => {
            const angle = (j / 6) * Math.PI * 2;
            return (
              <mesh
                key={j}
                position={[Math.cos(angle) * 0.6, Math.sin(angle) * 0.6, 0]}
                rotation={[0, 0, angle]}
              >
                <cylinderGeometry args={[0.03, 0.03, 0.45, 4]} />
                <meshStandardMaterial
                  color={0xb0b0b0}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </>
  );
}

/** Large sparkle burst: star shapes at large scale */
function LuxuryLargeStars() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const shape = createStarShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: false,
    });
  }, []);
  const items = useMemo(
    () =>
      Array.from({ length: 8 }, (_, idx) => ({
        position: new THREE.Vector3(
          [-7, 12, -18, 5, -11, 9, 16, -4][idx],
          [9, -3, 6, -11, 13, -8, 2, -13][idx],
          [-3, -5, -4, -2, -6, -3, -5, -4][idx],
        ),
        rotation: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.005,
        drift: (Math.random() - 0.5) * 0.003,
        scale: 0.5 + Math.random() * 0.4,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    items.forEach((s, i) => {
      s.rotation += s.speed;
      s.position.y += s.drift;
      if (s.position.y > 14) s.position.y = -14;
      if (s.position.y < -14) s.position.y = 14;
      dummy.position.copy(s.position);
      dummy.rotation.z = s.rotation;
      const scale = s.scale * (1 + Math.sin(t * 1.2 + i * 0.7) * 0.15);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, 8]}>
      <meshStandardMaterial
        color={0xffd700}
        emissive={0xd4a000}
        emissiveIntensity={0.8}
        metalness={0.8}
        roughness={0.15}
      />
    </instancedMesh>
  );
}

/** Helix spiral: spheres arranged in helical path */
function LuxuryHelix() {
  const sphereCount = 14;
  const helices = useMemo(
    () => [
      { cx: -20, cy: 0, cz: -6, id: "helix-left" },
      { cx: 19, cy: 3, cz: -5, id: "helix-right" },
    ],
    [],
  );
  const sphereData = useMemo(
    () =>
      Array.from({ length: sphereCount }, (_, j) => {
        const t2 = (j / sphereCount) * Math.PI * 4;
        return {
          id: `sp${j}`,
          x: Math.cos(t2) * 1.1,
          y: (j / sphereCount) * 6 - 3,
          z: Math.sin(t2) * 1.1,
          s: 0.14 + (j % 3 === 0 ? 0.1 : 0.0),
        };
      }),
    [],
  );
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      g.rotation.y = t * 0.007 + i * 1.5;
    });
  });
  return (
    <>
      {helices.map((h, hi) => (
        <group
          key={h.id}
          ref={(el) => {
            refs.current[hi] = el;
          }}
          position={[h.cx, h.cy, h.cz]}
        >
          {sphereData.map((sp) => (
            <mesh key={sp.id} position={[sp.x, sp.y, sp.z]}>
              <sphereGeometry args={[sp.s, 8, 8]} />
              <meshStandardMaterial
                color={0xd4af37}
                emissive={0xb08010}
                emissiveIntensity={0.9}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
}

function GlobalLuxury3DScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 8]} intensity={2.0} color={0xd4af37} />
      <pointLight position={[-12, -8, 6]} intensity={1.5} color={0x8ab4f8} />
      <pointLight position={[0, 15, 5]} intensity={1.0} color={0xffffff} />
      <LuxuryDiamonds />
      <LuxuryRings />
      <LuxuryOrbs />
      <LuxuryCrowns />
      <LuxuryCrystalShards />
      <LuxuryGems />
      <LuxuryFilmReel />
      <LuxuryLargeStars />
      <LuxuryHelix />
    </>
  );
}

export function GlobalLuxury3D() {
  return (
    <div
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <GlobalLuxury3DScene />
      </Canvas>
    </div>
  );
}
