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
import type { LocaleKey } from "@/components/i18n-provider";

// Define the supported locales explicitly for generateStaticParams
export async function generateStaticParams() {
  const locales: LocaleKey[] = ['en', 'de', 'fr', 'it'];
  return locales.map((locale) => ({ locale }));
}

// In Next.js 15.3, params are actually a Promise that needs to be awaited
export default async function Home({ params }: { params: Promise<{ locale: LocaleKey }> }) {
  // Resolve the Promise params
  const resolvedParams = await params;

  return (
    <MainLayout>
      <HeroSection />
      {/* <ClientsSection /> */}
      {/* <StatsSection /> */}
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