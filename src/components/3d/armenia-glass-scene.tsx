'use client'

import { useRef, useMemo, useEffect, useState, Suspense, Component, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Armenia Glass Scene — Full-page 3D overlay
   
   APPROACH:
   - GLB models loaded with useGLTF (caching + suspense)
   - Original materials KEPT (they're already high quality)
   - Glass effect via MeshPhysicalMaterial only for procedural models
   - Float component from drei for smooth animations
   - NO globe in center. Models at edges.
   ────────────────────────────────────────────── */

/* ════════════════ GLASS MATERIAL ════════════════ */

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#dce4ed'),
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.95,
  ior: 1.5,
  thickness: 0.5,
  iridescence: 1.0,
  iridescenceIOR: 1.3,
  iridescenceThicknessRange: [100, 400],
  envMapIntensity: 2.0,
  specularIntensity: 1.0,
  specularColor: new THREE.Color('#ffffff'),
  transparent: true,
  opacity: 0.7,
  side: THREE.DoubleSide,
  depthWrite: false,
})

/* ════════════════ GLB MODEL WITH GLASS OVERRIDE ════════════════ */

function GLBGlassModel({ url, position, scale = 1, rotation = [0, 0, 0] as [number, number, number], floatSpeed = 1, floatIntensity = 0.5 }: {
  url: string
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  floatSpeed?: number
  floatIntensity?: number
}) {
  const { scene } = useGLTF(url)
  const clonedRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!scene) return
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = glassMaterial.clone()
        mesh.castShadow = false
        mesh.receiveShadow = false
      }
    })
    // Center and normalize scale
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const normalizer = maxDim > 0 ? 1 / maxDim : 1
    clone.scale.multiplyScalar(normalizer)
    clone.position.sub(center.multiplyScalar(normalizer))
    if (clonedRef.current) {
      clonedRef.current.add(clone)
    }
    return () => {
      if (clonedRef.current) {
        clonedRef.current.remove(clone)
      }
    }
  }, [scene])

  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={floatIntensity}>
      <group ref={clonedRef} position={position} scale={scale} rotation={rotation} />
    </Float>
  )
}

/* ════════════════ ERROR-BOUNDARY WRAPPER FOR GLB ════════════════ */

class ModelErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function SafeGLBModel(props: Parameters<typeof GLBGlassModel>[0]) {
  return (
    <ModelErrorBoundary>
      <Suspense fallback={null}>
        <GLBGlassModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

/* ════════════════ HIGH-POLY ARMENIAN CHURCH DOME ════════════════ */

function ChurchDome({ position, scale = 1, rotation = [0, 0, 0] as [number, number, number], floatSpeed = 1, floatIntensity = 0.3 }: {
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  floatSpeed?: number
  floatIntensity?: number
}) {
  const glassMat = useMemo(() => glassMaterial.clone(), [])
  const glassMatDeep = useMemo(() => {
    const m = glassMaterial.clone()
    m.color = new THREE.Color('#c8d4e2')
    m.transmission = 0.88
    m.iridescence = 1.0
    m.thickness = 0.8
    return m
  }, [])
  const glassMatAccent = useMemo(() => {
    const m = glassMaterial.clone()
    m.color = new THREE.Color('#b8c8d8')
    m.iridescence = 1.2
    m.iridescenceIOR = 1.5
    m.thickness = 0.2
    m.roughness = 0.02
    return m
  }, [])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.03
  })

