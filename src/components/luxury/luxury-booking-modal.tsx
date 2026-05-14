'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Crown,
  Hotel,
  Info,
  Minus,
  Plus,
  Shield,
  Star,
  Ticket,
  AlertCircle,
  Users,
} from 'lucide-react'
import { format } from 'date-fns'
import { Bodoni_Moda } from 'next/font/google'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { type LuxuryTour, type LocaleKey, getLocalized } from '@/lib/luxury-tours-data'
import { formatPrice } from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

// ─── Bodoni Moda serif font for luxury headings ───
const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

// ─── Gold palette constants ───
const GOLD = '#D6B36A'
const GOLD_DARK = '#C88A3D'
const GOLD_LIGHT = '#E8D5A3'

type HotelCategory = '4star' | '3star'

interface LuxuryBookingModalProps {
  tour: LuxuryTour | null
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoggedIn?: boolean
  onLoginClick?: () => void
}

export function LuxuryBookingModal({
  tour,
  open,
  onOpenChange,
  isLoggedIn = false,
  onLoginClick,
}: LuxuryBookingModalProps) {
  const { locale, t } = useLocale()
  const localeKey = locale as LocaleKey
  const tourTitle = tour ? getLocalized(tour.titleLocalized, localeKey, tour.title) : ''
  const tourSubtitle = tour ? getLocalized(tour.subtitleLocalized, localeKey, tour.subtitle) : ''
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hotelCategory, setHotelCategory] = useState<HotelCategory>('4star')
  const [persons, setPersons] = useState(2)
  const [singleSupplement, setSingleSupplement] = useState(false)
  const [reservationStatus, setReservationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [reservationError, setReservationError] = useState('')

  // Find the closest pricing tier for a given number of persons
  const pricePerPerson = useMemo(() => {
    if (!tour) return 0

    const tiers = tour.pricing
    // Sort tiers by pax ascending
    const sorted = [...tiers].sort((a, b) => a.pax - b.pax)

    // Find the tier where our persons count fits
    // If persons <= tier.pax, use that tier
    // If persons > max tier, use the largest tier
    let selectedTier = sorted[0]
    for (const tier of sorted) {
      if (persons <= tier.pax) {
        selectedTier = tier
        break
      }
      selectedTier = tier
    }

    return hotelCategory === '4star' ? selectedTier.price4Star : selectedTier.price3Star
  }, [tour, persons, hotelCategory])

  // Find the tier label for display
  const currentTierLabel = useMemo(() => {
    if (!tour) return ''
    const sorted = [...tour.pricing].sort((a, b) => a.pax - b.pax)
    let selectedTier = sorted[0]
    for (const tier of sorted) {
      if (persons <= tier.pax) {
        selectedTier = tier
        break
      }
      selectedTier = tier
    }
    return `${selectedTier.pax} ${selectedTier.pax === 1 ? 'person' : 'persons'} tier`
  }, [tour, persons])

  const supplementPrice = useMemo(() => {
    if (!tour || !singleSupplement) return 0
    return hotelCategory === '4star'
      ? tour.singleSupplement.price4Star
      : tour.singleSupplement.price3Star
  }, [tour, singleSupplement, hotelCategory])

  const totalPriceEUR = useMemo(() => {
    return Math.round(pricePerPerson * persons + supplementPrice)
  }, [pricePerPerson, persons, supplementPrice])

  const resetState = useCallback(() => {
    setDate(undefined)
    setHotelCategory('4star')
    setPersons(2)
    setSingleSupplement(false)
    setReservationStatus('idle')
    setReservationError('')
  }, [])

  const handleClose = useCallback((isOpen: boolean) => {
    if (!isOpen) resetState()
    onOpenChange(isOpen)
  }, [resetState, onOpenChange])

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
          tourId: tour.id,
          tourName: tourTitle,
          tourDate: date.toISOString().split('T')[0],
          guideLanguage: 'german',
          adults: persons,
          children: 0,
          totalPriceEUR,
          lang: locale,
          hotelCategory,
          singleSupplement,
          luxuryTour: true,
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

  // Success state
  if (reservationStatus === 'success') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-md">
          <DialogTitle className="sr-only">Reservation Confirmed</DialogTitle>
          <DialogDescription className="sr-only">Your luxury tour reservation has been confirmed</DialogDescription>
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-6 flex size-20 items-center justify-center rounded-full"
              style={{ backgroundColor: `${GOLD}15` }}
            >
              <Check className="size-10" style={{ color: GOLD }} />
            </motion.div>
            <h2 className={`${bodoniModa.className} mb-2 text-2xl font-bold text-foreground`}>
              {t('booking.reservationConfirmed')}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">{t('booking.confirmationEmailSent')}</p>

            <div
              className="mb-6 w-full rounded-xl border p-4"
              style={{
                backgroundColor: `${GOLD}08`,
                borderColor: `${GOLD}20`,
              }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <Ticket className="size-5" style={{ color: GOLD }} />
                <span className="text-sm font-semibold" style={{ color: GOLD }}>{t('booking.discountCode')}</span>
              </div>
              <p
                className="text-center text-3xl font-bold tracking-widest"
                style={{ color: GOLD }}
              >
                Armen5
              </p>
              <p className="mt-1 text-center text-xs text-foreground/30">{t('booking.discountDescription')}</p>
            </div>

            <p className="mb-6 text-xs text-foreground/25">{t('booking.payInPersonNotice')}</p>

            <Button
              onClick={() => handleClose(false)}
              className="font-medium rounded-full px-8"
              style={{
                backgroundColor: GOLD,
                color: '#1a1a1a',
                boxShadow: `0 4px 20px ${GOLD}40`,
              }}
            >
              {t('common.close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-2xl lg:max-w-3xl"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">{tourTitle}</DialogTitle>
        <DialogDescription className="sr-only">{tourSubtitle}</DialogDescription>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ─── Header ─── */}
          <div
            className="relative overflow-hidden rounded-t-lg"
            style={{
              background: `linear-gradient(135deg, ${GOLD}15, ${GOLD_DARK}08)`,
            }}
          >
            <div className="p-6 sm:p-8">
              {/* Gold accent line */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: `${GOLD}40` }} />
                <Crown className="size-4" style={{ color: GOLD }} />
                <div className="h-px w-8" style={{ backgroundColor: `${GOLD}40` }} />
              </div>

              <h2
                className={`${bodoniModa.className} text-2xl font-bold text-foreground sm:text-3xl mb-2 leading-tight`}
              >
                {tourTitle}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{tourSubtitle}</p>

              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border"
                  style={{
                    backgroundColor: `${GOLD}10`,
                    borderColor: `${GOLD}25`,
                    color: GOLD,
                  }}
                >
                  <Clock className="size-3" />
                  {tour.duration}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border"
                  style={{
                    backgroundColor: `${GOLD}10`,
                    borderColor: `${GOLD}25`,
                    color: GOLD,
                  }}
                >
                  <Users className="size-3" />
                  2–12 persons
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border"
                  style={{
                    backgroundColor: `${GOLD}10`,
                    borderColor: `${GOLD}25`,
                    color: GOLD,
                  }}
                >
                  <Star className="size-3" />
                  German-speaking guide included
                </span>
              </div>
            </div>
          </div>

          {/* ─── Booking Form ─── */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Reserve header */}
            <div className="flex items-center gap-3">
              <h3
                className={`${bodoniModa.className} text-lg font-bold text-foreground`}
              >
                {t('booking.reserveTitle')}
              </h3>
              <span
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium"
                style={{
                  backgroundColor: `${GOLD}08`,
                  borderColor: `${GOLD}20`,
                  color: GOLD,
                }}
              >
                <Shield className="size-3" />
                {t('booking.payAtOffice')}
              </span>
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
                    disabled={(d) => d < new Date()}
                    className="bg-transparent text-foreground"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Hotel category selection */}
            <div>
              <Label className="mb-3 text-muted-foreground flex items-center gap-2">
                <Hotel className="size-4" style={{ color: GOLD }} />
                Hotel Category
              </Label>
              <RadioGroup
                value={hotelCategory}
                onValueChange={(val) => setHotelCategory(val as HotelCategory)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <div
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    hotelCategory === '4star'
                      ? ''
                      : 'border-border bg-secondary hover:border-border'
                  }`}
                  style={
                    hotelCategory === '4star'
                      ? {
                          borderColor: `${GOLD}40`,
                          backgroundColor: `${GOLD}08`,
                        }
                      : {}
                  }
                >
                  <RadioGroupItem value="4star" id="4star" />
                  <Label htmlFor="4star" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-foreground">4★ Superior</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Premium accommodation throughout
                    </p>
                  </Label>
                </div>
                <div
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    hotelCategory === '3star'
                      ? ''
                      : 'border-border bg-secondary hover:border-border'
                  }`}
                  style={
                    hotelCategory === '3star'
                      ? {
                          borderColor: `${GOLD}40`,
                          backgroundColor: `${GOLD}08`,
                        }
                      : {}
                  }
                >
                  <RadioGroupItem value="3star" id="3star" />
                  <Label htmlFor="3star" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-foreground">3★ & 4★ Standard</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Comfortable mixed-category hotels
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Number of persons */}
            <div>
              <Label className="mb-2 text-muted-foreground flex items-center gap-2">
                <Users className="size-4" style={{ color: GOLD }} />
                {t('booking.numberOfPeople')}
              </Label>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary px-4 py-3">
                <button
                  onClick={() => setPersons(Math.max(2, persons - 1))}
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60"
                  disabled={persons <= 2}
                >
                  <Minus className="size-4" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-foreground">{persons}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {persons === 1 ? 'person' : 'persons'}
                  </span>
                </div>
                <button
                  onClick={() => setPersons(Math.min(12, persons + 1))}
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground/60"
                  disabled={persons >= 12}
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <p className="mt-1.5 text-xs text-foreground/30 flex items-center gap-1.5">
                <Info className="size-3" />
                Price based on {currentTierLabel} — per person rate adjusts with group size
              </p>
            </div>

            {/* Single supplement toggle */}
            <div
              className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                singleSupplement
                  ? ''
                  : 'border-border bg-secondary hover:bg-secondary/80'
              }`}
              style={
                singleSupplement
                  ? {
                      borderColor: `${GOLD}40`,
                      backgroundColor: `${GOLD}08`,
                    }
                  : {}
              }
              onClick={() => setSingleSupplement(!singleSupplement)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSingleSupplement(!singleSupplement)
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-5 items-center justify-center rounded border-2 transition-all ${
                    singleSupplement ? '' : 'border-border'
                  }`}
                  style={
                    singleSupplement
                      ? {
                          backgroundColor: GOLD,
                          borderColor: GOLD,
                        }
                      : {}
                  }
                >
                  {singleSupplement && <Check className="size-3 text-[#1a1a1a]" />}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Single Supplement</p>
                  <p className="text-xs text-muted-foreground">
                    For solo travelers wanting their own room — +{formatPrice(
                      hotelCategory === '4star'
                        ? tour.singleSupplement.price4Star
                        : tour.singleSupplement.price3Star
                    )}
                  </p>
                </div>
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: GOLD }}
              >
                {singleSupplement
                  ? formatPrice(
                      hotelCategory === '4star'
                        ? tour.singleSupplement.price4Star
                        : tour.singleSupplement.price3Star
                    )
                  : '—'
                }
              </span>
            </div>

            <Separator style={{ backgroundColor: `${GOLD}15` }} />

            {/* Price breakdown */}
            <div
              className="rounded-xl border p-5"
              style={{
                backgroundColor: `${GOLD}05`,
                borderColor: `${GOLD}20`,
              }}
            >
              <h4
                className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
                style={{ color: `${GOLD}AA` }}
              >
                {t('booking.priceBreakdown')}
              </h4>
              <div className="space-y-3">
                {/* Per-person line */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {persons} × {t('booking.adults')} ({formatPrice(pricePerPerson)} / person, {hotelCategory === '4star' ? '4★' : '3★ & 4★'})
                  </span>
                  <span className="text-foreground/70 font-medium">
                    {formatPrice(pricePerPerson * persons)}
                  </span>
                </div>

                {/* Single supplement line */}
                {singleSupplement && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Single supplement ({hotelCategory === '4star' ? '4★' : '3★ & 4★'})
                    </span>
                    <span className="text-foreground/70 font-medium">
                      {formatPrice(supplementPrice)}
                    </span>
                  </div>
                )}

                <Separator style={{ backgroundColor: `${GOLD}15` }} />

                {/* Total */}
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">{t('booking.total')}</span>
                  <div className="text-right">
                    <p className="text-xl font-bold" style={{ color: GOLD }}>
                      {formatPrice(totalPriceEUR)}
                    </p>
                    <p className="text-xs text-foreground/30">{t('common.eur')}</p>
                  </div>
                </div>
              </div>

              {/* Discount notice */}
              <div
                className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ backgroundColor: `${GOLD}08` }}
              >
                <Ticket className="size-4 shrink-0" style={{ color: `${GOLD}88` }} />
                <p className="text-xs" style={{ color: `${GOLD}AA` }}>
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
              disabled={!date || reservationStatus === 'loading'}
              className="w-full font-medium shadow-lg transition-all duration-300 rounded-xl py-6 text-base disabled:opacity-50"
              size="lg"
              style={{
                backgroundColor: GOLD,
                color: '#1a1a1a',
                boxShadow: `0 4px 20px ${GOLD}40`,
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = GOLD_DARK
                  e.currentTarget.style.boxShadow = `0 6px 25px ${GOLD}60`
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = GOLD
                e.currentTarget.style.boxShadow = `0 4px 20px ${GOLD}40`
              }}
            >
              {reservationStatus === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a]" />
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
      </DialogContent>
    </Dialog>
  )
}
