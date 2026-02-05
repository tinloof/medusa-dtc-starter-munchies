import { validatePreviewUrl } from "@sanity/preview-url-secret";
import type { APIRoute } from "astro";
import { client } from "@/lib/sanity/client";

export const GET: APIRoute = async ({ url, redirect, cookies }) => {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client.withConfig({ useCdn: false }),
    url.toString()
  );

  if (!isValid) {
    return new Response("Invalid preview URL", { status: 401 });
  }

  const isLocalhost =
    url.hostname === "localhost" || url.hostname === "127.0.0.1";

  // Enable draft mode via cookie
  // Use relaxed settings for localhost (HTTP), strict for production (HTTPS)
  cookies.set("sanity-draft-mode", "true", {
    path: "/",
    httpOnly: true,
    sameSite: isLocalhost ? "lax" : "none",
    secure: !isLocalhost,
  });

  return redirect(redirectTo);
};
