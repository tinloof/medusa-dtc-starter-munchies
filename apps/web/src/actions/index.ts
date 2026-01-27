import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { cart } from "./medusa/cart";
import { order } from "./medusa/order";

export const server = {
  cart,
  order,
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
