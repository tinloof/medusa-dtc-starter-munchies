import type { StoreProduct } from "@medusajs/types";
import { NuqsAdapter } from "nuqs/adapters/react";
import type { PRODUCT_QUERY_RESULT } from "sanity.types";
import { ProductVariantsProvider } from "@/components/context/product-context";
import { Body } from "@/components/shared/typography/body";
import { Heading } from "@/components/shared/typography/heading";
import { AddToCart } from "../cart/add-to-cart";
import { Addons } from "./addons";
import { BreadCrumbs } from "./breadcrumbs";
import { OptionsSelect } from "./options-select";
import { Price } from "./price";
import { Specs } from "./specs";

interface Props {
  content: PRODUCT_QUERY_RESULT;
  addons: StoreProduct[];
  regionId: string;
  searchParams: string;
  product: StoreProduct;
}

export function ProductInformation(props: Props) {
  return (
    <NuqsAdapter>
      <ProductVariantsProvider
        product={props.product}
        searchParams={props.searchParams}
      >
        <div className="lg:y-s flex w-full flex-col gap-lg px-m pt-s pb-2xl lg:max-w-145">
          <BreadCrumbs
            collection={props.product.collection}
            title={props.product.title}
          />
          <Heading
            className="leading-[100%]"
            desktopSize="5xl"
            mobileSize="2xl"
            tag="h1"
          >
            {props.product.title}
          </Heading>
          <Price
            product={{ id: props.product.id, variants: props.product.variants }}
          />
          <Body
            className="font-normal"
            desktopSize="lg"
            font="sans"
            mobileSize="base"
          >
            {props.product.description}
          </Body>
          <div className="mt-s flex flex-col gap-s">
            {props.product.options ? (
              <OptionsSelect options={props.product.options} />
            ) : null}
            <AddToCart regionId={props.regionId} variant="PDP" />
          </div>
          <Addons
            products={props.addons}
            regionId={props.regionId}
            title={props.content?.addons?.title}
          />
          <Specs specs={props.content?.specs} />
        </div>
      </ProductVariantsProvider>
    </NuqsAdapter>
  );
}
