"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

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
            <div className="aspect-square bg-slate-200 rounded-lg overflow-hidden shadow-sm border border-border relative">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt={t("about.imageAlt")}
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md border border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse-mint" />
                <span className="text-sm font-medium">{t("about.availableStatus")}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("about.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t("about.heading")}</h2>
            <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t("about.paragraph1") }} />
            <p className="text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: t("about.paragraph2") }} />

            <div className="mb-8 border-l-4 border-accent pl-4 py-2 bg-accent/5 rounded-r-md">
              <h4 className="font-medium text-foreground">{t("about.approachTitle")}</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("about.approach1")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("about.approach2")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("about.approach3")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("about.approach4")}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("about.approach5")}</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <span className="bg-accent/10 p-1 rounded mr-2">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </span>
                  {t("about.expertiseTitle")}
                </h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.expertise1")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.expertise2")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.expertise3")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.expertise4")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.expertise5")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <span className="bg-accent/10 p-1 rounded mr-2">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </span>
                  {t("about.servicesTitle")}
                </h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.service1")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.service2")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.service3")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.service4")}</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <span className="text-muted-foreground text-sm">{t("about.service5")}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-white" size="lg" asChild>
                <Link href="#contact">
                  <span>{t("about.ctaConsultation")}</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover:bg-accent/10" asChild>
                <Link href="#portfolio">{t("about.ctaPortfolio")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
