'use client'

import { useState, useEffect, ReactNode } from 'react'

/**
 * HydrationSafe wrapper prevents hydration mismatches by only rendering
 * children after the component has mounted on the client.
 * This eliminates the Radix UI `hidden={null}` vs `hidden={true}` issue.
 */
export function HydrationSafe({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
