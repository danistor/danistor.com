import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Define the supported locales
const LOCALES = ['en', 'de', 'fr', 'it'];
const DEFAULT_LOCALE = 'en';

// Cache the negotiator headers for performance
const NEGOTIATOR_HEADERS = ['accept-language'];

function getLocale(request: NextRequest): string {
  // Get the preferred locale from cookie if available
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // For browser requests, negotiate based on the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const negotiator = new Negotiator({
      headers: { 'accept-language': acceptLanguage },
    });

    try {
      return matchLocale(
        negotiator.languages(NEGOTIATOR_HEADERS),
        LOCALES,
        DEFAULT_LOCALE
      );
    } catch (e) {
      console.error('Error negotiating locale:', e);
    }
  }

  // Fall back to default locale
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for API routes, static files, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Password protection check
  const passwordProtected = process.env.PASSWORD_PROTECTED === 'true';
  const isLoginPage = LOCALES.some(
    (locale) => pathname === `/${locale}/login`
  );

  if (passwordProtected && !isLoginPage) {
    const authToken = request.cookies.get('auth_token')?.value;
    const sitePassword = process.env.SITE_PASSWORD;

    // If auth token doesn't match the site password, redirect to login
    if (!authToken || authToken !== sitePassword) {
      const locale = getLocale(request);
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname doesn't have a locale, redirect
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;

    // 308 is permanent redirect, preserves method & body
    return NextResponse.redirect(newUrl, { status: 308 });
  }

  // Continue for paths that already have a locale
  return NextResponse.next();
}

// Define paths for which the middleware should run
export const config = {
  matcher: [
    // Skip internal paths
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    // Add API paths that need middleware
    '/api/contact'
  ],
}; 