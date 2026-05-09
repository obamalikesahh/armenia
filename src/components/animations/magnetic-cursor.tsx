'use client'

import { useEffect, useRef } from 'react'

interface CursorState {
  x: number
  y: number
  ringX: number
  ringY: number
  isHovering: boolean
  hoverScale: number
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<CursorState>({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    isHovering: false,
    hoverScale: 0,
  })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      const state = stateRef.current

      // Smooth spring-like interpolation for the ring (trailing effect)
      state.ringX = lerp(state.ringX, state.x, 0.12)
      state.ringY = lerp(state.ringY, state.y, 0.12)

      // Smooth scale transition
      const targetScale = state.isHovering ? 1 : 0
      state.hoverScale = lerp(state.hoverScale, targetScale, 0.15)

      // Apply dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.x - 4}px, ${state.y - 4}px, 0)`
        const dotScale = 1 + state.hoverScale * 0.5
        dotRef.current.style.width = `${8 * dotScale}px`
        dotRef.current.style.height = `${8 * dotScale}px`
      }

      // Apply ring position
      if (ringRef.current) {
        const ringSize = 40 + state.hoverScale * 24
        ringRef.current.style.transform = `translate3d(${state.ringX - ringSize / 2}px, ${state.ringY - ringSize / 2}px, 0)`
        ringRef.current.style.width = `${ringSize}px`
        ringRef.current.style.height = `${ringSize}px`
        ringRef.current.style.opacity = `${0.4 + state.hoverScale * 0.4}`
        ringRef.current.style.borderColor = state.isHovering
          ? `rgba(245, 158, 11, ${0.6 + state.hoverScale * 0.3})`
          : `rgba(255, 255, 255, ${0.3 + state.hoverScale * 0.2})`
        ringRef.current.style.background = state.isHovering
          ? `rgba(245, 158, 11, ${0.08 + state.hoverScale * 0.07})`
          : 'transparent'
        ringRef.current.style.boxShadow = state.isHovering
          ? `0 0 20px rgba(245, 158, 11, 0.2), 0 0 40px rgba(139, 92, 246, 0.1), inset 0 0 20px rgba(245, 158, 11, 0.05)`
          : `0 0 15px rgba(139, 92, 246, 0.15), 0 0 30px rgba(245, 158, 11, 0.08)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.x = e.clientX
      stateRef.current.y = e.clientY
    }

    const handleMouseEnterInteractive = () => {
      stateRef.current.isHovering = true
    }

    const handleMouseLeaveInteractive = () => {
      stateRef.current.isHovering = false
    }

    // Magnetic pull effect for buttons
    const handleButtonMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.15
      const deltaY = (e.clientY - centerY) * 0.15
      target.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      target.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }

    const handleButtonMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      target.style.transform = 'translate(0px, 0px)'
      target.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    // Set up interactive element listeners
    const setupListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, [role="button"], [data-cursor-hover], .glass-card, input, [data-slot="trigger"]'
      )
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive)
        el.addEventListener('mouseleave', handleMouseLeaveInteractive)
      })

      const buttons = document.querySelectorAll('button, a, [role="button"]')
      buttons.forEach((btn) => {
        btn.addEventListener('mousemove', handleButtonMouseMove as EventListener)
        btn.addEventListener('mouseleave', handleButtonMouseLeave as EventListener)
      })
    }

    // Initial setup with a small delay to ensure DOM is ready
    const timer = setTimeout(setupListeners, 500)

    // Re-setup on DOM changes
    const observer = new MutationObserver(() => {
      setupListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Hide default cursor
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(timer)
      observer.disconnect()
      document.body.style.cursor = ''
      document.documentElement.style.cursor = ''

      // Cleanup magnetic transforms
      const buttons = document.querySelectorAll('button, a, [role="button"]')
      buttons.forEach((btn) => {
        const el = btn as HTMLElement
        el.style.transform = ''
        el.style.transition = ''
      })
    }
  }, [])

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: 'linear-gradient(135deg, #F59E0B, #ffffff)',
          boxShadow: '0 0 6px rgba(245, 158, 11, 0.6), 0 0 12px rgba(245, 158, 11, 0.3)',
          willChange: 'transform',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border"
        style={{
          width: 40,
          height: 40,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          willChange: 'transform, width, height, opacity',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      />
    </>
  )
}

export default MagneticCursor
