import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider, LocaleKey } from "@/components/i18n-provider"
import { Analytics } from "@/components/analytics"
import { SonnerProvider } from "@/components/ui/sonner-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dan Nistor | Full-Stack Developer & Designer",
  description:
    "Full-stack developer and designer based in Zurich, Switzerland, specializing in creating custom digital solutions for businesses.",
  keywords: "full-stack developer, web designer, software engineer, zurich, switzerland, react, typescript, nextjs"
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: LocaleKey }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <I18nProvider locale={locale}>
            {children}
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <SonnerProvider />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'