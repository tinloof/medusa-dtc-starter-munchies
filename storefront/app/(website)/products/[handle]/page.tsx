import type {SectionProps} from "@/components/sections/types";
import type {PageProps} from "@/types";

import SectionsRenderer from "@/components/sections/section-renderer";
import {getProductByHandle} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import {notFound} from "next/navigation";

import AddToCart from "./_parts/add-to-cart";
import {ProductImagesCarousel} from "./_parts/image-carousel";
import OptionsSelect from "./_parts/options";
import ProductInformation from "./_parts/product-information";
import {ProductVariantsProvider} from "./product-context";

type ProductPageProps = PageProps<"handle">;

export default async function ProductPage({params}: ProductPageProps) {
  const region = await getRegion(
    // TODO: Make this come from the params
    process.env.NEXT_PUBLIC_MEDUSA_DEFAULT_COUNTRY_CODE!,
  );

  if (!region) {
    console.log("No region found");
    return notFound();
  }

  const product = await getProductByHandle(params.handle, region.id);

  if (!product) {
    console.log("No product found");
    return notFound();
  }
  return (
    <>
      <section className="mx-auto flex max-w-max-screen flex-col items-start justify-start gap-s lg:flex-row lg:gap-xs lg:px-xl lg:py-m">
        <ProductImagesCarousel product={product} />
        <ProductInformation region_id={region.id} {...product} />
      </section>

      <SectionsRenderer
        fieldName="body"
        sections={product.sanity_product?.sections as SectionProps[]}
      />
      <ProductVariantsProvider
        options={product.options}
        variants={product.variants}
      >
        <div className="sticky bottom-0 left-0 right-0 z-[80] w-screen border-t border-accent bg-background p-m lg:hidden">
          <div className="mt-s flex justify-between">
            {product.options && <OptionsSelect options={product.options} />}
            <AddToCart variant="sticky" />
          </div>
        </div>
      </ProductVariantsProvider>
    </>
  );
}
