import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define a list of protected routes
const protectedRoutes = ['/Tradecommodities'];

// Middleware function to protect routes
export function middleware(req: NextRequest) {
  // Get the current path being accessed
  const { pathname } = req.nextUrl;

  // If the route is protected, check if the user is authenticated
  if (protectedRoutes.includes(pathname)) {
    // Get the token from cookies or session (you may be using JWT, Supabase, Clerk, etc.)
    const token = req.cookies.get('token'); // Example, adjust based on your auth implementation

    // If no token, redirect to login page
    if (!token) {
      const loginUrl = new URL('/login', req.url); // Redirect to login
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is authenticated or the route is not protected, continue
  return NextResponse.next();
}

// Apply the middleware to all routes
export const config = {
  matcher: ['/Tradecommodities*'], // Protect all subroutes under /Tradecommodities
};

