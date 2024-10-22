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
} & StoreProduct;

export default function ProductInformation(props: Props) {
  return (
    <ProductVariantsProvider product={props}>
      <div className="lg:y-s flex w-full flex-col gap-lg px-m pb-2xl pt-s lg:max-w-[580px]">
        <BreadCrumbs collection={props.collection} title={props.title} />
        <Heading
          className="leading-[100%]"
          desktopSize="5xl"
          mobileSize="2xl"
          tag="h1"
        >
          {props.title}
        </Heading>
        <Price product={{id: props.id, variants: props.variants}} />
        <Body
          className="font-normal"
          desktopSize="lg"
          font="sans"
          mobileSize="base"
        >
          {props.description}
        </Body>
        <div className="mt-s flex flex-col gap-s">
          {props.options && <OptionsSelect options={props.options} />}
          <AddToCart region_id={props.region_id} variant="PDP" />
        </div>
        <Addons
          products={props.content?.addons?.products}
          region_id={props.region_id}
          title={props.content?.addons?.title}
        />
        <ProductSpecs specs={props.content?.specs} />
      </div>
    </ProductVariantsProvider>
  );
}
