import Heading from "@/components/shared/typography/heading";
import {getProductsByIds} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import React from "react";

import type {ModularPageSection} from "../types";

import Hotspots from "./hotspots";

export default async function ShopTheLook(
  props: ModularPageSection<"section.shopTheLook">,
) {
  const region = await getRegion(
    // TODO: Make this come from the params
    process.env.NEXT_PUBLIC_MEDUSA_DEFAULT_COUNTRY_CODE!,
  );

  if (!region) {
    console.log("No region found");
    return null;
  }

  const ids = props.productHotSpots
    ?.map((hotSpot) => hotSpot.product?._ref)
    .filter((id): id is string => id !== undefined);

  if (!ids || ids.length === 0) return null;

  const {products} = await getProductsByIds(ids, region.id);

  return (
    <section
      {...props.rootHtmlAttributes}
      className="mx-auto flex w-full max-w-max-screen flex-col items-start gap-xs px-m py-2xl lg:px-xl"
    >
      <Heading desktopSize="3xl" font="serif" mobileSize="xl" tag="h3">
        {props.title}
      </Heading>

      {/* TODO: Add susspense */}
      <Hotspots
        image={props.image}
        productHotSpots={props.productHotSpots}
        products={products}
      />
    </section>
  );
}
