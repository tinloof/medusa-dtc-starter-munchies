import {getProductsByIds} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import React from "react";

import type {ModularPageSection} from "./types";

import EmblaCarousel from "../shared/carousel";
import ProductCard from "../shared/product-card";

export default async function FeaturedProducts(
  props: ModularPageSection<"section.featuredProducts">,
) {
  const region = await getRegion(
    // TODO: Make this come from the params
    process.env.NEXT_PUBLIC_MEDUSA_DEFAULT_COUNTRY_CODE!,
  );

  if (!region) {
    console.log("No region found");
    return null;
  }

  const ids =
    props.products
      ?.map((product) => product?._id)
      .filter((id): id is string => id !== undefined) || [];

  if (!ids || ids.length === 0) return null;

  const {products} = await getProductsByIds(ids, region.id);

  const slides = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <section {...props.rootHtmlAttributes}>
      <EmblaCarousel
        cta={{href: props.cta?.link, text: props.cta?.label}}
        slides={slides}
        title={props.title}
      />
    </section>
  );
}
