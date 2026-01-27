import { ActionError, defineAction } from "astro:actions";
import {
  PUBLIC_MEDUSA_BACKEND_URL,
  PUBLIC_MEDUSA_PUBLISHABLE_KEY,
} from "astro:env/server";
import { z } from "astro/zod";
import { cart } from "./medusa/cart";
import { order } from "./medusa/order";

export const server = {
  cart,
  order,
  subscribeToNewsletter: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
    }),
    async handler(input) {
      try {
        const res = await fetch(
          `${PUBLIC_MEDUSA_BACKEND_URL}/store/subscribe-to-newsletter`,
          {
            body: JSON.stringify({ email: input.email }),
            headers: {
              "Content-Type": "application/json",
              "X-Publishable-Api-Key": PUBLIC_MEDUSA_PUBLISHABLE_KEY,
            },
            method: "post",
          }
        );

        if (!res.ok) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Request failed",
          });
        }

        return "success";
      } catch {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Request failed",
        });
      }
    },
  }),
};
