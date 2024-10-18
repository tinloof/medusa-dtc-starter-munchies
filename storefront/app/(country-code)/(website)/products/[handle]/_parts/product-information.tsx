import type {PRODUCT_QUERYResult} from "@/types/sanity.generated";
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

type Props = {
  content: PRODUCT_QUERYResult;
  region_id: string;
} & Pick<
  StoreProduct,
  | "collection"
  | "description"
  | "id"
  | "options"
  | "subtitle"
  | "title"
  | "variants"
>;

export default function ProductInformation({
  collection,
  content,
  description,
  id,
  options,
  region_id,
  title,
  variants,
}: Props) {
  return (
    <ProductVariantsProvider options={options} variants={variants}>
      <div className="lg:y-s flex w-full flex-col gap-lg px-m pb-2xl pt-s lg:max-w-[580px]">
        <BreadCrumbs collection={collection} title={title} />
        <Heading
          className="leading-[100%]"
          desktopSize="5xl"
          mobileSize="2xl"
          tag="h1"
        >
          {title}
        </Heading>
        <Price product={{id, variants}} />
        <Body
          className="font-normal"
          desktopSize="lg"
          font="sans"
          mobileSize="base"
        >
          {description}
        </Body>
        <div className="mt-s flex flex-col gap-s">
          {options && <OptionsSelect options={options} />}
          <AddToCart region_id={region_id} variant="PDP" />
        </div>
        <Addons
          products={content?.addons?.products}
          region_id={region_id}
          title={content?.addons?.title}
        />
        <ProductSpecs specs={content?.specs} />
      </div>
    </ProductVariantsProvider>
  );
}
