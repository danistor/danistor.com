"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/forms/contact-form"
import { SocialLinks } from "@/components/ui/social-links"
import { useTranslation } from "@/hooks/use-translation"

export function ContactSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.contact")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t("contact.heading")}</h2>
            <p className="text-muted-foreground mb-8">{t("contact.subheading1")}</p>
            <p className="text-muted-foreground mb-8">{t("contact.subheading2")}</p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{t("contact.email")}</h4>
                  <a
                    href="mailto:hello@danistor.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    hello@danistor.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{t("contact.location")}</h4>
                  <p className="text-muted-foreground">{t("contact.address")}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-4">{t("contact.followMe")}</h4>
              <SocialLinks className="text-muted-foreground hover:text-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-shadow border border-border rounded-lg">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">{t("contact.formTitle")}</h3>
                <ContactForm formType="contact" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
