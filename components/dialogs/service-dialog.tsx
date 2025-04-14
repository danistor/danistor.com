'use client'

import { Check } from 'lucide-react'
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/contact-form'
import { useTranslation } from '@/hooks/use-translation'

interface ServiceDialogProps {
  service?: {
    id: string
    title: string
    description: string
    features: string[]
  }
  formType?: 'general'
}

export function ServiceDialog({ service, formType }: ServiceDialogProps) {
  const { t } = useTranslation()

  if (formType === 'general') {
    return <ContactForm formType="general" />
  }

  if (!service) {
    return null
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{service.title}</DialogTitle>
        <DialogDescription>{t('serviceDialog.description')}</DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-4">
        <p className="text-muted-foreground">{service.description}</p>
        <h4 className="font-medium text-foreground">{t('serviceDialog.features')}</h4>
        <ul className="space-y-2">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <h4 className="font-medium text-foreground">{t('serviceDialog.benefits')}</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              {t('serviceDialog.benefitsList.efficiency')}
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              {t('serviceDialog.benefitsList.experience')}
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              {t('serviceDialog.benefitsList.conversion')}
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              {t('serviceDialog.benefitsList.scalable')}
            </span>
          </li>
        </ul>
      </div>
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">{t('serviceDialog.close')}</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="bg-accent hover:bg-accent/90 text-white">
            {t('serviceDialog.requestQuote')}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}
