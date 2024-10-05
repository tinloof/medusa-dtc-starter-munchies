"use server";

import {z} from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
  //   formId: z.string(),
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
    console.log("email", email);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return "success";
  } catch (error) {
    return "error";
  }
}