  return (
    <Float speed={floatSpeed} rotationIntensity={0.15} floatIntensity={floatIntensity}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        {/* Drum base — 128 segments */}
        <mesh position={[0, 0, 0]} material={glassMat}>
          <cylinderGeometry args={[0.4, 0.45, 0.6, 128, 1]} />
        </mesh>

        {/* Decorative rings */}
        <mesh position={[0, 0.3, 0]} material={glassMatAccent}>
          <torusGeometry args={[0.42, 0.025, 32, 128]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} material={glassMatAccent}>
          <torusGeometry args={[0.44, 0.02, 32, 128]} />
        </mesh>

        {/* Conical dome — 128 segments */}
        <mesh position={[0, 0.7, 0]} material={glassMatDeep}>
          <coneGeometry args={[0.38, 0.9, 128, 1]} />
        </mesh>

        {/* Dome base ring */}
        <mesh position={[0, 0.25, 0]} material={glassMatAccent}>
          <torusGeometry args={[0.39, 0.018, 32, 128]} />
        </mesh>

        {/* Cross — high poly cylinders */}
        <mesh position={[0, 1.35, 0]} material={glassMatAccent}>
          <cylinderGeometry args={[0.012, 0.012, 0.25, 32]} />
        </mesh>
        <mesh position={[0, 1.42, 0]} rotation={[0, 0, Math.PI / 2]} material={glassMatAccent}>
          <cylinderGeometry args={[0.01, 0.01, 0.14, 32]} />
        </mesh>
        <mesh position={[0.04, 1.28, 0]} rotation={[0, 0, -0.4]} material={glassMatAccent}>
          <cylinderGeometry args={[0.008, 0.008, 0.1, 32]} />
        </mesh>

        {/* Corner spheres */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.43, 0.32, Math.sin(angle) * 0.43]} material={glassMatAccent}>
              <sphereGeometry args={[0.02, 32, 32]} />
            </mesh>
          )
        })}

        {/* Window arches */}
        {[0, 2, 4, 6].map((i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh key={`w-${i}`} position={[Math.cos(angle) * 0.41, 0.05, Math.sin(angle) * 0.41]} rotation={[0, angle, 0]} material={glassMatDeep}>
              <boxGeometry args={[0.07, 0.18, 0.015]} />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

/* ════════════════ KHACHKAR (CROSS STONE) ════════════════ */

function Khachkar({ position, scale = 1, rotation = [0, 0, 0] as [number, number, number], floatSpeed = 1, floatIntensity = 0.25 }: {
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  floatSpeed?: number
  floatIntensity?: number
}) {
  const glassMat = useMemo(() => {
    const m = glassMaterial.clone()
    m.color = new THREE.Color('#d0daea')
    m.thickness = 0.4
    return m
  }, [])
  const glassMatDetail = useMemo(() => {
    const m = glassMaterial.clone()
    m.color = new THREE.Color('#bccade')
    m.iridescence = 1.2
    m.thickness = 0.2
    return m
  }, [])

  const slabShape = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 0.3, h = 0.5, r = 0.04
    shape.moveTo(-w + r, -h)
    shape.lineTo(w - r, -h)
    shape.quadraticCurveTo(w, -h, w, -h + r)
    shape.lineTo(w, h - r)
    shape.quadraticCurveTo(w, h, w - r, h)
    shape.absarc(0, h, w, 0, Math.PI, false)
    shape.lineTo(-w, h - r)
    shape.quadraticCurveTo(-w, h, -w + r, h)
    shape.lineTo(-w, -h + r)
    shape.quadraticCurveTo(-w, -h, -w + r, -h)
    return shape
  }, [])

  const crossShape = useMemo(() => {
    const shape = new THREE.Shape()
    const armW = 0.025, armL = 0.2
    shape.moveTo(-armW, -armL)
    shape.lineTo(armW, -armL)
    shape.lineTo(armW * 1.4, -armL + 0.015)
    shape.lineTo(armW, -armL + 0.03)
    shape.lineTo(armW, -0.035)
    shape.lineTo(armL * 0.55, -0.035)
    shape.lineTo(armL * 0.6, -0.015)
    shape.lineTo(armL * 0.55, 0)
    shape.lineTo(armW, 0)
    shape.lineTo(armW, 0.07)
    shape.lineTo(armW * 1.4, 0.07 + 0.015)
    shape.lineTo(0, armL)
    shape.lineTo(-armW * 1.4, 0.07 + 0.015)
    shape.lineTo(-armW, 0.07)
    shape.lineTo(-armW, 0)
    shape.lineTo(-armL * 0.55, 0)
    shape.lineTo(-armL * 0.6, -0.015)
    shape.lineTo(-armL * 0.55, -0.035)
    shape.lineTo(-armW, -0.035)
    shape.lineTo(-armW, -armL + 0.03)
    shape.lineTo(-armW * 1.4, -armL + 0.015)
    return shape
  }, [])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.02 + 0.5
  })

  return (
    <Float speed={floatSpeed} rotationIntensity={0.1} floatIntensity={floatIntensity}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        <mesh position={[0, 0, 0]} material={glassMat}>
          <extrudeGeometry args={[slabShape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 8 }]} />
        </mesh>
        <mesh position={[0, 0.05, 0.04]} material={glassMatDetail}>
          <extrudeGeometry args={[crossShape, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 4 }]} />
        </mesh>
        <mesh position={[0, -0.42, 0.04]} material={glassMatDetail}>
          <boxGeometry args={[0.22, 0.08, 0.02]} />
        </mesh>
        <mesh position={[-0.26, 0, 0.04]} material={glassMatDetail}>
          <boxGeometry args={[0.015, 0.75, 0.015]} />
        </mesh>
        <mesh position={[0.26, 0, 0.04]} material={glassMatDetail}>
          <boxGeometry args={[0.015, 0.75, 0.015]} />
        </mesh>
      </group>
    </Float>
  )
}

