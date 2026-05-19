'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
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
import { LuxuryBookingModal } from '@/components/luxury/luxury-booking-modal'
import { ContactForm } from '@/components/layout/contact-form'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import {
  tours,
  getFeaturedTours,
  type Tour,
} from '@/lib/tours-data'
import { luxuryTours as luxuryToursData, type LuxuryTour } from '@/lib/luxury-tours-data'
import { useLocale } from '@/hooks/use-locale'

// Dynamic imports (no SSR)
const MouseSpotlight = dynamic(() => import('@/components/animations/mouse-spotlight').then(m => ({ default: m.MouseSpotlight })), { ssr: false })

const ArmeniaMap = dynamic(() => import('@/components/ui/armenia-map').then(m => ({ default: m.ArmeniaMap })), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-transparent flex items-center justify-center text-muted-foreground/60 text-xs">Loading Interactive Map of Armenia...</div>,
})

const Hero = dynamic(() => import('@/components/layout/Hero'), { ssr: false })

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


  // --- Auth state ---
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  // Sync auth state from localStorage after mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('auth_token')
      const userInfo = localStorage.getItem('user_info')
      if (token && userInfo) {
        setIsLoggedIn(true)
        const user = JSON.parse(userInfo)
        setUserName(`${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || '')
      }
    } catch { /* ignore */ }
  }, [])

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
  const [selectedLuxuryTour, setSelectedLuxuryTour] = useState<LuxuryTour | null>(null)

  // Luxury tours data — from luxury-tours-data.ts (14-day Caucasus + 10-day Armenia)
  const luxuryTours = luxuryToursData

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

  const handleLuxuryBookNow = useCallback((tour: LuxuryTour) => {
    // For now, just log and show a coming soon message
    // The TourDetailModal expects Tour type; luxury booking will be handled separately
    console.log('Luxury tour booking requested:', tour.id, tour.title)
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
        {/* Background panels grid (replacing static background image) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
          <Hero />
        </div>

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
          SECTION: INTERACTIVE MAP OF ARMENIA
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-16" id="map">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/60">
              {t('tours.route')}
            </p>
            <h2 className="text-3xl font-black text-foreground tracking-tight sm:text-4xl">
              Explore the Regions of Armenia
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-primary/30" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <ArmeniaMap onSelectTour={handleSelectTour} />
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
          SECTION 6: CONTACT FORM
          ═══════════════════════════════════════════ */}
      <AnimatedSection className="relative py-24" id="contact">
        <ContactForm />
      </AnimatedSection>

      {/* ─── Footer ─── */}
      <Footer />

      {/* ─── Modals ─── */}
      <TourDetailModal
        tour={selectedTour}
        open={isDetailModalOpen && selectedTour !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsDetailModalOpen(false)
            setSelectedTour(null)
          }
        }}
        onReserve={handleBookingProceed}
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
      />

      {/* Luxury tour booking modal */}
      <LuxuryBookingModal
        tour={selectedLuxuryTour}
        open={isDetailModalOpen && selectedLuxuryTour !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsDetailModalOpen(false)
            setSelectedLuxuryTour(null)
          }
        }}
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

      <ScrollToTop />
    </div>
  )
}
