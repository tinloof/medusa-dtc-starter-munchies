import type {Product} from "@/types/sanity.generated";
import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {getProductsByIds} from "@/data/medusa/products";
import {getProductPrice} from "@/utils/medusa/get-product-price";
import Image from "next/image";

import {AddToCartButton} from "./add-to-cart";

export default async function Addons({
  products: productRefs,
  region_id,
  title,
}: {
  region_id: string;
} & Product["addons"]) {
  const ids = productRefs?.map(({_ref}) => _ref);

  if (!ids || ids.length === 0) return null;

  const {products} = await getProductsByIds(ids, region_id);

  return (
    <div className="flex flex-col gap-xs rounded-lg bg-secondary p-s">
      <Heading desktopSize="lg" mobileSize="base" tag={"h4"}>
        {title}
      </Heading>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

function Product({id, images, title, variants}: StoreProduct) {
  const {cheapestPrice} = getProductPrice({
    product: {
      id,
      variants,
    },
  });

  return (
    <div className="flex w-full gap-xs">
      {images?.[0].url && (
        <Image
          alt={title}
          className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent"
          height={100}
          src={images?.[0].url}
          width={100}
        />
      )}
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-xs">
          <Body
            className="font-semibold"
            desktopSize="lg"
            font="sans"
            mobileSize="base"
          >
            {title}
          </Body>
          <Body desktopSize="base" font="sans" mobileSize="sm">
            {cheapestPrice?.calculated_price}
          </Body>
        </div>
        <AddToCartButton
          className="self-end"
          label="Add +"
          size="md"
          variant="outline"
          // TODO: Better variant selection
          variantId={variants?.[0].id}
        />
      </div>
    </div>
  );
}
