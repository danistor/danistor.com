"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ContactForm } from "@/components/forms/contact-form"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  const navItems = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#packages", label: t("sections.packages") },
    { href: "#process", label: t("nav.process") },
    { href: "#portfolio", label: t("nav.portfolio") },
    { href: "#testimonials", label: t("nav.testimonials") },
    { href: "#contact", label: t("nav.contact") },
    { href: "#newsletter", label: t("nav.newsletter") },
  ]

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrollPosition > 50 ? "py-3 bg-background/90 backdrop-blur-sm border-b border-border" : "py-4 sm:py-6",
        isMenuOpen ? "bg-background" : ""
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="z-10 flex items-center">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 mr-2 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
            DN
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">
            Dan <span className="text-accent">Nistor</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-accent transition-colors"
              scroll={false}
              onClick={(e) => {
                e.preventDefault()
                const targetId = item.href.replace("#", "")
                const targetElement = document.getElementById(targetId)
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="z-50 p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-white">{t("cta.getQuote")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <ContactForm formType="quote" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-background z-40 flex items-center justify-center"
              style={{ height: "100vh", overflowY: "auto" }}
            >
              <div className="flex flex-col space-y-6 text-center py-16">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xl font-medium text-foreground hover:text-accent transition-colors"
                    scroll={false}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      const targetId = item.href.replace("#", "")
                      const targetElement = document.getElementById(targetId)
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="mt-4 bg-accent hover:bg-accent/90 text-white mx-auto"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("cta.getQuote")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <ContactForm formType="quote" />
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
