"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, Layers, Smartphone, Server, Check, Database, BarChart, RefreshCw, Code } from "lucide-react"
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
        t("services.webDev.features.database"),
        t("services.webDev.features.cloud"),
      ],
    },
    {
      id: "responsive-design",
      title: t("services.responsiveDesign.title"),
      icon: <Smartphone className="h-10 w-10 text-accent" />,
      description: t("services.responsiveDesign.description"),
      features: [
        t("services.responsiveDesign.features.mobile"),
        t("services.responsiveDesign.features.responsive"),
        t("services.responsiveDesign.features.seo"),
      ],
    },
    {
      id: "ecommerce",
      title: t("services.ecommerce.title"),
      icon: <Layers className="h-10 w-10 text-accent" />,
      description: t("services.ecommerce.description"),
      features: [
        t("services.ecommerce.features.payment"),
        t("services.ecommerce.features.inventory"),
        t("services.ecommerce.features.analytics"),
        t("services.ecommerce.features.mobile"),
      ],
    },
    {
      id: "frontend-development",
      title: t("services.frontendDevelopment.title"),
      icon: <Globe className="h-10 w-10 text-accent" />,
      description: t("services.frontendDevelopment.description"),
      features: [
        t("services.frontendDevelopment.features.responsive"),
        t("services.frontendDevelopment.features.animations"),
        t("services.frontendDevelopment.features.navigation"),
      ],
    },
    {
      id: "backend-development",
      title: t("services.backendDevelopment.title"),
      icon: <Database className="h-10 w-10 text-accent" />,
      description: t("services.backendDevelopment.description"),
      features: [
        t("services.backendDevelopment.features.api"),
        t("services.backendDevelopment.features.database"),
        t("services.backendDevelopment.features.security"),
      ],
    },
    {
      id: "performance-optimization",
      title: t("services.performanceOptimization.title"),
      icon: <BarChart className="h-10 w-10 text-accent" />,
      description: t("services.performanceOptimization.description"),
      features: [
        t("services.performanceOptimization.features.code"),
        t("services.performanceOptimization.features.caching"),
        t("services.performanceOptimization.features.infrastructure"),
      ],
    },
    {
      id: "maintenance-support",
      title: t("services.maintenanceSupport.title"),
      icon: <RefreshCw className="h-10 w-10 text-accent" />,
      description: t("services.maintenanceSupport.description"),
      features: [
        t("services.maintenanceSupport.features.support"),
        t("services.maintenanceSupport.features.updates"),
        t("services.maintenanceSupport.features.improvements"),
      ],
    },
    // {
    //   id: "enterprise",
    //   title: t("services.enterprise.title"),
    //   icon: <Server className="h-10 w-10 text-accent" />,
    //   description: t("services.enterprise.description"),
    //   features: [
    //     t("services.enterprise.features.integration"),
    //     t("services.enterprise.features.legacy"),
    //     t("services.enterprise.features.workflow"),
    //     t("services.enterprise.features.security"),
    //   ],
    // },
  ]

  return (
    <section id="services" ref={ref} className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.services")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("services.heading")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("services.subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="mb-6 p-3 rounded-lg bg-accent/10 inline-block">{service.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-6 w-full">
                    {t("cta.learnMore")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
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
            <DialogContent className="sm:max-w-[500px]">
              <ServiceDialog formType="general" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