/* ════════════════ MOUNTAIN RANGE (ARARAT) ════════════════ */

function MountainRange({ position, scale = 1, rotation = [0, 0, 0] as [number, number, number], floatSpeed = 1, floatIntensity = 0.2 }: {
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  floatSpeed?: number
  floatIntensity?: number
}) {
  const glassMat = useMemo(() => {
    const m = glassMaterial.clone()
    m.color = new THREE.Color('#d8e2f0')
    m.iridescence = 0.6
    m.thickness = 0.8
    return m
  }, [])

  const terrainGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 1.5, 256, 128)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      let h = 0
      h += Math.exp(-((x + 0.1) ** 2 + (y - 0.2) ** 2) * 2) * 1.2
      h += Math.exp(-((x - 0.6) ** 2 + (y - 0.1) ** 2) * 3) * 0.7
      h += Math.exp(-((x + 0.7) ** 2 + (y + 0.1) ** 2) * 4) * 0.5
      h += Math.sin(x * 8) * Math.cos(y * 6) * 0.04
      h += Math.sin(x * 15 + 1) * Math.cos(y * 12 + 2) * 0.02
      h += Math.sin(x * 30) * 0.01
      pos.setZ(i, h)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.008
  })

  return (
    <Float speed={floatSpeed} rotationIntensity={0.05} floatIntensity={floatIntensity}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2.2, 0, 0]} geometry={terrainGeometry} material={glassMat} />
      </group>
    </Float>
  )
}

/* ════════════════ GLASS DROPLETS ════════════════ */

function GlassDroplets({ positions, baseScale = 0.08 }: {
  positions: [number, number, number][]
  baseScale?: number
}) {
  const mat = useMemo(() => {
    const m = glassMaterial.clone()
    m.color = new THREE.Color('#e8eef6')
    m.transmission = 0.96
    m.iridescence = 1.0
    m.iridescenceIOR = 1.5
    m.roughness = 0.02
    m.thickness = 0.15
    return m
  }, [])

  return (
    <group>
      {positions.map((pos, i) => (
        <Float key={i} speed={0.8 + (i % 5) * 0.3} rotationIntensity={0.1} floatIntensity={0.3 + (i % 3) * 0.1}>
          <mesh position={pos} scale={baseScale + (i % 5) * 0.015} material={mat}>
            <sphereGeometry args={[1, 64, 64]} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ════════════════ GLASS BACKGROUND PLANE ════════════════ */

function GlassBackgroundPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e8eef6'),
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.98,
    ior: 1.2,
    thickness: 0.05,
    iridescence: 0.3,
    iridescenceIOR: 1.1,
    iridescenceThicknessRange: [200, 600],
    transparent: true,
    opacity: 0.05,
    side: THREE.DoubleSide,
    depthWrite: false,
    envMapIntensity: 0.5,
  }), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(t * 0.015) * 0.008
    meshRef.current.rotation.z = Math.cos(t * 0.01) * 0.004
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -8]} material={mat}>
      <planeGeometry args={[30, 20]} />
    </mesh>
  )
}

