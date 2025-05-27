"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, MapPin, Shield, Zap, Globe2 } from "lucide-react"
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
    <section ref={ref} className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <motion.div
        style={{ opacity, scale }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200 rounded-full filter blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200 rounded-full filter blur-[120px] opacity-30" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-8rem)]">
          <div className="w-full md:w-1/2 h-auto md:h-screen flex items-center justify-center py-8 md:py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl w-full"
            >
              <div className="mb-4 md:mb-6 inline-block">
                <Badge className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-xs sm:text-sm">
                  <MapPin className="h-3 w-3 mr-1" /> {t("hero.location")}
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                {t("hero.title")}
                <span className="block text-accent">{t("hero.subtitle")}</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">{t("hero.description")}</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
                      {t("cta.startProject")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] w-[95%]">
                    <ContactForm formType="project" />
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link href="#portfolio">{t("cta.viewWork")}</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="flex items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                    <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">{t("hero.features.fastDelivery")}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                    <Globe2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">{t("hero.features.multilingualSolutions")}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                    <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">{t("hero.features.secureSolutions")}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl p-6 overflow-hidden relative w-full md:w-1/2 h-[40vh] sm:h-[45vh] md:h-screen bg-slate-100 flex items-center justify-center overflow-hidden relative mt-6 md:mt-0">
            <div
              className="absolute w-[60%] h-[60%] top-[20%] left-[20%] rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 animate-pulse"
              style={{ animationDuration: "7s" }}
            ></div>
            <div
              className="absolute w-[70%] h-[70%] top-[15%] left-[15%] rounded-full border-4 border-emerald-500/20 animate-spin"
              style={{ animationDuration: "15s" }}
            ></div>
            <div
              className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full border-2 border-dashed border-emerald-500/10 animate-spin"
              style={{ animationDuration: "25s", animationDirection: "reverse" }}
            ></div>

            <div className="absolute top-[20%] left-[25%] text-emerald-500/70 font-mono text-xs">function()</div>
            <div className="absolute top-[30%] left-[55%] text-emerald-500/70 font-mono text-xs">const app = ()</div>
            <div className="absolute top-[60%] left-[30%] text-emerald-500/70 font-mono text-xs">
              {"return <App />"}
            </div>
            <div className="absolute top-[70%] left-[50%] text-emerald-500/70 font-mono text-xs">export default</div>

            <div
              className="absolute top-[25%] left-[20%] w-6 h-6 bg-emerald-500/30 rounded-md animate-bounce"
              style={{ animationDuration: "4s" }}
            ></div>
            <div
              className="absolute top-[40%] left-[70%] w-4 h-4 bg-emerald-500/40 rounded-full animate-bounce"
              style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-[65%] left-[25%] w-5 h-5 bg-emerald-500/30 rounded-full animate-bounce"
              style={{ animationDuration: "4.5s", animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-[75%] left-[65%] w-3 h-3 bg-emerald-500/50 rounded-md animate-bounce"
              style={{ animationDuration: "3s", animationDelay: "1.5s" }}
            ></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg flex items-center justify-center z-10 rotate-45">
              <div className="rotate-[-45deg] text-white font-bold text-xl">DN</div>
            </div>

            <div className="absolute top-[15%] left-[50%] -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
              React
            </div>
            <div className="absolute top-[50%] left-[85%] -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
              TypeScript
            </div>
            <div className="absolute top-[85%] left-[50%] -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
              Node.js
            </div>
            <div className="absolute top-[50%] left-[15%] -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
              Next.js
            </div>
          </div>

          <div className="hidden w-full md:w-1/2 h-[40vh] sm:h-[45vh] md:h-screen bg-slate-100 flex items-center justify-center overflow-hidden relative mt-6 md:mt-0">
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

              {/* Floating skill badges - Only show on larger screens */}
              {skills.map((skill, index) => (
                <div className="hidden md:block" key={skill.name}>
                  <SkillBadge name={skill.name} position={skill.position} delay={0.8 + index * 0.2} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
