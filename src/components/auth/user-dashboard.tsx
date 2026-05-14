'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Users,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ChevronLeft,
  Globe,
  Wallet,
  Ticket,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useLocale } from '@/hooks/use-locale'

/* ─── Types ─── */
interface UserInfo {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string | null
}

interface Booking {
  id: string
  tourId: string
  tourName: string
  tourDate: string
  guideLanguage: string
  adults: number
  children: number
  totalPriceEUR: number
  status: string
  discountCode: string | null
  cancelledAt: string | null
  createdAt: string
}

interface UserDashboardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserInfo | null
  token: string | null
  onLogout?: () => void
}

type DashboardTab = 'profile' | 'bookings'

/* ─── Component ─── */
export function UserDashboard({ open, onOpenChange, user, token, onLogout }: UserDashboardProps) {
  const { t, locale } = useLocale()
  const [activeTab, setActiveTab] = useState<DashboardTab>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null)
  const [cancelError, setCancelError] = useState('')

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load bookings')
      }
      setBookings(data.bookings || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (open && token) {
      fetchBookings()
    }
  }, [open, token, fetchBookings])

  // Cancel booking
  const handleCancelBooking = useCallback(async (bookingId: string) => {
    if (!token) return
    setCancellingId(bookingId)
    setCancelError('')
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, lang: locale }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel booking')
      }
      // Refresh bookings
      await fetchBookings()
      setCancelConfirmId(null)
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : 'Failed to cancel booking')
    } finally {
      setCancellingId(null)
    }
  }, [token, locale, fetchBookings])

  // Check if booking is within 24h cancellation window
  const canCancel = useCallback((booking: Booking) => {
    if (booking.status === 'cancelled') return false
    const bookingTime = new Date(booking.createdAt)
    const now = new Date()
    const hoursSinceBooking = (now.getTime() - bookingTime.getTime()) / (1000 * 60 * 60)
    return hoursSinceBooking <= 24
  }, [])

  // Format date
  const formatDate = useCallback((dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'de' ? 'de-DE' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }, [locale])

  // Translations with fallbacks
  const tr = useCallback((key: string, fallback: string) => {
    try {
      const result = t(key)
      return result === key ? fallback : result
    } catch {
      return fallback
    }
  }, [t])

  const statusColors: Record<string, string> = {
    confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  const statusLabels: Record<string, Record<string, string>> = {
    confirmed: { en: 'Confirmed', ru: 'Подтверждено', de: 'Bestätigt' },
    cancelled: { en: 'Cancelled', ru: 'Отменено', de: 'Storniert' },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-2xl max-h-[85vh]"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">
          {tr('nav.dashboard', 'Dashboard')}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {tr('dashboard.description', 'Manage your profile and bookings')}
        </DialogDescription>

        {/* Header */}
        <div className="border-b border-border px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-accent-gold/15 text-accent-gold">
              <User className="size-5" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-foreground truncate">
                {user ? `${user.firstName} ${user.lastName}` : tr('nav.profile', 'Profile')}
              </h2>
              <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="mt-4 flex gap-1 rounded-lg bg-secondary p-1">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'bookings'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              {tr('nav.myBookings', 'My Bookings')}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              {tr('nav.profile', 'Profile')}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 pb-6" style={{ maxHeight: 'calc(85vh - 140px)' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'bookings' ? (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="size-8 animate-spin text-foreground/20" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      {tr('common.loading', 'Loading...')}
                    </p>
                  </div>
                ) : error ? (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                    <AlertTriangle className="mx-auto mb-3 size-8 text-red-400" />
                    <p className="text-sm text-red-400">{error}</p>
                    <Button
                      onClick={fetchBookings}
                      variant="outline"
                      className="mt-4 border-border text-foreground/50 hover:text-foreground"
                    >
                      {tr('common.retry', 'Try Again')}
                    </Button>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Calendar className="mx-auto mb-3 size-12 text-foreground/10" />
                    <p className="text-sm text-muted-foreground">
                      {tr('dashboard.noBookings', 'No bookings yet')}
                    </p>
                    <Button
                      onClick={() => onOpenChange(false)}
                      className="mt-4 bg-accent-gold text-bg-obsidian hover:bg-accent-gold/80"
                    >
                      {tr('dashboard.browseTours', 'Browse Tours')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    {cancelError && (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                        {cancelError}
                      </div>
                    )}
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className={`rounded-xl border p-4 transition-all ${
                          booking.status === 'cancelled'
                            ? 'border-red-500/10 bg-red-500/[0.02] opacity-70'
                            : 'border-border bg-secondary/30'
                        }`}
                      >
                        {/* Booking header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-foreground truncate">
                              {booking.tourName}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {formatDate(booking.tourDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Globe className="size-3" />
                                {booking.guideLanguage === 'armenian' ? 'Armenian' : 'English/Russian'}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${
                              statusColors[booking.status] || statusColors.confirmed
                            }`}
                          >
                            {(statusLabels[booking.status]?.[locale] || statusLabels[booking.status]?.en || booking.status)}
                          </Badge>
                        </div>

                        {/* Booking details */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {booking.adults} {booking.adults === 1 ? 'adult' : 'adults'}
                            {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? 'child' : 'children'}`}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-accent-gold">
                            <Wallet className="size-3" />
                            €{booking.totalPriceEUR}
                          </span>
                          {booking.discountCode && booking.status === 'confirmed' && (
                            <span className="flex items-center gap-1 text-accent-gold/70">
                              <Ticket className="size-3" />
                              {booking.discountCode}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {tr('dashboard.bookedOn', 'Booked')} {formatDate(booking.createdAt)}
                          </span>
                        </div>

                        {/* Cancellation area */}
                        {booking.status === 'confirmed' && (
                          <div className="mt-3">
                            {cancelConfirmId === booking.id ? (
                              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                                <p className="mb-2 text-xs text-red-400">
                                  {tr('dashboard.cancelConfirm', 'Are you sure? This action cannot be undone. You will receive a cancellation confirmation email.')}
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleCancelBooking(booking.id)}
                                    disabled={cancellingId === booking.id}
                                    size="sm"
                                    className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                                  >
                                    {cancellingId === booking.id ? (
                                      <Loader2 className="size-3 animate-spin" />
                                    ) : (
                                      tr('dashboard.confirmCancel', 'Yes, Cancel')
                                    )}
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setCancelConfirmId(null)
                                      setCancelError('')
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="border-border text-foreground/50 hover:text-foreground"
                                  >
                                    {tr('common.goBack', 'Go Back')}
                                  </Button>
                                </div>
                              </div>
                            ) : canCancel(booking) ? (
                              <button
                                onClick={() => setCancelConfirmId(booking.id)}
                                className="flex items-center gap-1 text-xs text-red-400/70 transition-colors hover:text-red-400"
                              >
                                <XCircle className="size-3" />
                                {tr('dashboard.cancelBooking', 'Cancel Reservation')}
                              </button>
                            ) : (
                              <p className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                                <Clock className="size-3" />
                                {tr('dashboard.cancellationExpired', '24h cancellation period has passed')}
                              </p>
                            )}
                          </div>
                        )}

                        {booking.status === 'cancelled' && booking.cancelledAt && (
                          <p className="mt-2 text-[10px] text-muted-foreground/50">
                            {tr('dashboard.cancelledOn', 'Cancelled on')} {formatDate(booking.cancelledAt)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="pt-2"
              >
                {user && (
                  <div className="space-y-4">
                    {/* Profile card */}
                    <div className="rounded-xl border border-border bg-secondary/30 p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-full bg-accent-gold/15 text-accent-gold">
                          <User className="size-6" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {tr('dashboard.contactInfo', 'Contact Information')}
                      </h4>
                      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="size-4 text-muted-foreground/50" />
                          <span className="text-sm text-foreground">{user.email}</span>
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center gap-3">
                          <Phone className="size-4 text-muted-foreground/50" />
                          <span className="text-sm text-foreground">{user.phone || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick info */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {tr('dashboard.quickInfo', 'Quick Info')}
                      </h4>
                      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{tr('dashboard.activeBookings', 'Active Bookings')}</span>
                          <span className="text-sm font-semibold text-emerald-400">
                            {bookings.filter(b => b.status === 'confirmed').length}
                          </span>
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{tr('dashboard.discountCode', 'Discount Code')}</span>
                          <span className="rounded-md bg-accent-gold/10 px-2 py-0.5 text-xs font-semibold text-accent-gold">
                            Armen5
                          </span>
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{tr('dashboard.discountInfo', 'Pay-at-Office Discount')}</span>
                          <span className="text-sm font-semibold text-accent-gold">5%</span>
                        </div>
                      </div>
                    </div>

                    {/* Logout button */}
                    {onLogout && (
                      <Button
                        onClick={() => {
                          onLogout()
                          onOpenChange(false)
                        }}
                        variant="outline"
                        className="w-full border-red-500/20 text-red-400 hover:bg-red-500/5 hover:text-red-400"
                      >
                        <XCircle className="mr-2 size-4" />
                        {tr('nav.logout', 'Log Out')}
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
