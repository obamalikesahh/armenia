'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────
   Minimal Hero Scene — clean, dark, sophisticated
   Single accent color (warm gold), no busy effects
   ────────────────────────────────────────────── */

export function HeroScene({ className = '' }: { className?: string }) {
  const imageRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const smoothedMouse = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  // Check mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll listener for parallax
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mouse listener for parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePos({ x, y })
    }
    const onLeave = () => setMousePos({ x: 0, y: 0 })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Smooth mouse interpolation loop
  useEffect(() => {
    const animate = () => {
      smoothedMouse.current.x += (mousePos.x - smoothedMouse.current.x) * 0.03
      smoothedMouse.current.y += (mousePos.y - smoothedMouse.current.y) * 0.03

      if (imageRef.current) {
        const mx = smoothedMouse.current.x
        const my = smoothedMouse.current.y
        imageRef.current.style.transform = `translate(${mx * -12}px, ${my * -8 + scrollY * 0.12}px) scale(1.08)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mousePos, scrollY])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  return (
    <div
      className={`${className} absolute inset-0 z-0 overflow-hidden`}
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Taraz Dress Image (centerpiece) ── */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-[1] flex items-center justify-center will-change-transform"
        style={{ transform: 'scale(1.08)' }}
      >
        {/* Portrait (mobile) */}
        <div className="relative h-full w-full md:hidden">
          <Image
            src="/images/taraz-clean.png"
            alt="Traditional Armenian Taraz"
            fill
            priority
            quality={95}
            onLoad={handleImageLoad}
            className="object-cover object-center"
            style={{
              opacity: imageLoaded ? 0.55 : 0,
              transition: 'opacity 1.5s ease-out',
              filter: 'brightness(0.65) contrast(1.1) saturate(0.8)',
            }}
          />
        </div>
        {/* Landscape (desktop) */}
        <div className="relative hidden h-full w-full md:block">
          <Image
            src="/images/hero-minimal.png"
            alt="Armenian Monastery"
            fill
            priority
            quality={95}
            onLoad={handleImageLoad}
            className="object-cover object-center"
            style={{
              opacity: imageLoaded ? 0.5 : 0,
              transition: 'opacity 1.5s ease-out',
              filter: 'brightness(0.6) contrast(1.15) saturate(0.7)',
            }}
          />
        </div>
      </div>

      {/* ── Loading state ── */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            className="absolute inset-0 z-[10] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="size-8 animate-pulse rounded-full bg-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom gradient fade ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[50%]"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10, 10, 10, 0.5) 50%, transparent 100%)',
        }}
      />

      {/* ── Top gradient fade ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[30%]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* ── Subtle vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 10, 10, 0.6) 100%)',
        }}
      />

      {/* ── Very subtle warm glow in center ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 1) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

export default HeroScene
