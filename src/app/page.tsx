'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  Mountain,
  ChevronLeft,
  ChevronRight,
  Award,
  CalendarCheck,
  Map as MapIcon,
  Mail,
  ArrowRight,
  ChevronDown,
  Crown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { TourCard } from '@/components/tours/tour-card'
import { TourFilters, type TourFiltersState } from '@/components/tours/tour-filters'
import { TourDetailModal, type BookingData } from '@/components/tours/tour-detail-modal'
import { AuthModal } from '@/components/auth/auth-modal'
import { ProfileModal } from '@/components/auth/profile-modal'
import { LuxuryToursSection } from '@/components/tours/luxury-tours-section'
import {
  tours,
  getFeaturedTours,
  type Tour,
} from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'

// Dynamic imports (no SSR)
const MouseSpotlight = dynamic(() => import('@/components/animations/mouse-spotlight').then(m => ({ default: m.MouseSpotlight })), { ssr: false })
const HeroScene = dynamic(() => import('@/components/3d/hero-scene').then(m => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-background flex items-center justify-center">
      <div className="size-6 animate-pulse rounded-full bg-foreground/5" />
    </div>
  ),
})
const TourRouteFluid = dynamic(() => import('@/components/3d/tour-route-fluid').then(m => ({ default: m.TourRouteFluid })), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-transparent" />,
})

