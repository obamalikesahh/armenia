'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Bodoni_Moda } from 'next/font/google'
import Image from 'next/image'
import {
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Star,
  Utensils,
  Hotel,
  Plane,
  Shield,
  CreditCard,
  AlertCircle,
  Sun,
  Sunset,
  Moon,
  Users,
  Gem,
  Crown,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { luxuryTours, type LuxuryTour, type LuxuryTourDay, type LocaleKey, getLocalized, getLocalizedArray } from '@/lib/luxury-tours-data'
import { useLocale } from '@/hooks/use-locale'
import { LuxuryBookingModal } from '@/components/luxury/luxury-booking-modal'

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

// ─── Animation variants ───
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

// ─── Meal icon mapper ───
function MealIcon({ meal }: { meal: string }) {
  const mealLower = meal.toLowerCase()
  if (mealLower === 'breakfast') return <Sun className="size-3.5" style={{ color: GOLD }} />
  if (mealLower === 'lunch') return <Sunset className="size-3.5" style={{ color: GOLD }} />
  if (mealLower === 'dinner') return <Moon className="size-3.5" style={{ color: GOLD }} />
  return <Utensils className="size-3.5" style={{ color: GOLD }} />
}

// ─── Duration badge ───
function DurationBadge({ duration }: { duration: LuxuryTourDay['duration'] }) {
  const { t } = useLocale()
  const config = {
    arrival: { label: t('luxury.arrival'), icon: <Plane className="size-3" />, bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    departure: { label: t('luxury.departure'), icon: <Plane className="size-3" />, bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    half: { label: t('luxury.halfDay'), icon: <Clock className="size-3" />, bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    full: { label: t('luxury.fullDay'), icon: <Clock className="size-3" />, bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
  }
  const c = config[duration]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${c.bg}`}>
      {c.icon}
      {c.label}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// ITINERARY TIMELINE DAY — the core feature
// ═══════════════════════════════════════════════════════════════
function ItineraryDay({ day, index, forceExpanded, locale }: { day: LuxuryTourDay; index: number; forceExpanded?: boolean | null; locale: LocaleKey }) {
  const [localExpanded, setLocalExpanded] = useState(false)
  const { t } = useLocale()
  const dayTitle = getLocalized(day.titleLocalized, locale, day.title)
  const dayDescription = getLocalized(day.descriptionLocalized, locale, day.description)
  const dayHighlights = getLocalizedArray(day.highlightsLocalized, locale, day.highlights)
  // When forceExpanded is set (not null/undefined), use it; otherwise use local state
  const isExpanded = forceExpanded !== undefined && forceExpanded !== null ? forceExpanded : localExpanded

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* ─── Timeline spine ─── */}
      <div className="flex flex-col items-center shrink-0">
        {/* Gold day circle */}
        <div
          className="relative z-10 flex size-11 sm:size-12 items-center justify-center rounded-full border-2 font-semibold text-sm shadow-lg"
          style={{
            borderColor: GOLD,
            backgroundColor: isExpanded ? GOLD : 'transparent',
            color: isExpanded ? '#1a1a1a' : GOLD,
            boxShadow: isExpanded ? `0 0 20px ${GOLD}40` : 'none',
          }}
        >
          {day.day}
        </div>
        {/* Connecting line */}
        <div className="w-px flex-1 min-h-[24px]" style={{ backgroundColor: `${GOLD}30` }} />
      </div>

      {/* ─── Day content ─── */}
      <div className="flex-1 pb-8 pr-2 sm:pr-4">
        {/* Header row */}
        <button
          onClick={() => setLocalExpanded(!isExpanded)}
          className="w-full text-left group cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4
                  className={`${bodoniModa.className} text-base sm:text-lg font-bold text-foreground leading-tight`}
                >
                  {dayTitle}
                </h4>
                <DurationBadge duration={day.duration} />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" style={{ color: GOLD }} />
                <span className="truncate">{day.route}</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 mt-1"
            >
              <ChevronDown className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
          </div>
        </button>

        {/* ─── Expandable details ─── */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Image + description row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail image */}
                  {day.image && (
                    <div className="relative w-full sm:w-48 h-36 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-border">
                      <Image
                        src={day.image}
                        alt={day.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 192px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {dayDescription}
                    </p>
                  </div>
                </div>

                {/* Highlights as tags */}
                {day.highlights.length > 0 && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: GOLD }}>
                      {t('luxury.highlights')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dayHighlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium border border-border bg-secondary/50 text-foreground/80"
                        >
                          <Sparkles className="size-2.5" style={{ color: GOLD }} />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meals + Accommodation row */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                  {/* Meals */}
                  {day.meals.length > 0 && (
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GOLD }}>
                        {t('luxury.meals')}
                      </p>
                      <div className="flex gap-2">
                        {day.meals.map((meal, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/30 px-2.5 py-1 text-[11px] text-foreground/70"
                          >
                            <MealIcon meal={meal} />
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accommodation */}
                  {day.accommodation && (
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GOLD }}>
                        {t('luxury.accommodation')}
                      </p>
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/30 px-2.5 py-1 text-[11px] text-foreground/70">
                        <Hotel className="size-3.5" style={{ color: GOLD }} />
                        {day.accommodation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Special inclusions */}
                {day.included && day.included.length > 0 && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GOLD }}>
                      {t('luxury.specialInclusions')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {day.included.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                          style={{
                            backgroundColor: `${GOLD}15`,
                            border: `1px solid ${GOLD}30`,
                          }}
                        >
                          <Star className="size-2.5" style={{ color: GOLD }} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed preview — always visible highlights summary */}
        {!isExpanded && day.highlights.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {dayHighlights.slice(0, 3).map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-2 py-0.5 text-[10px] text-muted-foreground truncate max-w-[200px]"
              >
                {h}
              </span>
            ))}
            {dayHighlights.length > 3 && (
              <span className="text-[10px] text-muted-foreground/50">
                +{dayHighlights.length - 3} {t('luxury.more')}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PRICING TABLE
// ═══════════════════════════════════════════════════════════════
function PricingTable({ tour }: { tour: LuxuryTour }) {
  const { t } = useLocale()
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr style={{ backgroundColor: `${GOLD}10` }}>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                <Users className="inline size-3.5 mr-1.5" style={{ color: GOLD }} />
                {t('luxury.groupSize')}
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                {t('luxury.superior')}
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                {t('luxury.standard')}
              </th>
            </tr>
          </thead>
          <tbody>
            {tour.pricing.map((tier, i) => (
              <tr
                key={tier.pax}
                className={`border-t border-border transition-colors hover:bg-secondary/50 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-secondary/20'
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {tier.pax} {tier.pax === 1 ? t('luxury.person') : t('luxury.persons')}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-base font-bold" style={{ color: GOLD }}>€{tier.price4Star.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground ml-1">/ person</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-base font-bold" style={{ color: GOLD }}>€{tier.price3Star.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground ml-1">/ person</span>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Single supplement */}
          <tfoot>
            <tr className="border-t-2" style={{ borderColor: `${GOLD}30` }}>
              <td className="px-4 py-3 text-sm font-medium text-foreground">
                {t('luxury.singleSupplement')}
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-sm font-semibold" style={{ color: GOLD }}>€{tour.singleSupplement.price4Star.toLocaleString()}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-sm font-semibold" style={{ color: GOLD }}>€{tour.singleSupplement.price3Star.toLocaleString()}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// INCLUDED / EXCLUDED LISTS
// ═══════════════════════════════════════════════════════════════
function InclusionLists({ tour, locale }: { tour: LuxuryTour; locale: LocaleKey }) {
  const { t } = useLocale()
  const includedItems = getLocalizedArray(tour.includedLocalized, locale, tour.included)
  const excludedItems = getLocalizedArray(tour.excludedLocalized, locale, tour.excluded)
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Included */}
      <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500/10">
            <Check className="size-3.5 text-emerald-500" />
          </div>
          <h4 className={`${bodoniModa.className} text-lg font-bold text-foreground`}>{t('luxury.included')}</h4>
        </div>
        <ul className="space-y-2.5">
          {includedItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="size-3.5 shrink-0 mt-0.5 text-emerald-500" />
              <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex size-7 items-center justify-center rounded-full bg-red-500/10">
            <X className="size-3.5 text-red-500" />
          </div>
          <h4 className={`${bodoniModa.className} text-lg font-bold text-foreground`}>{t('luxury.excluded')}</h4>
        </div>
        <ul className="space-y-2.5">
          {excludedItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <X className="size-3.5 shrink-0 mt-0.5 text-red-400" />
              <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ACCORDION — Payment & Cancellation Policy
// ═══════════════════════════════════════════════════════════════
function PolicyAccordion({ tour, locale }: { tour: LuxuryTour; locale: LocaleKey }) {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { t } = useLocale()

  const sections = [
    {
      id: 'payment',
      title: t('luxury.paymentPolicy'),
      icon: <CreditCard className="size-4" style={{ color: GOLD }} />,
      items: getLocalizedArray(tour.paymentPolicyLocalized, locale, tour.paymentPolicy),
    },
    {
      id: 'cancellation',
      title: t('luxury.cancellationPolicy'),
      icon: <Shield className="size-4" style={{ color: GOLD }} />,
      items: getLocalizedArray(tour.cancellationPolicyLocalized, locale, tour.cancellationPolicy),
    },
  ]

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isOpen = openSection === section.id
        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-2xl border border-border bg-secondary/30"
          >
            <button
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-2.5">
                {section.icon}
                <span className={`${bodoniModa.className} text-base font-bold text-foreground`}>
                  {section.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="size-4 text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <AlertCircle className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/60" />
                        <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// HOTELS LIST
// ═══════════════════════════════════════════════════════════════
function HotelsList({ tour }: { tour: LuxuryTour }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tour.hotels.map((cat) => (
        <div
          key={cat.category}
          className="overflow-hidden rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Crown className="size-4" style={{ color: GOLD }} />
            <h4 className={`${bodoniModa.className} text-base font-bold text-foreground`}>
              {cat.category}
            </h4>
          </div>
          <div className="space-y-2.5">
            {cat.hotels.map((hotel) => (
              <div key={hotel.city} className="flex items-start gap-2.5">
                <Hotel className="size-3.5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <div>
                  <span className="text-sm font-medium text-foreground">{hotel.city}</span>
                  <span className="text-sm text-muted-foreground"> — {hotel.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT — LuxuryToursSection
// ═══════════════════════════════════════════════════════════════
interface LuxuryToursSectionProps {
  isLoggedIn?: boolean
  onLoginClick?: () => void
}

export function LuxuryToursSection({ isLoggedIn = false, onLoginClick }: LuxuryToursSectionProps) {
  const [activeTourIndex, setActiveTourIndex] = useState(0)
  const [expandAll, setExpandAll] = useState<boolean | null>(null)

  const handleTourSwitch = (index: number) => {
    setActiveTourIndex(index)
    setExpandAll(null) // Reset expand state when switching tours
  }
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const tour = luxuryTours[activeTourIndex]
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { locale, t } = useLocale()

  // Localized tour content
  const tourTitle = getLocalized(tour.titleLocalized, locale, tour.title)
  const tourSubtitle = getLocalized(tour.subtitleLocalized, locale, tour.subtitle)
  const tourDescription = getLocalized(tour.descriptionLocalized, locale, tour.description)

  return (
    <section
      ref={sectionRef}
      id="luxury"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${GOLD}06, transparent)`,
        }}
      />

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* ═══════════════════════════════════════════
            SECTION HEADER
            ═══════════════════════════════════════════ */}
        <motion.div variants={fadeUp} className="mb-12 sm:mb-16 text-center">
          {/* Gold accent line */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 sm:w-12" style={{ backgroundColor: `${GOLD}40` }} />
            <Gem className="size-4" style={{ color: GOLD }} />
            <div className="h-px w-8 sm:w-12" style={{ backgroundColor: `${GOLD}40` }} />
          </div>

          <h2
            className={`${bodoniModa.className} text-4xl font-bold text-foreground sm:text-5xl md:text-6xl mb-4`}
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('luxury.title')}
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t('luxury.subtitle')}
          </p>

          {/* Bottom gold line */}
          <div className="mx-auto mt-5 h-px w-16" style={{ backgroundColor: `${GOLD}40` }} />
        </motion.div>

        {/* ═══════════════════════════════════════════
            TOUR SELECTION TABS
            ═══════════════════════════════════════════ */}
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
          <div className="flex justify-center">
            <div className="inline-flex rounded-2xl border border-border bg-secondary/30 p-1.5 gap-1">
              {luxuryTours.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => handleTourSwitch(i)}
                  className={`relative rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTourIndex === i
                      ? 'text-[#1a1a1a] shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                  style={
                    activeTourIndex === i
                      ? {
                          backgroundColor: GOLD,
                          boxShadow: `0 4px 15px ${GOLD}40`,
                        }
                      : {}
                  }
                >
                  <span className="hidden sm:inline">{getLocalized(t.titleLocalized, locale, t.title)}</span>
                  <span className="sm:hidden">{t.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            TOUR CONTENT (animated switch)
            ═══════════════════════════════════════════ */}
        <AnimatePresence mode="wait" onExitComplete={() => {}}>
          <motion.div
            key={activeTourIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* ─── Hero Banner ─── */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-border mb-10 sm:mb-14"
            >
              {/* Background image */}
              <div className="relative h-64 sm:h-80 md:h-96">
                <Image
                  src={tour.images[0] || '/images/hero-landscape-new.jpg'}
                  alt={tourTitle}
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(0.35) saturate(0.8) contrast(1.1)' }}
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
                  {/* Countries badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tour.countries.map((country) => (
                      <span
                        key={country}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border"
                        style={{
                          backgroundColor: `${GOLD}20`,
                          borderColor: `${GOLD}40`,
                          color: GOLD_LIGHT,
                        }}
                      >
                        <MapPin className="size-3" />
                        {country}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className={`${bodoniModa.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-3xl`}
                  >
                    {tourTitle}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base text-white/60 mb-4 max-w-2xl leading-relaxed">
                    {tourSubtitle}
                  </p>

                  {/* Quick stats */}
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-4" style={{ color: GOLD }} />
                      <span className="text-xs sm:text-sm font-medium text-white/80">{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4" style={{ color: GOLD }} />
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        {tour.countries.join(' & ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="size-4" style={{ color: GOLD }} />
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        {tour.pricing[tour.pricing.length - 1]?.pax}–{tour.pricing[0]?.pax} {t('luxury.persons')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="size-4" style={{ color: GOLD }} />
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        {t('luxury.fromPrice')} €{tour.pricing[tour.pricing.length - 1]?.price3Star.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description bar below hero image */}
              <div className="p-5 sm:p-6 md:p-8 bg-secondary/30 border-t border-border">
                <p className="text-sm text-foreground/70 leading-relaxed max-w-4xl">
                  {tourDescription}
                </p>
              </div>
            </motion.div>

            {/* ─── Day-by-Day Itinerary Timeline ─── */}
            <motion.div variants={fadeUp} className="mb-14 sm:mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5" style={{ color: GOLD }} />
                  <h3
                    className={`${bodoniModa.className} text-2xl sm:text-3xl font-bold text-foreground`}
                  >
                    {t('luxury.dayByDay')}
                  </h3>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}20` }} />
              </div>

              {/* Expand All / Collapse All */}
              <div className="flex justify-end mb-4">
                <ExpandAllButton
                  expanded={expandAll}
                  onToggle={() => setExpandAll(expandAll ? null : true)}
                />
              </div>

              {/* Timeline container */}
              <div className="relative ml-1 sm:ml-2">
                {tour.days.map((day, i) => (
                  <ItineraryDay key={`${tour.id}-day-${day.day}`} day={day} index={i} forceExpanded={expandAll} locale={locale} />
                ))}
                {/* End cap */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex size-6 items-center justify-center rounded-full border-2"
                    style={{ borderColor: `${GOLD}40`, backgroundColor: `${GOLD}10` }}
                  >
                    <ChevronRight className="size-3" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ─── Hotels ─── */}
            <motion.div variants={fadeUp} className="mb-14 sm:mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <Crown className="size-5" style={{ color: GOLD }} />
                  <h3
                    className={`${bodoniModa.className} text-2xl sm:text-3xl font-bold text-foreground`}
                  >
                    {t('luxury.accommodation')}
                  </h3>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}20` }} />
              </div>
              <HotelsList tour={tour} />
            </motion.div>

            {/* ─── Pricing Table ─── */}
            <motion.div variants={fadeUp} className="mb-14 sm:mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-5" style={{ color: GOLD }} />
                  <h3
                    className={`${bodoniModa.className} text-2xl sm:text-3xl font-bold text-foreground`}
                  >
                    {t('luxury.pricing')}
                  </h3>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}20` }} />
                <span className="text-xs text-muted-foreground">{t('luxury.pricePerPerson')}</span>
              </div>
              <PricingTable tour={tour} />
            </motion.div>

            {/* ─── Included / Excluded ─── */}
            <motion.div variants={fadeUp} className="mb-14 sm:mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-emerald-500" />
                  <h3
                    className={`${bodoniModa.className} text-2xl sm:text-3xl font-bold text-foreground`}
                  >
                    {t('luxury.includedExcluded')}
                  </h3>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}20` }} />
              </div>
              <InclusionLists tour={tour} locale={locale} />
            </motion.div>

            {/* ─── Payment & Cancellation Policy ─── */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="size-5" style={{ color: GOLD }} />
                  <h3
                    className={`${bodoniModa.className} text-2xl sm:text-3xl font-bold text-foreground`}
                  >
                    {t('luxury.policies')}
                  </h3>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}20` }} />
              </div>
              <PolicyAccordion tour={tour} locale={locale} />
            </motion.div>

            {/* ─── CTA Banner ─── */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-border p-6 sm:p-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${GOLD}10, ${GOLD_DARK}08)`,
                borderColor: `${GOLD}25`,
              }}
            >
              <Sparkles className="mx-auto size-6 mb-3" style={{ color: GOLD }} />
              <h4
                className={`${bodoniModa.className} text-xl sm:text-2xl font-bold text-foreground mb-2`}
              >
                {t('luxury.readyToEmbark')}
              </h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {t('luxury.readyDescription')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  size="lg"
                  className="font-medium transition-all duration-300 rounded-full px-8 shadow-lg hover:-translate-y-0.5"
                  style={{
                    backgroundColor: GOLD,
                    color: '#1a1a1a',
                    boxShadow: `0 4px 20px ${GOLD}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = GOLD_DARK
                    e.currentTarget.style.boxShadow = `0 6px 25px ${GOLD}60`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = GOLD
                    e.currentTarget.style.boxShadow = `0 4px 20px ${GOLD}40`
                  }}
                  onClick={() => setBookingModalOpen(true)}
                >
                  {t('luxury.bookNow')}
                  <ChevronRight className="ml-1.5 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground/60 rounded-full px-8"
                >
                  {t('luxury.downloadBrochure')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ─── Luxury Booking Modal ─── */}
      <LuxuryBookingModal
        tour={tour}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
      />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// EXPAND ALL / COLLAPSE ALL helper (manages state externally)
// ═══════════════════════════════════════════════════════════════
function ExpandAllButton({ expanded, onToggle }: { expanded: boolean | null; onToggle: () => void }) {
  const isExpanded = expanded === true
  const { t } = useLocale()
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/30 px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
    >
      {isExpanded ? (
        <>
          <ChevronDown className="size-3" />
          {t('luxury.collapseAll')}
        </>
      ) : (
        <>
          <ChevronRight className="size-3" />
          {t('luxury.expandAll')}
        </>
      )}
    </button>
  )
}
