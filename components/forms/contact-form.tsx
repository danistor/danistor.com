"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useTranslation } from "@/hooks/use-translation"
import { useSonnerToast } from "@/hooks/use-sonner-toast"

interface ContactFormProps {
  formType: "contact" | "quote" | "project" | "general"
}

export function ContactForm({ formType }: ContactFormProps) {
  const { t } = useTranslation()
  const { toast } = useSonnerToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: t("form.success.title"),
      description: t("form.success.description"),
      type: "success",
    })

    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
    })
  }

  const getFormTitle = () => {
    switch (formType) {
      case "quote":
        return t("form.quote.title")
      case "project":
        return t("form.project.title")
      case "general":
        return t("form.general.title")
      default:
        return t("form.contact.title")
    }
  }

  const getFormDescription = () => {
    switch (formType) {
      case "quote":
        return t("form.quote.description")
      case "project":
        return t("form.project.description")
      case "general":
        return t("form.general.description")
      default:
        return t("form.contact.description")
    }
  }

  return (
    <>
      {(formType === "quote" || formType === "project" || formType === "general") && (
        <DialogHeader>
          <DialogTitle>{getFormTitle()}</DialogTitle>
          <DialogDescription>{getFormDescription()}</DialogDescription>
        </DialogHeader>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${formType}-name`}>{t("form.name")}</Label>
            <Input
              id={`${formType}-name`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t("form.namePlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${formType}-email`}>{t("form.email")}</Label>
            <Input
              id={`${formType}-email`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t("form.emailPlaceholder")}
              required
            />
          </div>
          {(formType === "quote" || formType === "project") && (
            <>
              <div className="space-y-2">
                <Label htmlFor={`${formType}-projectType`}>{t("form.projectType")}</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => handleSelectChange("projectType", value)}
                >
                  <SelectTrigger id={`${formType}-projectType`}>
                    <SelectValue placeholder={t("form.projectTypePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">{t("form.projectTypes.web")}</SelectItem>
                    <SelectItem value="mobile">{t("form.projectTypes.mobile")}</SelectItem>
                    <SelectItem value="ecommerce">{t("form.projectTypes.ecommerce")}</SelectItem>
                    <SelectItem value="enterprise">{t("form.projectTypes.enterprise")}</SelectItem>
                    <SelectItem value="other">{t("form.projectTypes.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${formType}-budget`}>{t("form.budget")}</Label>
                <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                  <SelectTrigger id={`${formType}-budget`}>
                    <SelectValue placeholder={t("form.budgetPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5k-10k">5,000 - 10,000 CHF</SelectItem>
                    <SelectItem value="10k-20k">10,000 - 20,000 CHF</SelectItem>
                    <SelectItem value="20k-50k">20,000 - 50,000 CHF</SelectItem>
                    <SelectItem value="50k+">50,000+ CHF</SelectItem>
                    <SelectItem value="not-sure">{t("form.budgetOptions.notSure")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor={`${formType}-message`}>{t("form.message")}</Label>
            <Textarea
              id={`${formType}-message`}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t("form.messagePlaceholder")}
              rows={4}
              required
            />
          </div>
        </div>
        {formType === "quote" || formType === "project" || formType === "general" ? (
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t("form.cancel")}
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? t("form.submitting") : t("form.submit")}
            </Button>
          </DialogFooter>
        ) : (
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isSubmitting}>
            {isSubmitting ? t("form.submitting") : t("form.submit")}
          </Button>
        )}
      </form>
    </>
  )
}
