'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ArmeniaToursLogoProps {
  useContrast?: boolean
  className?: string
}

export function ArmeniaToursLogo({ useContrast = false, className = '' }: ArmeniaToursLogoProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={`relative flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* ─── Premium SVG Ararat Mount & Flag Animation ─── */}
      <div className="relative overflow-visible size-8 shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Armenian Flag Gradient */}
            <linearGradient id="armenia-flag-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E30A17" />
              <stop offset="35%" stopColor="#E30A17" />
              <stop offset="35%" stopColor="#0033A0" />
              <stop offset="65%" stopColor="#0033A0" />
              <stop offset="65%" stopColor="#F2A800" />
              <stop offset="100%" stopColor="#F2A800" />
            </linearGradient>

            {/* Glowing filter for hover state */}
            <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Mount Ararat outline animation - drawing style */}
          <motion.path
            d="M3 25 L11 9 L17 19 L22 12 L29 25 Z"
            stroke="url(#armenia-flag-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isMounted ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />

          {/* Ararat Peak Highlight - Small Mountain path */}
          <motion.path
            d="M9 25 L15 15 L20 22 L24 17 L28 25 Z"
            stroke={useContrast ? '#1e293b' : '#ffffff'}
            strokeWidth="1"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            animate={isMounted ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
          />

          {/* Armenian Flag Painted Fill with delayed fade in */}
          <motion.path
            d="M3 25 L11 9 L17 19 L22 12 L29 25 Z"
            fill="url(#armenia-flag-gradient)"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 0.25 } : { opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="group-hover:opacity-45 transition-opacity duration-300"
            style={{ filter: 'drop-shadow(0px 0px 4px rgba(227, 10, 23, 0.2))' }}
          />
        </svg>
      </div>

      {/* ─── Logo Brand Text: Inline, Larger, Flag Colors ─── */}
      <span className="relative flex items-center gap-1.5 leading-none font-bold tracking-[0.15em] text-base sm:text-lg">
        {/* ARMENIA part */}
        <span className="relative overflow-hidden inline-block py-0.5">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            animate={isMounted ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-black bg-gradient-to-r from-[#E30A17] via-[#0033A0] to-[#F2A800] bg-[size:200%_auto] bg-clip-text text-transparent transition-all duration-500 group-hover:bg-[position:100%_center]"
          >
            ARMENIA
          </motion.span>
        </span>

        {/* TOURS part */}
        <span className="relative overflow-hidden inline-block py-0.5">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            animate={isMounted ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-black bg-gradient-to-r from-[#E30A17] via-[#0033A0] to-[#F2A800] bg-[size:200%_auto] bg-clip-text text-transparent transition-all duration-500 group-hover:bg-[position:100%_center]"
          >
            TOURS
          </motion.span>
        </span>

        {/* Armenian Flag paint stroke underline effect */}
        <div className="absolute -bottom-1 left-0 right-0 h-[2.5px] overflow-hidden rounded-full">
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={isMounted ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-r from-[#E30A17] via-[#0033A0] to-[#F2A800] bg-[size:200%_auto] group-hover:bg-[position:100%_center] transition-all duration-500"
          />
        </div>
      </span>
    </div>
  )
}
