"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Layers, Check, RefreshCw, Code, Globe2, Terminal, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ServiceDialog } from "@/components/dialogs/service-dialog"
import { useTranslation } from "@/hooks/use-translation"

export function ServicesSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const services = [
    {
      id: "web-development",
      title: t("services.webDev.title"),
      icon: <Code className="h-10 w-10 text-accent" />,
      description: t("services.webDev.description"),
      features: [
        t("services.webDev.features.responsive"),
        t("services.webDev.features.api"),
        t("services.webDev.features.collaboration"),
        t("services.webDev.features.reliable"),
      ],
    },
    {
      id: "ecommerce",
      title: t("services.ecommerce.title"),
      icon: <Layers className="h-10 w-10 text-accent" />,
      description: t("services.ecommerce.description"),
      features: [
        t("services.ecommerce.features.payment"),
        t("services.ecommerce.features.recommendations"),
        t("services.ecommerce.features.compliance"),
        t("services.ecommerce.features.optimization"),
      ],
    },
    {
      id: "full-stack-development",
      title: t("services.fullStackDevelopment.title"),
      icon: <Terminal className="h-10 w-10 text-accent" />,
      description: t("services.fullStackDevelopment.description"),
      features: [
        t("services.fullStackDevelopment.features.frontend"),
        t("services.fullStackDevelopment.features.backend"),
        t("services.fullStackDevelopment.features.communication"),
        t("services.fullStackDevelopment.features.adaptation"),
      ],
    },
    {
      id: "european-go-to-market-solutions",
      title: t("services.europeanGoToMarketSolutions.title"),
      icon: <Globe2 className="h-10 w-10 text-accent" />,
      description: t("services.europeanGoToMarketSolutions.description"),
      features: [
        t("services.europeanGoToMarketSolutions.features.multilingual"),
        t("services.europeanGoToMarketSolutions.features.accessibility"),
        t("services.europeanGoToMarketSolutions.features.dataPrivacy"),
        t("services.europeanGoToMarketSolutions.features.cultural"),
      ],
    },
    {
      id: "performance-optimization",
      title: t("services.performanceOptimization.title"),
      icon: <Gauge className="h-10 w-10 text-accent" />,
      description: t("services.performanceOptimization.description"),
      features: [
        t("services.performanceOptimization.features.coreWebVitals"),
        t("services.performanceOptimization.features.mobile"),
        t("services.performanceOptimization.features.reporting"),
      ],
    },
    {
      id: "maintenance-support",
      title: t("services.maintenanceSupport.title"),
      icon: <RefreshCw className="h-10 w-10 text-accent" />,
      description: t("services.maintenanceSupport.description"),
      features: [
        t("services.maintenanceSupport.features.security"),
        t("services.maintenanceSupport.features.performance"),
        t("services.maintenanceSupport.features.guidance"),
        t("services.maintenanceSupport.features.support"),
      ],
    },
  ]

  return (
    <section id="services" ref={ref} className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.services")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("services.heading")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("services.subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col h-full"
            >
              <div className="flex-grow">
                <div className="mb-6 p-3 rounded-lg bg-accent/10 inline-block">{service.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="w-full hover:bg-accent/10">
                    {t("cta.learnMore")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ServiceDialog service={service} />
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                {t("cta.discussProject")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ServiceDialog formType="general" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
