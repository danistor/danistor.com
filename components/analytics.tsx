'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would normally initialize and track page views
    // For example with Google Analytics, Plausible, etc.
  }, [pathname, searchParams])

  return null
}
