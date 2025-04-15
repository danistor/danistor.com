import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';

// Your supported locales
const locales: string[] = ['en', 'de', 'fr', 'it'];
const defaultLocale = 'en';

// Password protection config
const isPasswordProtected = process.env.PASSWORD_PROTECTED === 'true';
const sitePassword = process.env.SITE_PASSWORD || 'default-password';

function getLocale(request: NextRequest): string {
  // 1. Check cookies
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  if (localeCookie && locales.includes(localeCookie.value)) {
    return localeCookie.value;
  }

  // 2. Check Accept-Language header
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return matchLocale(languages, locales, defaultLocale);
  } catch (e) {
    // Handle potential errors during matching, fallback to default
    console.warn("Error matching locale:", e);
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // CORS configuration for API routes
  if (pathname.startsWith('/api/contact')) {
    const origin = request.headers.get('origin') || '';

    // Only allow your own domain in production
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? [process.env.NEXT_PUBLIC_SITE_URL || '']
      : ['http://localhost:3000'];

    const response = NextResponse.next();

    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  }

  // Skip middleware for other static assets, API routes, etc.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|webp)$/)
  ) {
    return;
  }

  // Password protection check
  if (isPasswordProtected) {
    // Skip auth check for the login page itself - check both /login and /[locale]/login patterns
    if (pathname === '/login' || locales.some(locale => pathname === `/${locale}/login`)) {
      return NextResponse.next();
    }

    // Check if user is authenticated
    const authCookie = request.cookies.get('auth_token');
    if (!authCookie || authCookie.value !== sitePassword) {
      // Redirect unauthenticated users to login page
      const locale = getLocale(request);
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if the pathname already has a supported locale prefix
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Redirect to the same path with the detected locale prefix
    const newUrl = new URL(`/${locale}${pathname.startsWith('/') ? pathname : '/' + pathname}`, request.url);
    const response = NextResponse.redirect(newUrl);

    // Optionally set cookie for preference
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 days

    return response;
  }

  // If locale is present, potentially set cookie if not already set
  const currentLocale = pathname.split('/')[1];
  if (locales.includes(currentLocale) && !request.cookies.has('NEXT_LOCALE')) {
    const response = NextResponse.next(); // Continue processing
    response.cookies.set('NEXT_LOCALE', currentLocale, { path: '/', maxAge: 60 * 60 * 24 * 30 });
    return response;
  }

  // No redirect needed, continue
  return undefined;
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