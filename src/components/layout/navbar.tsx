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
import { ThemeToggle } from '@/components/theme/theme-toggle'

interface NavbarProps {
  onLoginClick?: () => void
  onRegisterClick?: () => void
  isLoggedIn?: boolean
  userName?: string
  onLogout?: () => void
  onProfileClick?: () => void
}

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.tours', href: '#tours' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
] as const



export function Navbar({
  onLoginClick,
  onRegisterClick,
  isLoggedIn = false,
  userName,
  onLogout,
  onProfileClick,
}: NavbarProps) {
  const { locale, setLocale, t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string>('nav.home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Store currency preference (EUR only)

  const currentFlag = localeFlags[locale]
  const currentLocaleName = localeNames[locale]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Mountain className="size-5 text-primary" />
          <span className="text-sm font-semibold tracking-[0.15em] text-foreground">
            ARMENIA <span className="text-primary">TOURS</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setActiveLink(link.key)}
              className="relative px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
              {activeLink === link.key && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-primary/50"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
              >
                <Globe className="size-4" />
                <span className="hidden text-xs sm:inline">{currentFlag}</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-border bg-popover text-popover-foreground backdrop-blur-xl"
            >
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`cursor-pointer hover:bg-secondary ${
                    locale === loc ? 'bg-secondary text-primary' : ''
                  }`}
                >
                  <span className="mr-2">{localeFlags[loc]}</span>
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
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
                    className="gap-2 text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
                  >
                    <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="size-4" />
                    </div>
                    <span className="max-w-[100px] truncate text-xs">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-border bg-popover text-popover-foreground backdrop-blur-xl"
                >
                  <DropdownMenuItem
                    onClick={() => onProfileClick?.()}
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {t('nav.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onProfileClick?.()}
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {t('nav.myBookings')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer text-red-400 hover:bg-secondary"
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
                  className="text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
                >
                  {t('nav.login')}
                </Button>
                <Button
                  size="sm"
                  onClick={onRegisterClick}
                  className="bg-primary text-primary-foreground font-medium hover:bg-primary/90"
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
                  className="text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-border bg-background/95 text-foreground backdrop-blur-xl"
              >
                <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>
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
                            ? 'bg-primary/8 text-primary'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                        }`}
                      >
                        {t(link.key)}
                      </a>
                    ))}
                  </div>

                  {/* Language selection */}
                  <div>
                    <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                      {t('common.language')}
                    </p>
                    <div className="flex gap-2 px-4">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setLocale(loc)}
                          className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                            locale === loc
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground'
                          }`}
                        >
                          {localeFlags[loc]} {localeNames[loc]}
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
                          onClick={() => {
                            setMobileOpen(false)
                            onProfileClick?.()
                          }}
                          className="w-full border-border bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground"
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
                          className="w-full border-border bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground"
                        >
                          {t('nav.login')}
                        </Button>
                        <Button
                          onClick={() => {
                            setMobileOpen(false)
                            onRegisterClick?.()
                          }}
                          className="w-full bg-primary text-primary-foreground font-medium hover:bg-primary/90"
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
