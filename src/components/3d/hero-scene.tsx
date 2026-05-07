'use client'

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Color palette
   ────────────────────────────────────────────── */
const COLORS = {
  violet: new THREE.Color('#8B5CF6'),
  pink: new THREE.Color('#EC4899'),
  amber: new THREE.Color('#F59E0B'),
  bg: '#0a0a0f',
}

/* ──────────────────────────────────────────────
   Glass Mountains
   ────────────────────────────────────────────── */
function GlassMountain({
  position,
  scale,
  rotation,
  phaseOffset = 0,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  rotation?: [number, number, number]
  phaseOffset?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1, 2, 6, 1)
    geo.translate(0, 1, 0)
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.4 + phaseOffset) * 0.25
    meshRef.current.rotation.y = (rotation?.[1] ?? 0) + Math.sin(t * 0.15 + phaseOffset) * 0.08
    meshRef.current.rotation.z = (rotation?.[2] ?? 0) + Math.cos(t * 0.2 + phaseOffset) * 0.04
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      geometry={geometry}
    >
      <meshPhysicalMaterial
        transmission={0.95}
        roughness={0.05}
        thickness={1.5}
        ior={1.5}
        envMapIntensity={1.2}
        color="#ffffff"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────
   Fluid Particle System (Aurora-like)
   ────────────────────────────────────────────── */
const PARTICLE_COUNT = 4000

