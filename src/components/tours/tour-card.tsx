'use client'

import { motion } from 'framer-motion'
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

export function TourCard({ tour, onBookNow, onSelect }: TourCardProps) {
  const { locale, t } = useLocale()

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-rose-500/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-orange-500/10"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        }}
      >
        {/* Image Section */}
        <div
          className="relative h-48 cursor-pointer overflow-hidden sm:h-52"
          onClick={() => onSelect?.(tour)}
        >
          <img
            src={tour.image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Featured badge */}
          {tour.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="border-0 bg-amber-500/90 text-white shadow-lg backdrop-blur-sm">
                <Star className="mr-1 size-3 fill-current" />
                {t('tours.featured')}
              </Badge>
            </div>
          )}

          {/* Duration badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="border-white/20 bg-black/40 text-white backdrop-blur-sm"
            >
              <Clock className="mr-1 size-3" />
              {durationLabel}
            </Badge>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <Badge
              variant="outline"
              className="border-white/30 bg-black/30 text-white backdrop-blur-sm"
            >
              {tour.category}
            </Badge>
          </div>

          {/* Region */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white/80">
            <MapPin className="size-3" />
            {tour.region}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Tour name */}
          <h3
            className="mb-1.5 line-clamp-2 cursor-pointer text-base font-semibold text-white transition-colors hover:text-amber-300 sm:text-lg"
            onClick={() => onSelect?.(tour)}
          >
            {name}
          </h3>

          {/* Short description */}
          <p className="mb-4 line-clamp-2 text-sm text-white/60">
            {shortDesc}
          </p>

          {/* Prices */}
          <div className="mb-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">
                {t('tours.armenianGuide')}
              </span>
              <span className="text-sm font-semibold text-amber-400">
                {t('common.from')} {formatPrice(priceEUR)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">
                {t('tours.englishGuide')}
              </span>
              <span className="text-sm font-semibold text-white">
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
            className="mt-auto w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/25"
          >
            {t('tours.bookNow')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
