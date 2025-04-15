import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const authorName = "Dan Nistor";
const authorUrl = "https://danistor.com";
const siteUrl = "https://danistor.com";

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
    locale: 'en_US',
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
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: { // Example icons config
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
}

// Basic root layout, only html and body tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}