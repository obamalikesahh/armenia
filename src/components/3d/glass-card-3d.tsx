'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   3D Glass Card Component

   A floating glass card with:
   - Rounded box geometry with glass material
   - Subtle rotation animation
   - Optional label/icon inside
   - Premium glass appearance
   ────────────────────────────────────────────── */

interface GlassCard3DProps {
  /** Position in 3D space */
  position?: [number, number, number]
  /** Scale factor */
  scale?: number
  /** Card width */
  width?: number
  /** Card height */
  height?: number
  /** Card depth */
  depth?: number
  /** Border radius */
  radius?: number
  /** Glass color tint */
  color?: string
  /** Emissive glow color */
  emissiveColor?: string
  /** Emissive intensity */
  emissiveIntensity?: number
  /** Optional label text to display inside */
  label?: string
  /** Rotation speed multiplier */
  rotationSpeed?: number
  /** Float amplitude */
  floatAmplitude?: number
  /** Float speed */
  floatSpeed?: number
  /** Phase offset for animation variety */
  phaseOffset?: number
}

export function GlassCard3D({
  position = [0, 0, 0],
  scale = 1,
  width = 1.6,
  height = 2.2,
  depth = 0.08,
  radius = 0.1,
  color = '#94A3B8',
  emissiveColor,
  emissiveIntensity = 0.1,
  label,
  rotationSpeed = 0.15,
  floatAmplitude = 0.15,
  floatSpeed = 0.6,
  phaseOffset = 0,
}: GlassCard3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)

  const cardColor = useMemo(() => new THREE.Color(color), [color])
  const glowColor = useMemo(() => new THREE.Color(emissiveColor || color), [emissiveColor, color])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    if (!group) return

    // Subtle floating animation
    group.position.y = position[1] + Math.sin(t * floatSpeed + phaseOffset) * floatAmplitude
    group.position.x = position[0] + Math.sin(t * floatSpeed * 0.7 + phaseOffset + 1.0) * floatAmplitude * 0.3

    // Gentle rotation - rocking motion
    group.rotation.y = Math.sin(t * rotationSpeed + phaseOffset) * 0.12
    group.rotation.x = Math.sin(t * rotationSpeed * 0.8 + phaseOffset + 0.5) * 0.06
    group.rotation.z = Math.cos(t * rotationSpeed * 0.5 + phaseOffset) * 0.03
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Glass card body */}
      <RoundedBox
        ref={cardRef}
        args={[width, height, depth]}
        radius={radius}
        smoothness={4}
      >
        <meshPhysicalMaterial
          color={cardColor}
          transmission={0.88}
          roughness={0.07}
          metalness={0.12}
          ior={1.45}
          thickness={0.5}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive={glowColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          side={THREE.DoubleSide}
          attenuationColor={cardColor}
          attenuationDistance={1.5}
        />
      </RoundedBox>

      {/* Edge glow / inner border */}
      <RoundedBox
        args={[width + 0.01, height + 0.01, depth + 0.005]}
        radius={radius}
        smoothness={4}
      >
        <meshPhysicalMaterial
          color={glowColor}
          transmission={0.95}
          roughness={0.1}
          metalness={0.05}
          ior={1.4}
          thickness={0.2}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={glowColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* Optional label text */}
      {label && (
        <Text
          position={[0, 0, depth / 2 + 0.01]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={width * 0.7}
          font={undefined}
        >
          {label}
        </Text>
      )}
    </group>
  )
}

export default GlassCard3D
