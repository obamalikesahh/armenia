'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface LightboxProps {
  images: string[]
  initialIndex?: number
  open: boolean
  onClose: () => void
  title?: string
}

export function ImageLightbox({ images, initialIndex = 0, open, onClose, title }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, goToPrev, goToNext, onClose])

  if (!open || images.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
      >
        <X className="size-5" />
      </button>

      {/* Title + counter */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        {title && (
          <span className="max-w-[200px] truncate text-sm font-medium text-white/50 sm:max-w-[400px]">
            {title}
          </span>
        )}
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60 backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Main image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: isZoomed ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex h-[85vh] w-[90vw] items-center justify-center sm:w-[85vw] lg:w-[80vw]"
        >
          <img
            src={images[currentIndex]}
            alt={`${title || 'Gallery image'} ${currentIndex + 1}`}
            className={`max-h-full max-w-full rounded-lg object-contain transition-transform duration-500 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white sm:left-4"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white sm:right-4"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-xl bg-black/50 px-3 py-2 backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx)
                setIsZoomed(false)
              }}
              className={`shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                idx === currentIndex
                  ? 'ring-2 ring-white/80 ring-offset-1 ring-offset-black/50 scale-110'
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-12 w-16 object-cover sm:h-14 sm:w-20"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom hint */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/40 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white/60"
        >
          <ZoomIn className="size-3" />
          {isZoomed ? 'Zoom out' : 'Zoom in'}
        </button>
      </div>
    </motion.div>
  )
}
