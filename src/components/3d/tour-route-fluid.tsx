'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Tour Route Fluid — abstract flowing lines
   representing the paths between Armenian tour sites
   Minimal: warm gold + dark palette
   ────────────────────────────────────────────── */

function FluidLine({ points, color, speed, offset }: {
  points: [number, number, number][]
  color: string
  speed: number
  offset: number
}) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points])
  const ref = useRef<THREE.Mesh>(null)
  const progressRef = useRef(offset)

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.015, 8, false)
  }, [curve])

  useFrame((_, delta) => {
    progressRef.current += delta * speed
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.3 + Math.sin(progressRef.current) * 0.15
    }
  })

  return (
    <mesh ref={ref} geometry={tubeGeometry}>
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

function FlowingParticle({ curve, speed, offset }: {
  curve: THREE.CatmullRomCurve3
  speed: number
  offset: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const t = useRef(offset)

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1
    if (ref.current) {
      const point = curve.getPoint(t.current)
      ref.current.position.copy(point)
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.8} />
    </mesh>
  )
}

function Scene() {
  // Define abstract route paths across Armenia
  const routes = useMemo(() => [
    // Yerevan → Sevan → Dilijan
    [[-3, 0, 0], [-2, 0.5, 0.3], [-1, 0.8, 0.1], [0, 1, -0.2], [1, 0.6, 0.4], [2, 0.3, 0], [3, 0, 0]],
    // Yerevan → Khor Virap → Noravank
    [[-3, 0, 0.5], [-2, -0.3, 0.8], [-1, -0.6, 0.6], [0, -0.8, 0.3], [1, -0.5, 0.5], [2, -0.2, 0.7], [3, 0, 0.5]],
    // Yerevan → Garni → Geghard
    [[-3, 0.2, -0.3], [-2, 0.4, -0.5], [-1, 0.7, -0.3], [0, 0.5, -0.1], [1, 0.3, -0.4], [2, 0.1, -0.2], [3, 0.2, -0.3]],
    // Yerevan → Tatev
    [[-3, 0.1, 0], [-2, -0.1, 0.2], [-1, -0.4, 0], [0, -0.6, -0.2], [1, -0.3, 0.1], [2, -0.5, 0.3], [3, 0.1, 0]],
    // Northern route: Lori
    [[-3, 0.8, -0.2], [-2, 1, 0], [-1, 0.9, 0.2], [0, 0.7, 0.1], [1, 0.5, -0.1], [2, 0.3, 0], [3, 0.5, -0.1]],
  ] as [number, number, number][][], [])

  const curves = useMemo(() =>
    routes.map(pts => new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))),
    [routes]
  )

  return (
    <>
      {/* Ambient glow */}
      <ambientLight intensity={0.3} />

      {/* Route lines */}
      {routes.map((pts, i) => (
        <FluidLine
          key={`line-${i}`}
          points={pts}
          color={i % 2 === 0 ? '#c9a84c' : '#8a7535'}
          speed={0.3 + i * 0.1}
          offset={i * 0.5}
        />
      ))}

      {/* Flowing particles along routes */}
      {curves.map((curve, i) => (
        <FlowingParticle
          key={`particle-${i}-a`}
          curve={curve}
          speed={0.06 + i * 0.01}
          offset={0.0}
        />
      ))}
      {curves.map((curve, i) => (
        <FlowingParticle
          key={`particle-${i}-b`}
          curve={curve}
          speed={0.05 + i * 0.01}
          offset={0.33}
        />
      ))}
      {curves.map((curve, i) => (
        <FlowingParticle
          key={`particle-${i}-c`}
          curve={curve}
          speed={0.07 + i * 0.008}
          offset={0.66}
        />
      ))}

      {/* Node points (tour stops) */}
      {[[-3, 0, 0], [0, 1, 0], [0, -0.8, 0.3], [0, 0.5, -0.1], [0, -0.6, -0.2], [3, 0, 0]].map((pos, i) => (
        <mesh key={`node-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#c9a84c" transparent opacity={0.6} />
        </mesh>
      ))}
    </>
  )
}

export function TourRouteFluid() {
  return (
    <div className="h-[200px] sm:h-[250px] w-full bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default TourRouteFluid
