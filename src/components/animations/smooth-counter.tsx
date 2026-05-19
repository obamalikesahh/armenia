'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface SmoothCounterProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export function SmoothCounter({ target, suffix = '', duration = 2, className = '' }: SmoothCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const startTime = Date.now()
    const durationMs = duration * 1000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
