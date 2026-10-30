import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Hanya ambil token sesi dari cookies
  const session = request.cookies.get('app_session')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  // Jika tidak ada sesi dan bukan di halaman login, arahkan ke login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah ada sesi tapi mencoba mengakses halaman login, arahkan ke dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Biarkan request lain lewat
  return NextResponse.next();
}

// Konfigurasi matcher yang sangat spesifik untuk menghindari file statis dan API
export const config = {
  matcher: [
    /*
     * Match semua rute KECUALI:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /_static/ (statis files)
     * 4. /favicon.ico, /sitemap.xml (file publik)
     * 5. Ekstensi file publik seperti .svg, .png, .jpg
     */
    '/((?!api|_next/static|_next/image|_static|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg).*)',
  ],
};
