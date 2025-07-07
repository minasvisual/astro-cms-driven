import type { APIRoute } from 'astro';

const users = [
    {
        id: 1,
        email: 'admin@example.com',
        password: 'password123', // In production, use hashed passwords
        name: 'Admin User',
        role: 'admin'
    },
    {
        id: 2,
        email: 'user@example.com',
        password: 'password123',
        name: 'Regular User',
        role: 'user'
    }
];
// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';

export const POST: APIRoute = async ({ cookies, request }) => {
    try {
      // Parse form data
      const formData = await request.formData();
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
  
      console.log('Login attempt:', { email, password });
  
      // Validate input
      if (!email || !password) {
        return new Response(
          JSON.stringify({ 
            error: 'Email and password are required' 
          }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
  
      // Find user
      const user = users.find(u => u.email === email && u.password === password);
  
      if (!user) {
        console.log('Invalid credentials for:', email);
        return new Response(
          JSON.stringify({ 
            error: 'Invalid email or password' 
          }),
          { 
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
  
      // Create JWT token
    //   const token = jwt.sign(
    //     { 
    //       userId: user.id,
    //       email: user.email,
    //       name: user.name,
    //       role: user.role
    //     },
    //     JWT_SECRET,
    //     { 
    //       expiresIn: '24h' 
    //     }
    //   );
  
      console.log('Login successful for:', email);
      console.log('Generated token:', JWT_SECRET);
      cookies.set('auth-token', JWT_SECRET, { path:'/' })
  
      // Return success response with token
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Login successful',
          token: JWT_SECRET,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
  
    } catch (error) {
      console.error('Login error:', error);
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