'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-black/80 hover:text-primary"
          aria-label="Scroll to top"
          style={{ boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.5)' }}
        >
          <ArrowUp className="size-5 stroke-[2.5px] animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
