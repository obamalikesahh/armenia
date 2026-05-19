'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Mail,
  Phone,
  Calendar,
  XCircle,
  Loader2,
  Ticket,
  AlertCircle,
} from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import { formatPrice } from '@/lib/tours-data'

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Booking {
  id: string
  tourName: string
  tourDate: string
  guideLanguage: string
  adults: number
  children: number
  totalPriceEUR: number
  status: string
  createdAt: string
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { t } = useLocale()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const userInfo = (() => {
    if (typeof window === 'undefined') return null
    try {
      const info = localStorage.getItem('user_info')
      return info ? JSON.parse(info) : null
    } catch {
      return null
    }
  })()

  const fetchBookings = useCallback(async () => {
    if (!userInfo?.id) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`/api/bookings?userId=${userInfo.id}`)
      const data = await res.json()
      if (res.ok) {
        setBookings(data.bookings || [])
      } else {
        setError(data.error || 'Failed to fetch bookings')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [userInfo?.id])

  useEffect(() => {
    if (open && userInfo?.id) {
      fetchBookings()
    }
  }, [open, userInfo?.id, fetchBookings])

  const handleCancel = async (bookingId: string) => {
    if (!confirm(t('profile.cancelConfirm'))) return
    const token = localStorage.getItem('auth_token') || ''
    setCancellingId(bookingId)
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ 
          bookingId,
          userId: userInfo?.id,
          lang: localStorage.getItem('armenian-tours-locale') || 'en'
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Failed to cancel booking')
        return
      }
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
        )
      }
    } catch {
      // ignore
    } finally {
      setCancellingId(null)
    }
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="border-0 bg-emerald-500/15 text-emerald-400">
            {t('profile.confirmed')}
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge className="border-0 bg-red-500/15 text-red-400">
            {t('profile.cancelled')}
          </Badge>
        )
      default:
        return (
          <Badge className="border-0 bg-amber-500/15 text-amber-400">
            {t('profile.pending')}
          </Badge>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-background/95 p-0 text-foreground backdrop-blur-2xl sm:max-w-lg">
        <DialogTitle className="sr-only">{t('profile.title')}</DialogTitle>
        <DialogDescription className="sr-only">
          {t('profile.title')} - {t('profile.bookings')}
        </DialogDescription>

        <div className="p-6">
          {/* Profile info */}
          {userInfo && (
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">{t('profile.title')}</h2>
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-secondary p-4">
                {userInfo.firstName && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="size-4 text-primary/60" />
                    <span className="text-foreground">
                      {userInfo.firstName} {userInfo.lastName}
                    </span>
                  </div>
                )}
                {userInfo.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4 text-primary/60" />
                    <span>{userInfo.email}</span>
                  </div>
                )}
                {userInfo.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4 text-primary/60" />
                    <span>{userInfo.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Separator className="mb-6 bg-border" />

          {/* Bookings */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">{t('profile.bookings')}</h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <AlertCircle className="size-4 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-12 text-center">
                <Ticket className="mx-auto mb-3 size-10 text-foreground/10" />
                <p className="text-sm text-muted-foreground">{t('profile.noBookings')}</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-border bg-secondary p-4"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {booking.tourName}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {booking.tourDate}
                        </p>
                      </div>
                      {statusBadge(booking.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {t('profile.date')}: {booking.tourDate}
                      </span>
                      <span>
                        {t('profile.guests')}: {booking.adults}+{booking.children}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">
                        {formatPrice(booking.totalPriceEUR)}
                      </p>
                      {booking.status !== 'cancelled' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancel(booking.id)}
                          disabled={cancellingId === booking.id}
                          className="h-7 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          {cancellingId === booking.id ? (
                            <>
                              <Loader2 className="mr-1 size-3 animate-spin" />
                              {t('profile.cancelling')}
                            </>
                          ) : (
                            <>
                              <XCircle className="mr-1 size-3" />
                              {t('profile.cancelBooking')}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
