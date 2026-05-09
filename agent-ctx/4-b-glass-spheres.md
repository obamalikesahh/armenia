# Task 4-b: 3D Glass Sphere Components

## Task
Create stunning 3D glass sphere components that float throughout the ENTIRE page, inspired by Apple's design language with clear, polished glass bubbles.

## Files Created/Modified

### 1. `/home/z/my-project/src/components/3d/glass-sphere.tsx` (NEW)
- Single glass sphere component using MeshPhysicalMaterial
- Properties: transmission 0.98, roughness 0.05, metalness 0.1, ior 1.5, clearcoat 1.0, clearcoatRoughness 0.05
- Color: "#e8edf2" (subtle cool tint), attenuationColor: "#c8d6e5"
- SphereGeometry with 64 segments for smooth surface
- Float animation using sin wave with configurable speed, phaseOffset, floatAmplitude
- Mouse follow parallax effect with smooth interpolation
- Inner highlight spheres simulating bright light reflections (two oval-shaped)
- Soft glow halo around sphere (BackSide rendering, additive blending)
- Opacity multiplier prop for theme adaptation

### 2. `/home/z/my-project/src/components/3d/glass-torus.tsx` (NEW)
- Frosted glass torus component
- MeshPhysicalMaterial: transmission 0.7, roughness 0.3 (frosted), metalness 0.2
- Color: "#94A3B8" (silver), clearcoat 0.5
- Slow continuous rotation with configurable rotationSpeed
- Subtle floating motion
- Inner edge glow with additive blending
- TorusGeometry with 48x96 segments

### 3. `/home/z/my-project/src/components/3d/floating-glass-scene.tsx` (NEW)
- Full-page fixed overlay Canvas (position: fixed, pointer-events: none, z-index: 1)
- 8 desktop glass spheres spread across viewport (top-left, top-right, center-left, center-right, bottom-left, bottom-right, center-top, center-bottom)
- 5 mobile glass spheres (fewer, smaller, no mouse follow)
- 2 desktop glass torus accents, 1 mobile torus
- Sphere sizes: small (0.35-0.45), medium (0.55-0.7), large (1.0-1.2)
- MouseTracker component using R3F pointer state for mouse-follow parallax
- Environment preset: "night" (dark mode) or "city" (light mode)
- Responsive (adjusts sphere layout for mobile)
- Theme-aware (opacityMultiplier 1.0 dark / 0.6 light)
- Camera position [0, 0, 8], fov 50
- ACESFilmic tone mapping

### 4. `/home/z/my-project/src/components/3d/hero-scene.tsx` (REWRITTEN)
- Replaced old image-based hero with 3D glass sphere scene
- CentralGlassSphere: scale 2.0, same glass material as glass-sphere.tsx
- Two bright highlight spheres simulating light source reflections
- 5 OrbitingSphere components with different orbit radii, speeds, tilts, and scales
- 2 HeroOrbitRing components (glass rings orbiting the center)
- SparkleParticles: 80 floating points with silver/white colors, additive blending
- Float wrapper from @react-three/drei for sparkle particles
- Gradient overlays preserved (bottom fade, top fade, vignette, cool silver glow)
- Camera: fov 50, position [0, 0, 8]

### 5. `/home/z/my-project/src/app/page.tsx` (MODIFIED)
- Added dynamic import for FloatingGlassScene (ssr: false)
- Added `<FloatingGlassScene />` as first child inside root div
- Positioned before MagneticCursor and MouseSpotlight

## Design Decisions
- Used MeshPhysicalMaterial instead of MeshTransmissionMaterial for broader compatibility and more direct control over the glass parameters specified in the task
- All Three.js components are client-only (dynamic import with ssr: false in page.tsx)
- Mouse follow effect uses smooth interpolation (lerp factor 0.02) to avoid jittery movement
- Sphere highlights use additive blending for realistic light reflection simulation
- The floating glass scene is fully non-interactive (pointerEvents: 'none') so it doesn't block page interactions
- Silver color palette (#94A3B8, #CBD5E1, #c8d6e5, #e8edf2) consistent with project's existing silver theme

## Lint Status
- All files pass ESLint with zero errors/warnings
