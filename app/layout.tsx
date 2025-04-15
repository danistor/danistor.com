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

// Add your specific details here
const authorName = "Dan Nistor";
const authorUrl = "https://your-website.com"; // Change this!
const siteUrl = "https://your-website.com"; // Change this!

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important for resolving relative paths
  title: `${authorName} | Full-Stack Developer & Designer`,
  description:
    "Full-stack developer and designer based in Zurich, Switzerland, specializing in creating custom digital solutions for businesses.",
  keywords: "full-stack developer, web designer, software engineer, zurich, switzerland, react, typescript, nextjs",
  authors: [{ name: authorName, url: authorUrl }],
  creator: authorName,
  // Add Open Graph and Twitter card details for better sharing previews
  openGraph: {
    title: `${authorName} | Full-Stack Developer & Designer`,
    description: "Full-stack developer and designer based in Zurich, Switzerland...", // Be concise
    url: siteUrl,
    siteName: `${authorName} Portfolio`,
    // images: [
    //   {
    //     url: '/og-image.png', // Must be an absolute URL or start with /
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'en_US', // Default locale for OG
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${authorName} | Full-Stack Developer & Designer`,
    description: "Full-stack developer and designer based in Zurich, Switzerland...", // Be concise
    // siteId: 'yourTwitterId',
    // creator: '@yourTwitterHandle',
    // creatorId: 'yourTwitterId',
    // images: ['/twitter-image.png'], // Must be an absolute URL or start with /
  },
  // robots: { // Example robots config
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // icons: { // Example icons config
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
}

// Basic Person JSON-LD Schema
const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: authorName,
  url: authorUrl,
  // Add other relevant properties like sameAs (LinkedIn, GitHub), jobTitle, etc.
  // "sameAs": [
  //   "https://www.linkedin.com/in/yourprofile",
  //   "https://github.com/yourprofile"
  // ]
};

// Basic root layout, only html and body tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

import './globals.css'