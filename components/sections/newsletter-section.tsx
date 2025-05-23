"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/hooks/use-translation"
import { useSonnerToast } from "@/hooks/use-sonner-toast"

export function NewsletterSection() {
  const { t } = useTranslation()
  const { toast } = useSonnerToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: t("newsletter.success.title"),
      description: t("newsletter.success.description"),
      type: "success",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-slate-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("newsletter.heading")}</h2>
          <p className="text-xl text-slate-300 mb-8">{t("newsletter.subheading")}</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent"
              required
            />
            <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-white">
              {isSubmitting ? t("newsletter.submitting") : t("newsletter.subscribe")}
            </Button>
          </form>
          <p className="text-sm text-slate-400 mt-4">{t("newsletter.privacy")}</p>
        </div>
      </div>
    </section>
  )
}
