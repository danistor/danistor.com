"use client"

import { Check, ExternalLink } from "lucide-react"
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ContactForm } from "@/components/forms/contact-form"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

interface ProjectDialogProps {
  project: {
    id: string
    title: string
    category: string
    tags: string[]
    image: string
    description: string
    challenge: string
    solution: string
    results: string[]
    liveUrl: string
  }
}

export function ProjectDialog({ project }: ProjectDialogProps) {
  const { t } = useTranslation()

  return (
    <>
      <DialogHeader>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>{project.category}</DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-4">
        <div className="aspect-[16/9] bg-slate-100 overflow-hidden rounded-lg relative">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" className="object-cover" />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h4 className="font-medium text-foreground">{t("projectDialog.overview")}</h4>
        <p className="text-muted-foreground">{project.description}</p>
        <h4 className="font-medium text-foreground">{t("projectDialog.challenge")}</h4>
        <p className="text-muted-foreground">{project.challenge}</p>
        <h4 className="font-medium text-foreground">{t("projectDialog.solution")}</h4>
        <p className="text-muted-foreground">{project.solution}</p>
        <h4 className="font-medium text-foreground">{t("projectDialog.results")}</h4>
        <ul className="space-y-2">
          {project.results.map((result, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{result}</span>
            </li>
          ))}
        </ul>
      </div>
      <DialogFooter className="mt-6">
        <Button variant="outline" asChild>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            {t("projectDialog.visitSite")}
          </a>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-white">{t("projectDialog.similarRequest")}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <ContactForm formType="project" />
          </DialogContent>
        </Dialog>
      </DialogFooter>
    </>
  )
}
