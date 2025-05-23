"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { CookieConsent } from "@/components/ui/cookie-consent"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [showCookieConsent, setShowCookieConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented to cookies
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowCookieConsent(true)
    }
  }, [])

  const handleCookieConsent = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowCookieConsent(false)
  }

  return (
    <div className="flex min-h-screen flex-col relative w-full overflow-x-hidden max-w-full">
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden pt-16 sm:pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
      {showCookieConsent && <CookieConsent onAccept={handleCookieConsent} />}
    </div>
  )
}
