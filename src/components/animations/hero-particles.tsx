'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  phase: number
  phaseSpeed: number
  color: string
  alpha: number
  glowAlpha: number
}

const COLORS = [
  '#F59E0B', // amber
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#ffffff', // white
  '#FBBF24', // amber-400
  '#A78BFA', // violet-400
  '#F472B6', // pink-400
]

const PARTICLE_COUNT = 130
const CONNECTION_DISTANCE = 120
const MOUSE_RADIUS = 180

function createParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.01 + 0.005,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
      glowAlpha: Math.random() * 0.15 + 0.05,
    })
  }
  return particles
}

function toHex2(n: number): string {
  return Math.round(Math.min(Math.max(n, 0), 1) * 255).toString(16).padStart(2, '0')
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      sizeRef.current = { width, height }

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)

      // Recreate particles on resize
      particlesRef.current = createParticles(width, height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const { width, height } = sizeRef.current
      const particles = particlesRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Sinusoidal horizontal motion
        p.phase += p.phaseSpeed
        p.x += p.speedX + Math.sin(p.phase) * 0.3

        // Float upward
        p.y += p.speedY

        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        let mouseInfluence = 0

        if (dist < MOUSE_RADIUS) {
          mouseInfluence = 1 - dist / MOUSE_RADIUS
          const force = mouseInfluence * 0.02
          p.x += dx * force
          p.y += dy * force
        }

        // Reset particles that float off-screen
        if (p.y < -20) {
          p.y = height + 20
          p.x = Math.random() * width
        }
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20

        // Draw glow
        const glowSize = p.size * (3 + mouseInfluence * 4)
        const glowAlpha = p.glowAlpha + mouseInfluence * 0.2
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
        gradient.addColorStop(0, p.color + toHex2(glowAlpha))
        gradient.addColorStop(1, p.color + '00')
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw core
        const coreAlpha = p.alpha + mouseInfluence * 0.4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + toHex2(coreAlpha)
        ctx.fill()
      }

      // Draw connections (constellation effect)
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const cdx = particles[i].x - particles[j].x
          const cdy = particles[i].y - particles[j].y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

          if (cdist < CONNECTION_DISTANCE) {
            const alpha = (1 - cdist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`
            ctx.stroke()
          }
        }
      }

      // Mouse glow effect on canvas
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_RADIUS
        )
        mouseGradient.addColorStop(0, 'rgba(245, 158, 11, 0.03)')
        mouseGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.015)')
        mouseGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = mouseGradient
        ctx.fillRect(mouse.x - MOUSE_RADIUS, mouse.y - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  )
}

export default HeroParticles
