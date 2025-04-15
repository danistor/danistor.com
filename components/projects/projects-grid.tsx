'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/use-translation'
import { projectsData, getTranslatedProjects, type ProjectType } from '@/data/projects'

interface ProjectsGridProps {
  query?: string
  tag?: string
}

export function ProjectsGrid({ query = '', tag = '' }: ProjectsGridProps) {
  const { t } = useTranslation()
  const projects = getTranslatedProjects(t)

  // Filter projects based on search query and selected tag
  const filteredProjects = projects.filter((project) => {
    const matchesQuery = !query ||
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.category.toLowerCase().includes(query.toLowerCase())

    const matchesTag = !tag || project.tags.includes(tag)

    return matchesQuery && matchesTag
  })

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {filteredProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}

function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/projects/${project.id}`}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-lg"
      >
        <div className="aspect-[16/9] bg-muted overflow-hidden rounded-lg mb-3 md:mb-4 relative">
          <Image
            src={project.image || '/images/project-placeholder.jpg'}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">{project.category}</p>
            <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
              {project.tags.slice(0, 3).map((tag, i) => (
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
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-all transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </Link>
    </motion.div>
  )
} 