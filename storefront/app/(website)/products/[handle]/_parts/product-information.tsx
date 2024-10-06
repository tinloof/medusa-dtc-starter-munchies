import type {Product} from "@/types/sanity.generated";
import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/body";
import {Cta} from "@/components/shared/button";
import Heading from "@/components/shared/heading";
import {getProductPrice} from "@/utils/medusa/get-product-price";

import Addons from "./addons";
import BreadCrumbs from "./breadcrumbs";
import OptionsSelect from "./options";
import ProductSpecs from "./specs";

type Props = Pick<
  StoreProduct,
  | "collection"
  | "description"
  | "id"
  | "options"
  | "subtitle"
  | "title"
  | "variants"
> &
  Pick<Product, "specs">;

export default function ProductInformation({
  collection,
  description,
  id,
  options,
  specs,
  title,
  variants,
}: Props) {
  const {cheapestPrice} = getProductPrice({
    product: {
      id,
      variants,
    },
  });

  return (
    <div className="lg:y-s flex w-full max-w-[580px] flex-col gap-lg px-m pb-2xl pt-s">
      <BreadCrumbs collection={collection} title={title} />
      <Heading desktopSize="5xl" mobileSize="2xl" tag="h1">
        {title}
      </Heading>
      {cheapestPrice?.calculated_price && (
        <Body desktopSize="xl" font="sans" mobileSize="lg">
          from {cheapestPrice.calculated_price}
        </Body>
      )}
      <Body desktopSize="lg" font="sans" mobileSize="base">
        {description}
      </Body>
      <div className="mt-s flex flex-col gap-s">
        {options && <OptionsSelect options={options} />}
        <Cta className="w-full" size="xl" variant="outline">
          Add to cart
        </Cta>
      </div>
      <Addons />
      <ProductSpecs specs={specs} />
    </div>
  );
}
