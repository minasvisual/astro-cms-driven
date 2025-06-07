import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { login } from './auth';

export const server = {
  save: defineAction({ 
    accept: 'form',
    input: z.any(),
    handler: async (input) => {
      console.log(`input`, input);
      return { message:   'Data saved successfully!' };
    },
  }),
  login: login
};
