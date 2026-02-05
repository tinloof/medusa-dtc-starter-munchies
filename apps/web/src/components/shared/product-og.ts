import type { HttpTypes } from "@medusajs/types";

import { getProductPrice } from "@/lib/utils/medusa/get-product-price";

export default function ProductOg({
  product,
}: {
  product: HttpTypes.StoreProduct;
}) {
  const { cheapestPrice } = getProductPrice({ product });
  const thumbnail = product.thumbnail || product.images?.[0]?.url;

  return {
    type: "div",
    props: {
      tw: "flex justify-between p-8 items-center w-full h-full text-[#FF5227] bg-[#FFF6E6]",
      children: [
        {
          type: "div",
          props: {
            tw: "flex items-start flex-col justify-between pl-8 h-full py-12 max-w-[400px]",
            children: [
              {
                type: "div",
                props: {
                  style: { fontFamily: "Climate Crisis" },
                  tw: "flex uppercase text-[43px]",
                  children: "Munchies",
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex flex-col items-start justify-start",
                  children: [
                    {
                      type: "div",
                      props: {
                        tw: "text-[64px] tracking-[-1.28px] mb-6",
                        children: product.title,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: { fontFamily: "Instrument Sans" },
                        tw: "font-sans text-[20px] leading-[150%] flex",
                        children: `from ${cheapestPrice?.calculated_price}`,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex py-[6px] px-[36px] text-[#FFF6E6] bg-[#FF5227] rounded-full text-[40px] leading-[150%] tracking-[-1px]",
                  children: "Shop now",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "flex h-full w-[46%]",
            children: thumbnail
              ? {
                  type: "img",
                  props: {
                    alt: product.title,
                    src: thumbnail,
                    style: {
                      objectFit: "cover",
                      objectPosition: "bottom",
                    },
                    tw: "h-full w-full rounded-lg border border-[#FF5227]",
                  },
                }
              : null,
          },
        },
      ],
    },
  };
}
