'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Hero 3D Glass Sphere Scene

   Replaces the old image-based hero with a stunning
   3D glass sphere composition:
   - Large central glass sphere (scale 2.0)
   - Smaller orbiting glass spheres
   - Frosted glass ring orbiting the center
   - Cool silver color palette
   ────────────────────────────────────────────── */

/* --- Central large glass sphere --- */
function CentralGlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const baseColor = useMemo(() => new THREE.Color('#e8edf2'), [])
  const attenuationColor = useMemo(() => new THREE.Color('#c8d6e5'), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const mesh = meshRef.current
    if (!group || !mesh) return

    // Gentle float
    group.position.y = Math.sin(t * 0.3) * 0.12

    // Very slow rotation to catch light
    mesh.rotation.y = t * 0.05
    mesh.rotation.x = Math.sin(t * 0.1) * 0.03
  })

  return (
    <group ref={groupRef}>
      {/* Main sphere */}
      <mesh ref={meshRef} scale={2.0}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color={baseColor}
          transmission={0.98}
          thickness={0.5}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          attenuationColor={attenuationColor}
          attenuationDistance={0.5}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Primary highlight — bright oval reflection #1 */}
      <mesh position={[0.6, 0.8, 1.2]} rotation={[0.2, -0.3, 0.1]}>
        <sphereGeometry args={[0.18, 24, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary highlight — bright oval reflection #2 */}
      <mesh position={[-0.4, 0.5, 1.4]} rotation={[-0.1, 0.2, 0]}>
        <sphereGeometry args={[0.12, 24, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft outer glow */}
      <mesh scale={2.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#c8d6e5"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* --- Orbiting small glass sphere --- */
function OrbitingSphere({
  orbitRadius,
  orbitSpeed,
  orbitTilt,
  scale,
  phaseOffset,
}: {
  orbitRadius: number
  orbitSpeed: number
  orbitTilt: number
  scale: number
  phaseOffset: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const baseColor = useMemo(() => new THREE.Color('#e8edf2'), [])
  const attenuationColor = useMemo(() => new THREE.Color('#c8d6e5'), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const mesh = meshRef.current
    if (!group || !mesh) return

    // Orbit around center
    const angle = t * orbitSpeed + phaseOffset
    group.position.x = Math.cos(angle) * orbitRadius
    group.position.z = Math.sin(angle) * orbitRadius * 0.5
    group.position.y = Math.sin(angle + orbitTilt) * orbitRadius * 0.3 + Math.sin(t * 0.4 + phaseOffset) * 0.08

    // Subtle self rotation
    mesh.rotation.y = t * 0.3
    mesh.rotation.x = Math.sin(t * 0.2) * 0.1
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          color={baseColor}
          transmission={0.96}
          thickness={0.3}
          roughness={0.06}
          metalness={0.1}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={1.8}
          attenuationColor={attenuationColor}
          attenuationDistance={0.4}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tiny highlight */}
      <mesh scale={scale} position={[0.2, 0.2, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* --- Orbiting glass ring --- */
function HeroOrbitRing({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => new THREE.TorusGeometry(radius, 0.02, 24, 120), [radius])
  const ringColor = useMemo(() => new THREE.Color(color), [color])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const ring = ringRef.current
    if (!group || !ring) return

    group.rotation.y = t * speed
    group.rotation.x = tilt + Math.sin(t * 0.1) * 0.03
    ring.rotation.x = t * speed * 1.5
  })

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={ringColor}
          transmission={0.85}
          roughness={0.08}
          metalness={0.15}
          ior={1.45}
          thickness={0.3}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive={ringColor}
          emissiveIntensity={0.08}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/* --- Floating sparkle particles --- */
function SparkleParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 80

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const silver = new THREE.Color('#94A3B8')
    const white = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const blend = Math.random()
      const c = silver.clone().lerp(white, blend * 0.5)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const particles = particlesRef.current
    if (!particles) return

    particles.rotation.y = t * 0.02
    particles.rotation.x = Math.sin(t * 0.05) * 0.02
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/* --- Main Hero Scene Component --- */
export function HeroScene({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} absolute inset-0 z-0 overflow-hidden`} style={{ background: '#0a0a0a' }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ fov: 50, position: [0, 0, 8], near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={(state) => {
          state.gl.setClearColor('#000000', 0)
          state.gl.toneMapping = THREE.ACESFilmicToneMapping
          state.gl.toneMappingExposure = 1.2
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#c8d6e5" />
        <pointLight position={[-5, 3, 3]} intensity={1.0} color="#94A3B8" />
        <pointLight position={[3, -4, -2]} intensity={0.6} color="#CBD5E1" />
        <Environment preset="night" />

        {/* Central large glass sphere */}
        <CentralGlassSphere />

        {/* Orbiting smaller spheres */}
        <OrbitingSphere orbitRadius={2.8} orbitSpeed={0.15} orbitTilt={0.5} scale={0.3} phaseOffset={0} />
        <OrbitingSphere orbitRadius={3.2} orbitSpeed={0.1} orbitTilt={1.2} scale={0.22} phaseOffset={2.0} />
        <OrbitingSphere orbitRadius={2.5} orbitSpeed={0.2} orbitTilt={0.8} scale={0.18} phaseOffset={4.0} />
        <OrbitingSphere orbitRadius={3.5} orbitSpeed={0.08} orbitTilt={2.0} scale={0.15} phaseOffset={1.5} />
        <OrbitingSphere orbitRadius={3.8} orbitSpeed={0.12} orbitTilt={1.5} scale={0.12} phaseOffset={3.5} />

        {/* Orbiting glass rings */}
        <HeroOrbitRing radius={2.8} tilt={Math.PI * 0.3} speed={0.08} color="#94A3B8" />
        <HeroOrbitRing radius={3.2} tilt={Math.PI * 0.55} speed={-0.05} color="#CBD5E1" />

        {/* Floating sparkle particles */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <SparkleParticles />
        </Float>
      </Canvas>

      {/* Bottom gradient fade — blends into page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[50%]"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10, 10, 10, 0.5) 50%, transparent 100%)',
        }}
      />

      {/* Top gradient fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[30%]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 10, 10, 0.5) 100%)',
        }}
      />

      {/* Cool silver glow in center — very subtle */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(148, 163, 184, 1) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

export default HeroScene
