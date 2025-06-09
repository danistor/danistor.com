"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "../ui/button"

export function PackagesSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const packages = [
    {
      name: t("packages.webAppMvp.name"),
      scope: t("packages.webAppMvp.scope"),
      timeline: t("packages.webAppMvp.timeline"),
      idealFor: t("packages.webAppMvp.idealFor"),
    },
    {
      name: t("packages.businessSystem.name"),
      scope: t("packages.businessSystem.scope"),
      timeline: t("packages.businessSystem.timeline"),
      idealFor: t("packages.businessSystem.idealFor"),
    },
    {
      name: t("packages.ecommerceLaunch.name"),
      scope: t("packages.ecommerceLaunch.scope"),
      timeline: t("packages.ecommerceLaunch.timeline"),
      idealFor: t("packages.ecommerceLaunch.idealFor"),
    },
    {
      name: t("packages.enterpriseApplication.name"),
      scope: t("packages.enterpriseApplication.scope"),
      timeline: t("packages.enterpriseApplication.timeline"),
      idealFor: t("packages.enterpriseApplication.idealFor"),
    },
    {
      name: t("packages.systemModernization.name"),
      scope: t("packages.systemModernization.scope"),
      timeline: t("packages.systemModernization.timeline"),
      idealFor: t("packages.systemModernization.idealFor"),
    },
  ]

  const animation = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }

  return (
    <section id="packages" ref={ref} className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={animation}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-4 mb-10"
        >
          <Badge className="bg-accent/10 text-accent hover:bg-accent/20">{t("sections.packages")}</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{t("packages.heading")}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">{t("packages.subheading")}</p>
        </motion.div>

        <div className="hidden md:block">
          <motion.table
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={animation}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full border-collapse"
          >
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-4 text-left text-lg font-medium">{t("packages.table.package")}</th>
                <th className="py-4 px-4 text-left text-lg font-medium">{t("packages.table.scope")}</th>
                <th className="py-4 px-4 text-left text-lg font-medium">{t("packages.table.timeline")}</th>
                <th className="py-4 px-4 text-left text-lg font-medium">{t("packages.table.idealFor")}</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 font-medium">{pkg.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{pkg.scope}</td>
                  <td className="py-4 px-4 text-muted-foreground">{pkg.timeline}</td>
                  <td className="py-4 px-4 text-muted-foreground">{pkg.idealFor}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={animation}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-muted/20 p-6 rounded-lg border border-border flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold">{pkg.name}</h3>
              <div>
                <h4 className="font-medium mb-1">{t("packages.table.scope")}</h4>
                <p className="text-muted-foreground text-sm">{pkg.scope}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">{t("packages.table.timeline")}</h4>
                <p className="text-muted-foreground text-sm">{pkg.timeline}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">{t("packages.table.idealFor")}</h4>
                <p className="text-muted-foreground text-sm">{pkg.idealFor}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={animation}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white">
            <a href="#contact">{t("cta.discussProject")}</a>
          </Button>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <h3 className="text-2xl font-bold mb-4">{t("process.readyHeading")}</h3>
                <p className="text-gray-600">
                  {t("process.readyDescription")}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  {t("process.startButton")}
                  {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
