import type { StoreProduct } from "@medusajs/types";
import { cx } from "class-variance-authority";
import { useState } from "react";
import { ButtonLink } from "@/components/shared/button";
import { Image } from "@/components/shared/cloudflare-image";
import { LocalizedLink } from "@/components/shared/localized-link";
import { SanityImage } from "@/components/shared/sanity-image";
import { Tag } from "@/components/shared/tag";
import { Body } from "@/components/shared/typography/body";
import { getProductPrice } from "@/lib/utils/medusa/get-product-price";
import type { ModularPageSection } from "../types";

export function Hotspots({
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
    productHotSpots?.[0]?.product?._ref
  );
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

  const thumbnailUrl = product?.thumbnail || product?.images?.[0].url;

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
                  "absolute top-1/2 left-1/2 z-10 h-[1.5px] w-2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:bg-accent lg:w-3.25",
                  {
                    "bg-accent": selectedProduct === hotSpot.product?._ref,
                    "bg-background": selectedProduct !== hotSpot.product?._ref,
                  }
                )}
              />
              <span
                className={cx(
                  "absolute top-1/2 left-1/2 h-2 w-[1.5px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:rotate-90 group-hover:bg-accent lg:h-3.25",
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
      <LocalizedLink
        className="hidden w-full max-w-112.5 flex-col justify-between gap-2xl rounded-lg lg:flex"
        href={`/products/${product?.handle}`}
      >
        <div className="flex w-full max-w-112.5 flex-1 flex-col items-center justify-center rounded-lg">
          <div className="relative w-full">
            {thumbnailUrl ? (
              <Image
                alt={product.title}
                className="aspect-square w-full rounded-lg"
                height={450}
                sizes="450px"
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
        <ButtonLink
          className="w-full"
          href={`/products/${product?.handle}`}
          renderAsChild
          size="xl"
          variant="outline"
        >
          Shop now
        </ButtonLink>
      </LocalizedLink>
      <div className="flex flex-col gap-xs lg:hidden">
        {referencedProducts.map((_product) => {
          const { cheapestPrice: _cheapestPrice } = getProductPrice({
            product: _product,
          });
          const _thumbnailUrl =
            _product?.thumbnail || _product?.images?.[0].url;
          return (
            <LocalizedLink
              className={cx("flex w-full gap-2.5 rounded-2xl p-xs", {
                "bg-secondary": selectedProduct === _product.id,
              })}
              href={`/products/${_product?.handle}`}
              key={_product.id}
            >
              {_thumbnailUrl ? (
                <Image
                  alt={product?.title}
                  className="aspect-square w-full max-w-25 rounded-lg border border-accent"
                  height={100}
                  sizes="100px"
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
            </LocalizedLink>
          );
        })}
        <ButtonLink
          className="w-full"
          href={"/products"}
          size="xl"
          variant="outline"
        >
          Shop now
        </ButtonLink>
      </div>
    </div>
  );
}
