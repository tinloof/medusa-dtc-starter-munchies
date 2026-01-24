import type { StoreProduct } from "@medusajs/types";
import type { PRODUCT_QUERY_RESULT } from "@packages/sanity/types";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ProductVariantsProvider } from "@/components/context/product-context";
import { Body } from "@/components/shared/typography/body";
import { Heading } from "@/components/shared/typography/heading";
// import AddToCart from "./add-to-cart";
// import Addons from "./addons";
import { BreadCrumbs } from "./breadcrumbs";
import { OptionsSelect } from "./options-select";
import { Price } from "./price";
import { Specs } from "./specs";

type Props = {
  content: PRODUCT_QUERY_RESULT;
  region_id: string;
} & StoreProduct;

export default function ProductInformation(props: Props) {
  return (
    <NuqsAdapter>
      <ProductVariantsProvider product={props}>
        <div className="lg:y-s flex w-full flex-col gap-lg px-m pt-s pb-2xl lg:max-w-145">
          <BreadCrumbs collection={props.collection} title={props.title} />
          <Heading
            className="leading-[100%]"
            desktopSize="5xl"
            mobileSize="2xl"
            tag="h1"
          >
            {props.title}
          </Heading>
          <Price product={{ id: props.id, variants: props.variants }} />
          <Body
            className="font-normal"
            desktopSize="lg"
            font="sans"
            mobileSize="base"
          >
            {props.description}
          </Body>
          <div className="mt-s flex flex-col gap-s">
            {props.options ? <OptionsSelect options={props.options} /> : null}
            {/*   <AddToCart region_id={props.region_id} variant="PDP" /> */}
          </div>
          {/* <Addons */}
          {/*   products={props.content?.addons?.products} */}
          {/*   region_id={props.region_id} */}
          {/*   title={props.content?.addons?.title} */}
          {/* /> */}
          <Specs specs={props.content?.specs} />
        </div>
      </ProductVariantsProvider>
    </NuqsAdapter>
  );
}
