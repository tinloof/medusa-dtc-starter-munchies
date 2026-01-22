"use client";

import type { StoreProduct } from "@medusajs/types";
import type { PRODUCT_QUERYResult } from "@packages/sanity/types";

import Body from "@/components/shared/typography/Body";
import Heading from "@/components/shared/typography/Heading";
import { CountryCodeProvider } from "@/components/context/CountryCodeContext";
import config from "@/config";

import { ProductVariantsProvider } from "./ProductContext";
import AddToCart from "./AddToCart";
import Addons from "./Addons";
import BreadCrumbs from "./Breadcrumbs";
import OptionsSelect from "./Options";
import Price from "./Price";
import ProductSpecs from "./Specs";

type Props = {
  addonProducts?: StoreProduct[];
  content: PRODUCT_QUERYResult;
  initialSelectedOptions?: Record<string, string | undefined>;
  region_id: string;
  countryCode: string;
} & StoreProduct;

export default function ProductInformation({ addonProducts, countryCode, initialSelectedOptions, ...props }: Props) {
  return (
    <CountryCodeProvider countryCode={countryCode} defaultCountryCode={config.defaultCountryCode}>
      <ProductVariantsProvider initialSelectedOptions={initialSelectedOptions} product={props}>
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
            <AddToCart region_id={props.region_id} variant="PDP" />
          </div>
          <Addons
            products={addonProducts || []}
            region_id={props.region_id}
            title={props.content?.addons?.title}
          />
          <ProductSpecs specs={props.content?.specs} />
        </div>
      </ProductVariantsProvider>
    </CountryCodeProvider>
  );
}
