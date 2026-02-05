import type { APIRoute } from "astro";

export const POST: APIRoute = ({ cookies }) => {
  cookies.delete("sanity-draft-mode", { path: "/" });
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
