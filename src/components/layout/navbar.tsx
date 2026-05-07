'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mountain,
  Menu,
  X,
  Globe,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Locale, locales, localeFlags, localeNames } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'

interface NavbarProps {
  onLoginClick?: () => void
  onRegisterClick?: () => void
  isLoggedIn?: boolean
  userName?: string
  onLogout?: () => void
}

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.tours', href: '#tours' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
] as const

type Currency = 'EUR' | 'AMD'

export function Navbar({
  onLoginClick,
  onRegisterClick,
  isLoggedIn = false,
  userName,
  onLogout,
}: NavbarProps) {
  const { locale, setLocale, t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof window === 'undefined') return 'EUR'
    try {
      const stored = localStorage.getItem('armenian-tours-currency')
      if (stored === 'EUR' || stored === 'AMD') return stored
    } catch {
      // localStorage unavailable
    }
    return 'EUR'
  })
  const [activeLink, setActiveLink] = useState<string>('nav.home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Store currency preference
  useEffect(() => {
    try {
      localStorage.setItem('armenian-tours-currency', currency)
    } catch {
      // localStorage unavailable
    }
  }, [currency])

  const currentFlag = localeFlags[locale]
  const currentLocaleName = localeNames[locale]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-gray-950/80 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Mountain className="size-7 text-amber-400" />
          <span className="text-lg font-bold tracking-wide text-white">
            ARMENIA <span className="text-amber-400">TOURS</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setActiveLink(link.key)}
              className="relative px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {t(link.key)}
              {activeLink === link.key && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-amber-400"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <Globe className="size-4" />
                <span className="hidden text-xs sm:inline">{currentFlag}</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-white/10 bg-gray-900 text-white"
            >
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`cursor-pointer hover:bg-white/10 ${
                    locale === loc ? 'bg-white/5 text-amber-400' : ''
                  }`}
                >
                  <span className="mr-2">{localeFlags[loc]}</span>
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <span className="text-xs font-medium">{currency}</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-white/10 bg-gray-900 text-white"
            >
              <DropdownMenuItem
                onClick={() => setCurrency('EUR')}
                className={`cursor-pointer hover:bg-white/10 ${
                  currency === 'EUR' ? 'bg-white/5 text-amber-400' : ''
                }`}
              >
                EUR - Euro
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCurrency('AMD')}
                className={`cursor-pointer hover:bg-white/10 ${
                  currency === 'AMD' ? 'bg-white/5 text-amber-400' : ''
                }`}
              >
                AMD - Armenian Dram
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth buttons - Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex size-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <User className="size-4" />
                    </div>
                    <span className="max-w-[100px] truncate text-xs">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-white/10 bg-gray-900 text-white"
                >
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
                    {t('nav.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
                    {t('nav.myBookings')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer text-red-400 hover:bg-white/10"
                  >
                    <LogOut className="mr-2 size-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoginClick}
                  className="text-white/70 hover:bg-white/10 hover:text-white"
                >
                  {t('nav.login')}
                </Button>
                <Button
                  size="sm"
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 hover:to-amber-600"
                >
                  {t('nav.register')}
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-white/10 bg-gray-950/95 text-white backdrop-blur-xl"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 pt-8">
                  {/* Nav links */}
                  <div className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.key}
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.key)
                          setMobileOpen(false)
                        }}
                        className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          activeLink === link.key
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {t(link.key)}
                      </a>
                    ))}
                  </div>

                  {/* Language selection */}
                  <div>
                    <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-white/30">
                      {t('common.language')}
                    </p>
                    <div className="flex gap-2 px-4">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setLocale(loc)}
                          className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                            locale === loc
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {localeFlags[loc]} {localeNames[loc]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Currency selection */}
                  <div>
                    <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-white/30">
                      {t('common.currency')}
                    </p>
                    <div className="flex gap-2 px-4">
                      {(['EUR', 'AMD'] as const).map((cur) => (
                        <button
                          key={cur}
                          onClick={() => setCurrency(cur)}
                          className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                            currency === cur
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auth buttons */}
                  <div className="flex flex-col gap-2 px-4">
                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <User className="mr-2 size-4" />
                          {t('nav.profile')}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={onLogout}
                          className="w-full text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <LogOut className="mr-2 size-4" />
                          {t('nav.logout')}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setMobileOpen(false)
                            onLoginClick?.()
                          }}
                          className="w-full border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          {t('nav.login')}
                        </Button>
                        <Button
                          onClick={() => {
                            setMobileOpen(false)
                            onRegisterClick?.()
                          }}
                          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:from-orange-600 hover:to-amber-600"
                        >
                          {t('nav.register')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
