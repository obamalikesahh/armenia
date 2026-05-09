'use client'

import { useEffect, useRef } from 'react'

interface SpotlightProps {
  /** Radius of the spotlight in pixels, default 400 */
  radius?: number
  /** Color of the spotlight glow, default amber */
  color?: 'amber' | 'violet' | 'mixed'
  /** Opacity of the spotlight, default 0.07 */
  opacity?: number
}

export function MouseSpotlight({
  radius = 400,
  color = 'mixed',
  opacity = 0.07,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const getGradient = () => {
      const r = radius
      switch (color) {
        case 'amber':
          return `radial-gradient(${r}px circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, ${opacity}), rgba(245, 158, 11, ${opacity * 0.3}) 40%, transparent 70%)`
        case 'violet':
          return `radial-gradient(${r}px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, ${opacity}), rgba(139, 92, 246, ${opacity * 0.3}) 40%, transparent 70%)`
        case 'mixed':
        default:
          return `radial-gradient(${r}px circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, ${opacity}), rgba(139, 92, 246, ${opacity * 0.5}) 30%, rgba(236, 72, 153, ${opacity * 0.3}) 50%, transparent 70%)`
      }
    }

    // Set initial gradient
    if (containerRef.current) {
      containerRef.current.style.background = getGradient()
    }

    const animate = () => {
      const pos = posRef.current
      // Smooth interpolation (lerp)
      pos.x += (pos.targetX - pos.x) * 0.08
      pos.y += (pos.targetY - pos.y) * 0.08

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${pos.x}px`)
        containerRef.current.style.setProperty('--mouse-y', `${pos.y}px`)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [radius, color, opacity])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}

export default MouseSpotlight
