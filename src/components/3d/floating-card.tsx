'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ──────────────────────────────────────────────
   FloatingCard
   A card with 3D tilt on mouse hover, glass morphism
   border, and subtle glow around edges.
   ────────────────────────────────────────────── */

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export default function FloatingCard({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.4)',
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Spring-based smooth animation
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Glow position follows cursor
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  // Transform for glare effect
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized -1 to 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2)
      const normalizedY = (e.clientY - centerY) / (rect.height / 2)

      // Tilt angles (max 12 degrees)
      const maxTilt = 12
      rotateX.set(-normalizedY * maxTilt)
      rotateY.set(normalizedX * maxTilt)

      // Glare position
      const percentX = ((e.clientX - rect.left) / rect.width) * 100
      const percentY = ((e.clientY - rect.top) / rect.height) * 100
      glareX.set(percentX)
      glareY.set(percentY)
    },
    [rotateX, rotateY, glareX, glareY]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
  }, [rotateX, rotateY, glareX, glareY])

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow border effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${glowColor}, rgba(236,72,153,0.3), rgba(148,163,184,0.3))`
            : 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1), rgba(148,163,184,0.1))',
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-4 rounded-3xl blur-xl"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15), rgba(148,163,184,0.15))`
            : 'transparent',
          transition: 'background 0.4s ease',
        }}
      />

      {/* Card body with tilt */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          background:
            'linear-gradient(135deg, rgba(15,15,25,0.9), rgba(20,15,35,0.85))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Glass glare overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Content */}
        <div
          style={{
            transform: 'translateZ(0)',
            position: 'relative',
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
