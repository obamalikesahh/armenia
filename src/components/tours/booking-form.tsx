'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import {
  CalendarDays,
  Minus,
  Plus,
  CreditCard,
  ChevronRight,
  Building2,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  type Tour,
  formatPrice,
} from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

interface BookingFormProps {
  tour: Tour
  onSubmit?: (data: BookingFormData) => void
}

export interface BookingFormData {
  date: Date
  guideLanguage: 'armenian' | 'english-russian'
  adults: number
  children: number
  hotelPickup: boolean
  totalPriceEUR: number
  isPrivate?: boolean
}

const HOTEL_PICKUP_EUR = 8

export function BookingForm({ tour, onSubmit }: BookingFormProps) {
  const { t, locale } = useLocale()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guideLanguage, setGuideLanguage] = useState<'armenian' | 'english-russian'>('armenian')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [hotelPickup, setHotelPickup] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

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

  const pricePerPersonEUR = useMemo(
    () => (guideLanguage === 'armenian' ? tour.priceEUR : tour.priceForeignEUR),
    [tour, guideLanguage]
  )

  const breakdown = useMemo(() => {
    const adultTotal = pricePerPersonEUR * adults
    const childTotal = Math.round(pricePerPersonEUR * 0.5) * children
    const pickupFee = hotelPickup ? HOTEL_PICKUP_EUR : 0
    const totalEUR = adultTotal + childTotal + pickupFee
    return { adultTotal, childTotal, pickupFee, totalEUR }
  }, [pricePerPersonEUR, adults, children, hotelPickup])

  const handleSubmit = async () => {
    if (!date) return
    setIsProcessing(true)
    try {
      onSubmit?.({
        date,
        guideLanguage,
        adults,
        children,
        hotelPickup,
        totalPriceEUR: breakdown.totalEUR,
        isPrivate,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const isValid = date !== undefined

  return (
    <div className="space-y-5">
      {/* Private Tour Toggle Switch */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-secondary p-4 transition-all hover:bg-secondary/80">
        <div className="space-y-0.5 pr-2">
          <Label htmlFor="private-tour-toggle" className="text-sm font-semibold cursor-pointer text-foreground font-medium">
            {t('tours.wantPrivate')}
          </Label>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {locale === 'de'
              ? 'Buchen Sie diese Tour als exklusive Privattour an jedem beliebigen Tag.'
              : locale === 'ru'
              ? 'Забронируйте эту экскурсию как индивидуальную в любой день.'
              : 'Book this tour as an exclusive private experience on any day of the week.'}
          </p>
        </div>
        <Switch
          id="private-tour-toggle"
          checked={isPrivate}
          onCheckedChange={setIsPrivate}
          className="data-[state=checked]:bg-primary shrink-0"
        />
      </div>

      {/* Date picker */}
      <div>
        <Label className="mb-2 text-foreground/60">{t('booking.selectDate')}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start border-border bg-secondary text-left text-foreground/70 hover:bg-accent hover:text-white"
            >
              <CalendarDays className="mr-2 size-4" />
              {date ? format(date, 'PPP') : t('booking.selectTourDate')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-border bg-popover p-0">
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

      {/* Guide language */}
      <div>
        <Label className="mb-3 text-foreground/60">{t('booking.guideLanguage')}</Label>
        <RadioGroup
          value={guideLanguage}
          onValueChange={(val) =>
            setGuideLanguage(val as 'armenian' | 'english-russian')
          }
          className="space-y-3"
        >
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
              guideLanguage === 'armenian'
                ? 'border-slate-400/50 bg-slate-400/10'
                : 'border-border bg-secondary hover:border-border'
            }`}
          >
            <RadioGroupItem value="armenian" id="bf-armenian" />
            <Label htmlFor="bf-armenian" className="cursor-pointer flex-1">
              <p className="font-medium text-foreground">{t('booking.armenianSpeaker')}</p>
              <p className="text-sm text-foreground/50">
                {formatPrice(tour.priceEUR)} {t('tours.perPerson')}
              </p>
            </Label>
          </div>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
              guideLanguage === 'english-russian'
                ? 'border-slate-400/50 bg-slate-400/10'
                : 'border-border bg-secondary hover:border-border'
            }`}
          >
            <RadioGroupItem value="english-russian" id="bf-english-russian" />
            <Label htmlFor="bf-english-russian" className="cursor-pointer flex-1">
              <p className="font-medium text-foreground">{t('booking.englishRussianSpeaker')}</p>
              <p className="text-sm text-foreground/50">
                {formatPrice(tour.priceForeignEUR)} {t('tours.perPerson')}
              </p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Number of people */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 text-foreground/60">{t('booking.adults')}</Label>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="flex size-8 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-accent hover:text-white"
            >
              <Minus className="size-4" />
            </button>
            <span className="flex-1 text-center font-semibold text-foreground">{adults}</span>
            <button
              onClick={() => setAdults(Math.min(20, adults + 1))}
              className="flex size-8 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-accent hover:text-white"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        <div>
          <Label className="mb-2 text-foreground/60">
            {t('booking.children')}
            <span className="ml-1 text-xs text-foreground/30">(-50%)</span>
          </Label>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-2">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="flex size-8 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-accent hover:text-white"
            >
              <Minus className="size-4" />
            </button>
            <span className="flex-1 text-center font-semibold text-foreground">{children}</span>
            <button
              onClick={() => setChildren(Math.min(10, children + 1))}
              className="flex size-8 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-accent hover:text-white"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hotel pickup toggle */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-secondary p-4">
        <div className="flex items-center gap-3">
          <Truck className="size-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">Hotel Pickup</p>
            <p className="text-xs text-muted-foreground">
              +{formatPrice(HOTEL_PICKUP_EUR)}
            </p>
          </div>
        </div>
        <Switch checked={hotelPickup} onCheckedChange={setHotelPickup} />
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl border border-slate-400/20 bg-slate-400/5 p-4">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
          {t('booking.priceBreakdown')}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">
              {adults} x {t('booking.adults')}
            </span>
            <span className="text-foreground">
              {formatPrice(breakdown.adultTotal)}
            </span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">
                {children} x {t('booking.children')} (50%)
              </span>
              <span className="text-foreground">
                {formatPrice(breakdown.childTotal)}
              </span>
            </div>
          )}
          {hotelPickup && (
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Hotel Pickup</span>
              <span className="text-foreground">
                {formatPrice(breakdown.pickupFee)}
              </span>
            </div>
          )}
          <Separator className="bg-accent" />
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">{t('booking.total')}</span>
            <div className="text-right">
              <p className="font-bold text-slate-300">{formatPrice(breakdown.totalEUR)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isProcessing}
          className="w-full bg-gradient-to-r from-slate-500 to-slate-400 text-foreground shadow-lg transition-all duration-300 hover:from-slate-600 hover:to-slate-600 hover:shadow-slate-500/25 disabled:opacity-50"
          size="lg"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground" />
              {t('common.loading')}
            </span>
          ) : (
            <>
              <CreditCard className="mr-2 size-4" />
              {t('booking.payWithCard')}
              <ChevronRight className="ml-1 size-4" />
            </>
          )}
        </Button>

        <Button
          variant="outline"
          disabled={!isValid || isProcessing}
          className="w-full border-border bg-secondary text-foreground/70 hover:bg-accent hover:text-foreground disabled:opacity-50"
          size="lg"
        >
          <Building2 className="mr-2 size-4" />
          {t('booking.payWithTransfer')}
        </Button>
      </div>
    </div>
  )
}
