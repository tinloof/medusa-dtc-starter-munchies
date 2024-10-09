"use client";
import type {StoreProduct} from "@medusajs/types";

import {Link} from "@/components/shared/button";
import ProductCard from "@/components/shared/product-card";
import {SanityImage} from "@/components/shared/sanity-image";
import Body from "@/components/shared/typography/body";
import {getProductPrice} from "@/utils/medusa/get-product-price";
import {cx} from "cva";
import NextLink from "next/link";
import {useState} from "react";

import type {ModularPageSection} from "../types";

export default function Hotspots({
  image,
  productHotSpots,
  products,
}: {
  products: StoreProduct[];
} & Pick<
  ModularPageSection<"section.shopTheLook">,
  "image" | "productHotSpots"
>) {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    productHotSpots?.[0]?.product?._ref,
  );
  const referencedProducts = products.filter((product) =>
    productHotSpots?.some((hotspot) => hotspot.product?._ref === product.id),
  );

  const product = referencedProducts.find(
    (product) => product.id === selectedProduct,
  );

  if (!product) return null;

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-xs lg:flex-row lg:gap-s">
      {image ? (
        <div className="relative w-full min-w-[63%] rounded-lg">
          <SanityImage className="w-full rounded-lg" data={image} />
          {productHotSpots?.map((hotSpot) => {
            return (
              <div
                className={cx(
                  "group relative h-8 w-8 cursor-pointer rounded-full bg-accent transition-all duration-300 hover:bg-secondary",
                  {
                    "bg-secondary": selectedProduct === hotSpot.product?._ref,
                  },
                )}
                key={hotSpot._key}
                onClick={() =>
                  setSelectedProduct(hotSpot.product?._ref ?? undefined)
                }
                style={{
                  left: `${hotSpot.x}%`,
                  position: "absolute",
                  top: `${hotSpot.y}%`,
                }}
              >
                <span
                  className={cx(
                    "absolute left-1/2 top-1/2 z-10 h-[1.5px] w-[13px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:bg-accent",
                    {
                      "bg-accent": selectedProduct === hotSpot.product?._ref,
                      "bg-background":
                        selectedProduct !== hotSpot.product?._ref,
                    },
                  )}
                />
                <span
                  className={cx(
                    "absolute left-1/2 top-1/2 h-[13px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:rotate-90 group-hover:bg-accent",
                    {
                      "bg-background":
                        selectedProduct !== hotSpot.product?._ref,
                      "rotate-90 bg-accent":
                        selectedProduct === hotSpot.product?._ref,
                    },
                  )}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full min-w-[63%] rounded-lg bg-secondary" />
      )}
      <div className="hidden w-full max-w-[450px] flex-col justify-between gap-2xl rounded-lg lg:flex">
        <ProductCard product={product} size="dynamicWith" />
        <Link className="w-full" href={"/"} size="xl" variant="outline">
          Shop now
        </Link>
      </div>
      <div className="flex flex-col gap-xs lg:hidden">
        {referencedProducts.map((product) => {
          const {cheapestPrice} = getProductPrice({product});

          return (
            <NextLink
              className={cx("flex w-full gap-[10px] rounded-2xl p-xs", {
                "bg-secondary": selectedProduct === product.id,
              })}
              href={`/products/${product?.handle}`}
              key={product.id}
              prefetch
            >
              <img
                alt={product?.title}
                className="aspect-square w-full max-w-[100px] rounded-lg border border-accent"
                src={product?.thumbnail || product?.images?.[0].url}
              />
              <div className="flex flex-col items-start justify-start gap-1 py-xs">
                <Body className="text-pretty" font="sans" mobileSize="lg">
                  {product?.title}
                </Body>
                <Body font="sans" mobileSize="sm">
                  from {cheapestPrice?.calculated_price || "NA"}
                </Body>
              </div>
            </NextLink>
          );
        })}
        <Link className="w-full" href={"/"} size="xl" variant="outline">
          Shop now
        </Link>
      </div>
    </div>
  );
}