function FluidParticles() {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, colors, sizes, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const speeds = new Float32Array(PARTICLE_COUNT)
    const offsets = new Float32Array(PARTICLE_COUNT)

    const colorPalette = [COLORS.violet, COLORS.pink, COLORS.amber]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Spread particles in a wide volume
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 16
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 4

      // Pick color from palette with blending
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      const blendColor = colorPalette[(Math.floor(Math.random() * colorPalette.length) + 1) % 3]
      const mixFactor = Math.random()
      colors[i3] = color.r * (1 - mixFactor) + blendColor.r * mixFactor
      colors[i3 + 1] = color.g * (1 - mixFactor) + blendColor.g * mixFactor
      colors[i3 + 2] = color.b * (1 - mixFactor) + blendColor.b * mixFactor

      sizes[i] = Math.random() * 0.04 + 0.01
      speeds[i] = Math.random() * 0.5 + 0.2
      offsets[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, sizes, speeds, offsets }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array
    const t = clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const speed = speeds[i]
      const offset = offsets[i]

      // Fluid aurora-like motion
      posArr[i3] += Math.sin(t * speed * 0.3 + offset) * 0.003
      posArr[i3 + 1] +=
        Math.sin(t * speed * 0.5 + offset) * 0.004 +
        Math.cos(t * speed * 0.2 + offset * 2) * 0.002
      posArr[i3 + 2] += Math.cos(t * speed * 0.15 + offset) * 0.002

      // Wrap around boundaries
      if (posArr[i3] > 15) posArr[i3] = -15
      if (posArr[i3] < -15) posArr[i3] = 15
      if (posArr[i3 + 1] > 8) posArr[i3 + 1] = -8
      if (posArr[i3 + 1] < -8) posArr[i3 + 1] = 8
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/* ──────────────────────────────────────────────
   Glass Spheres
   ────────────────────────────────────────────── */
function GlassSphere({
  position,
  scale = 1,
  phaseOffset = 0,
  color = '#ffffff',
}: {
  position: [number, number, number]
  scale?: number
  phaseOffset?: number
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.6 + phaseOffset) * 0.4
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.3 + phaseOffset) * 0.15
    meshRef.current.rotation.x = t * 0.1 + phaseOffset
    meshRef.current.rotation.y = t * 0.15 + phaseOffset
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        transmission={0.97}
        roughness={0.02}
        thickness={0.5}
        ior={1.45}
        envMapIntensity={1.5}
        color={color}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────
   Animated Light Rays
   ────────────────────────────────────────────── */
function LightRays() {
  const groupRef = useRef<THREE.Group>(null!)

  const rays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        Math.random() * 4 + 2,
        (Math.random() - 0.5) * 8 - 3,
      ] as [number, number, number],
      rotation: [
        Math.random() * 0.3 - 0.15,
        Math.random() * Math.PI * 2,
        0,
      ] as [number, number, number],
      scale: [0.02, Math.random() * 3 + 2, 0.02] as [number, number, number],
      phaseOffset: Math.random() * Math.PI * 2,
      color:
        i % 3 === 0
          ? '#8B5CF6'
          : i % 3 === 1
            ? '#EC4899'
            : '#F59E0B',
    }))
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      const ray = rays[i]
      if (!ray) return
      ;(child as THREE.Mesh).material = (
        child as THREE.Mesh
      ).material as THREE.MeshBasicMaterial
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.sin(t * 0.8 + ray.phaseOffset) * 0.1
    })
  })

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={ray.position}
          rotation={ray.rotation}
          scale={ray.scale}
        >
          <cylinderGeometry args={[0.3, 0.05, 1, 8, 1]} />
          <meshBasicMaterial
            color={ray.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ──────────────────────────────────────────────
   Camera Controller (subtle orbit)
   ────────────────────────────────────────────── */
function CameraController() {
  const initialPos = useRef<THREE.Vector3 | null>(null)

  useFrame(({ camera, clock }) => {
    if (!initialPos.current) {
      initialPos.current = camera.position.clone()
    }
    const t = clock.getElapsedTime()
    const orbitRadius = 1.5
    camera.position.x = initialPos.current.x + Math.sin(t * 0.12) * orbitRadius
    camera.position.y = initialPos.current.y + Math.cos(t * 0.08) * 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ──────────────────────────────────────────────
   Scene Content (inside Canvas)
   ────────────────────────────────────────────── */
function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#F59E0B" />
      <pointLight position={[-4, 3, 2]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[4, 2, -2]} intensity={0.6} color="#EC4899" />
      <pointLight position={[0, -3, 4]} intensity={0.4} color="#F59E0B" />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Glass Mountains */}
      <GlassMountain
        position={[-4, -2.5, -3]}
        scale={[2.2, 2.8, 2.2]}
        rotation={[0, 0.5, 0.1]}
        phaseOffset={0}
      />
      <GlassMountain
        position={[0, -3, -5]}
        scale={[3, 4, 3]}
        rotation={[0, -0.3, -0.05]}
        phaseOffset={1.2}
      />
      <GlassMountain
        position={[5, -2.8, -2]}
        scale={[1.8, 2.5, 1.8]}
        rotation={[0, 0.8, 0.08]}
        phaseOffset={2.4}
      />
      <GlassMountain
        position={[-2, -3.2, -6]}
        scale={[2.5, 3.5, 2.5]}
        rotation={[0, 1.2, -0.06]}
        phaseOffset={3.6}
      />
      <GlassMountain
        position={[3, -3, -7]}
        scale={[2, 3, 2]}
        rotation={[0, -0.7, 0.04]}
        phaseOffset={4.8}
      />

      {/* Glass Spheres */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <GlassSphere position={[-3, 1.5, -1]} scale={0.5} phaseOffset={0} color="#d8b4fe" />
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <GlassSphere position={[3.5, 2, -2]} scale={0.35} phaseOffset={1.5} color="#f9a8d4" />
      </Float>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
        <GlassSphere position={[1, 3, -4]} scale={0.6} phaseOffset={3} color="#fcd34d" />
      </Float>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
        <GlassSphere position={[-5, 0.5, -5]} scale={0.4} phaseOffset={4.5} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.45}>
        <GlassSphere position={[5.5, -0.5, -6]} scale={0.55} phaseOffset={2.2} color="#c4b5fd" />
      </Float>

      {/* Fluid Particles */}
      <FluidParticles />

      {/* Light Rays */}
      <LightRays />

      {/* Camera Controller */}
      <CameraController />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  )
}

/* ──────────────────────────────────────────────
   HeroScene – exported wrapper
   ────────────────────────────────────────────── */
export default function HeroScene() {
  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(COLORS.bg, 1)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={onCreated}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
