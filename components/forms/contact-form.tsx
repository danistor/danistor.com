"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

// Match validation schema from server
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(1000, {
    message: "Message cannot exceed 1000 characters."
  }),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  // Hidden field for honeypot
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm({ formType }: ContactFormProps) {
  const { t } = useTranslation()
  const { toast } = useSonnerToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      projectType: "",
      budget: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast({
        title: t("form.success.title"),
        description: t("form.success.description"),
        type: "success",
        duration: 7000,
      });

      reset();

      // Close the dialog if this form is in a modal
      if (formType !== "contact" && dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: t("form.error.title"),
        description: t("form.error.description"),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${formType}-name`}>{t("form.name")}</Label>
            <Input
              id={`${formType}-name`}
              {...register("name")}
              placeholder={t("form.namePlaceholder")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${formType}-email`}>{t("form.email")}</Label>
            <Input
              id={`${formType}-email`}
              type="email"
              {...register("email")}
              placeholder={t("form.emailPlaceholder")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          {(formType === "quote" || formType === "project") && (
            <>
              <div className="space-y-2">
                <Label htmlFor={`${formType}-projectType`}>{t("form.projectType")}</Label>
                <Select
                  onValueChange={(value) => {
                    // Use this approach for select with react-hook-form
                    const event = {
                      target: { name: "projectType", value }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    register("projectType").onChange(event);
                  }}
                >
                  <SelectTrigger id={`${formType}-projectType`}>
                    <SelectValue placeholder={t("form.projectTypePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">{t("form.projectTypes.web")}</SelectItem>
                    <SelectItem value="ecommerce">{t("form.projectTypes.ecommerce")}</SelectItem>
                    <SelectItem value="enterprise">{t("form.projectTypes.enterprise")}</SelectItem>
                    <SelectItem value="other">{t("form.projectTypes.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${formType}-budget`}>{t("form.budget")}</Label>
                <Select
                  onValueChange={(value) => {
                    // Use this approach for select with react-hook-form
                    const event = {
                      target: { name: "budget", value }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    register("budget").onChange(event);
                  }}
                >
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
              {...register("message")}
              placeholder={t("form.messagePlaceholder")}
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Honeypot field - hidden from users but bots will fill it */}
          <div className="hidden" aria-hidden="true">
            <Input
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>
        </div>
        {formType === "quote" || formType === "project" || formType === "general" ? (
          <DialogFooter className="mt-6">
            <DialogClose ref={dialogCloseRef} asChild>
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
