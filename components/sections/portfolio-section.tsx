"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from 'next/image'
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ProjectDialog } from "@/components/dialogs/project-dialog"
import { useTranslation } from "@/hooks/use-translation"
import { getTranslatedProjects } from "@/data/projects"
import type { ProjectType } from "@/data/projects"

export function PortfolioSection() {
  const { t } = useTranslation()
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects: ProjectType[] = getTranslatedProjects(t)

  return (
    <section id="portfolio" ref={ref} className="py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <Badge className="mb-3 md:mb-4 bg-accent/10 text-accent hover:bg-accent/20">{t("sections.portfolio")}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">{t("portfolio.heading")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t("portfolio.subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {projects.map((project: ProjectType, index: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onSelect={() => setActiveProject(project)}
            />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10" asChild>
            <Link href="#contact">{t("cta.discussProject")}</Link>
          </Button>
        </div>

        {activeProject && (
          <Dialog open={!!activeProject} onOpenChange={() => setActiveProject(null)}>
            <DialogContent className="sm:max-w-[700px] w-[95%] max-h-[90vh] overflow-y-auto">
              <ProjectDialog project={activeProject} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  isInView: boolean;
  onSelect: () => void;
}

function ProjectCard({ project, index, isInView, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="aspect-[16/9] bg-slate-100 overflow-hidden rounded-lg mb-3 md:mb-4 relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-base md:text-lg font-medium text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground">{project.category}</p>
          <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
            {project.tags.slice(0, 3).map((tag: string, i: number) => (
              <Badge key={i} variant="outline" className="text-xs bg-background px-1.5 py-0.5">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-background px-1.5 py-0.5">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-accent transition-colors transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </div>
    </motion.div>
  )
}