/* ════════════════ SCROLL CAMERA ════════════════ */

function ScrollCamera() {
  const { camera } = useThree()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? scrollY / maxScroll : 0
      camera.position.y = -p * 4
      camera.position.x = Math.sin(p * Math.PI * 0.5) * 0.8
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [camera])

  return null
}

/* ════════════════ PRELOAD GLB MODELS ════════════════ */

// Preload must only run client-side (not during SSR)
if (typeof window !== 'undefined') {
  try {
    useGLTF.preload('/models/glass-vase.glb')
    useGLTF.preload('/models/glass-candle.glb')
    useGLTF.preload('/models/iri-lamp.glb')
    useGLTF.preload('/models/dragon.glb')
    useGLTF.preload('/models/lamp-punctual.glb')
    useGLTF.preload('/models/toycar.glb')
  } catch {
    // Preload may fail, that's fine
  }
}

/* ════════════════ SCENE CONTENT ════════════════ */

function SceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Lighting — bright, clean, Apple-style */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#f0f4f8" />
      <directionalLight position={[-3, 5, -5]} intensity={0.8} color="#e2e8f0" />
      <pointLight position={[-5, 3, 4]} intensity={1.5} color="#e2e8f0" />
      <pointLight position={[2, -4, -2]} intensity={1.0} color="#cbd5e1" />
      <pointLight position={[-3, -1, 5]} intensity={0.4} color="#fef3c7" />
      <Environment preset="city" />

      <ScrollCamera />
      <GlassBackgroundPlane />

      {/* ─── LEFT SIDE ─── */}
      <ChurchDome
        position={isMobile ? [-3.5, 1.0, -2] : [-6.0, 1.8, -1]}
        scale={isMobile ? 0.7 : 1.0}
        floatSpeed={1.2}
        floatIntensity={0.4}
      />
      <Khachkar
        position={isMobile ? [-3.0, -1.5, -1] : [-5.5, -2.0, 0]}
        scale={isMobile ? 0.5 : 0.85}
        floatSpeed={1.0}
        floatIntensity={0.3}
      />
      <MountainRange
        position={isMobile ? [-3.2, -0.5, -3] : [-6.5, 0.0, -2]}
        scale={isMobile ? 0.6 : 1.1}
        floatSpeed={0.6}
        floatIntensity={0.15}
      />

      {/* ─── RIGHT SIDE ─── */}
      <ChurchDome
        position={isMobile ? [3.5, -0.5, -2] : [6.0, 0.5, -1]}
        scale={isMobile ? 0.6 : 0.85}
        rotation={[0, Math.PI, 0]}
        floatSpeed={1.1}
        floatIntensity={0.35}
      />
      <Khachkar
        position={isMobile ? [3.0, 1.5, -1.5] : [5.8, 2.2, 0]}
        scale={isMobile ? 0.45 : 0.75}
        rotation={[0, Math.PI * 0.5, 0]}
        floatSpeed={0.9}
        floatIntensity={0.25}
      />
      <MountainRange
        position={isMobile ? [3.2, -1.5, -3] : [6.5, -1.8, -2]}
        scale={isMobile ? 0.5 : 0.95}
        rotation={[0, Math.PI * 0.3, 0]}
        floatSpeed={0.5}
        floatIntensity={0.12}
      />

      {/* ─── TOP CORNERS ─── */}
      <MountainRange
        position={isMobile ? [-1.5, 3.5, -3] : [-3.5, 4.0, -2]}
        scale={isMobile ? 0.4 : 0.7}
        floatSpeed={0.4}
        floatIntensity={0.1}
      />
      <ChurchDome
        position={isMobile ? [1.5, 3.0, -2.5] : [4.0, 3.5, -1.5]}
        scale={isMobile ? 0.45 : 0.65}
        floatSpeed={1.3}
        floatIntensity={0.3}
      />

      {/* ─── BOTTOM ─── */}
      <Khachkar
        position={isMobile ? [-1.0, -3.5, -1] : [-2.5, -4.0, 0]}
        scale={isMobile ? 0.4 : 0.65}
        floatSpeed={1.1}
        floatIntensity={0.25}
      />
      <ChurchDome
        position={isMobile ? [1.0, -3.0, -2] : [3.0, -3.5, -1]}
        scale={isMobile ? 0.5 : 0.7}
        rotation={[0, Math.PI * 1.5, 0]}
        floatSpeed={0.8}
        floatIntensity={0.3}
      />

      {/* ─── GLB MODELS: Real high-quality 3D objects ─── */}
      {/* Each wrapped in ErrorBoundary + Suspense so one failing model doesn't crash the whole scene */}
      <SafeGLBModel
        url="/models/glass-vase.glb"
        position={isMobile ? [-2.0, 2.5, -1] : [-4.5, 3.0, -0.5]}
        scale={isMobile ? 0.5 : 0.8}
        floatSpeed={0.8}
        floatIntensity={0.3}
      />
      <SafeGLBModel
        url="/models/glass-candle.glb"
        position={isMobile ? [2.0, -2.5, -1] : [4.5, -2.8, -0.5]}
        scale={isMobile ? 0.4 : 0.7}
        floatSpeed={0.9}
        floatIntensity={0.25}
      />
      <SafeGLBModel
        url="/models/iri-lamp.glb"
        position={isMobile ? [2.0, 2.0, -1.5] : [4.2, 2.5, -1]}
        scale={isMobile ? 0.35 : 0.6}
        floatSpeed={0.7}
        floatIntensity={0.35}
      />
      <SafeGLBModel
        url="/models/toycar.glb"
        position={isMobile ? [-2.0, -2.0, -1.5] : [-4.2, -2.5, -1]}
        scale={isMobile ? 0.35 : 0.6}
        floatSpeed={0.6}
        floatIntensity={0.3}
      />
      <SafeGLBModel
        url="/models/dragon.glb"
        position={isMobile ? [0, -3.0, -2] : [1.5, -3.5, -1.5]}
        scale={isMobile ? 0.3 : 0.5}
        rotation={[0, Math.PI * 0.7, 0]}
        floatSpeed={0.5}
        floatIntensity={0.2}
      />
      <SafeGLBModel
        url="/models/lamp-punctual.glb"
        position={isMobile ? [-2.5, 0, -1.5] : [-3.5, 0.5, -1]}
        scale={isMobile ? 0.25 : 0.45}
        floatSpeed={0.7}
        floatIntensity={0.3}
      />

      {/* ─── GLASS DROPLETS ─── */}
      <GlassDroplets
        positions={
          isMobile
            ? [[-2.0, 2.0, -1], [2.2, 1.8, -1], [-2.5, -0.5, -0.5], [2.0, -1.0, -1], [0.5, -2.5, -1.5], [-0.8, 2.5, -2], [0, 0, -3]]
            : [[-4.5, 3.5, -0.5], [4.5, 3.0, -0.5], [-5.0, -1.0, 0], [5.0, 0.5, -1], [-3.5, -3.5, -0.5], [4.0, -3.0, -0.5], [-2.5, 4.0, -1.5], [3.0, 3.8, -1.5], [0.5, -4.0, -1], [-1.5, 0.5, -2], [2.0, 1.0, -2], [-3.0, 2.0, -1], [3.5, -1.5, -0.8]]
        }
        baseScale={isMobile ? 0.05 : 0.07}
      />
    </>
  )
}

/* ════════════════ MAIN EXPORT ════════════════ */

export function ArmeniaGlassScene() {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    const handleVisibility = () => setIsVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('resize', check)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 50 }}
        dpr={isMobile ? [1, 1.2] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        onCreated={(state) => {
          state.gl.setClearColor('#000000', 0)
          state.gl.toneMapping = THREE.ACESFilmicToneMapping
          state.gl.toneMappingExposure = 1.5
        }}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ArmeniaGlassScene
