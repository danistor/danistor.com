import type React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Assuming globals.css is in the new root app/layout.tsx
// import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider, LocaleKey } from "@/components/i18n-provider";
import { Analytics } from "@/components/analytics";
import { SonnerProvider } from "@/components/ui/sonner-provider";
import { LocaleLayoutClientWrapper } from "@/components/layout/locale-layout-client-wrapper";

const inter = Inter({ subsets: ["latin"] });

// Add your specific details here
const authorName = "Dan Nistor";
const authorUrl = "https://your-website.com"; // Change this!
const siteUrl = "https://your-website.com"; // Change this!

// Using generateMetadata for dynamic locale handling
export async function generateMetadata({ params }: { params: { locale: LocaleKey } }): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);

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

// Define the supported locales explicitly for generateStaticParams - MOVED TO PAGE
// export async function generateStaticParams() {
//   const locales: LocaleKey[] = ['en', 'de', 'fr', 'it'];
//   return locales.map((locale) => ({ locale }));
// }

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
    // Root layout now handles <html> and <body>
    // We add the lang attribute here
    // Using a Fragment as the direct child of body is cleaner than adding a div
    <>
      {/* Render JSON-LD from the server component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      {/* Pass validated locale down to the client component */}
      <LocaleLayoutClientWrapper locale={validLocale}>
        <div lang={locale} className={inter.className}> {/* Pass locale directly */}
          <ThemeProvider attribute="class" defaultTheme="light">
            <I18nProvider locale={locale}>
              {children}
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
              <SonnerProvider />
            </I18nProvider>
          </ThemeProvider>
        </div>
      </LocaleLayoutClientWrapper>
    </>
  );
} 