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

  const isEuropeanSpecificService = [
    'european-go-to-market-solutions',
    'multilingual-solutions',
    'european-payment',
    'data-compliance'
  ].includes(service.id)

  // Get service-specific benefits if they exist
  const serviceKey = `serviceDialog.serviceBenefits.${service.id}.benefit1`
  const hasServiceSpecificBenefits = t(serviceKey) !== serviceKey

  return (
    <>
      <DialogHeader>
        <DialogTitle>{service.title}</DialogTitle>
        <DialogDescription>{t('serviceDialog.description')}</DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-4">
        <p className="text-muted-foreground">{service.description}</p>
        <div>
          <h4 className="font-medium text-foreground mb-2">{t('serviceDialog.features')}</h4>
          <ul className="space-y-2">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-2">{t('serviceDialog.benefits')}</h4>
          <ul className="space-y-2">
            {/* Service-specific benefits */}
            {hasServiceSpecificBenefits && (
              <>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {t(`serviceDialog.serviceBenefits.${service.id}.benefit1`)}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {t(`serviceDialog.serviceBenefits.${service.id}.benefit2`)}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {t(`serviceDialog.serviceBenefits.${service.id}.benefit3`)}
                  </span>
                </li>
              </>
            )}

            {/* Common benefits only if no service-specific benefits */}
            {!hasServiceSpecificBenefits && (
              <>
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
              </>
            )}

            {/* European-specific benefits */}
            {isEuropeanSpecificService && (
              <>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {t('serviceDialog.benefitsList.localMarket')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {t('serviceDialog.benefitsList.compliance')}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <DialogFooter className="mt-6 gap-2">
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
