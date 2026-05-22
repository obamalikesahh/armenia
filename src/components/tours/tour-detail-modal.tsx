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
import { Switch } from '@/components/ui/switch'
import {
  type Tour,
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

const PRIVATE_GUIDE_SURCHARGES: Record<string, number> = {
  none: 0,
  armenian: 20,
  english: 30,
  russian: 30,
  german: 40,
  french: 40,
  spanish: 40,
  italian: 40,
  arabic: 50,
  chinese: 50,
  hindi: 50,
}

const GUIDE_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    none: 'No Guide (Driver only)',
    armenian: 'Armenian Guide',
    english: 'English Guide',
    russian: 'Russian Guide',
    german: 'German Guide',
    french: 'French Guide',
    spanish: 'Spanish Guide',
    italian: 'Italian Guide',
    arabic: 'Arabic Guide',
    chinese: 'Chinese Guide',
    hindi: 'Hindi Guide',
  },
  de: {
    none: 'Ohne Guide (Nur Fahrer)',
    armenian: 'Armenischsprachiger Guide',
    english: 'Englischsprachiger Guide',
    russian: 'Russischsprachiger Guide',
    german: 'Deutschsprachiger Guide',
    french: 'Französischsprachiger Guide',
    spanish: 'Spanischsprachiger Guide',
    italian: 'Italienischsprachiger Guide',
    arabic: 'Arabischsprachiger Guide',
    chinese: 'Chinesischsprachiger Guide',
    hindi: 'Hindi-sprechender Guide',
  },
  ru: {
    none: 'Без гида (Только водитель)',
    armenian: 'Армянский гид',
    english: 'Английский гид',
    russian: 'Русский гид',
    german: 'Немецкий гид',
    french: 'Французский гид',
    spanish: 'Испанский гид',
    italian: 'Итальянский гид',
    arabic: 'Арабский гид',
    chinese: 'Китайский гид',
    hindi: 'Гид на хинди',
  }
}

const BREAKDOWN_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    baseTour: 'Base Private Tour (Sedan, No Guide)',
    vehicleUpgrade: 'Vehicle Upgrade',
    guide: 'Guide',
  },
  de: {
    baseTour: 'Private Basistour (Limousine, ohne Guide)',
    vehicleUpgrade: 'Fahrzeug-Upgrade',
    guide: 'Guide',
  },
  ru: {
    baseTour: 'Индивидуальный базовый тур (Седан, без гида)',
    vehicleUpgrade: 'Повышение класса автомобиля',
    guide: 'Гид',
  }
}


interface TourDetailModalProps {
  tour: Tour | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onReserve?: (tour: Tour, bookingData: BookingData) => void
  isLoggedIn?: boolean
  onLoginClick?: () => void
  isPrivate?: boolean
}

