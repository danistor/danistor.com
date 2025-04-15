import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { LocaleKey } from "@/components/i18n-provider";
import { LocaleLayoutClientWrapper } from "@/components/layout/locale-layout-client-wrapper";

const inter = Inter({ subsets: ["latin"] });

// Add your specific details here
const authorName = "Dan Nistor";
const authorUrl = "https://your-website.com"; // Change this!
const siteUrl = "https://your-website.com"; // Change this!

// Using generateMetadata for dynamic locale handling
export async function generateMetadata({ params: _params }: { params: { locale: LocaleKey } }): Promise<Metadata> {
  const { locale } = await Promise.resolve(_params);

  // Here you could potentially load locale-specific titles/descriptions
  // For now, keeping it static but using params.locale for OG
  const ogLocale = locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'it' ? 'it_IT' : 'en_US';

  return {
    metadataBase: new URL(siteUrl),
    title: `${authorName} | Full-Stack Developer & Designer`, // Consider locale specific title
    description: "Full-stack developer and designer based in Zurich, Switzerland...", // Consider locale specific description
    keywords: "full-stack developer, web designer, software engineer, zurich, switzerland, react, typescript, nextjs",
    authors: [{ name: authorName, url: authorUrl }],
    creator: authorName,
    openGraph: {
      title: `${authorName} | Full-Stack Developer & Designer`,
      description: "Full-stack developer and designer based in Zurich, Switzerland...",
      url: `${siteUrl}/${locale}`, // Use locale variable
      siteName: `${authorName} Portfolio`,
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${authorName} | Full-Stack Developer & Designer`,
      description: "Full-stack developer and designer based in Zurich, Switzerland...",
    },
  };
}

// Basic Person JSON-LD Schema
const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: authorName,
  url: authorUrl,
};

// Server component extracts locale and renders client wrapper
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: LocaleKey };
}) {
  const { locale } = await Promise.resolve(params);
  const validLocale = ['en', 'de', 'fr', 'it'].includes(locale) ? locale : 'en';

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className={inter.className}>
        <LocaleLayoutClientWrapper locale={validLocale}>
          {children}
        </LocaleLayoutClientWrapper>
      </body>
    </html>
  )
} 