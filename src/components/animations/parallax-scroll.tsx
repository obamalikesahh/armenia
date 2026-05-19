'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/* ──────────────────────────────────────────────
   ParallaxSection
   ────────────────────────────────────────────── */
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  /** Speed factor: 0 = no parallax, 0.5 = half speed, negative = opposite direction */
  speed?: number
  id?: string
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   RevealOnScroll
   ────────────────────────────────────────────── */
type RevealVariant = 'fade-up' | 'fade-up-blur' | 'scale-in' | 'slide-left' | 'slide-right'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
}

const variantConfigs: Record<RevealVariant, { hidden: any; visible: any }> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-up-blur': {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
}

export function RevealOnScroll({
  children,
  className = '',
  variant = 'fade-up-blur',
  delay = 0,
  duration = 0.7,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const config = variantConfigs[variant]

  return (
    <motion.div
      ref={ref}
      initial={config.hidden}
      animate={isInView ? config.visible : config.hidden}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   StaggerReveal
   ────────────────────────────────────────────── */
interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  variant?: RevealVariant
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.08,
  initialDelay = 0.1,
  variant = 'fade-up-blur',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const config = variantConfigs[variant]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: config.hidden,
                visible: config.visible,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div
              variants={{
                hidden: config.hidden,
                visible: config.visible,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {children}
            </motion.div>
          )}
    </motion.div>
  )
}
