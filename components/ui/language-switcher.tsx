'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { LocaleKey } from '@/components/i18n-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const handleLanguageChange = (value: string) => {
    setLocale(value as LocaleKey)

    // In a real app, you would navigate to the localized route
    // This is a simplified version for the demo
    // router.push(`/${value}${pathname}`)
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[80px] border-border">
        <SelectValue placeholder={locale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="de">DE</SelectItem>
        <SelectItem value="fr">FR</SelectItem>
        <SelectItem value="it">IT</SelectItem>
      </SelectContent>
    </Select>
  )
}
