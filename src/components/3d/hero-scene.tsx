'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
   Hero 3D Iridescent Glass Sphere Scene

   A single, photorealistic glass sphere with
   thin-film iridescent interference — like a
   real soap bubble / crystal ball.

   Minimalist Apple-style: just the sphere.
   ────────────────────────────────────────────── */

/* --- Custom iridescent glass shader --- */
const iridescentVertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const iridescentFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uIridescenceStrength;
  uniform vec3 uBaseColor;
  uniform float uTransmission;
  uniform float uIor;
  uniform float uThickness;
  uniform float uRoughness;
  uniform float uClearcoat;
  uniform float uClearcoatRoughness;
  uniform float uEnvMapIntensity;
  uniform float uSpecularIntensity;
  uniform vec3 uSpecularColor;
  uniform float uIridescenceIOR;
  uniform vec2 uIridescenceThicknessRange;

  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;

  // Thin-film interference — produces rainbow colors based on view angle
  vec3 thinFilmInterference(float cosTheta, float thickness, float ior) {
    // Phase difference for thin-film
    float delta = (2.0 * 3.14159265 * 2.0 * ior * thickness * cosTheta) / 550.0;

    // Simulate interference for R, G, B wavelengths
    float rPhase = delta * 1.0;
    float gPhase = delta * 0.8;
    float bPhase = delta * 0.65;

    float r = 0.5 + 0.5 * cos(rPhase);
    float g = 0.5 + 0.5 * cos(gPhase);
    float b = 0.5 + 0.5 * cos(bPhase);

    return vec3(r, g, b);
  }

  // Fresnel-Schlick approximation
  float fresnelSchlick(float cosTheta, float f0) {
    return f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);
  }

  // GGX specular
  float ggxDistribution(float NdotH, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float denom = NdotH * NdotH * (a2 - 1.0) + 1.0;
    return a2 / (3.14159265 * denom * denom);
  }

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);

    float NdotV = max(dot(N, V), 0.0);

    // Fresnel — edges more reflective
    float f0 = pow((uIor - 1.0) / (uIor + 1.0), 2.0);
    float fresnel = fresnelSchlick(NdotV, f0);

    // Thin-film iridescence — thickness varies with angle + subtle time animation
    float thickness = mix(uIridescenceThicknessRange.x, uIridescenceThicknessRange.y, NdotV);
    thickness += sin(uTime * 0.15 + NdotV * 6.28) * 30.0;

    vec3 iridescenceColor = thinFilmInterference(NdotV, thickness, uIridescenceIOR);

    // Blend iridescence with Fresnel — stronger at edges
    float iriMix = fresnel * uIridescenceStrength;

    // Base color (very light, nearly white for high transmission)
    vec3 baseColor = uBaseColor;

    // Combine base + iridescence
    vec3 albedo = mix(baseColor, iridescenceColor, iriMix * 0.7);

    // Studio-style specular highlights (two key lights)
    vec3 light1Dir = normalize(vec3(1.0, 1.2, 0.8));
    vec3 light2Dir = normalize(vec3(-0.6, 0.8, 1.0));

    // Light 1 — primary highlight
    vec3 H1 = normalize(V + light1Dir);
    float NdotH1 = max(dot(N, H1), 0.0);
    float spec1 = ggxDistribution(NdotH1, uRoughness) * uSpecularIntensity;
    // Elongated highlight (oval shape)
    spec1 = pow(spec1, 0.4) * 2.5;

    // Light 2 — secondary highlight
    vec3 H2 = normalize(V + light2Dir);
    float NdotH2 = max(dot(N, H2), 0.0);
    float spec2 = ggxDistribution(NdotH2, uRoughness * 1.2) * uSpecularIntensity * 0.6;
    spec2 = pow(spec2, 0.5) * 1.5;

    // Clearcoat specular (sharper reflection layer on top)
    vec3 Hc1 = normalize(V + light1Dir);
    float NdotHc1 = max(dot(N, Hc1), 0.0);
    float clearcoatSpec = ggxDistribution(NdotHc1, uClearcoatRoughness) * uClearcoat;

    // Combine specular
    vec3 specular = uSpecularColor * (spec1 + spec2) + vec3(clearcoatSpec * 0.4);

    // Transmission — the sphere is mostly transparent
    vec3 transmissionColor = albedo * (1.0 - uTransmission);

    // Final: blend between transparent base and reflective surface
    // Fresnel controls how much reflection vs transmission
    vec3 finalColor = mix(transmissionColor, albedo * fresnel + specular, fresnel * 0.6 + 0.15);

    // Add subtle environment-like coloring based on normal direction
    vec3 envColor = vec3(0.9, 0.92, 0.95); // cool studio environment
    finalColor += envColor * fresnel * 0.08 * uEnvMapIntensity;

    // Slight rim glow from iridescence
    float rim = pow(1.0 - NdotV, 3.0);
    finalColor += iridescenceColor * rim * 0.15 * uIridescenceStrength;

    float alpha = mix(0.08, 0.45, fresnel) + rim * 0.2;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

