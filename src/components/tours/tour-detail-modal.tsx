'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  MapPin,
  Users,
  CalendarDays,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Star,
  Info,
  Eye,
  ExternalLink,
  Route,
  FileText,
  Shield,
  Ticket,
  AlertCircle,
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

const CATEGORY_KEY_MAP: Record<string, string> = {
  Historical: 'categories.historical',
  Nature: 'categories.nature',
  Adventure: 'categories.adventure',
  Cultural: 'categories.cultural',
  Wine: 'categories.wine',
  'Multi-day': 'categories.multiDay',
  Wellness: 'categories.wellness',
}

const DAY_KEY_MAP: Record<string, string> = {
  Monday: 'days.monday',
  Tuesday: 'days.tuesday',
  Wednesday: 'days.wednesday',
  Thursday: 'days.thursday',
  Friday: 'days.friday',
  Saturday: 'days.saturday',
  Sunday: 'days.sunday',
}

interface TourDetailModalProps {
  tour: Tour | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onReserve?: (tour: Tour, bookingData: BookingData) => void
  isLoggedIn?: boolean
  onLoginClick?: () => void
}

export interface BookingData {
  date: Date | undefined
  guideLanguage: 'armenian' | 'english-russian'
  adults: number
  children: number
}

type ModalTab = 'details' | 'route' | 'streetview'

