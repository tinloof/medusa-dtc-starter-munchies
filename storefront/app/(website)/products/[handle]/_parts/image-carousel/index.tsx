"use client";

import type {StoreProduct, StoreProductImage} from "@medusajs/types";

import Tag from "@/components/shared/tag";
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
      <div className="mx-auto flex w-full gap-2 lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:mx-0 lg:max-w-[684px]">
        {(images?.length || 0) > 0 && (
          <div className="hidden w-[85px] flex-col gap-2 lg:flex" id="thumbs">
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
        <Slides
          className={cx(
            "pdp-image-slides scrollbar-hide mt-1 flex h-fit w-full gap-xs overflow-scroll px-m lg:px-0",
            {
              "snap-x snap-mandatory": isHydrated, // only enable snapping after hydration, because it randomly scrolls on chrome
            },
          )}
        >
          {images?.map((media, index) => (
            <Slide
              className="relative flex w-[86vw] min-w-full snap-center justify-center lg:w-full"
              index={index}
              key={index}
            >
              {product.type?.value && (
                <Tag
                  className="absolute right-4 top-4"
                  text={product.type?.value}
                />
              )}
              <Image
                alt={product.title}
                className="aspect-thin aspect-square w-full rounded-2xl object-cover object-bottom"
                height={591}
                priority={index === 0}
                sizes="(min-width: 1360px) 600px, (min-width: 1040px) calc(92vw - 633px), 100vw"
                src={media.url}
                style={{background: "transparent"}}
                width={591}
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
  const {scrollToIndex} = useCarouselContext();

  useEffect(() => {
    scrollToIndex(selectedImageIndex);
  }, [scrollToIndex, selectedImageIndex]);

  return (
    <button
      className="w-[85px] overflow-hidden rounded-lg"
      onClick={() => {
        setSelectedImageIdex(index);
      }}
    >
      <Image
        alt={`carousel-item-${index}`}
        className="aspect-square h-[85px] w-[85px] object-cover object-center"
        height={85}
        sizes="85px"
        src={mediaItem.url}
        width={85}
      />
    </button>
  );
}
