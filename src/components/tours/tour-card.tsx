'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, MapPin, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  type Tour,
  convertAMDtoEUR,
  formatPrice,
} from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

interface TourCardProps {
  tour: Tour
  onBookNow?: (tour: Tour) => void
  onSelect?: (tour: Tour) => void
}

// Map region names to translation keys
const REGION_KEY_MAP: Record<string, string> = {
  Yerevan: 'regions.yerevan',
  Gegharkunik: 'regions.gegharkunik',
  'Vayots Dzor': 'regions.vayotsDzor',
  Tavush: 'regions.tavush',
  Lori: 'regions.lori',
  Aragatsotn: 'regions.aragatsotn',
  Kotayk: 'regions.kotayk',
  Armavir: 'regions.armavir',
  Syunik: 'regions.syunik',
  Ararat: 'regions.ararat',
  Shirak: 'regions.shirak',
  Georgia: 'regions.georgia',
}

// Map category names to translation keys
const CATEGORY_KEY_MAP: Record<string, string> = {
  Historical: 'categories.historical',
  Nature: 'categories.nature',
  Adventure: 'categories.adventure',
  Cultural: 'categories.cultural',
  Wine: 'categories.wine',
  'Multi-day': 'categories.multiDay',
  Wellness: 'categories.wellness',
}

export function TourCard({ tour, onBookNow, onSelect }: TourCardProps) {
  const { locale, t } = useLocale()

  const getRegionTranslation = (region: string) => {
    const key = REGION_KEY_MAP[region]
    return key ? t(key) : region
  }

  const getCategoryTranslation = (category: string) => {
    const key = CATEGORY_KEY_MAP[category]
    return key ? t(key) : category
  }

  const name = tour.name[locale] || tour.name.en
  const shortDesc = tour.shortDescription[locale] || tour.shortDescription.en
  const priceEUR = convertAMDtoEUR(tour.priceAMD)
  const priceForeignEUR = convertAMDtoEUR(tour.priceForeignAMD)

  const durationLabel = (() => {
    switch (tour.duration) {
      case 'half day':
        return t('tours.halfDay')
      case 'full day':
        return t('tours.fullDay')
      default:
        return tour.duration.includes('day')
          ? t('tours.multiDay')
          : tour.duration
    }
  })()

  // ─── Gallery state ─────────────────────────────────────────────
  const images = tour.images.length > 0 ? tour.images : [tour.image]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-advance every 3s when hovered
  useEffect(() => {
    if (isHovered && images.length > 1) {
      autoAdvanceRef.current = setInterval(goToNext, 3000)
    }
    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current)
        autoAdvanceRef.current = null
      }
    }
  }, [isHovered, goToNext, images.length])

  // ─── Parallax ──────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 2000], [0, -30])

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (images.length <= 1) {
        onSelect?.(tour)
        return
      }
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      if (clickX < rect.width / 2) {
        goToPrev()
      } else {
        goToNext()
      }
    },
    [goToNext, goToPrev, images.length, onSelect, tour]
  )

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative"
    >
      {/* Subtle gold glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-[#c9a84c]/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:bg-[#c9a84c]/8 group-hover:opacity-100" />

      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/6 bg-white/3 backdrop-blur-xl transition-all duration-500 group-hover:border-white/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section — mini gallery */}
        <div
          className="relative h-48 cursor-pointer overflow-hidden sm:h-52"
          onClick={handleImageClick}
        >
          {/* Parallax container */}
          <motion.div
            className="absolute inset-0"
            style={{ y: parallaxY }}
          >
            {/* Crossfade images — all stacked, only current visible */}
            {images.map((src, idx) => (
              <motion.img
                key={src}
                src={src}
                alt={`${name} - ${idx + 1}`}
                className="absolute inset-0 h-[calc(100%+30px)] w-full object-cover"
                initial={false}
                animate={{
                  opacity: idx === currentIndex ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent pointer-events-none" />

          {/* Navigation dots — visible on hover */}
          {images.length > 1 && (
            <div
              className={`absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(idx)
                  }}
                  className={`size-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'scale-150 bg-[#c9a84c]'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Featured badge */}
          {tour.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="border-0 bg-[#c9a84c]/90 text-[#0a0a0a] shadow-lg backdrop-blur-sm">
                <Star className="mr-1 size-3 fill-current" />
                {t('tours.featured')}
              </Badge>
            </div>
          )}

          {/* Duration badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="border-white/6 bg-[#0a0a0a]/60 text-white/70 backdrop-blur-sm"
            >
              <Clock className="mr-1 size-3" />
              {durationLabel}
            </Badge>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <Badge
              variant="outline"
              className="border-white/8 bg-[#0a0a0a]/50 text-white/60 backdrop-blur-sm"
            >
              {getCategoryTranslation(tour.category)}
            </Badge>
          </div>

          {/* Region */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white/45">
            <MapPin className="size-3" />
            {getRegionTranslation(tour.region)}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Tour name */}
          <h3
            className="mb-1.5 line-clamp-2 cursor-pointer text-base font-semibold text-white transition-colors hover:text-[#c9a84c] sm:text-lg"
            onClick={() => onSelect?.(tour)}
          >
            {name}
          </h3>

          {/* Short description */}
          <p className="mb-4 line-clamp-2 text-sm text-white/35">
            {shortDesc}
          </p>

          {/* Prices */}
          <div className="mb-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/35">
                {t('tours.armenianGuide')}
              </span>
              <span className="text-sm font-semibold text-[#c9a84c]">
                {t('common.from')} {formatPrice(priceEUR)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/35">
                {t('tours.englishGuide')}
              </span>
              <span className="text-sm font-semibold text-white/60">
                {t('common.from')} {formatPrice(priceForeignEUR)}
              </span>
            </div>
          </div>

          {/* Book Now button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onBookNow?.(tour)
            }}
            className="mt-auto w-full bg-[#c9a84c] text-[#0a0a0a] font-medium shadow-lg transition-all duration-300 hover:bg-[#b8973e] hover:shadow-[#c9a84c]/10"
          >
            {t('tours.bookNow')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
