import type React from "react";
import type { Metadata } from "next";
import type { LocaleKey } from "@/components/i18n-provider";
import { LocaleLayoutClientWrapper } from "@/components/layout/locale-layout-client-wrapper";
import Script from "next/script";

// Add your specific details here
const authorName = "Dan Nistor";
const authorUrl = "https://danistor.com";
const siteUrl = "https://danistor.com";

// Using generateMetadata for dynamic locale handling
export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleKey }> }): Promise<Metadata> {
  // Resolve the Promise params in Next.js 15.3
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

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
      images: [
        {
          url: `/api/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: `${authorName} - Portfolio`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${authorName} | Full-Stack Developer & Designer`,
      description: "Full-stack developer and designer based in Zurich, Switzerland...",
      images: [`/api/og?locale=${locale}`],
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

// Create a stable string representation of the JSON-LD
const jsonLdString = JSON.stringify(jsonLdPerson);

// Server component extracts locale and renders client wrapper
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: LocaleKey }>;
}) {
  // In Next.js 15, params are a Promise that need to be awaited
  const resolvedParams = await params;

  // Validate the locale
  const validLocale = ['en', 'de', 'fr', 'it'].includes(resolvedParams.locale) ? resolvedParams.locale : 'en';

  return (
    <>
      <Script
        id="jsonld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
        strategy="afterInteractive"
      />
      <LocaleLayoutClientWrapper locale={validLocale}>
        {children}
      </LocaleLayoutClientWrapper>
    </>
  )
} 