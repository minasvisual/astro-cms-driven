import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  try {
    // Clear the auth token cookie 
    cookies.set('auth-token', '', {
      path: '/'
    });

    console.log('User logged out successfully');

    // Return success responsea
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Logged out successfully'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Logout error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Clear the auth token cookie
  cookies.set('auth-token', '', {
    path: '/'
  });

  console.log('User logged out via GET request');

  // Redirect to login page
  return redirect('/auth/login');
};