"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ProjectDialog } from "@/components/dialogs/project-dialog"
import { useTranslation } from "@/hooks/use-translation"

export function PortfolioSection() {
  const { t } = useTranslation()
  const [activeProject, setActiveProject] = useState(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects = [
    {
      id: "ubs-banking",
      title: t("portfolio.ubs.title"),
      category: t("portfolio.ubs.category"),
      tags: ["React", "Node.js", "AWS", "Fintech"],
      image: "/placeholder.svg?height=600&width=800",
      description: t("portfolio.ubs.description"),
      challenge: t("portfolio.ubs.challenge"),
      solution: t("portfolio.ubs.solution"),
      results: [
        t("portfolio.ubs.results.engagement"),
        t("portfolio.ubs.results.costs"),
        t("portfolio.ubs.results.performance"),
      ],
      liveUrl: "https://example.com",
    },
    {
      id: "nestle-supply",
      title: t("portfolio.nestle.title"),
      category: t("portfolio.nestle.category"),
      tags: ["Angular", "Python", "Docker", "AI"],
      image: "/placeholder.svg?height=600&width=800",
      description: t("portfolio.nestle.description"),
      challenge: t("portfolio.nestle.challenge"),
      solution: t("portfolio.nestle.solution"),
      results: [
        t("portfolio.nestle.results.inventory"),
        t("portfolio.nestle.results.costs"),
        t("portfolio.nestle.results.efficiency"),
      ],
      liveUrl: "https://example.com",
    },
    {
      id: "swatch-ecommerce",
      title: t("portfolio.swatch.title"),
      category: t("portfolio.swatch.category"),
      tags: ["Next.js", "GraphQL", "Stripe", "Shopify"],
      image: "/placeholder.svg?height=600&width=800",
      description: t("portfolio.swatch.description"),
      challenge: t("portfolio.swatch.challenge"),
      solution: t("portfolio.swatch.solution"),
      results: [
        t("portfolio.swatch.results.sales"),
        t("portfolio.swatch.results.conversion"),
        t("portfolio.swatch.results.global"),
      ],
      liveUrl: "https://example.com",
    },
    {
      id: "zurich-tourism",
      title: t("portfolio.zurich.title"),
      category: t("portfolio.zurich.category"),
      tags: ["React Native", "Firebase", "Google Maps API"],
      image: "/placeholder.svg?height=600&width=800",
      description: t("portfolio.zurich.description"),
      challenge: t("portfolio.zurich.challenge"),
      solution: t("portfolio.zurich.solution"),
      results: [
        t("portfolio.zurich.results.downloads"),
        t("portfolio.zurich.results.engagement"),
        t("portfolio.zurich.results.ratings"),
      ],
      liveUrl: "https://example.com",
    },
  ]

  return (
    <section id="portfolio" ref={ref} className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.portfolio")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("portfolio.heading")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("portfolio.subheading")}</p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all">{t("portfolio.filters.all")}</TabsTrigger>
              <TabsTrigger value="web">{t("portfolio.filters.web")}</TabsTrigger>
              <TabsTrigger value="mobile">{t("portfolio.filters.mobile")}</TabsTrigger>
              <TabsTrigger value="ecommerce">{t("portfolio.filters.ecommerce")}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                  onSelect={() => setActiveProject(project)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects
                .filter((p) => p.tags.includes("React") || p.tags.includes("Angular") || p.tags.includes("Next.js"))
                .map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isInView={isInView}
                    onSelect={() => setActiveProject(project)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects
                .filter((p) => p.tags.includes("React Native"))
                .map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isInView={isInView}
                    onSelect={() => setActiveProject(project)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ecommerce" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects
                .filter(
                  (p) => p.tags.includes("Shopify") || p.tags.includes("Stripe") || p.category.includes("E-commerce"),
                )
                .map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isInView={isInView}
                    onSelect={() => setActiveProject(project)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10" asChild>
            <Link href="#contact">{t("cta.discussProject")}</Link>
          </Button>
        </div>

        {activeProject && (
          <Dialog open={!!activeProject} onOpenChange={() => setActiveProject(null)}>
            <DialogContent className="sm:max-w-[700px]">
              <ProjectDialog project={activeProject} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <div className="aspect-[16/9] bg-slate-100 overflow-hidden rounded-lg mb-4">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground">{project.category}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-background">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors transform group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  )
}
