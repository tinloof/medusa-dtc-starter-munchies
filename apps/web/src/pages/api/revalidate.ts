import {
  CF_API_TOKEN,
  CF_ZONE_ID,
  REVALIDATION_SECRET,
} from "astro:env/server";
import type { APIRoute } from "astro";

interface CloudflareResponse {
  success: boolean;
  errors?: { message: string }[];
}

export const POST: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== REVALIDATION_SECRET) {
    return Response.json(
      {
        message: "Forbidden",
      },
      {
        status: 403,
      }
    );
  }

  try {
    const body = (await request.json()) as { tags?: string[] };

    const tags = body.tags;

    if (!Array.isArray(tags) || tags.length === 0) {
      return Response.json(
        { message: "Missing Tags" },
        {
          status: 400,
        }
      );
    }

    if (!(CF_ZONE_ID && CF_API_TOKEN)) {
      return Response.json(
        { message: "Cloudflare credentials not configured" },
        {
          status: 500,
        }
      );
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      }
    );

    const res = (await response.json()) as CloudflareResponse;

    if (!(response.ok && res.success)) {
      return Response.json(
        {
          message: res.errors?.[0]?.message || "Purge failed",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      purgedTags: body.tags,
    });
  } catch {
    return Response.json(
      {
        message: "Invalid JSON",
      },
      {
        status: 400,
      }
    );
  }
};
