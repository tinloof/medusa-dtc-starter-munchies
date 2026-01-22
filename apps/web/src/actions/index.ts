import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  getGreeting: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
    }),
    handler: (input) => {
      return `Hello, ${input.email}!`;
    },
  }),
};
