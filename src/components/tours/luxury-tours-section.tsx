'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Crown,
  Calendar,
  Users,
  Check,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Shield,
  Info,
  UtensilsCrossed,
  Building2,
  Route,
  Sparkles,
  Coffee,
  Sun,
  Moon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/tours-data'
import {
  type LuxuryTour,
  type LuxuryTourDay,
  type LuxuryTourPriceTier,
  getLocalized,
  getLocalizedArray,
  type LocaleKey,
} from '@/lib/luxury-tours-data'
import { useLocale } from '@/hooks/use-locale'

interface LuxuryToursSectionProps {
  tours: LuxuryTour[]
  onBookNow: (tour: LuxuryTour) => void
}

type LuxuryTab = 'overview' | 'itinerary' | 'pricing'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

function MealIcon({ meal }: { meal: string }) {
  const lower = meal.toLowerCase()
  if (lower.includes('breakfast')) return <Coffee className="size-3.5 text-amber-500" />
  if (lower.includes('lunch')) return <Sun className="size-3.5 text-orange-500" />
  if (lower.includes('dinner')) return <Moon className="size-3.5 text-indigo-400" />
  return <UtensilsCrossed className="size-3.5 text-muted-foreground" />
}

export function LuxuryToursSection({ tours, onBookNow }: LuxuryToursSectionProps) {
  const { t, locale } = useLocale()
  // Map i18n Locale ('en'|'ru'|'de') to LocaleKey ('en'|'ru'|'de') — they are the same type
  const loc = locale as LocaleKey

  const [selectedTourIdx, setSelectedTourIdx] = useState(0)
  const [activeTab, setActiveTab] = useState<LuxuryTab>('overview')
  const [expandedDay, setExpandedDay] = useState<number>(1)

  const tour = tours[selectedTourIdx]
  const itinerary = tour?.days || []
  const pricing = tour?.pricing || []

  const name = tour ? getLocalized(tour.titleLocalized, loc, tour.title) : ''
  const description = tour ? getLocalized(tour.descriptionLocalized, loc, tour.description) : ''

  const nights = useMemo(() => {
    if (!tour) return 0
    const match = tour.duration.match(/(\d+)/)
    const days = match ? parseInt(match[1]) : 0
    return Math.max(0, days - 1)
  }, [tour])

  const groupSize = useMemo(() => {
    if (!tour || pricing.length === 0) return ''
    const minPax = pricing[0].pax
    const maxPax = pricing[pricing.length - 1].pax
    return `${minPax}-${maxPax} pax`
  }, [tour, pricing])

  const region = useMemo(() => {
    if (!tour?.countries?.length) return ''
    return tour.countries.join(' & ')
  }, [tour])

  const bestValueIdx = useMemo(() => {
    if (pricing.length === 0) return -1
    // Best value = largest group with best per-person rate
    return pricing.length - 1
  }, [pricing])

  const fromPrice = useMemo(() => {
    if (pricing.length === 0) return 0
    return pricing[pricing.length - 1].price4Star
  }, [pricing])

  const handleTourSwitch = (idx: number) => {
    if (idx !== selectedTourIdx) {
      setSelectedTourIdx(idx)
      setActiveTab('overview')
      setExpandedDay(1)
    }
  }

  if (!tour) return null

  const tabs: { id: LuxuryTab; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'overview', label: t('luxury.overview'), icon: Info },
    { id: 'itinerary', label: t('luxury.itinerary'), icon: MapPin },
    { id: 'pricing', label: t('luxury.pricing'), icon: Crown },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Tour selector tabs */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        {tours.map((luxTour, idx) => {
          const luxName = getLocalized(luxTour.titleLocalized, loc, luxTour.title)
          const luxFromPrice = luxTour.pricing.length > 0
            ? luxTour.pricing[luxTour.pricing.length - 1].price4Star
            : 0
          const luxGroupSize = luxTour.pricing.length > 0
            ? `${luxTour.pricing[0].pax}-${luxTour.pricing[luxTour.pricing.length - 1].pax} pax`
            : ''
          return (
            <button
              key={luxTour.id}
              onClick={() => handleTourSwitch(idx)}
              className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                selectedTourIdx === idx
                  ? 'border-primary/30 bg-primary/8 shadow-lg shadow-primary/5'
                  : 'border-border bg-secondary hover:border-primary/15 hover:bg-secondary'
              }`}
            >
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                selectedTourIdx === idx ? 'bg-primary/15 text-primary' : 'bg-foreground/5 text-muted-foreground'
              }`}>
                <Crown className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${
                  selectedTourIdx === idx ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {luxName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {luxTour.duration} &bull; {luxGroupSize}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-primary">
                  {formatPrice(luxFromPrice)}
                </p>
                <p className="text-[10px] text-muted-foreground">{t('luxury.from')}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Main content card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tour.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-2xl border border-border bg-secondary"
        >
          {/* Hero image */}
          <div className="relative h-48 overflow-hidden sm:h-64">
            <img
              src={tour.images[0] || '/images/hero-bg.jpg'}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="border-0 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                  <Crown className="mr-1 size-3" />
                  Luxury
                </Badge>
                <Badge variant="secondary" className="border-border bg-background/60 text-foreground/70 backdrop-blur-sm">
                  <Calendar className="mr-1 size-3" />
                  {tour.duration}
                </Badge>
                <Badge variant="secondary" className="border-border bg-background/60 text-foreground/70 backdrop-blur-sm">
                  <Clock className="mr-1 size-3" />
                  {nights} {t('luxury.nights')}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">{name}</h3>
            </div>
          </div>

          {/* Content tabs */}
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
                      layoutId="luxuryActiveTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{description}</p>

                  {/* Quick stats */}
                  <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: Calendar, label: t('luxury.day'), value: tour.duration },
                      { icon: Users, label: t('luxury.pax'), value: groupSize },
                      { icon: Star, label: t('luxury.hotels'), value: '4 Superior / 3 Standard' },
                      { icon: MapPin, label: 'Region', value: region },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-border bg-background/50 p-3">
                        <stat.icon className="mb-1 size-4 text-primary/60" />
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Included / Excluded */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {tour.included.length > 0 && (
                      <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/30">
                          {t('tours.included')}
                        </h4>
                        <ul className="space-y-2 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                          {getLocalizedArray(tour.includedLocalized, loc, tour.included).map((item, idx) => (
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
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/30">
                          {t('tours.excluded')}
                        </h4>
                        <ul className="space-y-2 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                          {getLocalizedArray(tour.excludedLocalized, loc, tour.excluded).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <X className="mt-0.5 size-4 shrink-0 text-red-400/60" />
                              <span className="text-foreground/50">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Payment terms */}
                  <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-primary/70">
                      <Shield className="mr-1.5 inline size-4" />
                      {t('luxury.paymentTerms')}
                    </h4>
                    {/* Payment policy */}
                    {tour.paymentPolicy.length > 0 && (
                      <ul className="mb-3 space-y-1 text-xs text-foreground/40">
                        {getLocalizedArray(tour.paymentPolicyLocalized, loc, tour.paymentPolicy).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    <h5 className="mb-1 text-xs font-medium text-foreground/30">{t('luxury.cancellationPolicy')}</h5>
                    {tour.cancellationPolicy.length > 0 ? (
                      <ul className="space-y-1 text-xs text-foreground/40">
                        {getLocalizedArray(tour.cancellationPolicyLocalized, loc, tour.cancellationPolicy).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-1 text-xs text-foreground/40">
                        <li>{t('luxury.cancel30days')}</li>
                        <li>{t('luxury.cancel15to30')}</li>
                        <li>{t('luxury.cancelLess15')}</li>
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="max-h-[650px] overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: 'thin' }}>
                    {itinerary.map((day: LuxuryTourDay) => {
                      const isExpanded = expandedDay === day.day
                      const dayTitle = getLocalized(day.titleLocalized, loc, day.title)
                      const dayRoute = day.route || ''
                      const dayDesc = getLocalized(day.descriptionLocalized, loc, day.description)
                      const dayHighlights = getLocalizedArray(day.highlightsLocalized, loc, day.highlights)
                      const mealLabels: Record<string, string> = {
                        Breakfast: t('luxury.breakfast'),
                        Lunch: t('luxury.lunch'),
                        Dinner: t('luxury.dinner'),
                      }

                      return (
                        <div
                          key={day.day}
                          className={`rounded-xl border transition-all duration-200 ${
                            isExpanded
                              ? 'border-primary/20 bg-primary/5'
                              : 'border-border bg-background/30 hover:border-primary/10'
                          }`}
                        >
                          <button
                            onClick={() => setExpandedDay(isExpanded ? -1 : day.day)}
                            className="flex w-full items-center gap-3 p-3 text-left"
                          >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/8 text-xs font-bold text-primary">
                              {day.day}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {t('luxury.day')} {day.day}: {dayTitle}
                              </p>
                              {dayRoute && !isExpanded && (
                                <p className="text-xs text-primary/50 truncate mt-0.5">
                                  <Route className="inline size-3 mr-0.5" />
                                  {dayRoute}
                                </p>
                              )}
                            </div>
                            <ChevronRight className={`size-4 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? 'rotate-90' : ''
                            }`} />
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-3 pb-4 pl-[52px]">
                                  {/* Route */}
                                  {dayRoute && (
                                    <div className="mb-2 flex items-center gap-1.5 text-xs text-primary/60">
                                      <Route className="size-3.5" />
                                      <span className="font-medium">{dayRoute}</span>
                                    </div>
                                  )}

                                  {/* Description */}
                                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                                    {dayDesc}
                                  </p>

                                  {/* Highlights */}
                                  {dayHighlights.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                      {dayHighlights.map((h, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="border-primary/15 text-[10px] text-primary/60"
                                        >
                                          <Sparkles className="mr-0.5 size-2.5" />
                                          {h}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}

                                  {/* Meals & Accommodation row */}
                                  <div className="flex flex-wrap gap-3">
                                    {/* Meals */}
                                    {day.meals && day.meals.length > 0 && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/25">
                                          {t('luxury.meals')}
                                        </span>
                                        {day.meals.map((meal, i) => (
                                          <span
                                            key={i}
                                            className="inline-flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] text-foreground/50"
                                          >
                                            <MealIcon meal={meal} />
                                            {mealLabels[meal] || meal}
                                          </span>
                                        ))}
                                      </div>
                                    )}

                                    {/* Accommodation */}
                                    {day.accommodation && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/25">
                                          {t('luxury.accommodationLabel')}
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] text-foreground/50">
                                          <Building2 className="size-3 text-primary/40" />
                                          {day.accommodation}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Price table */}
                  <div className="mb-6 overflow-hidden rounded-xl border border-border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-primary/5">
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary/60">
                            {t('luxury.pax')}
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-primary/60">
                            4 Superior Hotel
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-primary/60">
                            3 and 4 Standard Hotel
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pricing.map((tier: LuxuryTourPriceTier, idx: number) => {
                          const isBestValue = idx === bestValueIdx
                          return (
                            <tr
                              key={tier.pax}
                              className={`border-b border-border last:border-0 ${
                                isBestValue
                                  ? 'bg-primary/8'
                                  : idx % 2 === 0
                                    ? 'bg-background/30'
                                    : ''
                              }`}
                            >
                              <td className="px-4 py-3 text-sm font-medium text-foreground">
                                <span className="flex items-center gap-2">
                                  {tier.pax} {t('luxury.pax')}
                                  {isBestValue && (
                                    <Badge className="border-0 bg-primary/20 text-primary text-[9px] px-1.5 py-0">
                                      <Sparkles className="mr-0.5 size-2.5" />
                                      {t('luxury.bestValue')}
                                    </Badge>
                                  )}
                                </span>
                              </td>
                              <td className={`px-4 py-3 text-right text-sm font-semibold ${
                                isBestValue ? 'text-primary' : 'text-primary'
                              }`}>
                                {formatPrice(tier.price4Star)}
                              </td>
                              <td className={`px-4 py-3 text-right text-sm font-semibold ${
                                isBestValue ? 'text-foreground/70' : 'text-foreground/60'
                              }`}>
                                {formatPrice(tier.price3Star)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Single supplement */}
                  {(tour.singleSupplement.price4Star || tour.singleSupplement.price3Star) && (
                    <div className="mb-6 rounded-xl border border-border bg-background/30 p-4">
                      <h4 className="mb-3 text-sm font-semibold text-foreground/60">
                        {t('luxury.singleSupplement')}
                      </h4>
                      <div className="flex gap-6">
                        {tour.singleSupplement.price4Star > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground">4 Superior Hotel</p>
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(tour.singleSupplement.price4Star)}
                            </p>
                          </div>
                        )}
                        {tour.singleSupplement.price3Star > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground">3 and 4 Standard Hotel</p>
                            <p className="text-lg font-bold text-foreground/60">
                              {formatPrice(tour.singleSupplement.price3Star)}
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {t('luxury.perPerson')}
                      </p>
                    </div>
                  )}

                  {/* Key Inclusions */}
                  <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-primary/70">{t('luxury.keyInclusions')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        t('luxury.transportation'),
                        t('luxury.germanGuide'),
                        t('luxury.allEntranceFees'),
                        t('luxury.accommodation'),
                        t('luxury.fullBoard'),
                      ].map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="border-primary/15 text-primary/60"
                        >
                          <Check className="mr-1 size-3" />
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reserve button */}
          <div className="border-t border-border px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t('luxury.priceTiers')}</p>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(fromPrice)}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">{t('luxury.perPerson')}</span>
                </p>
              </div>
              <Button
                onClick={() => onBookNow(tour)}
                className="bg-primary text-primary-foreground font-medium shadow-lg transition-all duration-300 hover:bg-primary/80 hover:shadow-primary/10"
                size="lg"
              >
                {t('luxury.reserveNow')}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