/* --- The single iridescent glass sphere --- */
function IridescentGlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIridescenceStrength: { value: 1.0 },
    uBaseColor: { value: new THREE.Color('#e8edf2') },
    uTransmission: { value: 0.97 },
    uIor: { value: 1.33 },
    uThickness: { value: 2.0 },
    uRoughness: { value: 0.02 },
    uClearcoat: { value: 1.0 },
    uClearcoatRoughness: { value: 0.02 },
    uEnvMapIntensity: { value: 2.0 },
    uSpecularIntensity: { value: 1.0 },
    uSpecularColor: { value: new THREE.Color('#ffffff') },
    uIridescenceIOR: { value: 1.3 },
    uIridescenceThicknessRange: { value: new THREE.Vector2(100, 400) },
  }), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const group = groupRef.current
    const mat = materialRef.current
    if (!group || !mat) return

    // Very slow, subtle floating — barely noticeable
    group.position.y = Math.sin(t * 0.2) * 0.08

    // Extremely slow rotation to catch light differently
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.03
      meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.02
    }

    // Update time for animated iridescence
    mat.uniforms.uTime.value = t
  })

  return (
    <group ref={groupRef}>
      {/* Main iridescent glass sphere */}
      <mesh ref={meshRef} scale={2.8}>
        <sphereGeometry args={[1, 128, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={iridescentVertexShader}
          fragmentShader={iridescentFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Primary highlight — bright oval studio reflection #1 */}
      <mesh position={[1.5, 1.9, 2.0]} rotation={[0.15, -0.2, 0.1]}>
        <sphereGeometry args={[0.22, 24, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary highlight — smaller studio reflection #2 */}
      <mesh position={[-1.0, 1.2, 2.4]} rotation={[-0.1, 0.15, 0]}>
        <sphereGeometry args={[0.13, 24, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle outer glow — very faint */}
      <mesh scale={3.1}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#d0d8e8"
          transparent
          opacity={0.015}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* --- Main Hero Scene Component --- */
export function HeroScene({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} absolute inset-0 z-0 overflow-hidden`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ fov: 45, position: [0, 0, 8], near: 0.1, far: 50 }}
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
        <ambientLight intensity={0.5} />
        {/* Primary studio key light — upper right */}
        <directionalLight position={[5, 8, 5]} intensity={2.0} color="#f0f4f8" />
        {/* Fill light — left */}
        <pointLight position={[-5, 3, 4]} intensity={1.2} color="#e2e8f0" />
        {/* Rim light — behind/below */}
        <pointLight position={[2, -5, -3]} intensity={0.8} color="#cbd5e1" />
        {/* Subtle warm accent */}
        <pointLight position={[-3, -2, 5]} intensity={0.3} color="#fef3c7" />
        <Environment preset="city" />

        {/* The single iridescent glass sphere */}
        <IridescentGlassSphere />
      </Canvas>
    </div>
  )
}

export default HeroScene
