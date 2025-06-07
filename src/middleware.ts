import { defineMiddleware } from 'astro:middleware'; 
import { AuthService } from './services/AuthService';
 
// Protected routes that require authentication
const protectedRoutes = ['/dash'];
const bypassRoutes = ['/_','/api/','.','/auth'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;
  // Skip middleware for auth routes, API routes, and static assets
  if ( 
    bypassRoutes.some(route => pathname.includes(route))
  ) {
    return next();
  }
  console.log('Middleware for:', pathname);

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    (pathname === route ||  pathname.startsWith(route))
  ); 

  if (isProtectedRoute) {
    // Get token from cookies
    const token = cookies.get('auth-token')?.value; 
  console.log('Middleware token:', token);
    if (!token) {
      console.log('No token found, redirecting to login');
      return redirect('/auth/login?error=token+not+found');
    }

    try {
      // Verify JWT token
      const auth = new AuthService(console, import.meta.env.JWT_SECRET);
      const decoded = await auth.Validate(token); 
      
      // Add user info to context for use in pages
      context.locals.user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      };
    } catch (error) {
      console.log('Invalid token, redirecting to login:', error.message);
      // Clear invalid token
      cookies.set('auth-token', '', { path: '/' });
      return redirect(`/auth/login?error=${error.message}`);
    }
  }

  return next();
});