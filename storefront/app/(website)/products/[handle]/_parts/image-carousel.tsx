"use client";

import type {StoreProduct, StoreProductImage} from "@medusajs/types";

import {
  Root,
  Slides,
  SlidesWrapper,
  useCarousel,
} from "@/components/shared/carousel";
import Tag from "@/components/shared/tag";
import useIsHydrated from "@/hooks/use-is-hydrated";
import {cx} from "cva";
import Image from "next/image";
import {Fragment, useEffect, useState} from "react";

type CommonProductImagesCarouselProps = {
  product: StoreProduct;
};

export function ProductImagesCarousel({
  product,
}: CommonProductImagesCarouselProps) {
  const isHydrated = useIsHydrated();

  const [selectedImageIndex, setSelectedImageIdex] = useState(0);

  const images = product.images;

  if (images?.length === 0 || !images) return null;

  const slides = images?.map((image) => {
    return (
      <Fragment key={image.id}>
        {product.type?.value && (
          <Tag className="absolute right-4 top-4" text={product.type?.value} />
        )}
        <Image
          alt={product.title}
          className="aspect-thin aspect-square w-full rounded-2xl object-cover object-bottom"
          height={591}
          sizes="(min-width: 1360px) 600px, (min-width: 1040px) calc(92vw - 633px), 100vw"
          src={image.url}
          style={{background: "transparent"}}
          width={591}
        />
      </Fragment>
    );
  });

  return (
    <Root
      options={{containScroll: "trimSnaps", dragFree: true}}
      slidesCount={images?.length || 0}
    >
      <div className="mx-auto flex w-full max-w-[666px] gap-4 lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:mx-0">
        <div className="relative hidden h-full flex-col gap-2 overflow-hidden lg:flex">
          {(images?.length || 0) > 0 && (
            <div
              className={cx(
                "scrollbar-hide flex flex-col gap-2 overflow-x-scroll px-4 lg:px-0",
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
        <SlidesWrapper
          className={cx(
            "scrollbar-hide h-fit w-full gap-4 rounded-2xl px-5 lg:max-w-[600px] lg:px-0",
            {
              "": isHydrated, // only enable snapping after hydration, because it randomly scrolls on chrome
            },
          )}
        >
          <Slides
            content={slides}
            itemProps={{
              className:
                "relative flex w-full min-w-full snap-center justify-center",
            }}
            wrapperDiv={{
              className: "snap-x snap-mandatory gap-4",
            }}
          />
        </SlidesWrapper>
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
  const {api} = useCarousel();

  useEffect(() => {
    api?.scrollTo(selectedImageIndex);
  }, [api, selectedImageIndex]);

  return (
    <button
      className="min-w-[50px] overflow-hidden rounded-lg"
      onClick={() => {
        setSelectedImageIdex(index);
      }}
    >
      <Image
        alt={`carousel-item-${index}`}
        className="aspect-square size-12 object-cover object-center"
        height={380}
        sizes="52px"
        src={mediaItem.url}
        width={380}
      />
    </button>
  );
}
