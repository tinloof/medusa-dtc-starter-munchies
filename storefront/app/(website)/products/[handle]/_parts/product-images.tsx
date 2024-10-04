import type {StoreProductImage, StoreProductType} from "@medusajs/types";

import Tag from "@/components/shared/tag";
import Image from "next/image";

// const getRightUrl = (url: string) =>
//   url.replace("http://localhost:9000", "https://munchies.medusajs.app");

export default function ProductImages({
  images,
  type,
}: {
  images: StoreProductImage[] | null;
  type?: StoreProductType | null;
}) {
  console.log(images);
  return (
    <>
      <div className="sticky top-xl hidden flex-row gap-xs lg:flex">
        <div className="flex w-[85px] flex-col gap-xs">
          {images?.map((image) => (
            <div className="aspect-square" key={image.id}>
              <img
                alt="Cookie images"
                className="w-[85px]"
                height={100}
                src={image.url}
                width={100}
              />
            </div>
          ))}
        </div>
        <div className="relative aspect-square w-full min-w-[400px] max-w-[591px] rounded-lg">
          {images?.[0].url && (
            <Image
              alt="Cookie"
              height={100}
              src={images?.[0].url}
              width={100}
            />
          )}
          <Tag className="absolute right-5 top-7" text="BEST-SELLER" />
        </div>
      </div>
      <div className="scrollbar-hide flex w-screen gap-xs overflow-x-scroll px-m lg:hidden">
        {images?.map((image) => (
          <div className="relative aspect-square h-[380px]" key={image.id}>
            <Image
              alt="Cookie"
              className="h-[380px]"
              height={100}
              src={image.url}
              width={100}
            />
            {type?.value && (
              <p className="climate-label-sm absolute right-4 top-3 bg-secondary px-1 py-px text-accent">
                {type.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
