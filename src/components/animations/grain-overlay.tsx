'use client'

import { useEffect, useRef } from 'react'

export function GrainOverlay({ opacity = 0.035 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const generateGrain = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = Math.random() * 20 // Very subtle
      }

      ctx.putImageData(imageData, 0, 0)
    }

    generateGrain()

    // Regenerate grain every 100ms for animation effect
    const interval = setInterval(generateGrain, 100)

    const handleResize = () => generateGrain()
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity, mixBlendMode: 'overlay' }}
      aria-hidden="true"
    />
  )
}
