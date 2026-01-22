"use client";

import type { SectionShopTheLook } from "@packages/sanity/types";
import { cx } from "class-variance-authority";
import { useState } from "react";

import { SanityImage } from "../shared/SanityImage";
import Tag from "../shared/Tag";
import Body from "../shared/typography/Body";
import { getProductPrice } from "@/lib/medusa/get-product-price";
import config from "@/config";
import type { HttpTypes } from "@medusajs/types";

interface HotspotsUIProps {
  countryCode?: string;
  products: HttpTypes.StoreProduct[];
  image: SectionShopTheLook["image"];
  productHotSpots: SectionShopTheLook["productHotSpots"];
}

export default function HotspotsUI({
  countryCode = config.defaultCountryCode,
  image,
  productHotSpots,
  products,
}: HotspotsUIProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    productHotSpots?.[0]?.product?._ref
  );

  const isDefaultCountry = countryCode === config.defaultCountryCode;
  const getProductHref = (handle: string | undefined) =>
    isDefaultCountry ? `/products/${handle}` : `/${countryCode}/products/${handle}`;

  const referencedProducts = products.filter((_product) =>
    productHotSpots?.some((hotspot) => hotspot.product?._ref === _product.id)
  );

  const product = referencedProducts.find(
    (_product) => _product.id === selectedProduct
  );

  if (!product) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({ product });
  const thumbnailUrl = product?.thumbnail || product?.images?.[0]?.url;

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-xs lg:flex-row lg:gap-s">
      {image ? (
        <div className="relative w-full min-w-[63%] rounded-lg">
          <SanityImage className="w-full rounded-lg" data={image} />
          {productHotSpots?.map((hotSpot) => (
            <div
              className={cx(
                "group relative h-6 w-6 cursor-pointer rounded-full bg-accent transition-all duration-300 hover:bg-secondary lg:h-8 lg:w-8",
                {
                  "bg-secondary": selectedProduct === hotSpot.product?._ref,
                }
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
                  "absolute top-1/2 left-1/2 z-10 h-[1.5px] w-2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:bg-accent lg:w-[13px]",
                  {
                    "bg-accent": selectedProduct === hotSpot.product?._ref,
                    "bg-background": selectedProduct !== hotSpot.product?._ref,
                  }
                )}
              />
              <span
                className={cx(
                  "absolute top-1/2 left-1/2 h-2 w-[1.5px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:rotate-90 group-hover:bg-accent lg:h-[13px]",
                  {
                    "bg-background": selectedProduct !== hotSpot.product?._ref,
                    "rotate-90 bg-accent":
                      selectedProduct === hotSpot.product?._ref,
                  }
                )}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full min-w-[63%] rounded-lg bg-secondary" />
      )}

      {/* Desktop view - single product card */}
      <a
        className="hidden w-full max-w-112.5 flex-col justify-between gap-2xl rounded-lg lg:flex"
        href={getProductHref(product?.handle)}
      >
        <div className="flex w-full max-w-112.5 flex-1 flex-col items-center justify-center rounded-lg">
          <div className="relative w-full">
            {thumbnailUrl ? (
              <img
                alt={product.title}
                className="aspect-square w-full rounded-lg object-cover"
                height={450}
                src={thumbnailUrl}
                width={450}
              />
            ) : null}
            {product.type?.value ? (
              <Tag
                className="absolute top-3 right-4"
                text={product.type.value || ""}
              />
            ) : null}
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-lg py-s">
            <Body
              className="text-center"
              desktopSize="xl"
              font="sans"
              mobileSize="lg"
            >
              {product.title}
            </Body>
            <Body
              className="text-center"
              desktopSize="base"
              font="sans"
              mobileSize="sm"
            >
              from {cheapestPrice?.calculated_price || "NA"}
            </Body>
          </div>
        </div>
        <span
          className="w-full rounded-lg border border-accent px-6 py-3 text-center font-sans font-medium text-accent transition-colors hover:bg-accent hover:text-background"
        >
          Shop now
        </span>
      </a>

      {/* Mobile view - product list */}
      <div className="flex flex-col gap-xs lg:hidden">
        {referencedProducts.map((_product) => {
          const { cheapestPrice: _cheapestPrice } = getProductPrice({
            product: _product,
          });
          const _thumbnailUrl =
            _product?.thumbnail || _product?.images?.[0]?.url;

          return (
            <a
              className={cx("flex w-full gap-2.5 rounded-2xl p-xs", {
                "bg-secondary": selectedProduct === _product.id,
              })}
              href={getProductHref(_product?.handle)}
              key={_product.id}
            >
              {_thumbnailUrl ? (
                <img
                  alt={_product?.title}
                  className="aspect-square w-full max-w-25 rounded-lg border border-accent object-cover"
                  height={100}
                  src={_thumbnailUrl}
                  width={100}
                />
              ) : null}
              <div className="flex flex-col items-start justify-start gap-1 py-xs">
                <Body className="text-pretty" font="sans" mobileSize="lg">
                  {_product?.title}
                </Body>
                <Body font="sans" mobileSize="sm">
                  from {_cheapestPrice?.calculated_price || "NA"}
                </Body>
              </div>
            </a>
          );
        })}
        <a
          className="w-full rounded-lg border border-accent px-6 py-3 text-center font-sans font-medium text-accent transition-colors hover:bg-accent hover:text-background"
          href={isDefaultCountry ? "/products" : `/${countryCode}/products`}
        >
          Shop now
        </a>
      </div>
    </div>
  );
}
