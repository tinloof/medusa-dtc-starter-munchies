import {getProductsByIds} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";

import type {ModularPageSection} from "./types";

import CarouselSection from "../shared/carousel-section";
import ProductCard from "../shared/product-card";
import Heading from "../shared/typography/heading";

export default async function FeaturedProducts(
  props: ModularPageSection<"section.featuredProducts">,
) {
  const region = await getRegion(props.countryCode);

  if (!region) {
    console.log("No region found");
    return null;
  }

  const ids =
    props.products
      ?.map((product) => product?._ref)
      .filter((id): id is string => id !== undefined) || [];

  if (!ids || ids.length === 0) return null;

  const {products} = await getProductsByIds(ids, region.id);

  const slides = products.map((product, index) => (
    <ProductCard index={index} key={product.id} product={product} />
  ));
  return (
    <section {...props.rootHtmlAttributes}>
      <CarouselSection
        cta={{href: props.cta?.link, text: props.cta?.label}}
        slides={slides}
        title={
          <Heading
            className="text-center"
            desktopSize="3xl"
            mobileSize="lg"
            tag="h3"
          >
            {props.title}
          </Heading>
        }
      />
    </section>
  );
}
