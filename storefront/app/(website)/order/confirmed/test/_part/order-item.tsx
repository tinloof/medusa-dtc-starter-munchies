// import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
// import {getProductPrice} from "@/utils/medusa/get-product-price";
// import Image from "next/image";
// {product}: {product: StoreProduct}
export default function OrderItem({
  price,
  quantity,
  title,
  variant,
}: {
  price: string;
  quantity: string;
  title: string;
  variant: string;
}) {
  //   const {cheapestPrice} = getProductPrice({product});

  return (
    <div className="flex w-full gap-xs">
      {/* {product.images?.[0].url && (
        <Image
          alt={product.title}
          className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent"
          height={100}
          src={product.images?.[0].url}
          width={100}
        />
      )} */}
      <div className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent"></div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between gap-xl">
          <div className="flex flex-col items-start justify-start gap-1">
            <Body className="font-semibold" font="sans" mobileSize="lg">
              {title}
            </Body>
            <Body className="font-medium" font="sans" mobileSize="sm">
              {variant}
            </Body>
          </div>
          <div className="flex flex-col items-end justify-end gap-1">
            <Body className="opacity-80" font="sans" mobileSize="base">
              {quantity}
            </Body>
            <Body font="sans" mobileSize="base">
              {/* {cheapestPrice?.calculated_price} */}
              {price}
            </Body>
          </div>
        </div>
      </div>
    </div>
  );
}
