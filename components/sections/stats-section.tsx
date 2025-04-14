"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "@/hooks/use-translation"
import { CountUp } from "@/components/ui/count-up"

export function StatsSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const stats = [
    { value: 10, label: t("stats.yearsExperience"), suffix: "+" },
    { value: 50, label: t("stats.completedProjects"), suffix: "+" },
    { value: 30, label: t("stats.happyClients"), suffix: "+" },
    { value: 99, label: t("stats.satisfaction"), suffix: "%" },
  ]

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