export function TourDetailModal({
  tour,
  open,
  onOpenChange,
  onReserve,
  isLoggedIn = false,
  onLoginClick,
}: TourDetailModalProps) {
  const { locale, t } = useLocale()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guideLanguage, setGuideLanguage] = useState<'armenian' | 'english-russian'>('armenian')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHoveringGallery, setIsHoveringGallery] = useState(false)
  const [activeTab, setActiveTab] = useState<ModalTab>('details')
  const [selectedLocationIdx, setSelectedLocationIdx] = useState(0)
  const [availability, setAvailability] = useState<{ maxSeats: number; reservedSeats: number; availableSeats: number } | null>(null)
  const [reservationStatus, setReservationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [reservationError, setReservationError] = useState('')
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevTourIdRef = useRef<number | undefined>(undefined)

  const images = tour?.images?.length ? tour.images : tour?.image ? [tour.image] : []

  // Reset image index when tour changes
  if (tour?.id !== prevTourIdRef.current) {
    prevTourIdRef.current = tour?.id
    if (currentImageIndex !== 0) {
      setCurrentImageIndex(0)
    }
  }

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
      case 'half day': return t('tours.halfDay')
      case 'full day': return t('tours.fullDay')
      default: return tour.duration.includes('day') ? t('tours.multiDay') : tour.duration
    }
  }, [tour, t])

  const getRegionTranslation = useCallback((region: string) => {
    const key = REGION_KEY_MAP[region]
    return key ? t(key) : region
  }, [t])

  const getCategoryTranslation = useCallback((category: string) => {
    const key = CATEGORY_KEY_MAP[category]
    return key ? t(key) : category
  }, [t])

  const getDayTranslation = useCallback((day: string) => {
    const key = DAY_KEY_MAP[day]
    return key ? t(key) : day
  }, [t])

  const streetViewLocations = useMemo(() => {
    if (!tour?.streetViewLocations) return []
    return tour.streetViewLocations.slice(0, 6)
  }, [tour])

  const selectedLocation = streetViewLocations[selectedLocationIdx] || null

  // Fetch availability when date changes
  useEffect(() => {
    if (!tour || !date) { setAvailability(null); return }
    const dateStr = date.toISOString().split('T')[0]
    fetch(`/api/availability?tourId=${tour.id}&date=${dateStr}`)
      .then(r => r.json())
      .then(data => { if (data.availableSeats !== undefined) setAvailability(data) })
      .catch(() => setAvailability(null))
  }, [tour, date])

  const totalPeople = adults + children
  const hasEnoughSeats = availability ? availability.availableSeats >= totalPeople : true

  // Auto-advance gallery
  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current)
    autoAdvanceRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
  }, [images.length])

  const stopAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current)
      autoAdvanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (open && images.length > 1) startAutoAdvance()
    return () => stopAutoAdvance()
  }, [open, images.length, startAutoAdvance, stopAutoAdvance])

  const goToImage = useCallback(
    (index: number) => {
      setCurrentImageIndex(index)
      if (images.length > 1) startAutoAdvance()
    },
    [images.length, startAutoAdvance]
  )

  const goToPrev = useCallback(() => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    goToImage(newIndex)
  }, [currentImageIndex, images.length, goToImage])

  const goToNext = useCallback(() => {
    const newIndex = (currentImageIndex + 1) % images.length
    goToImage(newIndex)
  }, [currentImageIndex, images.length, goToImage])

  const resetState = useCallback(() => {
    setDate(undefined)
    setGuideLanguage('armenian')
    setAdults(1)
    setChildren(0)
    setCurrentImageIndex(0)
    setActiveTab('details')
    setSelectedLocationIdx(0)
    setAvailability(null)
    setReservationStatus('idle')
    setReservationError('')
  }, [])

  const handleClose = useCallback((isOpen: boolean) => {
    if (!isOpen) resetState()
    onOpenChange(isOpen)
  }, [resetState, onOpenChange])

  const prevTourIdForResetRef = useRef<number | undefined>(undefined)
  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (isOpen) {
      if (tour?.id !== prevTourIdForResetRef.current) {
        setActiveTab('details')
        setSelectedLocationIdx(0)
      }
      prevTourIdForResetRef.current = tour?.id
    }
    handleClose(isOpen)
  }, [tour?.id, handleClose])

  const handleReserve = async () => {
    if (!tour || !date) return
    if (!isLoggedIn) {
      onLoginClick?.()
      return
    }

    setReservationStatus('loading')
    setReservationError('')

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          tourId: String(tour.id),
          tourName: tour.name.en,
          tourDate: date.toISOString().split('T')[0],
          guideLanguage,
          adults,
          children,
          totalPriceAMD,
          lang: locale,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Reservation failed')
      }

      setReservationStatus('success')
    } catch (err) {
      setReservationStatus('error')
      setReservationError(err instanceof Error ? err.message : 'Reservation failed')
    }
  }

  if (!tour) return null

  const tabs = [
    { id: 'details' as ModalTab, label: t('tours.tabDetails'), icon: FileText },
    { id: 'route' as ModalTab, label: t('tours.tabRoute'), icon: Route },
    ...(streetViewLocations.length > 0
      ? [{ id: 'streetview' as ModalTab, label: t('tours.tabStreetView'), icon: Eye }]
      : []),
  ]

  // Success state
  if (reservationStatus === 'success') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/6 bg-[#0a0a0a]/95 p-0 text-white backdrop-blur-2xl sm:max-w-md">
          <DialogTitle className="sr-only">Reservation Confirmed</DialogTitle>
          <DialogDescription className="sr-only">Your tour reservation has been confirmed</DialogDescription>
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#c9a84c]/10"
            >
              <Check className="size-10 text-[#c9a84c]" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold text-white">{t('booking.reservationConfirmed')}</h2>
            <p className="mb-6 text-sm text-white/40">{t('booking.confirmationEmailSent')}</p>
            
            <div className="mb-6 w-full rounded-xl border border-[#c9a84c]/15 bg-[#c9a84c]/5 p-4">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Ticket className="size-5 text-[#c9a84c]" />
                <span className="text-sm font-semibold text-[#c9a84c]">{t('booking.discountCode')}</span>
              </div>
              <p className="text-center text-3xl font-bold tracking-widest text-[#c9a84c]">Armen5</p>
              <p className="mt-1 text-center text-xs text-white/30">{t('booking.discountDescription')}</p>
            </div>

            <p className="mb-6 text-xs text-white/25">{t('booking.payInPersonNotice')}</p>

            <Button
              onClick={() => handleClose(false)}
              className="bg-[#c9a84c] text-[#0a0a0a] font-medium hover:bg-[#b8973e] rounded-full px-8"
            >
              {t('common.close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-white/6 bg-[#0a0a0a]/95 p-0 text-white backdrop-blur-2xl sm:max-w-2xl lg:max-w-3xl"
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
            {/* Image Gallery */}
            <div
              className="relative flex flex-col"
              onMouseEnter={() => setIsHoveringGallery(true)}
              onMouseLeave={() => setIsHoveringGallery(false)}
            >
              <div className="relative h-[350px] overflow-hidden sm:h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <img
                      src={images[currentImageIndex]}
                      alt={`${name} - ${currentImageIndex + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={goToPrev}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHoveringGallery ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/8 bg-[#0a0a0a]/50 text-white/70 backdrop-blur-md transition-colors hover:bg-[#0a0a0a]/70 hover:border-white/15 hover:text-white"
                      aria-label={t('common.back')}
                    >
                      <ChevronLeft className="size-5" />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHoveringGallery ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/8 bg-[#0a0a0a]/50 text-white/70 backdrop-blur-md transition-colors hover:bg-[#0a0a0a]/70 hover:border-white/15 hover:text-white"
                      aria-label={t('common.next')}
                    >
                      <ChevronRight className="size-5" />
                    </motion.button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="rounded-full border border-white/8 bg-[#0a0a0a]/50 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-md">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}

                {tour.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="border-0 bg-[#c9a84c]/90 text-[#0a0a0a] shadow-lg backdrop-blur-sm">
                      <Star className="mr-1 size-3 fill-current" />
                      {t('tours.featured')}
                    </Badge>
                  </div>
                )}

                <div className="absolute right-0 bottom-0 left-0 z-10 p-6">
                  <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{name}</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="border-white/6 bg-white/5 text-white/70 backdrop-blur-sm">
                      <Clock className="mr-1 size-3" />
                      {durationLabel}
                    </Badge>
                    <Badge variant="secondary" className="border-white/6 bg-white/5 text-white/70 backdrop-blur-sm">
                      <MapPin className="mr-1 size-3" />
                      {getRegionTranslation(tour.region)}
                    </Badge>
                    <Badge variant="secondary" className="border-white/6 bg-white/5 text-white/70 backdrop-blur-sm">
                      <Users className="mr-1 size-3" />
                      {tour.groupSize}
                    </Badge>
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 bg-[#0a0a0a]/80 px-4 py-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`relative shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'ring-2 ring-[#c9a84c] ring-offset-1 ring-offset-[#0a0a0a]'
                          : 'ring-1 ring-white/6 opacity-50 hover:opacity-80'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${name} thumbnail ${idx + 1}`}
                        className="h-14 w-20 object-cover sm:h-16 sm:w-24"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-white/6 px-6">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-[#c9a84c]'
                        : 'text-white/35 hover:text-white/60'
                    }`}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a84c]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-6 text-sm leading-relaxed text-white/45">{description}</p>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      {tour.included.length > 0 && (
                        <div>
                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/30">
                            {t('tours.included')}
                          </h3>
                          <ul className="space-y-2">
                            {tour.included.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 size-4 shrink-0 text-[#c9a84c]/70" />
                                <span className="text-white/50">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tour.excluded.length > 0 && (
                        <div>
                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/30">
                            {t('tours.excluded')}
                          </h3>
                          <ul className="space-y-2">
                            {tour.excluded.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <X className="mt-0.5 size-4 shrink-0 text-red-400/60" />
                                <span className="text-white/50">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/6 bg-white/3 p-4">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/30">
                          <CalendarDays className="size-4" />
                          {t('tours.availableDays')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tour.availableDays.map((day) => (
                            <Badge key={day} variant="outline" className="border-white/6 text-white/50">
                              {getDayTranslation(day)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/6 bg-white/3 p-4">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/30">
                          <Info className="size-4" />
                          {t('tours.bestPeriod')}
                        </h4>
                        <p className="text-sm text-white/50">{tour.bestPeriod}</p>
                        <p className="mt-1 text-xs text-white/30">
                          {t('tours.startEndPoint')}: {tour.startEndPoint}
                        </p>
                        <p className="text-xs text-white/30">
                          {tour.startTime} - {tour.endTime}
                        </p>
                      </div>
                    </div>

                    <Separator className="mb-6 bg-white/6" />

                    {/* Reservation section */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          {t('booking.reserveTitle')}
                        </h3>
                        <Badge className="border-[#c9a84c]/20 bg-[#c9a84c]/8 text-[#c9a84c]">
                          <Shield className="mr-1 size-3" />
                          {t('booking.payAtOffice')}
                        </Badge>
                      </div>

                      {/* Date picker */}
                      <div>
                        <Label className="mb-2 text-white/45">
                          {t('booking.selectDate')}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start border-white/6 bg-white/3 text-left text-white/50 hover:bg-white/5 hover:text-white/70"
                            >
                              <CalendarDays className="mr-2 size-4" />
                              {date ? format(date, 'PPP') : t('booking.selectTourDate')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto border-white/6 bg-[#111] p-0">
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

                      {/* Availability display */}
                      {date && availability && (
                        <div className={`flex items-center gap-3 rounded-xl border p-3 ${
                          hasEnoughSeats
                            ? 'border-white/6 bg-white/3'
                            : 'border-red-500/20 bg-red-500/5'
                        }`}>
                          <Users className={`size-5 ${hasEnoughSeats ? 'text-white/30' : 'text-red-400/60'}`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${hasEnoughSeats ? 'text-white/60' : 'text-red-400'}`}>
                              {hasEnoughSeats
                                ? t('booking.seatsAvailable').replace('{count}', String(availability.availableSeats))
                                : t('booking.notEnoughSeats')}
                            </p>
                            <p className="text-xs text-white/25">
                              {availability.reservedSeats}/{availability.maxSeats} {t('booking.seatsReserved')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Guide language */}
                      <div>
                        <Label className="mb-3 text-white/45">
                          {t('booking.guideLanguage')}
                        </Label>
                        <RadioGroup
                          value={guideLanguage}
                          onValueChange={(val) => setGuideLanguage(val as 'armenian' | 'english-russian')}
                          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                        >
                          <div className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                            guideLanguage === 'armenian'
                              ? 'border-[#c9a84c]/30 bg-[#c9a84c]/8'
                              : 'border-white/6 bg-white/3 hover:border-white/10'
                          }`}>
                            <RadioGroupItem value="armenian" id="armenian" />
                            <Label htmlFor="armenian" className="cursor-pointer flex-1">
                              <p className="font-medium text-white">{t('booking.armenianSpeaker')}</p>
                              <p className="text-sm text-white/35">
                                {formatPrice(convertAMDtoEUR(tour.priceAMD))} / {t('tours.perPerson')}
                              </p>
                            </Label>
                          </div>
                          <div className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                            guideLanguage === 'english-russian'
                              ? 'border-[#c9a84c]/30 bg-[#c9a84c]/8'
                              : 'border-white/6 bg-white/3 hover:border-white/10'
                          }`}>
                            <RadioGroupItem value="english-russian" id="english-russian" />
                            <Label htmlFor="english-russian" className="cursor-pointer flex-1">
                              <p className="font-medium text-white">{t('booking.englishRussianSpeaker')}</p>
                              <p className="text-sm text-white/35">
                                {formatPrice(convertAMDtoEUR(tour.priceForeignAMD))} / {t('tours.perPerson')}
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Adults / Children */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-2 text-white/45">{t('booking.adults')}</Label>
                          <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-2">
                            <button onClick={() => setAdults(Math.max(1, adults - 1))} className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/5 hover:text-white/60">
                              <Minus className="size-4" />
                            </button>
                            <span className="flex-1 text-center font-semibold text-white">{adults}</span>
                            <button onClick={() => setAdults(Math.min(20, adults + 1))} className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/5 hover:text-white/60">
                              <Plus className="size-4" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <Label className="mb-2 text-white/45">
                            {t('booking.children')}
                            <span className="ml-1 text-xs text-white/25">({t('booking.childrenDiscount')})</span>
                          </Label>
                          <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-2">
                            <button onClick={() => setChildren(Math.max(0, children - 1))} className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/5 hover:text-white/60">
                              <Minus className="size-4" />
                            </button>
                            <span className="flex-1 text-center font-semibold text-white">{children}</span>
                            <button onClick={() => setChildren(Math.min(10, children + 1))} className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/5 hover:text-white/60">
                              <Plus className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price breakdown */}
                      <div className="rounded-xl border border-[#c9a84c]/15 bg-[#c9a84c]/3 p-4">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#c9a84c]/70">
                          {t('booking.priceBreakdown')}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/45">
                              {adults} x {t('booking.adults')} ({formatPrice(convertAMDtoEUR(pricePerPersonAMD))})
                            </span>
                            <span className="text-white/70">
                              {formatPrice(convertAMDtoEUR(pricePerPersonAMD * adults))}
                            </span>
                          </div>
                          {children > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-white/45">
                                {children} x {t('booking.children')} ({t('booking.childrenDiscount')})
                              </span>
                              <span className="text-white/70">
                                {formatPrice(convertAMDtoEUR(Math.round(pricePerPersonAMD * 0.5 * children)))}
                              </span>
                            </div>
                          )}
                          <Separator className="bg-white/6" />
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{t('booking.total')}</span>
                            <div className="text-right">
                              <p className="font-bold text-[#c9a84c]">{formatPrice(totalPriceEUR)}</p>
                              <p className="text-xs text-white/30">
                                {totalPriceAMD.toLocaleString()} {t('common.amd')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Discount notice */}
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#c9a84c]/5 px-3 py-2">
                          <Ticket className="size-4 shrink-0 text-[#c9a84c]/60" />
                          <p className="text-xs text-[#c9a84c]/60">
                            {t('booking.discountNotice')}
                          </p>
                        </div>
                      </div>

                      {/* Error message */}
                      {reservationStatus === 'error' && (
                        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                          <AlertCircle className="size-4 shrink-0 text-red-400" />
                          <p className="text-sm text-red-400">{reservationError}</p>
                        </div>
                      )}

                      {/* Reserve button */}
                      <Button
                        onClick={handleReserve}
                        disabled={!date || !hasEnoughSeats || reservationStatus === 'loading'}
                        className="w-full bg-[#c9a84c] text-[#0a0a0a] font-medium shadow-lg transition-all duration-300 hover:bg-[#b8973e] hover:shadow-[#c9a84c]/10 disabled:opacity-50"
                        size="lg"
                      >
                        {reservationStatus === 'loading' ? (
                          <span className="flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-[#0a0a0a]" />
                            {t('common.loading')}
                          </span>
                        ) : !isLoggedIn ? (
                          t('booking.loginToReserve')
                        ) : (
                          <>
                            <Shield className="mr-2 size-4" />
                            {t('booking.reserveNow')}
                          </>
                        )}
                        <ChevronRight className="ml-1 size-4" />
                      </Button>

                      <p className="text-center text-xs text-white/20">
                        {t('booking.cancelWithin24h')}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Route Tab */}
                {activeTab === 'route' && (
                  <motion.div
                    key="route"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tour.route.length > 0 ? (
                      <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">{t('tours.route')}</h3>
                        <div className="relative space-y-0">
                          {tour.route.map((stop, idx) => (
                            <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                              {idx < tour.route.length - 1 && (
                                <div className="absolute top-6 left-[15px] h-full w-px bg-gradient-to-b from-[#c9a84c]/30 to-[#c9a84c]/5" />
                              )}
                              <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 text-xs font-bold text-[#c9a84c]">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-white">{stop.name}</h4>
                                <p className="mt-0.5 text-sm text-white/35">{stop.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-white/30">
                        <Route className="mx-auto mb-3 size-10 text-white/10" />
                        <p>{t('tours.noResults')}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Street View Tab */}
                {activeTab === 'streetview' && streetViewLocations.length > 0 && (
                  <motion.div
                    key="streetview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                      <Eye className="size-5 text-[#c9a84c]/70" />
                      {t('tours.tabStreetView')}
                    </h3>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {streetViewLocations.map((location, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedLocationIdx(idx)}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                            selectedLocationIdx === idx
                              ? 'bg-[#c9a84c]/10 text-[#c9a84c] ring-1 ring-[#c9a84c]/20'
                              : 'border border-white/6 bg-white/3 text-white/45 hover:border-white/10 hover:bg-white/5 hover:text-white/60'
                          }`}
                        >
                          <MapPin className="size-3.5" />
                          {location.name}
                        </button>
                      ))}
                    </div>

                    {selectedLocation && (
                      <div className="overflow-hidden rounded-xl border border-white/6">
                        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&t=k&z=16&ie=UTF8&iwloc=&output=embed`}
                            title={`${selectedLocation.name} - Google Maps`}
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 border-t border-white/6 bg-white/3 p-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <MapPin className="size-4 shrink-0 text-[#c9a84c]/70" />
                            <span className="truncate text-sm font-medium text-white/60">{selectedLocation.name}</span>
                          </div>
                          <a
                            href={`https://www.google.com/maps/@${selectedLocation.lat},${selectedLocation.lng},15z`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center gap-1 rounded-lg border border-white/6 bg-white/3 px-3 py-1.5 text-xs font-medium text-[#c9a84c]/70 transition-all duration-200 hover:border-[#c9a84c]/20 hover:bg-[#c9a84c]/5 hover:text-[#c9a84c]"
                          >
                            {t('tours.openInMaps')}
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {streetViewLocations.length > 1 && (
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {streetViewLocations
                          .filter((_, idx) => idx !== selectedLocationIdx)
                          .map((location, idx) => {
                            const originalIdx = streetViewLocations.indexOf(location)
                            return (
                              <button
                                key={idx}
                                onClick={() => setSelectedLocationIdx(originalIdx)}
                                className="group overflow-hidden rounded-xl border border-white/6 bg-white/3 transition-all duration-200 hover:border-[#c9a84c]/15 hover:bg-white/[0.04]"
                              >
                                <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                                  <iframe
                                    src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&t=k&z=14&ie=UTF8&iwloc=&output=embed`}
                                    title={`${location.name} - Google Maps`}
                                    className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-2">
                                  <MapPin className="size-3 shrink-0 text-[#c9a84c]/50" />
                                  <span className="truncate text-xs font-medium text-white/40 group-hover:text-white/55">
                                    {location.name}
                                  </span>
                                </div>
                              </button>
                            )
                          })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