/* ─── Animation helpers ─── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

/* ─── Section wrapper ─── */
function AnimatedSection({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

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

/* ─── Main Page ─── */
export default function Home() {
  const { t } = useLocale()
  const { data: session, status: sessionStatus } = useSession()

  // --- Auth state ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false
    try { return !!localStorage.getItem('auth_token') } catch { return false }
  })
  const [userName, setUserName] = useState(() => {
    if (typeof window === 'undefined') return ''
    try {
      const userInfo = localStorage.getItem('user_info')
      if (userInfo) {
        const user = JSON.parse(userInfo)
        return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || ''
      }
    } catch { /* ignore */ }
    return ''
  })

  // Sync Google OAuth session with app auth state
  useEffect(() => {
    if (sessionStatus !== 'authenticated' || !session?.user?.email) return

    // If already logged in via localStorage, skip
    if (localStorage.getItem('auth_token')) return

    // Fetch our custom token for this Google user
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.token && data.user) {
          localStorage.setItem('auth_token', data.token)
          localStorage.setItem('user_info', JSON.stringify(data.user))
          setIsLoggedIn(true)
          setUserName(`${data.user.firstName} ${data.user.lastName}`.trim() || data.user.email)
        }
      })
      .catch(console.error)
  }, [session, sessionStatus])

  // --- State ---
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
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
  const [selectedLuxuryTour, setSelectedLuxuryTour] = useState<Tour | null>(null)

  // Luxury tours data
  const luxuryTours = useMemo(() => tours.filter(tour => tour.category === 'Luxury'), [])

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
    }, 4000)
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

  // The reservation is now handled inside TourDetailModal
  const handleBookingProceed = useCallback(async (_tour: Tour, _data: BookingData) => {
    // No-op: reservation handled within the modal
  }, [])

  const handleLoginClick = useCallback(() => {
    setAuthTab('login')
    setIsAuthModalOpen(true)
  }, [])

  const handleRegisterClick = useCallback(() => {
    setAuthTab('register')
    setIsAuthModalOpen(true)
  }, [])

  const handleLoginSuccess = useCallback((user: { id: string; email: string; firstName: string; lastName: string; token: string }) => {
    setIsLoggedIn(true)
    setUserName(`${user.firstName} ${user.lastName}`.trim() || user.email)
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    setIsLoggedIn(false)
    setUserName('')
    // Also sign out from NextAuth (Google OAuth)
    signOut({ redirect: false })
  }, [])

  const handleLuxuryBookNow = useCallback((tour: Tour) => {
    setSelectedLuxuryTour(tour)
    setIsDetailModalOpen(true)
  }, [])

  const handleProfileClick = useCallback(() => {
    setIsProfileModalOpen(true)
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

  const setFilters = useCallback((newFilters: TourFiltersState) => {
    setFiltersRaw(newFilters)
    setDisplayCount(9)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Global mouse effects */}
      <MouseSpotlight />

      {/* ─── Navbar ─── */}
      <Navbar
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — clean, dramatic, minimal
          ═══════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Armenian Mountains"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.3) saturate(0.6)' }}
            priority
            quality={90}
          />
        </div>

        <HeroScene />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80 z-[3]" />

        {/* Content — clean, centered, minimal */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Thin line above heading */}
            <motion.div variants={fadeUp} className="mb-8 h-px w-16 bg-foreground/15 sm:w-20" />

            {/* Main heading — large, clean, white */}
            <motion.h1
              variants={fadeUp}
              className="mb-5 text-5xl font-bold leading-[0.95] tracking-tight text-foreground dark:text-white sm:text-7xl md:text-8xl lg:text-[7rem]"
            >
              ARMENIA
              <br />
              <span className="gradient-text animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>TOURS</span>
            </motion.h1>

            {/* Subheading — clean, light */}
            <motion.p
              variants={fadeUp}
              className="mb-12 max-w-xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons — minimal style */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => scrollToSection('tours')}
                size="lg"
                className="bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-all duration-300 rounded-full px-8"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>

            {/* Stats bar — minimal */}
            <motion.div
              variants={fadeUp}
              className="mt-20 grid w-full max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
            >
              {[
                { value: '29+', label: t('hero.stat1') },
                { value: '12+', label: t('hero.stat2') },
                { value: '5K+', label: t('hero.stat3') },
                { value: '15+', label: t('hero.stat4') },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-semibold text-foreground dark:text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-light uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-light uppercase tracking-[0.25em] text-foreground/20">
              {t('hero.scrollDown')}
            </span>
            <ChevronDown className="size-3 text-foreground/15" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: FEATURED TOURS CAROUSEL
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-24 overflow-hidden" id="featured">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/60">
              {t('tours.featured')}
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {t('tours.title')}
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-primary/30" />
          </motion.div>

          <motion.div variants={fadeIn} className="relative">
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:text-foreground/60 lg:-left-4"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:text-foreground/60 lg:-right-4"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </button>

            <div
              ref={carouselRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {featuredTours.map((tour) => (
                <div key={tour.id} className="w-[300px] shrink-0 sm:w-[340px]">
                  <TourCard tour={tour} onBookNow={handleBookNow} onSelect={handleSelectTour} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Button
              onClick={() => scrollToSection('tours')}
              variant="outline"
              className="border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground/60 rounded-full px-6"
            >
              {t('common.seeAll')} {t('tours.title')}
              <ArrowRight className="ml-2 size-3.5" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 3: ALL TOURS (FILTERABLE GRID)
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-20" id="tours">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {t('tours.allTours')}
            </h2>
            <div className="mx-auto mt-4 h-px w-10 bg-primary/30" />
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8">
            <TourFilters filters={filters} onFiltersChange={setFilters} />
          </motion.div>

          {filteredTours.length === 0 ? (
            <motion.div variants={fadeIn} className="py-20 text-center">
              <Mountain className="mx-auto mb-4 size-10 text-foreground/10" />
              <p className="text-sm text-muted-foreground">{t('tours.noResults')}</p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedTours.map((tour, i) => (
                <motion.div
                  key={tour.id}
                  variants={fadeUp}
                  transition={{ delay: i * 0.04 }}
                >
                  <TourCard tour={tour} onBookNow={handleBookNow} onSelect={handleSelectTour} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredTours.length > displayCount && (
            <motion.div variants={fadeUp} className="mt-10 text-center">
              <Button
                onClick={() => setDisplayCount((prev) => prev + 6)}
                variant="outline"
                size="lg"
                className="border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground/60 rounded-full px-6"
              >
                {t('common.more')} {t('tours.title')}
              </Button>
            </motion.div>
          )}
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION: LUXURY TOURS
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-24" id="luxury">
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/60">
            <Crown className="mr-1.5 inline size-3.5" />
            {t('luxury.title')}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t('luxury.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            {t('luxury.subtitle')}
          </p>
          <div className="mx-auto mt-4 h-px w-12 bg-primary/30" />
        </motion.div>

        <LuxuryToursSection tours={luxuryTours} onBookNow={handleLuxuryBookNow} />
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION: FLUID ROUTE ANIMATION
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/60">
              {t('tours.route')}
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Explore the Paths of Armenia
            </h2>
          </motion.div>
          <motion.div variants={fadeIn} className="overflow-hidden rounded-2xl border border-border">
            <TourRouteFluid />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 4: WHY CHOOSE US
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/60">
              {t('whyChoose.title')}
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {t('whyChoose.subtitle')}
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-primary/30" />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MapIcon,
                title: t('whyChoose.guides.title'),
                description: t('whyChoose.guides.description'),
                delay: 0,
              },
              {
                icon: Award,
                title: t('whyChoose.price.title'),
                description: t('whyChoose.price.description'),
                delay: 0.1,
              },
              {
                icon: CalendarCheck,
                title: t('whyChoose.booking.title'),
                description: t('whyChoose.booking.description'),
                delay: 0.2,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ delay: feature.delay }}
                className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-border sm:p-8"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 5: ABOUT — clean image + text
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-24" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/60">
                {t('about.title')}
              </p>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
              </div>
              <Button
                onClick={() => scrollToSection('tours')}
                className="mt-8 bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-all duration-300 rounded-full px-6"
              >
                {t('about.exploreTours')}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ delay: 0.15 }}>
              <div className="relative h-[350px] overflow-hidden rounded-2xl sm:h-[450px]">
                <Image
                  src="/images/about-armenia.png"
                  alt="Armenian Monastery"
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(0.7) saturate(0.7)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 6: NEWSLETTER
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-24" id="contact">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            className="glass-strong rounded-2xl p-8 text-center sm:p-10"
          >
            <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
              {t('newsletter.title')}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {t('newsletter.subtitle')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/20" />
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  required
                  className="border-border bg-secondary py-2.5 pl-10 text-sm text-foreground placeholder:text-foreground/20 focus-visible:border-primary/30 focus-visible:ring-primary/10 rounded-full"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-all duration-300 rounded-full px-6"
              >
                {newsletterSubscribed ? t('newsletter.subscribed') : t('newsletter.subscribe')}
              </Button>
            </form>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─── Footer ─── */}
      <Footer />

      {/* ─── Modals ─── */}
      <TourDetailModal
        tour={selectedLuxuryTour || selectedTour}
        open={isDetailModalOpen}
        onOpenChange={(open) => {
          setIsDetailModalOpen(open)
          if (!open) {
            // Clear both tour selections when modal closes
            setSelectedTour(null)
            setSelectedLuxuryTour(null)
          }
        }}
        onReserve={handleBookingProceed}
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
      />

      <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        defaultTab={authTab}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfileModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
      />
    </div>
  )
}
