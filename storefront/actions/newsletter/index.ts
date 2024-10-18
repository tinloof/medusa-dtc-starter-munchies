"use server";

import {Resend} from "resend";
import {z} from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const audiences = await resend.audiences.list();

    const audienceId = audiences.data?.data?.[0].id;

    if (!audienceId) throw new Error("No audience found");

    await resend.contacts.create({
      audienceId,
      email,
    });

    return "success";
  } catch (error) {
    return "error";
  }
}
