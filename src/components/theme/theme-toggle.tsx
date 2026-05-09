'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // eslint-disable-line react-hooks/set-state-in-effect -- required for next-themes hydration
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-16 rounded-full bg-border/50 animate-pulse" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative inline-flex h-8 w-16 items-center rounded-full
        transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${isDark
          ? 'bg-white/10 border border-white/10'
          : 'bg-black/5 border border-black/5'
        }
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track background */}
      <span className="sr-only">{isDark ? 'Dark mode' : 'Light mode'}</span>

      {/* Sliding circle */}
      <span
        className={`
          inline-flex h-6 w-6 items-center justify-center rounded-full
          transition-all duration-300 ease-in-out
          ${isDark
            ? 'translate-x-9 bg-slate-700 shadow-[0_1px_3px_rgba(0,0,0,0.4)]'
            : 'translate-x-1 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)]'
          }
        `}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-slate-300" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
        )}
      </span>
    </button>
  )
}
