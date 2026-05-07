'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { Locale, defaultLocale, translations } from '@/lib/i18n'

interface LocaleContextValue {
  /** Current active locale */
  locale: Locale
  /** Change the active locale and persist to localStorage */
  setLocale: (locale: Locale) => void
  /** Translate a key to the current locale string. Falls back to English, then to the raw key. */
  t: (key: string) => string
  /** Translate a key to a specific locale string (override current locale). */
  tFor: (key: string, locale: Locale) => string
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

const STORAGE_KEY = 'armenian-tours-locale'

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (translations as Record<string, unknown>)[stored]) {
      return stored as Locale
    }
  } catch {
    // localStorage unavailable
  }
  return defaultLocale
}

interface LocaleProviderProps {
  children: ReactNode
  /** Optional initial locale override (e.g. from URL or cookie) */
  initialLocale?: Locale
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  // Initialize from prop or localStorage; lazy initializer avoids extra renders
  const [locale, setLocaleState] = useState<Locale>(() =>
    initialLocale ?? getStoredLocale()
  )

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {
      // localStorage unavailable
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      const value = translations[locale]?.[key]
      if (value !== undefined) return value

      // Fallback to English
      const fallback = translations[defaultLocale]?.[key]
      if (fallback !== undefined) return fallback

      // Return the key itself as last resort
      return key
    },
    [locale]
  )

  const tFor = useCallback(
    (key: string, targetLocale: Locale): string => {
      const value = translations[targetLocale]?.[key]
      if (value !== undefined) return value

      // Fallback to English
      const fallback = translations[defaultLocale]?.[key]
      if (fallback !== undefined) return fallback

      return key
    },
    []
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, tFor }}>
      {children}
    </LocaleContext.Provider>
  )
}

/**
 * Hook to access the current locale and translation function.
 * Must be used within a <LocaleProvider>.
 */
export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a <LocaleProvider>')
  }
  return context
}
