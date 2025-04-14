"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"

export function AboutSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" ref={ref} className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-200 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Alex Weber, Full-Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md border border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse-mint" />
                <span className="text-sm font-medium">{t("about.available")}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.about")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t("about.heading")}</h2>
            <p className="text-muted-foreground mb-6">{t("about.paragraph1")}</p>
            <p className="text-muted-foreground mb-8">{t("about.paragraph2")}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-medium text-foreground mb-2">{t("about.skills")}</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">React & Next.js</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">Node.js & Express</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">TypeScript</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">AWS & Cloud Services</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">{t("about.languages")}</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.english")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.german")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.french")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.italian")}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
                <a href="#" download>
                  <Download className="h-4 w-4 mr-2" />
                  {t("cta.downloadCV")}
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
                <Link href="#contact">{t("cta.contactMe")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
