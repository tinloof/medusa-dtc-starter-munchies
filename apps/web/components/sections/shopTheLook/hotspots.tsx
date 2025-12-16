import {getProductsByIds} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import React from "react";

import type {ModularPageSection} from "../types";

import HotspotsUi from "./hotspots-ui";

export default async function Hotspots({
  countryCode,
  image,
  productHotSpots,
}: Pick<
  ModularPageSection<"section.shopTheLook">,
  "countryCode" | "image" | "productHotSpots"
>) {
  const region = await getRegion(countryCode);

  if (!region) {
    console.log("No region found");
    return null;
  }

  const ids = productHotSpots
    ?.map((hotSpot) => hotSpot.product?._ref)
    .filter((id): id is string => id !== undefined);

  if (!ids || ids.length === 0) return null;

  const {products} = await getProductsByIds(ids, region.id);
  return (
    <HotspotsUi
      image={image}
      productHotSpots={productHotSpots}
      products={products}
    />
  );
}
