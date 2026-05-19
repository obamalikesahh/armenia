'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Armenian / Georgian tour coordinates (lat/lng)
   converted to 3D sphere positions
   ────────────────────────────────────────────── */
const TOUR_LOCATIONS = [
  { name: 'Yerevan', lat: 40.1792, lng: 44.4991 },
  { name: 'Garni', lat: 40.1158, lng: 44.7178 },
  { name: 'Geghard', lat: 40.1403, lng: 44.7925 },
  { name: 'Sevan', lat: 40.3495, lng: 45.3318 },
  { name: 'Dilijan', lat: 40.7403, lng: 44.8625 },
  { name: 'Khor Virap', lat: 39.8856, lng: 44.5769 },
  { name: 'Noravank', lat: 39.6903, lng: 45.2253 },
  { name: 'Tatev', lat: 39.3897, lng: 46.2431 },
  { name: 'Areni', lat: 39.7233, lng: 45.4653 },
  { name: 'Jermuk', lat: 39.8358, lng: 45.6678 },
  { name: 'Tbilisi', lat: 41.7151, lng: 44.8271 },
  { name: 'Lake Parz', lat: 40.7742, lng: 44.9244 },
]

/** Convert lat/lng to position on a unit sphere */
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

/* ──────────────────────────────────────────────
   Glass Globe
   ────────────────────────────────────────────── */
function GlassGlobe() {
  const globeRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!globeRef.current) return
    const t = clock.getElapsedTime()
    globeRef.current.rotation.y = t * 0.08
  })

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        transmission={0.92}
        roughness={0.05}
        thickness={0.3}
        ior={1.45}
        envMapIntensity={1}
        color="#e0d4ff"
        transparent
        opacity={0.35}
        depthWrite={false}
        side={THREE.FrontSide}
        wireframe={false}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────
   Globe Wireframe Overlay
   ────────────────────────────────────────────── */
function GlobeWireframe() {
  const wireRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!wireRef.current) return
    const t = clock.getElapsedTime()
    wireRef.current.rotation.y = t * 0.08
  })

  return (
    <mesh ref={wireRef}>
      <sphereGeometry args={[1.002, 24, 16]} />
      <meshBasicMaterial
        color="#8B5CF6"
        wireframe
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ──────────────────────────────────────────────
   Glowing Location Markers
   ────────────────────────────────────────────── */
function LocationMarkers() {
  const groupRef = useRef<THREE.Group>(null!)
  const markersRef = useRef<THREE.InstancedMesh>(null!)
  const initialized = useRef(false)

  const markerPositions = useMemo(
    () => TOUR_LOCATIONS.map((loc) => latLngToVector3(loc.lat, loc.lng, 1.02)),
    []
  )

  const markerColors = useMemo(() => {
    const palette = ['#8B5CF6', '#EC4899', '#94A3B8']
    return TOUR_LOCATIONS.map((_, i) => new THREE.Color(palette[i % palette.length]))
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.08

    // Initialize instance matrices once
    const mesh = markersRef.current
    if (mesh && !initialized.current) {
      initialized.current = true
      const dummy = new THREE.Object3D()
      markerPositions.forEach((pos, i) => {
        dummy.position.copy(pos)
        dummy.lookAt(0, 0, 0)
        dummy.scale.setScalar(1)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.setColorAt(i, markerColors[i])
      })
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    // Pulse the markers
    if (mesh) {
      const scale = 1 + Math.sin(t * 2) * 0.2
      const dummy = new THREE.Object3D()
      markerPositions.forEach((pos, i) => {
        dummy.position.copy(pos)
        dummy.lookAt(0, 0, 0)
        dummy.scale.setScalar(scale)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={markersRef}
        args={[undefined, undefined, TOUR_LOCATIONS.length]}
      >
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Glow halos around each marker */}
      {markerPositions.map((pos, i) => (
        <mesh key={i} position={pos} lookAt={new THREE.Vector3(0, 0, 0)}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial
            color={markerColors[i]}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ──────────────────────────────────────────────
   Particle Trails (connecting nearby locations)
   ────────────────────────────────────────────── */
function ParticleTrails() {
  const groupRef = useRef<THREE.Group>(null!)
  const trailCount = 80

  const { trailPositions, trailSpeeds, trailOffsets, trailColors } = useMemo(() => {
    const trailPositions = new Float32Array(trailCount * 3)
    const trailSpeeds = new Float32Array(trailCount)
    const trailOffsets = new Float32Array(trailCount)
    const trailColors = new Float32Array(trailCount * 3)
    const palette = [new THREE.Color('#8B5CF6'), new THREE.Color('#EC4899'), new THREE.Color('#94A3B8')]

    for (let i = 0; i < trailCount; i++) {
      const i3 = i * 3
      // Random position on/near the sphere surface
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.03 + Math.random() * 0.08
      trailPositions[i3] = r * Math.sin(phi) * Math.cos(theta)
      trailPositions[i3 + 1] = r * Math.cos(phi)
      trailPositions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      trailSpeeds[i] = Math.random() * 0.4 + 0.2
      trailOffsets[i] = Math.random() * Math.PI * 2

      const c = palette[Math.floor(Math.random() * palette.length)]
      trailColors[i3] = c.r
      trailColors[i3 + 1] = c.g
      trailColors[i3 + 2] = c.b
    }

    return { trailPositions, trailSpeeds, trailOffsets, trailColors }
  }, [])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame(({ clock }) => {
    if (!groupRef.current || !pointsRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.08

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < trailCount; i++) {
      const i3 = i * 3
      const speed = trailSpeeds[i]
      const offset = trailOffsets[i]
      // Subtle orbital motion on the sphere surface
      const angle = t * speed * 0.1 + offset
      const x0 = trailPositions[i3]
      const z0 = trailPositions[i3 + 2]
      const r = Math.sqrt(x0 * x0 + z0 * z0)
      const baseAngle = Math.atan2(z0, x0)
      posArr[i3] = r * Math.cos(baseAngle + angle)
      posArr[i3 + 1] = trailPositions[i3 + 1] + Math.sin(t * speed + offset) * 0.01
      posArr[i3 + 2] = r * Math.sin(baseAngle + angle)
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
            count={trailCount}
            array={trailPositions.slice()}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[trailColors, 3]}
            count={trailCount}
            array={trailColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

/* ──────────────────────────────────────────────
   Globe Scene Content
   ────────────────────────────────────────────── */
function GlobeSceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color="#EC4899" />
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#94A3B8" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group>
          <GlassGlobe />
          <GlobeWireframe />
          <LocationMarkers />
          <ParticleTrails />
        </group>
      </Float>
    </>
  )
}

/* ──────────────────────────────────────────────
   TourGlobe – exported wrapper
   ────────────────────────────────────────────── */
export default function TourGlobe({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <GlobeSceneContent />
      </Canvas>
    </div>
  )
}
