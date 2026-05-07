'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  MapPin,
  Users,
  CalendarDays,
  Check,
  X,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Info,
} from 'lucide-react'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  type Tour,
  convertAMDtoEUR,
  formatPrice,
} from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

interface TourDetailModalProps {
  tour: Tour | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBookNow?: (tour: Tour, bookingData: BookingData) => void
}

export interface BookingData {
  date: Date | undefined
  guideLanguage: 'armenian' | 'english-russian'
  adults: number
  children: number
  hotelPickup: boolean
}

export function TourDetailModal({
  tour,
  open,
  onOpenChange,
  onBookNow,
}: TourDetailModalProps) {
  const { locale, t } = useLocale()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guideLanguage, setGuideLanguage] = useState<'armenian' | 'english-russian'>('armenian')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const name = tour?.name[locale] || tour?.name.en || ''
  const description = tour?.description[locale] || tour?.description.en || ''

  const pricePerPersonAMD = useMemo(() => {
    if (!tour) return 0
    return guideLanguage === 'armenian' ? tour.priceAMD : tour.priceForeignAMD
  }, [tour, guideLanguage])

  const totalPriceAMD = useMemo(() => {
    const adultPrice = pricePerPersonAMD * adults
    const childPrice = pricePerPersonAMD * 0.5 * children
    return Math.round(adultPrice + childPrice)
  }, [pricePerPersonAMD, adults, children])

  const totalPriceEUR = useMemo(() => convertAMDtoEUR(totalPriceAMD), [totalPriceAMD])

  const durationLabel = useMemo(() => {
    if (!tour) return ''
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
  }, [tour, t])

  const resetState = () => {
    setDate(undefined)
    setGuideLanguage('armenian')
    setAdults(1)
    setChildren(0)
  }

  const handleClose = (open: boolean) => {
    if (!open) resetState()
    onOpenChange(open)
  }

  const handleProceed = () => {
    if (!tour || !date) return
    onBookNow?.(tour, { date, guideLanguage, adults, children, hotelPickup: false })
  }

  if (!tour) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-white/15 bg-gray-950/95 p-0 text-white backdrop-blur-2xl sm:max-w-2xl lg:max-w-3xl"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>

        <AnimatePresence mode="wait">
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero image */}
            <div className="relative h-56 overflow-hidden sm:h-72">
              <img
                src={tour.image}
                alt={name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

              {/* Featured badge */}
              {tour.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="border-0 bg-amber-500/90 text-white shadow-lg backdrop-blur-sm">
                    <Star className="mr-1 size-3 fill-current" />
                    {t('tours.featured')}
                  </Badge>
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                  {name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
                    <Clock className="mr-1 size-3" />
                    {durationLabel}
                  </Badge>
                  <Badge variant="secondary" className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
                    <MapPin className="mr-1 size-3" />
                    {tour.region}
                  </Badge>
                  <Badge variant="secondary" className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
                    <Users className="mr-1 size-3" />
                    {tour.groupSize}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Description */}
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                {description}
              </p>

              {/* Route / Itinerary */}
              {tour.route.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    {t('tours.route')}
                  </h3>
                  <div className="relative space-y-0">
                    {tour.route.map((stop, idx) => (
                      <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                        {/* Timeline line */}
                        {idx < tour.route.length - 1 && (
                          <div className="absolute top-6 left-[15px] h-full w-px bg-gradient-to-b from-amber-500/50 to-amber-500/10" />
                        )}
                        {/* Stop number */}
                        <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/20 text-xs font-bold text-amber-400">
                          {idx + 1}
                        </div>
                        {/* Stop content */}
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{stop.name}</h4>
                          <p className="mt-0.5 text-sm text-white/50">
                            {stop.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included / Excluded */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                {tour.included.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
                      {t('tours.included')}
                    </h3>
                    <ul className="space-y-2">
                      {tour.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                          <span className="text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.excluded.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
                      {t('tours.excluded')}
                    </h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <X className="mt-0.5 size-4 shrink-0 text-red-400" />
                          <span className="text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Available Days & Best Period */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/40">
                    <CalendarDays className="size-4" />
                    {t('tours.availableDays')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.availableDays.map((day) => (
                      <Badge
                        key={day}
                        variant="outline"
                        className="border-white/10 text-white/70"
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/40">
                    <Info className="size-4" />
                    {t('tours.bestPeriod')}
                  </h4>
                  <p className="text-sm text-white/70">{tour.bestPeriod}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {t('tours.startEndPoint')}: {tour.startEndPoint}
                  </p>
                  <p className="text-xs text-white/40">
                    {tour.startTime} - {tour.endTime}
                  </p>
                </div>
              </div>

              <Separator className="mb-6 bg-white/10" />

              {/* Booking section */}
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-white">
                  {t('booking.title')}
                </h3>

                {/* Date picker */}
                <div>
                  <Label className="mb-2 text-white/60">
                    {t('booking.selectDate')}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-white/10 bg-white/5 text-left text-white/70 hover:bg-white/10 hover:text-white"
                      >
                        <CalendarDays className="mr-2 size-4" />
                        {date ? format(date, 'PPP') : t('booking.selectTourDate')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border-white/10 bg-gray-900 p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        className="bg-transparent text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guide language */}
                <div>
                  <Label className="mb-3 text-white/60">
                    {t('booking.guideLanguage')}
                  </Label>
                  <RadioGroup
                    value={guideLanguage}
                    onValueChange={(val) =>
                      setGuideLanguage(val as 'armenian' | 'english-russian')
                    }
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    <div
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        guideLanguage === 'armenian'
                          ? 'border-amber-500/50 bg-amber-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <RadioGroupItem value="armenian" id="armenian" />
                      <Label htmlFor="armenian" className="cursor-pointer flex-1">
                        <p className="font-medium text-white">
                          {t('booking.armenianSpeaker')}
                        </p>
                        <p className="text-sm text-white/50">
                          {formatPrice(convertAMDtoEUR(tour.priceAMD))} / {t('tours.perPerson')}
                        </p>
                      </Label>
                    </div>
                    <div
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        guideLanguage === 'english-russian'
                          ? 'border-amber-500/50 bg-amber-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <RadioGroupItem value="english-russian" id="english-russian" />
                      <Label htmlFor="english-russian" className="cursor-pointer flex-1">
                        <p className="font-medium text-white">
                          {t('booking.englishRussianSpeaker')}
                        </p>
                        <p className="text-sm text-white/50">
                          {formatPrice(convertAMDtoEUR(tour.priceForeignAMD))} / {t('tours.perPerson')}
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Adults / Children */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 text-white/60">
                      {t('booking.adults')}
                    </Label>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="flex-1 text-center font-semibold text-white">
                        {adults}
                      </span>
                      <button
                        onClick={() => setAdults(Math.min(20, adults + 1))}
                        className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 text-white/60">
                      {t('booking.children')}
                      <span className="ml-1 text-xs text-white/30">(-50%)</span>
                    </Label>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="flex-1 text-center font-semibold text-white">
                        {children}
                      </span>
                      <button
                        onClick={() => setChildren(Math.min(10, children + 1))}
                        className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400">
                    {t('booking.priceBreakdown')}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">
                        {adults} x {t('booking.adults')} ({formatPrice(convertAMDtoEUR(pricePerPersonAMD))})
                      </span>
                      <span className="text-white">
                        {formatPrice(convertAMDtoEUR(pricePerPersonAMD * adults))}
                      </span>
                    </div>
                    {children > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">
                          {children} x {t('booking.children')} (50%)
                        </span>
                        <span className="text-white">
                          {formatPrice(convertAMDtoEUR(Math.round(pricePerPersonAMD * 0.5 * children)))}
                        </span>
                      </div>
                    )}
                    <Separator className="bg-white/10" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">
                        {t('booking.total')}
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-amber-400">
                          {formatPrice(totalPriceEUR)}
                        </p>
                        <p className="text-xs text-white/40">
                          {totalPriceAMD.toLocaleString()} AMD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proceed button */}
                <Button
                  onClick={handleProceed}
                  disabled={!date}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/25 disabled:opacity-50"
                  size="lg"
                >
                  {t('booking.proceed')}
                  <ChevronRight className="ml-1 size-4" />
                </Button>

                {/* Book privately link */}
                <p className="text-center text-xs text-white/30">
                  Want a private tour?{' '}
                  <button className="text-amber-400 underline underline-offset-2 transition-colors hover:text-amber-300">
                    Book Privately
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
