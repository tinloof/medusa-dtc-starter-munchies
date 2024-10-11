"use client";

import type {StoreProduct, StoreProductImage} from "@medusajs/types";

import useIsHydrated from "@/hooks/use-is-hydrated";
import {cx} from "cva";
import Image from "next/image";
import {useEffect, useState} from "react";

import {Root, Slide, Slides, useCarouselContext} from "./carousel";

type CommonProductImagesCarouselProps = {
  product: StoreProduct;
};

export function ProductImagesCarousel({
  product,
}: CommonProductImagesCarouselProps) {
  const isHydrated = useIsHydrated();

  const images = product.images;

  const [selectedImageIndex, setSelectedImageIdex] = useState(0);

  return (
    <Root slidesCount={images?.length || 0}>
      <div className="mx-auto flex w-full max-w-[666px] gap-4 lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:mx-0">
        <div className="relative flex h-full flex-col gap-2 overflow-hidden">
          {(images?.length || 0) > 0 && (
            <div
              className={cx(
                "scrollbar-hide flex gap-2 overflow-x-scroll px-4 lg:px-0",
              )}
              id="thumbs"
            >
              {images?.map((mediaItem, index) => (
                <ItemCarousel
                  index={index}
                  key={index}
                  mediaItem={mediaItem}
                  selectedImageIndex={selectedImageIndex}
                  setSelectedImageIdex={(index) => {
                    setSelectedImageIdex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <Slides
          className={cx(
            "pdp-image-slides scrollbar-hide narrow:max-w-[500px] flex h-fit w-full overflow-scroll lg:max-w-[600px] lg:rounded-2xl",
            {
              "snap-x snap-mandatory": isHydrated, // only enable snapping after hydration, because it randomly scrolls on chrome
            },
          )}
        >
          {images?.map((media, index) => (
            <Slide
              className="flex w-full min-w-full snap-center justify-center"
              index={index}
              key={index}
            >
              <Image
                alt={product.title}
                className="aspect-thin aspect-square w-full rounded-[0.625rem] border border-[#F0CDD4] object-cover object-bottom"
                height="1000"
                sizes="(min-width: 1360px) 600px, (min-width: 1040px) calc(92vw - 633px), 100vw"
                src={media.url}
                style={{background: "transparent"}}
                width="1000"
              />
            </Slide>
          ))}
        </Slides>
      </div>
    </Root>
  );
}

function ItemCarousel({
  index,
  mediaItem,
  selectedImageIndex,
  setSelectedImageIdex,
}: {
  index: number;
  mediaItem: StoreProductImage;
  selectedImageIndex: number;
  setSelectedImageIdex: (index: number) => void;
}) {
  const {focalSlideIndex, scrollToIndex} = useCarouselContext();

  useEffect(() => {
    scrollToIndex(selectedImageIndex);
  }, [scrollToIndex, selectedImageIndex]);

  return (
    <button
      className={cx("min-w-[50px] overflow-hidden rounded-lg border", {
        "border-border-grey": focalSlideIndex !== index,
        "border-primary-dark": focalSlideIndex === index,
      })}
      onClick={() => {
        setSelectedImageIdex(index);
      }}
    >
      <Image
        alt={`carousel-item-${index}`}
        className="aspect-square size-12 border border-[#F0CDD4] object-cover object-center"
        height="1000"
        sizes="52px"
        src={mediaItem.url}
        width="1000"
      />
    </button>
  );
}
