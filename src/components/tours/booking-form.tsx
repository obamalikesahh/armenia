'use client'

import { useState, useMemo } from 'react'
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
}

const HOTEL_PICKUP_EUR = 8

export function BookingForm({ tour, onSubmit }: BookingFormProps) {
  const { t } = useLocale()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guideLanguage, setGuideLanguage] = useState<'armenian' | 'english-russian'>('armenian')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [hotelPickup, setHotelPickup] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

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
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const isValid = date !== undefined

  return (
    <div className="space-y-5">
      {/* Date picker */}
      <div>
        <Label className="mb-2 text-white/60">{t('booking.selectDate')}</Label>
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
        <Label className="mb-3 text-white/60">{t('booking.guideLanguage')}</Label>
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
                ? 'border-amber-500/50 bg-amber-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <RadioGroupItem value="armenian" id="bf-armenian" />
            <Label htmlFor="bf-armenian" className="cursor-pointer flex-1">
              <p className="font-medium text-white">{t('booking.armenianSpeaker')}</p>
              <p className="text-sm text-white/50">
                {formatPrice(tour.priceEUR)} {t('tours.perPerson')}
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
            <RadioGroupItem value="english-russian" id="bf-english-russian" />
            <Label htmlFor="bf-english-russian" className="cursor-pointer flex-1">
              <p className="font-medium text-white">{t('booking.englishRussianSpeaker')}</p>
              <p className="text-sm text-white/50">
                {formatPrice(tour.priceForeignEUR)} {t('tours.perPerson')}
              </p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Number of people */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 text-white/60">{t('booking.adults')}</Label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Minus className="size-4" />
            </button>
            <span className="flex-1 text-center font-semibold text-white">{adults}</span>
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
            <span className="flex-1 text-center font-semibold text-white">{children}</span>
            <button
              onClick={() => setChildren(Math.min(10, children + 1))}
              className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hotel pickup toggle */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <Truck className="size-5 text-white/40" />
          <div>
            <p className="font-medium text-white">Hotel Pickup</p>
            <p className="text-xs text-white/40">
              +{formatPrice(HOTEL_PICKUP_EUR)}
            </p>
          </div>
        </div>
        <Switch checked={hotelPickup} onCheckedChange={setHotelPickup} />
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400">
          {t('booking.priceBreakdown')}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">
              {adults} x {t('booking.adults')}
            </span>
            <span className="text-white">
              {formatPrice(breakdown.adultTotal)}
            </span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-white/60">
                {children} x {t('booking.children')} (50%)
              </span>
              <span className="text-white">
                {formatPrice(breakdown.childTotal)}
              </span>
            </div>
          )}
          {hotelPickup && (
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Hotel Pickup</span>
              <span className="text-white">
                {formatPrice(breakdown.pickupFee)}
              </span>
            </div>
          )}
          <Separator className="bg-white/10" />
          <div className="flex justify-between">
            <span className="font-semibold text-white">{t('booking.total')}</span>
            <div className="text-right">
              <p className="font-bold text-amber-400">{formatPrice(breakdown.totalEUR)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isProcessing}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/25 disabled:opacity-50"
          size="lg"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
          className="w-full border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-50"
          size="lg"
        >
          <Building2 className="mr-2 size-4" />
          {t('booking.payWithTransfer')}
        </Button>
      </div>
    </div>
  )
}
