'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Glass Torus — Frosted glass donut ring

   A frosted glass torus with:
   - Slightly frosted surface (roughness 0.3)
   - Silver tone with subtle translucency
   - Slow continuous rotation
   - Soft shadow for depth
   ────────────────────────────────────────────── */

export interface GlassTorusProps {
  /** Position in 3D space [x, y, z] */
  position?: [number, number, number]
  /** Scale factor */
  scale?: number
  /** Rotation speed multiplier (default 0.2) */
  rotationSpeed?: number
  /** Phase offset for animation variety */
  phaseOffset?: number
  /** Main ring radius */
  radius?: number
  /** Tube radius */
  tube?: number
  /** Opacity override for theme adaptation */
  opacityMultiplier?: number
}

export function GlassTorus({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.2,
  phaseOffset = 0,
  radius = 1,
  tube = 0.35,
  opacityMultiplier = 1,
}: GlassTorusProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  const silverColor = useMemo(() => new THREE.Color('#94A3B8'), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const mesh = meshRef.current
    if (!group || !mesh) return

    // Slow continuous rotation
    mesh.rotation.x = t * rotationSpeed + phaseOffset
    mesh.rotation.y = Math.sin(t * rotationSpeed * 0.5 + phaseOffset) * 0.3

    // Subtle floating motion
    group.position.y = position[1] + Math.sin(t * 0.3 + phaseOffset) * 0.08
    group.position.x = position[0] + Math.cos(t * 0.25 + phaseOffset) * 0.05
    group.position.z = position[2]
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main frosted glass torus */}
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tube, 48, 96]} />
        <meshPhysicalMaterial
          color={silverColor}
          transmission={0.7}
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.15}
          ior={1.45}
          thickness={0.8}
          envMapIntensity={1.2}
          transparent
          opacity={0.85 * opacityMultiplier}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner edge glow */}
      <mesh>
        <torusGeometry args={[radius, tube + 0.02, 32, 64]} />
        <meshBasicMaterial
          color="#CBD5E1"
          transparent
          opacity={0.04 * opacityMultiplier}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default GlassTorus
