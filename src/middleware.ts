import { defineMiddleware } from 'astro:middleware'; 

const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';

// Protected routes that require authentication
const protectedRoutes = ['/dash'];

export const onRequest = async (context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;

  console.log('Middleware executing for:', pathname);

  // Skip middleware for auth routes, API routes, and static assets
  if (
    !pathname.startsWith('/dash')  
  ) {
    console.log('Skipping middleware for:', pathname);
    return next();
  }

  // Check if current route is protected
  const isProtectedRoute = true

  console.log('Is protected route:', isProtectedRoute, 'for path:', pathname);

  if (isProtectedRoute) {
    // Get token from cookies
    const token = cookies.get('auth-token')?.value;
    console.log('Token found:', !!token);

    if (!token) {
      console.log('No token found, redirecting to login');
      return redirect('/auth/login');
    }

    try {
      // Verify JWT token
    //   const decoded = jwt.verify(token, JWT_SECRET) as any;
      console.log('Token verified for user:', token , JWT_SECRET);
      const decoded = token === JWT_SECRET ?  {
        id: 1,
        email: 'admin@example.com',
        password: 'password123', // In production, use hashed passwords
        name: 'Admin User',
        role: 'admin'
      }: false
      if(!decoded)
          throw new Error('Invalid token')
      
      // Add user info to context for use in pages
      context.locals.user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      };

      console.log('User authenticated:', decoded.email);
    } catch (error) {
      console.log('Invalid token, redirecting to login:', error.message);
      // Clear invalid token
      cookies.delete('auth-token', { path: '/' });
      return redirect('/auth/login');
    }
  }  
  return next();
}