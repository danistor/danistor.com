"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { SocialLinks } from "@/components/ui/social-links"

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-2 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
                DN
              </div>
              <h2 className="text-xl font-semibold">Dan Nistor</h2>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">{t("footer.description")}</p>
            <SocialLinks className="text-slate-300 hover:text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">{t("footer.quickLinks")}</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#about"
                className="text-slate-300 hover:text-accent transition-colors"
                scroll={false}
                onClick={(e) => {
                  e.preventDefault()
                  const targetElement = document.getElementById("about")
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="#services"
                className="text-slate-300 hover:text-accent transition-colors"
                scroll={false}
                onClick={(e) => {
                  e.preventDefault()
                  const targetElement = document.getElementById("services")
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="#portfolio"
                className="text-slate-300 hover:text-accent transition-colors"
                scroll={false}
                onClick={(e) => {
                  e.preventDefault()
                  const targetElement = document.getElementById("portfolio")
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {t("nav.portfolio")}
              </Link>
              <Link
                href="#blog"
                className="text-slate-300 hover:text-accent transition-colors"
                scroll={false}
                onClick={(e) => {
                  e.preventDefault()
                  const targetElement = document.getElementById("blog")
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {t("nav.blog")}
              </Link>
              <Link
                href="#contact"
                className="text-slate-300 hover:text-accent transition-colors"
                scroll={false}
                onClick={(e) => {
                  e.preventDefault()
                  const targetElement = document.getElementById("contact")
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {t("nav.contact")}
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">{t("footer.contact")}</h3>
            <div className="space-y-3">
              <p className="text-slate-300 flex items-center">
                <Mail className="h-5 w-5 mr-2" /> hello@danistor.com
              </p>
              <p className="text-slate-300 flex items-center">
                <Phone className="h-5 w-5 mr-2" /> +41 12 345 67 89
              </p>
              <p className="text-slate-300 flex items-center">
                <MapPin className="h-5 w-5 mr-2" /> Zurich, Switzerland
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>
            © {currentYear} Dan Nistor. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
