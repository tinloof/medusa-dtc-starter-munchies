"use server";

import medusa from "@/data/medusa/client";
import {z} from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function newsletterForm(
  prev_state: string,
  formData: FormData,
): Promise<string> {
  const {data, success} = newsletterSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) return "error";
  const {email} = data;
  try {
    await medusa.client.fetch("/store/subscribe-to-newsletter", {
      body: {
        email,
      },
      method: "POST",
    });
    return "success";
  } catch (error) {
    return "error";
  }
}
