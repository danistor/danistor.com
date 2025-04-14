"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ContactForm } from "@/components/forms/contact-form"
import { useTranslation } from "@/hooks/use-translation"
import { SkillBadge } from "@/components/ui/skill-badge"

export function HeroSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const skills = [
    { name: "React", position: { top: "20%", left: "15%" } },
    { name: "TypeScript", position: { top: "30%", right: "20%" } },
    { name: "Node.js", position: { bottom: "30%", left: "25%" } },
    { name: "Next.js", position: { bottom: "25%", right: "15%" } },
  ]

  return (
    <section ref={ref} className="min-h-screen pt-20 flex flex-col md:flex-row">
      <motion.div
        style={{ opacity, scale }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200 rounded-full filter blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200 rounded-full filter blur-[120px] opacity-30" />
      </motion.div>

      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-8 md:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl"
        >
          <div className="mb-6 inline-block">
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
              <MapPin className="h-3 w-3 mr-1" /> {t("hero.location")}
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t("hero.title")}
            <span className="block text-accent">{t("hero.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">{t("hero.description")}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                  {t("cta.startProject")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <ContactForm formType="project" />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="lg" asChild>
              <Link href="#portfolio">{t("cta.viewWork")}</Link>
            </Button>
          </div>

          {/* Trusted by logos */}
          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-4">{t("hero.trustedBy")}</p>
            <div className="flex flex-wrap items-center gap-6 opacity-70">
              <img
                src="/placeholder.svg?height=30&width=100"
                alt="Client logo"
                className="h-8 grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="/placeholder.svg?height=30&width=100"
                alt="Client logo"
                className="h-8 grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="/placeholder.svg?height=30&width=100"
                alt="Client logo"
                className="h-8 grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="/placeholder.svg?height=30&width=100"
                alt="Client logo"
                className="h-8 grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-slate-100 flex items-center justify-center overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-slate-600/20 z-10" />
          <img
            src="/placeholder.svg?height=800&width=600"
            alt="Professional developer working on code"
            className="w-full h-full object-cover"
          />

          {/* Floating skill badges */}
          {skills.map((skill, index) => (
            <SkillBadge key={skill.name} name={skill.name} position={skill.position} delay={0.8 + index * 0.2} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
