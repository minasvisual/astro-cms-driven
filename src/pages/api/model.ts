import { homeSchema } from '@/components/pages/home';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify(homeSchema),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};