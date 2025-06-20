'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/use-translation'

export function TestimonialsSection() {
  const { t } = useTranslation()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const testimonials = [
    {
      name: t('testimonials.jenny.name'),
      company: t('testimonials.jenny.company'),
      image: '/placeholder.svg?height=100&width=100',
      text: t('testimonials.jenny.text'),
      stars: 5,
    },
    {
      name: t('testimonials.daniela.name'),
      company: t('testimonials.daniela.company'),
      image: '/placeholder.svg?height=100&width=100',
      text: t('testimonials.daniela.text'),
      stars: 5,
    },
    {
      name: t('testimonials.markus.name'),
      company: t('testimonials.markus.company'),
      image: '/placeholder.svg?height=100&width=100',
      text: t('testimonials.markus.text'),
      stars: 5,
    },
    {
      name: t('testimonials.laura.name'),
      company: t('testimonials.laura.company'),
      image: '/placeholder.svg?height=100&width=100',
      text: t('testimonials.laura.text'),
      stars: 5,
    }
  ]

  return (
    <section ref={ref} id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
            {t('sections.testimonials')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.heading')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.subheading')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-10 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div>
                    <div className="flex mb-4">
                      {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-foreground italic mb-6">
                      &quot;{testimonials[activeTestimonial].text}&quot;
                    </blockquote>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonials[activeTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-3 items-center">
            <button
              onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2.5 text-accent hover:text-accent/80 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${activeTestimonial === index ? 'bg-accent' : 'bg-slate-300'
                  }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
            <button
              onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
              className="p-2.5 text-accent hover:text-accent/80 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
