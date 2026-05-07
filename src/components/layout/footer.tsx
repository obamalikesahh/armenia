'use client'

import { useState } from 'react'
import { Mountain, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Locale, locales, localeFlags, localeNames } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'

export function Footer() {
  const { locale, setLocale, t } = useLocale()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Newsletter subscription would go here
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-white/5 bg-gradient-to-b from-gray-950 to-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Mountain className="size-6 text-amber-400" />
              <span className="text-lg font-bold text-white">
                ARMENIA <span className="text-amber-400">TOURS</span>
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/40">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {/* Social icons */}
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                  aria-label={social}
                >
                  {social === 'facebook' && (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social === 'instagram' && (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  )}
                  {social === 'twitter' && (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social === 'youtube' && (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { key: 'nav.home', href: '#home' },
                { key: 'nav.tours', href: '#tours' },
                { key: 'nav.about', href: '#about' },
                { key: 'nav.contact', href: '#contact' },
                { key: 'tours.featured', href: '#tours' },
              ].map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 transition-colors hover:text-amber-400"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              {t('footer.support')}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-white/40 transition-colors hover:text-amber-400">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/40 transition-colors hover:text-amber-400">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/40 transition-colors hover:text-amber-400">
                  {t('footer.cancellation')}
                </a>
              </li>
            </ul>
            <Separator className="my-4 bg-white/5" />
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-white/40">
                <MapPin className="size-3 shrink-0" />
                Yerevan, Armenia
              </li>
              <li className="flex items-center gap-2 text-xs text-white/40">
                <Phone className="size-3 shrink-0" />
                +374 XX XXX XXX
              </li>
              <li className="flex items-center gap-2 text-xs text-white/40">
                <Mail className="size-3 shrink-0" />
                info@armeniatours.com
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              {t('footer.newsletter')}
            </h3>
            <p className="mb-4 text-sm text-white/40">
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-amber-500/50"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 hover:to-amber-600"
                size="sm"
              >
                <Send className="mr-2 size-3" />
                {subscribed ? '✓ Subscribed!' : t('footer.subscribe')}
              </Button>
            </form>

            <Separator className="my-4 bg-white/5" />

            {/* Language selector */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/30">
                {t('common.language')}
              </p>
              <div className="flex gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      locale === loc
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    {localeFlags[loc]} {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-white/5" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/25">
            &copy; {currentYear} Armenia Tours. {t('footer.rights')}
          </p>
          <p className="flex items-center gap-1 text-xs text-white/25">
            Made with{' '}
            <span className="text-red-400">&#9829;</span>{' '}
            in Armenia
          </p>
        </div>
      </div>
    </footer>
  )
}
