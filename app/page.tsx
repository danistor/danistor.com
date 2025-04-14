import { MainLayout } from "@/components/layout/main-layout"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProcessSection } from "@/components/sections/process-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ClientsSection } from "@/components/sections/clients-section"

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ClientsSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <NewsletterSection />
    </MainLayout>
  )
}
