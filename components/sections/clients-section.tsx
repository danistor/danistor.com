"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

export function ClientsSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const clients = [
    { name: "UBS", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Nestlé", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Swatch Group", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Zurich Insurance", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Credit Suisse", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Novartis", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section ref={ref} className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium text-foreground">{t("clients.heading")}</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image src={(client.logo || "/placeholder.svg").split('?')[0]} alt={client.name} width={120} height={60} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
