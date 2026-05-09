'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Lightweight Background Particles
   Performant particle system for section backgrounds
   ────────────────────────────────────────────── */

const PARTICLE_COUNT = 600

function BackgroundParticlesContent() {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, colors, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const speeds = new Float32Array(PARTICLE_COUNT)
    const offsets = new Float32Array(PARTICLE_COUNT)

    const palette = [
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#EC4899'),
      new THREE.Color('#94A3B8'),
      new THREE.Color('#a78bfa'), // lighter violet
      new THREE.Color('#CBD5E1'), // lighter silver
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Distribute in a large flat volume
      positions[i3] = (Math.random() - 0.5) * 24
      positions[i3 + 1] = (Math.random() - 0.5) * 16
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 2

      // Cool color mix
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b

      speeds[i] = Math.random() * 0.3 + 0.1
      offsets[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, speeds, offsets }
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

      // Gentle floating motion
      posArr[i3] += Math.sin(t * speed * 0.2 + offset) * 0.001
      posArr[i3 + 1] += Math.cos(t * speed * 0.3 + offset) * 0.0015
      posArr[i3 + 2] += Math.sin(t * speed * 0.15 + offset) * 0.0005

      // Soft wrapping
      if (posArr[i3] > 12) posArr[i3] = -12
      if (posArr[i3] < -12) posArr[i3] = 12
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
        size={0.035}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/* ──────────────────────────────────────────────
   BackgroundParticles – exported wrapper
   ────────────────────────────────────────────── */
export default function BackgroundParticles({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <BackgroundParticlesContent />
      </Canvas>
    </div>
  )
}
