import type {StoreProduct} from "@medusajs/types";

import {getProductPrice} from "@/utils/medusa/get-product-price";

export default function ProductOg({product}: {product: StoreProduct}) {
  const {cheapestPrice} = getProductPrice({
    product,
  });

  const thumbnail = product.thumbnail || product.images?.[0].url;
  return (
    <div tw="flex justify-between p-8 items-center w-full h-full text-[#FF5227] bg-[#FFF6E6]">
      <div tw="flex items-start flex-col justify-between pl-8 h-full py-12 max-w-[400px]">
        <div
          style={{fontFamily: "Climate Crisis"}}
          tw="flex uppercase text-[43px]"
        >
          Munchies
        </div>
        <div tw="flex flex-col items-start justify-start">
          <div tw="text-[64px] tracking-[-1.28px] mb-6">{product.title}</div>
          <div
            style={{fontFamily: "Instrument Sans"}}
            tw="font-sans text-[20px] leading-[150%] flex"
          >
            from {cheapestPrice?.calculated_price}
          </div>
        </div>
        <div tw="flex py-[6px] px-[36px] text-[#FFF6E6] bg-[#FF5227] rounded-full text-[40px] leading-[150%] tracking-[-1px]">
          Shop now
        </div>
      </div>
      <div tw="flex h-full w-[46%]">
        {thumbnail && (
          <img
            alt={product.title}
            src={thumbnail}
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
            }}
            tw="h-full w-full rounded-lg border border-[#FF5227]"
          />
        )}
      </div>
    </div>
  );
}
