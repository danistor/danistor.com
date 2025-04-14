"use client"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

interface CookieConsentProps {
  onAccept: () => void
}

export function CookieConsent({ onAccept }: CookieConsentProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">{t("cookies.message")}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onAccept}>
            {t("cookies.decline")}
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-white" size="sm" onClick={onAccept}>
            {t("cookies.accept")}
          </Button>
        </div>
      </div>
    </div>
  )
}
