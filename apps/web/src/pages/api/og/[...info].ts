import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import type { ReactElement } from "react";

import ProductOg from "@/components/shared/product-og";
import climateCrisisFont from "@/fonts/ClimateCrisis-Regular.ttf";
import instrumentSansFont from "@/fonts/InstrumentSans-Medium.ttf";

import instrumentSerifFont from "@/fonts/InstrumentSerif-Regular.ttf";
import { getProductByHandle } from "@/lib/medusa/products";
import { getRegion } from "@/lib/medusa/regions";

export const GET: APIRoute = async ({ params, request }) => {
  const info = params.info?.split("/") ?? [];
  const origin = new URL(request.url).origin;

  const [instrumentSerif, instrumentSans, climateCrisis] = await Promise.all([
    fetch(new URL(instrumentSerifFont, origin)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(new URL(instrumentSansFont, origin)).then((res) => res.arrayBuffer()),
    fetch(new URL(climateCrisisFont, origin)).then((res) => res.arrayBuffer()),
  ]);

  try {
    const responseOptions = {
      fonts: [
        {
          data: instrumentSerif,
          name: "Instrument Serif",
          style: "normal" as const,
          weight: 400 as const,
        },
        {
          data: instrumentSans,
          name: "Instrument Sans",
          style: "normal" as const,
          weight: 500 as const,
        },
        {
          data: climateCrisis,
          name: "Climate Crisis",
          style: "normal" as const,
          weight: 400 as const,
        },
      ],
      height: 630,
      width: 1200,
    };

    if (info[1] !== "products") {
      return new Response("Invalid type", { status: 400 });
    }

    const countryCode = info[0];
    const handle = info[2];

    const region = await getRegion(countryCode);
    if (!region) {
      console.log("No region found");
      return new Response("Region not found", { status: 404 });
    }

    const product = await getProductByHandle(handle, region.id);
    if (!product) {
      console.log("No product found");
      return new Response("Product not found", { status: 404 });
    }

    const response = new ImageResponse(
      ProductOg({ product }) as unknown as ReactElement,
      responseOptions
    );

    response.headers.set("Cache-Tag", `products,products:${handle}`);

    return response;
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
};
