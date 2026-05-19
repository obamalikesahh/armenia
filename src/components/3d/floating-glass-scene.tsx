'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { GlassSphere } from './glass-sphere'
import { GlassTorus } from './glass-torus'

/* ──────────────────────────────────────────────
   Floating Glass Scene — Full-page overlay

   A fixed-position Three.js canvas that overlays the
   entire website with floating glass spheres. Inspired
   by Apple's design language with clear, polished glass
   bubbles that float across the viewport.
   ────────────────────────────────────────────── */

/* --- Sphere layout configurations --- */
interface SphereConfig {
  position: [number, number, number]
  scale: number
  speed: number
  phaseOffset: number
  floatAmplitude: number
  mouseFollow: boolean
}

interface TorusConfig {
  position: [number, number, number]
  scale: number
  rotationSpeed: number
  phaseOffset: number
}

/* Desktop sphere positions — spread across the viewport */
const DESKTOP_SPHERES: SphereConfig[] = [
  // Top-left — large
  { position: [-4.5, 2.8, -1], scale: 1.2, speed: 0.35, phaseOffset: 0, floatAmplitude: 0.2, mouseFollow: true },
  // Top-right — medium
  { position: [4.2, 2.5, -0.5], scale: 0.7, speed: 0.5, phaseOffset: 1.2, floatAmplitude: 0.18, mouseFollow: true },
  // Center-left — small
  { position: [-5.0, 0.2, 0.5], scale: 0.45, speed: 0.6, phaseOffset: 2.5, floatAmplitude: 0.12, mouseFollow: true },
  // Center-right — large
  { position: [5.0, -0.3, -1.5], scale: 1.0, speed: 0.3, phaseOffset: 3.8, floatAmplitude: 0.22, mouseFollow: true },
  // Bottom-left — medium
  { position: [-3.8, -2.5, 0], scale: 0.65, speed: 0.45, phaseOffset: 5.0, floatAmplitude: 0.15, mouseFollow: true },
  // Bottom-right — small
  { position: [4.5, -2.8, -0.8], scale: 0.4, speed: 0.55, phaseOffset: 0.8, floatAmplitude: 0.1, mouseFollow: true },
  // Center top — very small
  { position: [0.5, 3.2, -2], scale: 0.35, speed: 0.7, phaseOffset: 4.2, floatAmplitude: 0.08, mouseFollow: true },
  // Center bottom — medium
  { position: [-1.0, -3.5, -1.2], scale: 0.55, speed: 0.4, phaseOffset: 2.0, floatAmplitude: 0.14, mouseFollow: true },
]

/* Mobile sphere positions — fewer, smaller, repositioned */
const MOBILE_SPHERES: SphereConfig[] = [
  { position: [-2.2, 2.0, -1], scale: 0.6, speed: 0.4, phaseOffset: 0, floatAmplitude: 0.15, mouseFollow: false },
  { position: [2.5, 1.5, -0.5], scale: 0.45, speed: 0.55, phaseOffset: 1.5, floatAmplitude: 0.12, mouseFollow: false },
  { position: [-2.8, -1.0, 0.5], scale: 0.35, speed: 0.65, phaseOffset: 3.0, floatAmplitude: 0.1, mouseFollow: false },
  { position: [2.0, -2.0, -1], scale: 0.5, speed: 0.35, phaseOffset: 4.5, floatAmplitude: 0.13, mouseFollow: false },
  { position: [0, -3.0, -1.5], scale: 0.3, speed: 0.5, phaseOffset: 2.2, floatAmplitude: 0.08, mouseFollow: false },
]

/* Torus configurations */
const DESKTOP_TORUS: TorusConfig[] = [
  { position: [3.0, 1.0, -3], scale: 0.4, rotationSpeed: 0.15, phaseOffset: 0.5 },
  { position: [-2.5, -1.5, -2], scale: 0.3, rotationSpeed: 0.2, phaseOffset: 2.0 },
]

const MOBILE_TORUS: TorusConfig[] = [
  { position: [1.5, 0.5, -3], scale: 0.25, rotationSpeed: 0.15, phaseOffset: 0.5 },
]

/* --- Mouse tracker component inside R3F --- */
function MouseTracker({ children }: { children: (mousePos: { x: number; y: number }) => React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame((state) => {
    // Use pointer from R3F state (normalized)
    const px = (state.pointer.x / viewport.width) * 2
    const py = (state.pointer.y / viewport.height) * 2
    setMousePos({ x: px, y: py })
  })

  return <>{children(mousePos)}</>
}

/* --- Scene content --- */
function SceneContent({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const spheres = isMobile ? MOBILE_SPHERES : DESKTOP_SPHERES
  const torusConfigs = isMobile ? MOBILE_TORUS : DESKTOP_TORUS
  const opacityMultiplier = isDark ? 1.0 : 0.6

  return (
    <MouseTracker>
      {(mousePos) => (
        <>
          {/* Lighting */}
          <ambientLight intensity={isDark ? 0.3 : 0.5} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={isDark ? 1.5 : 1.0}
            color={isDark ? '#c8d6e5' : '#ffffff'}
          />
          <pointLight position={[-5, 3, 3]} intensity={0.8} color="#94A3B8" />
          <pointLight position={[3, -4, -2]} intensity={0.4} color="#CBD5E1" />

          {/* Environment for reflections */}
          <Environment preset={isDark ? 'night' : 'city'} />

          {/* Glass spheres */}
          {spheres.map((config, i) => (
            <GlassSphere
              key={`sphere-${i}`}
              position={config.position}
              scale={config.scale}
              speed={config.speed}
              phaseOffset={config.phaseOffset}
              floatAmplitude={config.floatAmplitude}
              mouseFollow={config.mouseFollow}
              mousePos={mousePos}
              opacityMultiplier={opacityMultiplier}
            />
          ))}

          {/* Glass torus accents */}
          {torusConfigs.map((config, i) => (
            <GlassTorus
              key={`torus-${i}`}
              position={config.position}
              scale={config.scale}
              rotationSpeed={config.rotationSpeed}
              phaseOffset={config.phaseOffset}
              opacityMultiplier={opacityMultiplier}
            />
          ))}
        </>
      )}
    </MouseTracker>
  )
}

/* --- Main export --- */
export function FloatingGlassScene() {
  const [isMobile, setIsMobile] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark' || !resolvedTheme

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 50 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
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
      >
        <SceneContent isDark={isDark} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}

export default FloatingGlassScene
