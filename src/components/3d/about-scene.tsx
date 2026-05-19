'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Floating Glass Globe
   ────────────────────────────────────────────── */
function GlassGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 4), [])
  const { originalPositions } = useMemo(() => {
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    const origPos = new Float32Array(posAttr.array.length)
    origPos.set(posAttr.array)
    return { originalPositions: origPos }
  }, [geometry])

  const colorA = useMemo(() => new THREE.Color('#94A3B8'), [])
  const colorB = useMemo(() => new THREE.Color('#8B5CF6'), [])
  const blendedColor = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mesh = meshRef.current
    if (!mesh) return

    // Gentle rotation
    mesh.rotation.y = t * 0.15
    mesh.rotation.x = Math.sin(t * 0.2) * 0.1

    // Subtle vertex displacement for organic feel
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < arr.length; i += 3) {
      const ox = originalPositions[i]
      const oy = originalPositions[i + 1]
      const oz = originalPositions[i + 2]
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const nx = ox / len
      const ny = oy / len
      const nz = oz / len
      const displacement = (
        Math.sin(nx * 3 + t * 0.5) * Math.cos(ny * 3 + t * 0.3) * 0.04 +
        Math.sin(nz * 2 + t * 0.4) * 0.03
      )
      const scale = 1.0 + displacement
      arr[i] = ox * scale
      arr[i + 1] = oy * scale
      arr[i + 2] = oz * scale
    }
    posAttr.needsUpdate = true
    geometry.computeVertexNormals()

    // Color shift
    const phase = Math.sin(t * 0.4) * 0.5 + 0.5
    blendedColor.copy(colorA).lerp(colorB, phase * 0.4)
    const mat = mesh.material as THREE.MeshPhysicalMaterial
    mat.color.copy(blendedColor)
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        transmission={0.92}
        roughness={0.05}
        metalness={0.1}
        ior={1.5}
        thickness={0.6}
        envMapIntensity={1.8}
        clearcoat={1}
        clearcoatRoughness={0.05}
        attenuationColor={new THREE.Color('#94A3B8')}
        attenuationDistance={2}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────
   Orbiting Glass Ring
   ────────────────────────────────────────────── */
function OrbitRing({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => new THREE.TorusGeometry(radius, 0.02, 24, 100), [radius])
  const ringColor = useMemo(() => new THREE.Color(color), [color])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const ring = ringRef.current
    if (!group || !ring) return

    group.rotation.y = t * speed
    group.rotation.x = tilt + Math.sin(t * 0.15) * 0.05
    ring.rotation.x = t * speed * 2
  })

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={ringColor}
          transmission={0.88}
          roughness={0.08}
          metalness={0.15}
          ior={1.45}
          thickness={0.3}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive={ringColor}
          emissiveIntensity={0.12}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/* ──────────────────────────────────────────────
   Small Floating Glass Shapes
   ────────────────────────────────────────────── */
function GlassShape({ position, scale, color, shape }: {
  position: [number, number, number]
  scale: number
  color: string
  shape: 'icosa' | 'octa' | 'tetra'
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const shapeColor = useMemo(() => new THREE.Color(color), [color])
  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosa': return new THREE.IcosahedronGeometry(1, 0)
      case 'octa': return new THREE.OctahedronGeometry(1, 0)
      case 'tetra': return new THREE.TetrahedronGeometry(1, 0)
    }
  }, [shape])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mesh = meshRef.current
    if (!mesh) return
    mesh.rotation.x = t * 0.3
    mesh.rotation.y = t * 0.2
    mesh.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.15
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
        <meshPhysicalMaterial
          color={shapeColor}
          transmission={0.9}
          roughness={0.06}
          metalness={0.12}
          ior={1.45}
          thickness={0.4}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={shapeColor}
          emissiveIntensity={0.15}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

/* ──────────────────────────────────────────────
   Main Export: AboutScene
   ────────────────────────────────────────────── */
export function AboutScene({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ fov: 45, position: [0, 0, 6], near: 0.1, far: 50 }}
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
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#94A3B8" />
        <pointLight position={[-5, 3, -3]} intensity={1} color="#8B5CF6" />
        <pointLight position={[0, -5, 3]} intensity={0.8} color="#EC4899" />
        <Environment preset="night" />

        {/* Main glass globe */}
        <GlassGlobe />

        {/* Orbiting rings */}
        <OrbitRing radius={2.0} tilt={Math.PI * 0.3} speed={0.12} color="#94A3B8" />
        <OrbitRing radius={2.3} tilt={Math.PI * 0.5} speed={-0.08} color="#8B5CF6" />
        <OrbitRing radius={2.6} tilt={Math.PI * 0.15} speed={0.06} color="#EC4899" />

        {/* Floating shapes */}
        <GlassShape position={[-2.5, 1.5, -1]} scale={0.2} color="#94A3B8" shape="icosa" />
        <GlassShape position={[2.3, -1.2, -0.5]} scale={0.18} color="#8B5CF6" shape="octa" />
        <GlassShape position={[-1.8, -1.8, 0.5]} scale={0.15} color="#EC4899" shape="tetra" />
        <GlassShape position={[1.5, 2, -1.5]} scale={0.17} color="#CBD5E1" shape="icosa" />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default AboutScene
