import type {Product} from "@/types/sanity.generated";
import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import {ProductVariantsProvider} from "../product-context";
import AddToCart from "./add-to-cart";
import Addons from "./addons";
import BreadCrumbs from "./breadcrumbs";
import OptionsSelect from "./options";
import Price from "./price";
import ProductSpecs from "./specs";

type Props = {region_id: string} & Pick<
  StoreProduct,
  | "collection"
  | "description"
  | "id"
  | "options"
  | "subtitle"
  | "title"
  | "variants"
> &
  Pick<Product, "addons" | "specs">;

export default function ProductInformation({
  addons,
  collection,
  description,
  id,
  options,
  region_id,
  specs,
  title,
  variants,
}: Props) {
  return (
    <ProductVariantsProvider options={options} variants={variants}>
      <div className="lg:y-s flex w-full max-w-[580px] flex-col gap-lg px-m pb-2xl pt-s">
        <BreadCrumbs collection={collection} title={title} />
        <Heading desktopSize="5xl" mobileSize="2xl" tag="h1">
          {title}
        </Heading>
        <Price product={{id, variants}} />
        <Body desktopSize="lg" font="sans" mobileSize="base">
          {description}
        </Body>
        <div className="mt-s flex flex-col gap-s">
          {options && <OptionsSelect options={options} />}
          <AddToCart />
        </div>
        <Addons
          products={addons?.products}
          region_id={region_id}
          title={addons?.title}
        />
        <ProductSpecs specs={specs} />
      </div>
    </ProductVariantsProvider>
  );
}
