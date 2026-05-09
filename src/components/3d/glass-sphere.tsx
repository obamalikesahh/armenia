'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Glass Sphere — Apple-inspired crystal bubble

   A single clear, polished glass sphere with:
   - Near 100% transparency (soap bubble / crystal ball)
   - Extremely glossy surface with sharp, bright white highlights
   - Subtle refractions of light passing through
   - Floating animation with sin wave
   - Soft shadow for depth
   ────────────────────────────────────────────── */

export interface GlassSphereProps {
  /** Position in 3D space [x, y, z] */
  position?: [number, number, number]
  /** Scale factor for the sphere */
  scale?: number
  /** Speed of floating animation (default 0.5) */
  speed?: number
  /** Phase offset for animation variety */
  phaseOffset?: number
  /** Float amplitude */
  floatAmplitude?: number
  /** Whether to enable mouse follow effect */
  mouseFollow?: boolean
  /** Mouse position for parallax effect (normalized -1 to 1) */
  mousePos?: { x: number; y: number }
  /** Opacity override for theme adaptation */
  opacityMultiplier?: number
}

export function GlassSphere({
  position = [0, 0, 0],
  scale = 1,
  speed = 0.5,
  phaseOffset = 0,
  floatAmplitude = 0.15,
  mouseFollow = false,
  mousePos = { x: 0, y: 0 },
  opacityMultiplier = 1,
}: GlassSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const smoothedMouse = useRef({ x: 0, y: 0 })

  // Pre-create colors to avoid re-allocation
  const baseColor = useMemo(() => new THREE.Color('#e8edf2'), [])
  const attenuationColor = useMemo(() => new THREE.Color('#c8d6e5'), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const mesh = meshRef.current
    if (!group || !mesh) return

    // Smooth mouse interpolation for parallax
    if (mouseFollow) {
      smoothedMouse.current.x += (mousePos.x - smoothedMouse.current.x) * 0.02
      smoothedMouse.current.y += (mousePos.y - smoothedMouse.current.y) * 0.02
    }

    // Floating animation (sin wave)
    const floatY = Math.sin(t * speed + phaseOffset) * floatAmplitude
    const floatX = Math.sin(t * speed * 0.7 + phaseOffset + 1.5) * floatAmplitude * 0.4

    // Apply position with float + mouse follow
    group.position.x = position[0] + floatX + (mouseFollow ? smoothedMouse.current.x * 0.3 * scale : 0)
    group.position.y = position[1] + floatY + (mouseFollow ? smoothedMouse.current.y * -0.2 * scale : 0)
    group.position.z = position[2]

    // Very subtle rotation for light reflection shifts
    mesh.rotation.y = t * speed * 0.08
    mesh.rotation.x = Math.sin(t * speed * 0.15 + phaseOffset) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Main glass sphere */}
      <mesh ref={meshRef} scale={scale}>
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
          opacity={opacityMultiplier}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner highlight sphere — simulates bright light reflection */}
      <mesh scale={scale * 0.98} position={[0, 0.15 * scale, 0.2 * scale]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.12 * opacityMultiplier}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary highlight — mimics two-bright-oval light source reflection */}
      <mesh scale={scale} position={[0.25 * scale, 0.3 * scale, 0.6 * scale]} rotation={[0.3, 0.2, 0]}>
        <sphereGeometry args={[0.12, 24, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08 * opacityMultiplier}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft glow halo around the sphere */}
      <mesh scale={scale * 1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#c8d6e5"
          transparent
          opacity={0.02 * opacityMultiplier}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default GlassSphere