export interface BookingData {
  date: Date | undefined
  guideLanguage: string
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
  isPrivate = false,
}: TourDetailModalProps) {
  const { locale, t } = useLocale()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guideLanguage, setGuideLanguage] = useState<'armenian' | 'english-russian'>('armenian')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [vehicleType, setVehicleType] = useState<'sedan' | 'minivan' | 'minibus' | 'bus'>('sedan')
  const [privateGuideLanguage, setPrivateGuideLanguage] = useState<'none' | 'armenian' | 'english' | 'russian' | 'german' | 'french' | 'spanish' | 'italian' | 'arabic' | 'chinese' | 'hindi'>('none')
  const [privatePassengers, setPrivatePassengers] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHoveringGallery, setIsHoveringGallery] = useState(false)
  const [activeTab, setActiveTab] = useState<ModalTab>('details')
  const [selectedLocationIdx, setSelectedLocationIdx] = useState(0)
  const [availability, setAvailability] = useState<{ maxSeats: number; reservedSeats: number; availableSeats: number } | null>(null)
  const [reservationStatus, setReservationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [reservationError, setReservationError] = useState('')
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevTourIdRef = useRef<number | undefined>(undefined)

  const maxVehicleCapacity = useMemo(() => {
    switch (vehicleType) {
      case 'sedan': return 3
      case 'minivan': return 6
      case 'minibus': return 18
      case 'bus': return 50
    }
  }, [vehicleType])

  useEffect(() => {
    if (isPrivate) {
      const total = adults + children + infants
      if (total > maxVehicleCapacity) {
        let rem = total - maxVehicleCapacity
        let newChildren = children
        let newInfants = infants
        let newAdults = adults
        
        if (rem > 0 && newChildren > 0) {
          const diff = Math.min(rem, newChildren)
          newChildren -= diff
          rem -= diff
        }
        if (rem > 0 && newInfants > 0) {
          const diff = Math.min(rem, newInfants)
          newInfants -= diff
          rem -= diff
        }
        if (rem > 0) {
          newAdults = Math.max(1, newAdults - rem)
        }
        
        setChildren(newChildren)
        setInfants(newInfants)
        setAdults(newAdults)
      }
    }
  }, [isPrivate, maxVehicleCapacity, adults, children, infants])

  // Helpers to check tour names for scheduling rule tags
  const isTatev = useMemo(() => {
    if (!tour) return false
    const nameLower = (tour.name.en + ' ' + tour.name.de + ' ' + tour.name.ru).toLowerCase()
    return nameLower.includes('tatev')
  }, [tour])

  const isJermukEtc = useMemo(() => {
    if (!tour) return false
    const nameLower = (tour.name.en + ' ' + tour.name.de + ' ' + tour.name.ru).toLowerCase()
    return nameLower.includes('jermuk') ||
           nameLower.includes('garni') ||
           nameLower.includes('geghard') ||
           nameLower.includes('dilijan')
  }, [tour])

  // Custom calendar date disable logic
  const isDateDisabled = useCallback((d: Date) => {
    // 1. Past dates are always disabled
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (d < today) return true

    // 2. Tatev tour: any day except Monday (index 1)
    if (isTatev) {
      return d.getDay() === 1
    }

    // 3. Jermuk, Garni, Geghard, Dilijan: any day
    if (isJermukEtc) {
      return false
    }

    // 4. All other tours: any day if private, Saturday/Sunday only if group
    if (isPrivate) {
      return false
    } else {
      return d.getDay() !== 0 && d.getDay() !== 6
    }
  }, [isTatev, isJermukEtc, isPrivate])

  // Invalidate selected date if rules change and it is no longer allowed
  useEffect(() => {
    if (date && isDateDisabled(date)) {
      setDate(undefined)
    }
  }, [isPrivate, date, isDateDisabled])

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

  const pricePerPersonEUR = useMemo(() => {
    if (!tour) return 0
    return guideLanguage === 'armenian' ? tour.priceEUR : tour.priceForeignEUR
  }, [tour, guideLanguage])

  const totalPriceEUR = useMemo(() => {
    if (!tour) return 0
    if (isPrivate) {
      const basePrivatePrice = tour.privateBasePriceEUR || Math.max(40, Math.round(tour.priceEUR * 3))
      
      let vehicleMultiplier = 1.0
      if (vehicleType === 'minivan') vehicleMultiplier = 1.4
      else if (vehicleType === 'minibus') vehicleMultiplier = 2.2
      else if (vehicleType === 'bus') vehicleMultiplier = 3.8

      const guideFee = PRIVATE_GUIDE_SURCHARGES[privateGuideLanguage] || 0

      return Math.round(basePrivatePrice * vehicleMultiplier + guideFee)
    } else {
      const adultPrice = pricePerPersonEUR * adults
      const childPrice = pricePerPersonEUR * 0.5 * children
      return Math.round(adultPrice + childPrice)
    }
  }, [isPrivate, tour, vehicleType, privateGuideLanguage, pricePerPersonEUR, adults, children])

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

  const totalPeople = adults + children + infants
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
    setInfants(0)
    setVehicleType('sedan')
    setPrivateGuideLanguage('none')
    setPrivatePassengers(1)
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

  const getGuideLabel = useCallback((guideKey: string) => {
    const labels = GUIDE_TRANSLATIONS[locale] || GUIDE_TRANSLATIONS.en
    const name = labels[guideKey] || guideKey
    const charge = PRIVATE_GUIDE_SURCHARGES[guideKey] || 0
    return charge > 0 ? `${name} (+€${charge})` : name
  }, [locale])

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
      let userId: string | undefined
      try {
        const userInfo = localStorage.getItem('user_info')
        if (userInfo) {
          const parsed = JSON.parse(userInfo)
          userId = parsed.id
        }
      } catch { /* ignore */ }
      
      const getPrivateSuffix = () => {
        const vehicleLabel = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)
        const guideLabel = privateGuideLanguage === 'none' 
          ? 'No Guide' 
          : privateGuideLanguage.charAt(0).toUpperCase() + privateGuideLanguage.slice(1) + ' Guide'
        return ` (Private Tour: ${vehicleLabel}, ${guideLabel})`
      }
      const tourNamePayload = isPrivate ? `${tour.name.en}${getPrivateSuffix()}` : tour.name.en

      const guideLanguagePayload = isPrivate 
        ? (privateGuideLanguage === 'none' ? 'No Guide (Driver only)' : `${privateGuideLanguage.charAt(0).toUpperCase() + privateGuideLanguage.slice(1)} (Private)`)
        : guideLanguage

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          tourId: String(tour.id),
          tourName: tourNamePayload,
          tourDate: date.toISOString().split('T')[0],
          guideLanguage: guideLanguagePayload,
          adults,
          children,
          totalPriceEUR,
          userId,
          lang: locale,
          isPrivate,
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
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-md">
          <DialogTitle className="sr-only">Reservation Confirmed</DialogTitle>
          <DialogDescription className="sr-only">Your tour reservation has been confirmed</DialogDescription>
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10"
            >
              <Check className="size-10 text-primary" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">{t('booking.reservationConfirmed')}</h2>
            <p className="mb-6 text-sm text-muted-foreground">{t('booking.confirmationEmailSent')}</p>
            
            <div className="mb-6 w-full rounded-xl border border-primary/15 bg-primary/5 p-4">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Ticket className="size-5 text-primary" />
                <span className="text-sm font-semibold text-primary">{t('booking.discountCode')}</span>
              </div>
              <p className="text-center text-3xl font-bold tracking-widest text-primary">Armen5</p>
              <p className="mt-1 text-center text-xs text-foreground/30">{t('booking.discountDescription')}</p>
            </div>

            <p className="mb-6 text-xs text-foreground/25">{t('booking.payInPersonNotice')}</p>

            <Button
              onClick={() => handleClose(false)}
              className="bg-primary text-primary-foreground font-medium hover:bg-primary/80 rounded-full px-8"
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
        className="max-h-[90vh] overflow-y-auto border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-2xl lg:max-w-3xl"
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

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={goToPrev}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHoveringGallery ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/50 text-foreground/70 backdrop-blur-md transition-colors hover:bg-background/70 hover:border-foreground/15 hover:text-white"
                      aria-label={t('common.back')}
                    >
                      <ChevronLeft className="size-5" />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHoveringGallery ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/50 text-foreground/70 backdrop-blur-md transition-colors hover:bg-background/70 hover:border-foreground/15 hover:text-white"
                      aria-label={t('common.next')}
                    >
                      <ChevronRight className="size-5" />
                    </motion.button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur-md">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}

                {tour.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="border-0 bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm">
                      <Star className="mr-1 size-3 fill-current" />
                      {t('tours.featured')}
                    </Badge>
                  </div>
                )}

                <div className="absolute right-0 bottom-0 left-0 z-10 p-6">
                  <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{name}</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="border-border bg-secondary text-foreground/70 backdrop-blur-sm">
                      <Clock className="mr-1 size-3" />
                      {durationLabel}
                    </Badge>
                    <Badge variant="secondary" className="border-border bg-secondary text-foreground/70 backdrop-blur-sm">
                      <MapPin className="mr-1 size-3" />
                      {getRegionTranslation(tour.region)}
                    </Badge>
                    <Badge variant="secondary" className="border-border bg-secondary text-foreground/70 backdrop-blur-sm">
                      <Users className="mr-1 size-3" />
                      {tour.groupSize}
                    </Badge>
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 bg-background/80 px-4 py-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`relative shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
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
            <div className="border-b border-border px-6">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground/60'
                    }`}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-px bg-primary"
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
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{description}</p>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      {tour.included.length > 0 && (
                        <div>
                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/30">
                            {t('tours.included')}
                          </h3>
                          <ul className="space-y-2">
                            {tour.included.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 size-4 shrink-0 text-primary/70" />
                                <span className="text-foreground/50">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tour.excluded.length > 0 && (
                        <div>
                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/30">
                            {t('tours.excluded')}
                          </h3>
                          <ul className="space-y-2">
                            {tour.excluded.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <X className="mt-0.5 size-4 shrink-0 text-red-400/60" />
                                <span className="text-foreground/50">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-secondary p-4">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/30">
                          <CalendarDays className="size-4" />
                          {t('tours.availableDays')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tour.availableDays.map((day) => (
                            <Badge key={day} variant="outline" className="border-border text-foreground/50">
                              {getDayTranslation(day)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-border bg-secondary p-4">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/30">
                          <Info className="size-4" />
                          {t('tours.bestPeriod')}
                        </h4>
                        <p className="text-sm text-foreground/50">{tour.bestPeriod}</p>
                        <p className="mt-1 text-xs text-foreground/30">
                          {t('tours.startEndPoint')}: {tour.startEndPoint}
                        </p>
                        <p className="text-xs text-foreground/30">
                          {tour.startTime} - {tour.endTime}
                        </p>
                      </div>
                    </div>

                    <Separator className="mb-6 bg-secondary" />

                    {/* Reservation section */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {t('booking.reserveTitle')}
                        </h3>
                        <Badge className="border-primary/20 bg-primary/8 text-primary">
                          <Shield className="mr-1 size-3" />
                          {t('booking.payAtOffice')}
                        </Badge>
                      </div>

                      {/* Date picker */}
                      <div>
                        <Label className="mb-2 text-muted-foreground">
                          {t('booking.selectDate')}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start border-border bg-secondary text-left text-foreground/50 hover:bg-secondary hover:text-foreground/70"
                            >
                              <CalendarDays className="mr-2 size-4" />
                              {date ? format(date, 'PPP') : t('booking.selectTourDate')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto border-border bg-[#111] p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={isDateDisabled}
                              className="bg-transparent text-foreground"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Availability display */}
                      {date && availability && (
                        <div className={`flex items-center gap-3 rounded-xl border p-3 ${
                          hasEnoughSeats
                            ? 'border-border bg-secondary'
                            : 'border-red-500/20 bg-red-500/5'
                        }`}>
                          <Users className={`size-5 ${hasEnoughSeats ? 'text-foreground/30' : 'text-red-400/60'}`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${hasEnoughSeats ? 'text-foreground/60' : 'text-red-400'}`}>
                              {hasEnoughSeats
                                ? t('booking.seatsAvailable').replace('{count}', String(availability.availableSeats))
                                : t('booking.notEnoughSeats')}
                            </p>
                            <p className="text-xs text-foreground/25">
                              {availability.reservedSeats}/{availability.maxSeats} {t('booking.seatsReserved')}
                            </p>
                          </div>
                        </div>
                      )}

                      {isPrivate ? (
                        <>
                          {/* Vehicle Selection Grid */}
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">
                              {t('booking.vehicleCategory')}
                            </Label>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                              {[
                                { id: 'sedan', label: 'Sedan', seats: '1-3', base: 'Base' },
                                { id: 'minivan', label: 'Minivan', seats: '4-6', base: '+40%' },
                                { id: 'minibus', label: 'Minibus', seats: '7-18', base: '+120%' },
                                { id: 'bus', label: 'Bus', seats: '19+', base: '+280%' }
                              ].map((v) => (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() => setVehicleType(v.id as any)}
                                  className={`flex flex-col items-center justify-center rounded-xl border p-3.5 transition-all text-center ${
                                    vehicleType === v.id
                                      ? 'border-primary/40 bg-primary/8 text-foreground'
                                      : 'border-border bg-secondary hover:border-border hover:bg-white/[0.02] text-muted-foreground'
                                  }`}
                                >
                                  <span className="text-sm font-bold block">{v.label}</span>
                                  <span className="text-[10px] text-foreground/40 mt-1 block">{v.seats} seats</span>
                                  <span className="text-[9px] text-primary/70 font-semibold mt-0.5 block">{v.base}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Guide Language Select Dropdown */}
                          <div>
                            <Label className="mb-2 text-muted-foreground block">
                              {t('booking.guideLanguage')}
                            </Label>
                            <select
                              value={privateGuideLanguage}
                              onChange={(e) => setPrivateGuideLanguage(e.target.value as any)}
                              className="w-full rounded-xl border border-border bg-secondary dark:bg-zinc-900 p-3 text-sm text-foreground/80 dark:text-white focus:border-primary/30 focus:outline-none"
                            >
                              {['none', 'armenian', 'english', 'russian', 'german', 'french', 'spanish', 'italian', 'arabic', 'chinese', 'hindi'].map((key) => (
                                <option key={key} className="bg-white dark:bg-zinc-950 text-black dark:text-white" value={key}>
                                  {getGuideLabel(key)}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Tripartite Passenger Counters for Private Tour */}
                          <div>
                            <Label className="mb-2 text-muted-foreground flex justify-between items-center">
                              <span>{t('booking.passengers')}</span>
                              <span className="text-xs text-foreground/30">max {maxVehicleCapacity}</span>
                            </Label>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              {/* Adults */}
                              <div>
                                <Label className="mb-2 text-muted-foreground flex flex-col gap-0.5">
                                  <span className="text-xs font-semibold">{t('booking.adults')}</span>
                                  <span className="text-[10px] text-foreground/30 font-normal">{t('booking.adultsBracket')}</span>
                                </Label>
                                <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                    <Minus className="size-4" />
                                  </button>
                                  <span className="flex-1 text-center font-semibold text-foreground">{adults}</span>
                                  <button type="button" onClick={() => setAdults(adults + 1)} disabled={adults + children + infants >= maxVehicleCapacity} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60 disabled:opacity-30">
                                    <Plus className="size-4" />
                                  </button>
                                </div>
                              </div>
                              {/* Children */}
                              <div>
                                <Label className="mb-2 text-muted-foreground flex flex-col gap-0.5">
                                  <span className="text-xs font-semibold">{t('booking.children')}</span>
                                  <span className="text-[10px] text-primary/60 font-medium">{t('booking.childrenBracket')}</span>
                                </Label>
                                <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                                  <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                    <Minus className="size-4" />
                                  </button>
                                  <span className="flex-1 text-center font-semibold text-foreground">{children}</span>
                                  <button type="button" onClick={() => setChildren(children + 1)} disabled={adults + children + infants >= maxVehicleCapacity} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60 disabled:opacity-30">
                                    <Plus className="size-4" />
                                  </button>
                                </div>
                              </div>
                              {/* Infants */}
                              <div>
                                <Label className="mb-2 text-muted-foreground flex flex-col gap-0.5">
                                  <span className="text-xs font-semibold">{t('booking.infants')}</span>
                                  <span className="text-[10px] text-green-400/60 font-medium">{t('booking.infantsBracket')}</span>
                                </Label>
                                <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                                  <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                    <Minus className="size-4" />
                                  </button>
                                  <span className="flex-1 text-center font-semibold text-foreground">{infants}</span>
                                  <button type="button" onClick={() => setInfants(infants + 1)} disabled={adults + children + infants >= maxVehicleCapacity} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60 disabled:opacity-30">
                                    <Plus className="size-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Guide language */}
                          <div>
                            <Label className="mb-3 text-muted-foreground">
                              {t('booking.guideLanguage')}
                            </Label>
                            <RadioGroup
                              value={guideLanguage}
                              onValueChange={(val) => setGuideLanguage(val as 'armenian' | 'english-russian')}
                              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                            >
                              <div className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                                guideLanguage === 'armenian'
                                  ? 'border-primary/30 bg-primary/8'
                                  : 'border-border bg-secondary hover:border-border'
                              }`}>
                                <RadioGroupItem value="armenian" id="armenian" />
                                <Label htmlFor="armenian" className="cursor-pointer flex-1">
                                  <p className="font-medium text-foreground">{t('booking.armenianSpeaker')}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatPrice(tour.priceEUR)} / {t('tours.perPerson')}
                                  </p>
                                </Label>
                              </div>
                              <div className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                                guideLanguage === 'english-russian'
                                  ? 'border-primary/30 bg-primary/8'
                                  : 'border-border bg-secondary hover:border-border'
                              }`}>
                                <RadioGroupItem value="english-russian" id="english-russian" />
                                <Label htmlFor="english-russian" className="cursor-pointer flex-1">
                                  <p className="font-medium text-foreground">{t('booking.englishRussianSpeaker')}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatPrice(tour.priceForeignEUR)} / {t('tours.perPerson')}
                                  </p>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Adults / Children / Infants counters */}
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                              <Label className="mb-2 text-muted-foreground flex flex-col gap-0.5">
                                <span className="text-xs font-semibold">{t('booking.adults')}</span>
                                <span className="text-[10px] text-foreground/30 font-normal">{t('booking.adultsBracket')}</span>
                              </Label>
                              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                                <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                  <Minus className="size-4" />
                                </button>
                                <span className="flex-1 text-center font-semibold text-foreground">{adults}</span>
                                <button type="button" onClick={() => setAdults(Math.min(20, adults + 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                  <Plus className="size-4" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <Label className="mb-2 text-muted-foreground flex flex-col gap-0.5">
                                <span className="text-xs font-semibold">{t('booking.children')}</span>
                                <span className="text-[10px] text-primary/60 font-medium">{t('booking.childrenBracket')}</span>
                              </Label>
                              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                                <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                  <Minus className="size-4" />
                                </button>
                                <span className="flex-1 text-center font-semibold text-foreground">{children}</span>
                                <button type="button" onClick={() => setChildren(Math.min(10, children + 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                  <Plus className="size-4" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <Label className="mb-2 text-muted-foreground flex flex-col gap-0.5">
                                <span className="text-xs font-semibold">{t('booking.infants')}</span>
                                <span className="text-[10px] text-green-400/60 font-medium">{t('booking.infantsBracket')}</span>
                              </Label>
                              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
                                <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                  <Minus className="size-4" />
                                </button>
                                <span className="flex-1 text-center font-semibold text-foreground">{infants}</span>
                                <button type="button" onClick={() => setInfants(Math.min(10, infants + 1))} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60">
                                  <Plus className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Price breakdown */}
                      <div className="rounded-xl border border-primary/15 bg-primary/3 p-4">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary/70">
                          {t('booking.priceBreakdown')}
                        </h4>
                        <div className="space-y-2">
                          {isPrivate ? (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {(BREAKDOWN_TRANSLATIONS[locale] || BREAKDOWN_TRANSLATIONS.en).baseTour}
                                </span>
                                <span className="text-foreground/70">
                                  {formatPrice(tour.privateBasePriceEUR || Math.max(40, Math.round(tour.priceEUR * 3)))}
                                </span>
                              </div>
                              {vehicleType !== 'sedan' && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {(BREAKDOWN_TRANSLATIONS[locale] || BREAKDOWN_TRANSLATIONS.en).vehicleUpgrade} ({vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)})
                                  </span>
                                  <span className="text-foreground/70">
                                    + {vehicleType === 'minivan' ? '40%' : vehicleType === 'minibus' ? '120%' : '280%'}
                                  </span>
                                </div>
                              )}
                              {privateGuideLanguage !== 'none' && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {(BREAKDOWN_TRANSLATIONS[locale] || BREAKDOWN_TRANSLATIONS.en).guide}: {(GUIDE_TRANSLATIONS[locale] || GUIDE_TRANSLATIONS.en)[privateGuideLanguage]}
                                  </span>
                                  <span className="text-foreground/70">
                                    + {formatPrice(PRIVATE_GUIDE_SURCHARGES[privateGuideLanguage] || 0)}
                                  </span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {adults} {t('booking.adults')}{children > 0 ? ` + ${children} ${t('booking.children')}` : ''}{infants > 0 ? ` + ${infants} ${t('booking.infants')}` : ''}
                                </span>
                                <span className="text-foreground/40 text-xs">{t('booking.passengers')}: {adults + children + infants}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {adults} x {t('booking.adults')} ({formatPrice(pricePerPersonEUR)})
                                </span>
                                <span className="text-foreground/70">
                                  {formatPrice(pricePerPersonEUR * adults)}
                                </span>
                              </div>
                              {children > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {children} x {t('booking.children')} ({t('booking.childrenDiscount')})
                                  </span>
                                  <span className="text-foreground/70">
                                    {formatPrice(Math.round(pricePerPersonEUR * 0.5 * children))}
                                  </span>
                                </div>
                              )}
                              {infants > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {infants} x {t('booking.infants')}
                                  </span>
                                  <span className="text-green-400 font-semibold">
                                    {locale === 'de' ? 'Kostenlos' : locale === 'ru' ? 'Бесплатно' : 'Free'}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          <Separator className="bg-secondary" />
                          <div className="flex justify-between">
                            <span className="font-semibold text-foreground">{t('booking.total')}</span>
                            <div className="text-right">
                              <p className="font-bold text-primary">{formatPrice(totalPriceEUR)}</p>
                              <p className="text-xs text-foreground/30">{t('common.eur')}</p>
                            </div>
                          </div>
                        </div>

                        {/* Discount notice */}
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
                          <Ticket className="size-4 shrink-0 text-primary/60" />
                          <p className="text-xs text-primary/60">
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
                        type="button"
                        onClick={handleReserve}
                        disabled={!date || !hasEnoughSeats || reservationStatus === 'loading'}
                        className="w-full bg-primary text-primary-foreground font-medium shadow-lg transition-all duration-300 hover:bg-primary/80 hover:shadow-primary/10 disabled:opacity-50"
                        size="lg"
                      >
                        {reservationStatus === 'loading' ? (
                          <span className="flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-primary-foreground" />
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

                      <p className="text-center text-xs text-foreground/20">
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
                        <h3 className="mb-4 text-lg font-semibold text-foreground">{t('tours.route')}</h3>
                        <div className="relative space-y-0">
                          {tour.route.map((stop, idx) => (
                            <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                              {idx < tour.route.length - 1 && (
                                <div className="absolute top-6 left-[15px] h-full w-px bg-gradient-to-b from-primary/30 to-primary/5" />
                              )}
                              <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-xs font-bold text-primary">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{stop.name}</h4>
                                <p className="mt-0.5 text-sm text-muted-foreground">{stop.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-foreground/30">
                        <Route className="mx-auto mb-3 size-10 text-foreground/10" />
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
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Eye className="size-5 text-primary/70" />
                      {t('tours.tabStreetView')}
                    </h3>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {streetViewLocations.map((location, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedLocationIdx(idx)}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                            selectedLocationIdx === idx
                              ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
                              : 'border border-border bg-secondary text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground/60'
                          }`}
                        >
                          <MapPin className="size-3.5" />
                          {location.name}
                        </button>
                      ))}
                    </div>

                    {selectedLocation && (
                      <div className="overflow-hidden rounded-xl border border-border">
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
                        <div className="flex items-center justify-between gap-2 border-t border-border bg-secondary p-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <MapPin className="size-4 shrink-0 text-primary/70" />
                            <span className="truncate text-sm font-medium text-foreground/60">{selectedLocation.name}</span>
                          </div>
                          <a
                            href={`https://www.google.com/maps/@${selectedLocation.lat},${selectedLocation.lng},15z`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-primary/70 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
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
                                className="group overflow-hidden rounded-xl border border-border bg-secondary transition-all duration-200 hover:border-primary/15 hover:bg-white/[0.04]"
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
                                  <MapPin className="size-3 shrink-0 text-primary/50" />
                                  <span className="truncate text-xs font-medium text-muted-foreground group-hover:text-foreground/55">
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
