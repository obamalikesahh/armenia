'use client'

import { useRef, useCallback, type ReactNode } from 'react'

interface HoverTiltProps {
  children: ReactNode
  className?: string
  /** Maximum tilt angle in degrees, default 6 */
  maxTilt?: number
  /** Perspective in px, default 800 */
  perspective?: number
  /** Scale on hover, default 1.02 */
  scale?: number
  /** Glare intensity 0-1, default 0.15 */
  glareIntensity?: number
  /** Transition speed in ms, default 400 */
  speed?: number
}

export function HoverTilt({
  children,
  className = '',
  maxTilt = 6,
  perspective = 800,
  scale = 1.02,
  glareIntensity = 0.15,
  speed = 400,
}: HoverTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate tilt angles
      const tiltX = ((y - centerY) / centerY) * -maxTilt
      const tiltY = ((x - centerX) / centerX) * maxTilt

      // Apply transform
      card.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`
      card.style.transition = `transform ${speed * 0.5}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`

      // Move glare
      if (glareRef.current) {
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareIntensity}), transparent 60%)`
        glareRef.current.style.opacity = '1'
      }
    },
    [maxTilt, perspective, scale, glareIntensity, speed]
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    card.style.transition = `transform ${speed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`

    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }, [perspective, speed])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
        style={{
          transition: `opacity ${speed}ms ease`,
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default HoverTilt
