'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Calendar,
  Clock,
  Users,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MapPin,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useLocale } from '@/hooks/use-locale'
import { formatPrice } from '@/lib/tours-data'

interface Booking {
  id: string
  userId: string
  tourId: string
  tourName: string
  tourDate: string
  guideLanguage: string
  adults: number
  children: number
  totalPriceAMD: number
  totalPriceEUR: number
  status: string
  discountCode: string | null
  cancelledAt: string | null
  createdAt: string
}

interface BookingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingsModal({ open, onOpenChange }: BookingsModalProps) {
  const { t, locale } = useLocale()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')
  const [cancelSuccess, setCancelSuccess] = useState(false)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const userInfo = localStorage.getItem('user_info')
      const token = localStorage.getItem('auth_token')
      if (!userInfo || !token) {
        setError(t('bookings.loginRequired'))
        setLoading(false)
        return
      }
      const user = JSON.parse(userInfo)
      const res = await fetch(`/api/bookings?userId=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('bookings.fetchError'))
      }
      setBookings(data.bookings || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : t('bookings.fetchError'))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    if (open) {
      fetchBookings()
      setCancelSuccess(false)
    }
  }, [open, fetchBookings])

  const handleCancelBooking = async () => {
    if (!cancelBookingId) return
    setCancelling(true)
    setCancelError('')
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setCancelError(t('bookings.loginRequired'))
        return
      }
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: cancelBookingId,
          lang: locale,
          userId: JSON.parse(localStorage.getItem('user_info') || '{}').id,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('bookings.cancelError'))
      }
      // Update the booking status locally
      setBookings((prev) =>
        prev.map((b) =>
          b.id === cancelBookingId
            ? { ...b, status: 'cancelled', cancelledAt: new Date().toISOString() }
            : b
        )
      )
      setCancelSuccess(true)
      setTimeout(() => setCancelSuccess(false), 3000)
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : t('bookings.cancelError'))
    } finally {
      setCancelling(false)
      setCancelBookingId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/15 text-[10px] font-medium uppercase tracking-wider">
            <CheckCircle2 className="mr-1 size-3" />
            {t('bookings.confirmed')}
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15 text-[10px] font-medium uppercase tracking-wider">
            <XCircle className="mr-1 size-3" />
            {t('bookings.cancelled')}
          </Badge>
        )
      default:
        return (
          <Badge className="bg-secondary text-muted-foreground border-border text-[10px] font-medium uppercase tracking-wider">
            {status}
          </Badge>
        )
    }
  }

  const canCancel = (booking: Booking) => {
    if (booking.status !== 'confirmed') return false
    const bookingTime = new Date(booking.createdAt)
    const now = new Date()
    const hoursSinceBooking = (now.getTime() - bookingTime.getTime()) / (1000 * 60 * 60)
    return hoursSinceBooking <= 24
  }

  const getTimeRemaining = (booking: Booking) => {
    if (booking.status !== 'confirmed') return null
    const bookingTime = new Date(booking.createdAt)
    const now = new Date()
    const hoursSinceBooking = (now.getTime() - bookingTime.getTime()) / (1000 * 60 * 60)
    const hoursRemaining = 24 - hoursSinceBooking
    if (hoursRemaining <= 0) return null
    if (hoursRemaining < 1) return `${Math.floor(hoursRemaining * 60)}m`
    return `${Math.floor(hoursRemaining)}h ${Math.floor((hoursRemaining % 1) * 60)}m`
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="border-border bg-background/95 text-foreground backdrop-blur-2xl sm:max-w-lg max-h-[85vh] flex flex-col p-0"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">
            {t('bookings.title')}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t('bookings.description')}
          </DialogDescription>

          {/* Header */}
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">
              {t('nav.myBookings')}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t('bookings.description')}
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[60vh]">
            {/* Success message */}
            {cancelSuccess && (
              <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-500 flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                {t('bookings.cancelSuccess')}
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="size-8 animate-spin text-primary/50" />
                <p className="mt-3 text-sm text-muted-foreground">{t('common.loading')}</p>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-16">
                <AlertTriangle className="size-8 text-foreground/15" />
                <p className="mt-3 text-sm text-red-400">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchBookings}
                  className="mt-3 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {t('common.retry')}
                </Button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && bookings.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Calendar className="size-10 text-foreground/10" />
                <p className="mt-3 text-sm text-muted-foreground">{t('bookings.noBookings')}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="mt-3 border-border text-muted-foreground hover:bg-secondary hover:text-foreground rounded-full"
                >
                  {t('bookings.browseTours')}
                </Button>
              </div>
            )}

            {/* Bookings list */}
            {!loading && !error && bookings.length > 0 && (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`rounded-xl border p-4 transition-colors ${
                      booking.status === 'cancelled'
                        ? 'border-border/50 bg-secondary/30 opacity-70'
                        : 'border-border bg-secondary/50'
                    }`}
                  >
                    {/* Booking header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">
                          {booking.tourName}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                          #{booking.id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    {/* Booking details */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="size-3.5 text-primary/50 shrink-0" />
                        <span>{booking.tourDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="size-3.5 text-primary/50 shrink-0" />
                        <span>
                          {booking.adults} {booking.adults === 1 ? t('booking.adults').replace('Adults', 'Adult') : t('booking.adults')}
                          {booking.children > 0 && ` + ${booking.children} ${t('booking.children')}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 text-primary/50 shrink-0" />
                        <span>
                          {booking.guideLanguage === 'armenian'
                            ? t('booking.armenianSpeaker')
                            : t('booking.englishRussianSpeaker')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                        {formatPrice(booking.totalPriceEUR)}
                      </div>
                    </div>

                    {/* Discount code */}
                    {booking.discountCode && booking.status === 'confirmed' && (
                      <div className="mb-3 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2">
                        <p className="text-[10px] text-primary/60 uppercase tracking-wider">
                          {t('booking.discountCode')}
                        </p>
                        <p className="text-sm font-bold text-primary tracking-wider">
                          {booking.discountCode}
                        </p>
                      </div>
                    )}

                    {/* Cancellation time notice */}
                    {canCancel(booking) && (
                      <div className="mb-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Clock className="size-3 text-primary/50 shrink-0" />
                        <span>
                          {t('bookings.cancelTimeRemaining')} {getTimeRemaining(booking)}
                        </span>
                      </div>
                    )}

                    {/* Cancelled info */}
                    {booking.status === 'cancelled' && booking.cancelledAt && (
                      <p className="text-[11px] text-red-400/70">
                        {t('bookings.cancelledAt')} {new Date(booking.cancelledAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'de' ? 'de-DE' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}

                    {/* 24h window expired notice */}
                    {booking.status === 'confirmed' && !canCancel(booking) && (
                      <p className="text-[11px] text-muted-foreground/50">
                        {t('bookings.cancellationExpired')}
                      </p>
                    )}

                    {/* Cancel button */}
                    {canCancel(booking) && (
                      <>
                        <Separator className="my-3 bg-border/50" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCancelBookingId(booking.id)
                            setCancelError('')
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs h-8"
                        >
                          <XCircle className="mr-1.5 size-3.5" />
                          {t('booking.cancel')}
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation AlertDialog */}
      <AlertDialog
        open={cancelBookingId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setCancelBookingId(null)
            setCancelError('')
          }
        }}
      >
        <AlertDialogContent className="border-border bg-background/95 text-foreground backdrop-blur-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              {t('bookings.cancelConfirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              {t('bookings.cancelConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {cancelError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
              {cancelError}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground">
              {t('common.close')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelBooking}
              disabled={cancelling}
              className="bg-red-500/80 text-white hover:bg-red-500 disabled:opacity-50"
            >
              {cancelling ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  {t('common.loading')}
                </span>
              ) : (
                t('booking.cancel')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
