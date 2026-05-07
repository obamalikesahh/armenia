'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  Mountain,
  Play,
  ChevronLeft,
  ChevronRight,
  Award,
  CalendarCheck,
  Map as MapIcon,
  Mail,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { TourCard } from '@/components/tours/tour-card'
import { TourFilters, type TourFiltersState } from '@/components/tours/tour-filters'
import { TourDetailModal, type BookingData } from '@/components/tours/tour-detail-modal'
import { AuthModal } from '@/components/auth/auth-modal'
import {
  tours,
  getFeaturedTours,
  type Tour,
} from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

// Dynamic imports for heavy 3D components (no SSR)
const HeroScene = dynamic(() => import('@/components/3d/hero-scene'), { ssr: false })
const TourGlobe = dynamic(() => import('@/components/3d/tour-globe'), { ssr: false })
const BackgroundParticles = dynamic(() => import('@/components/3d/background-particles'), { ssr: false })

/* ──────────────────────────────────────────────
   Animation helpers
   ────────────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

/* ──────────────────────────────────────────────
   Section wrapper with InView detection
   ────────────────────────────────────────────── */
function AnimatedSection({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ──────────────────────────────────────────────
   Main Page
   ────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLocale()

  // --- State ---
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [filters, setFiltersRaw] = useState<TourFiltersState>({
    category: 'all',
    region: 'all',
    duration: 'all',
    search: '',
  })
  const [displayCount, setDisplayCount] = useState(9)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Featured tours carousel
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const featuredTours = useMemo(() => getFeaturedTours(), [])

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      if (!carouselRef.current) return
      const el = carouselRef.current
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' })
      }
    }, 3500)
    return () => clearInterval(interval)
  }, [isPaused])

  // --- Filtered tours ---
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (filters.category !== 'all' && tour.category !== filters.category) return false
      if (filters.region !== 'all' && tour.region !== filters.region) return false
      if (filters.duration !== 'all') {
        if (filters.duration === 'half day' && tour.duration !== 'half day') return false
        if (filters.duration === 'full day' && tour.duration !== 'full day') return false
        if (filters.duration === 'multi-day' && !tour.duration.includes('day')) return false
        if (filters.duration === 'multi-day' && (tour.duration === 'half day' || tour.duration === 'full day')) return false
      }
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const nameMatch = tour.name.en.toLowerCase().includes(q) || tour.name.ru.toLowerCase().includes(q) || tour.name.de.toLowerCase().includes(q)
        const regionMatch = tour.region.toLowerCase().includes(q)
        const categoryMatch = tour.category.toLowerCase().includes(q)
        if (!nameMatch && !regionMatch && !categoryMatch) return false
      }
      return true
    })
  }, [filters])

  const displayedTours = useMemo(() => filteredTours.slice(0, displayCount), [filteredTours, displayCount])

  // --- Handlers ---
  const handleBookNow = useCallback((tour: Tour) => {
    setSelectedTour(tour)
    setIsDetailModalOpen(true)
  }, [])

  const handleSelectTour = useCallback((tour: Tour) => {
    setSelectedTour(tour)
    setIsDetailModalOpen(true)
  }, [])

  const handleBookingProceed = useCallback(async (tour: Tour, data: BookingData) => {
    try {
      const totalAMD = (() => {
        const pricePerPerson = data.guideLanguage === 'armenian' ? tour.priceAMD : tour.priceForeignAMD
        return Math.round(pricePerPerson * data.adults + pricePerPerson * 0.5 * data.children)
      })()
      const totalEUR = Math.ceil(totalAMD * 0.0024)

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourName: tour.name.en,
          tourDate: data.date?.toISOString().split('T')[0] || '',
          guideLanguage: data.guideLanguage,
          adults: data.adults,
          children: data.children,
          totalAmountEUR: totalEUR,
          totalAmountAMD: totalAMD,
        }),
      })
      const session = await res.json()
      if (session.url) {
        window.location.href = session.url
      }
    } catch {
      // Fallback: just close the modal
    }
    setIsDetailModalOpen(false)
  }, [])

  const handleLoginClick = useCallback(() => {
    setAuthTab('login')
    setIsAuthModalOpen(true)
  }, [])

  const handleRegisterClick = useCallback(() => {
    setAuthTab('register')
    setIsAuthModalOpen(true)
  }, [])

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubscribed(true)
    setNewsletterEmail('')
    setTimeout(() => setNewsletterSubscribed(false), 3000)
  }, [newsletterEmail])

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const amount = direction === 'left' ? -340 : 340
    carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Combined filter handler that also resets display count
  const setFilters = useCallback((newFilters: TourFiltersState) => {
    setFiltersRaw(newFilters)
    setDisplayCount(9)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Navbar ─── */}
      <Navbar
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroScene />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/30 via-transparent to-[#0a0a0f] z-[1]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="gradient-text">{t('hero.title')}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              className="mb-8 max-w-2xl text-base text-white/60 sm:text-lg lg:text-xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => scrollToSection('tours')}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-amber-500/30 hover:scale-105"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass border-white/20 text-white transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                <Play className="mr-2 size-4" />
                {t('hero.secondaryCta')}
              </Button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={fadeUp}
              className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
            >
              {[
                { value: '29+', label: t('hero.stat1') },
                { value: '12+', label: t('hero.stat2') },
                { value: '5000+', label: t('hero.stat3') },
                { value: '15+', label: t('hero.stat4') },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-amber-400 sm:text-3xl">{stat.value}</p>
                  <p className="text-xs text-white/40 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/30">Scroll</span>
            <div className="size-5 rounded-full border border-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: FEATURED TOURS CAROUSEL
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-20 overflow-hidden" id="featured">
        {/* Subtle particle background */}
        <BackgroundParticles />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
              {t('tours.featured')}{' '}
              <span className="gradient-text">{t('tours.title')}</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-violet-500" />
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeIn} className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute -left-3 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-10 items-center justify-center rounded-full border border-white/10 bg-gray-950/80 text-white/60 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white lg:-left-5"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute -right-3 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-10 items-center justify-center rounded-full border border-white/10 bg-gray-950/80 text-white/60 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white lg:-right-5"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Cards container */}
            <div
              ref={carouselRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {featuredTours.map((tour) => (
                <div key={tour.id} className="w-[300px] shrink-0 sm:w-[340px]">
                  <TourCard
                    tour={tour}
                    onBookNow={handleBookNow}
                    onSelect={handleSelectTour}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* View all button */}
          <motion.div variants={fadeUp} className="mt-8 text-center">
            <Button
              onClick={() => scrollToSection('tours')}
              variant="outline"
              className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              {t('common.seeAll')} {t('tours.title')}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 3: ALL TOURS (FILTERABLE GRID)
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-20" id="tours">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
              {t('tours.allTours')}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-violet-500" />
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeUp} className="mb-8">
            <TourFilters filters={filters} onFiltersChange={setFilters} />
          </motion.div>

          {/* Tours grid */}
          {filteredTours.length === 0 ? (
            <motion.div variants={fadeIn} className="py-20 text-center">
              <Mountain className="mx-auto mb-4 size-12 text-white/20" />
              <p className="text-lg text-white/40">{t('tours.noResults')}</p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedTours.map((tour) => (
                <motion.div key={tour.id} variants={fadeUp}>
                  <TourCard
                    tour={tour}
                    onBookNow={handleBookNow}
                    onSelect={handleSelectTour}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load more */}
          {filteredTours.length > displayCount && (
            <motion.div variants={fadeUp} className="mt-10 text-center">
              <Button
                onClick={() => setDisplayCount((prev) => prev + 6)}
                variant="outline"
                size="lg"
                className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                {t('common.more')} {t('tours.title')}
              </Button>
            </motion.div>
          )}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 4: WHY CHOOSE US
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="mx-auto max-w-xl text-white/50">
              Experience the best of Armenia with our trusted tour platform
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: MapIcon,
                title: 'Expert Local Guides',
                description: 'Our certified Armenian guides bring history to life with personal stories and deep cultural knowledge.',
                glow: 'glow-amber',
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
                delay: 0,
              },
              {
                icon: Award,
                title: 'Best Price Guarantee',
                description: 'We offer the most competitive prices with no hidden fees. Found it cheaper? We\'ll match it.',
                glow: 'glow-violet',
                color: 'text-violet-400',
                bg: 'bg-violet-500/10',
                delay: 1,
              },
              {
                icon: CalendarCheck,
                title: 'Flexible Booking',
                description: 'Free cancellation up to 24 hours before. Easy date changes. Book now, decide later.',
                glow: 'glow-amber',
                color: 'text-pink-400',
                bg: 'bg-pink-500/10',
                delay: 2,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group"
              >
                <div className="glass-card animate-float rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 sm:p-8" style={{ animationDelay: `${feature.delay}s` }}>
                  <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}>
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 5: ABOUT / GLOBE
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-20" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text side */}
            <motion.div variants={fadeUp}>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                About <span className="gradient-text">Armenia</span>
              </h2>
              <div className="space-y-4 text-white/60">
                <p>
                  Armenia — one of the world&apos;s oldest civilizations — is a land of dramatic mountain landscapes,
                  ancient monasteries carved into cliffs, and warm hospitality that has welcomed travelers for millennia.
                </p>
                <p>
                  From the crystal waters of Lake Sevan to the awe-inspiring Wings of Tatev, from the sacred
                  halls of Geghard to the vibrant streets of Yerevan, every corner of Armenia tells a story
                  spanning thousands of years.
                </p>
                <p>
                  Our expert local guides bring these stories to life, offering authentic experiences that go
                  far beyond typical tourism. Whether you seek adventure, spiritual discovery, or culinary
                  delights — Armenia has it all.
                </p>
              </div>
              <Button
                onClick={() => scrollToSection('tours')}
                className="mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-amber-500/30"
              >
                Explore Tours
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>

            {/* Globe side */}
            <motion.div variants={fadeIn} className="relative h-[400px] sm:h-[500px]">
              <TourGlobe className="h-full w-full" />
              {/* Glow behind globe */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 6: NEWSLETTER
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-20" id="contact">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            className="glass-strong rounded-3xl p-8 text-center sm:p-12"
          >
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-500/10">
              <Mail className="size-7 text-amber-400" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              Stay Updated
            </h2>
            <p className="mb-8 text-white/50">
              Get the latest tour deals, travel tips, and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="border-white/10 bg-white/5 py-3 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/20"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-amber-500/30"
              >
                {newsletterSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </Button>
            </form>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─── Footer ─── */}
      <Footer />

      {/* ─── Modals ─── */}
      <TourDetailModal
        tour={selectedTour}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onBookNow={handleBookingProceed}
      />

      <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        defaultTab={authTab}
      />
    </div>
  )
}
