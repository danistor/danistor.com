"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Calendar, Layers, Code, Server, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"

export function ProcessSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const processSteps = [
    {
      title: t("process.discovery.title"),
      description: t("process.discovery.description"),
      icon: <Calendar className="h-8 w-8" />,
    },
    {
      title: t("process.design.title"),
      description: t("process.design.description"),
      icon: <Layers className="h-8 w-8" />,
    },
    {
      title: t("process.development.title"),
      description: t("process.development.description"),
      icon: <Code className="h-8 w-8" />,
    },
    {
      title: t("process.testing.title"),
      description: t("process.testing.description"),
      icon: <Server className="h-8 w-8" />,
    },
    {
      title: t("process.support.title"),
      description: t("process.support.description"),
      icon: <Database className="h-8 w-8" />,
    },
  ]

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.process")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("process.heading")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("process.subheading")}</p>
        </div>

        <div className="relative">
          {/* Process steps */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} mb-12`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>

                <div className="md:w-1/2 md:hidden mt-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white mr-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10" asChild>
            <Link href="#contact">{t("cta.scheduleConsultation")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
