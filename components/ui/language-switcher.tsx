'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/use-translation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LanguageSwitcher() {
  const { locale } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // 1. Get the path without the current locale
    // Assumes locale is always the first segment
    const currentLocale = pathname.split('/')[1]
    const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
      ? pathname.substring(currentLocale.length + 1)
      : pathname;

    // 2. Navigate to the new locale path
    // Ensure pathWithoutLocale starts with a leading slash if it's not empty
    const newPath = `/${newLocale}${pathWithoutLocale.startsWith('/') ? pathWithoutLocale : ('/' + pathWithoutLocale)}`;
    router.push(newPath)
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
