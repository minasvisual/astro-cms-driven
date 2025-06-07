import { AuthService } from '@/services/AuthService';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const login =  defineAction({ 
  accept: 'form',
  input: z.object({
    username: z.string(),
    password: z.string().min(6).max(50)
  }),
  handler: async (input) => {
    try {
      console.log(`login`, input);
      const auth = new AuthService(console, import.meta.env.JWT_SECRET);
      const res = await auth.EmailLogin(input.username, input.password);
      return { 
        message: 'Login successfully!',
        token: res.token,
        user: res.user
      };
    } catch (error) {
      throw new Error('Login failed: '+error.message);
    }
  },
})  