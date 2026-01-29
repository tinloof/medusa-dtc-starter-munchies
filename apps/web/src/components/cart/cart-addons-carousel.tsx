import type { HttpTypes } from "@medusajs/types";
import { AddonsItem } from "@/components/shared/addons-item";
import { CarouselSection } from "@/components/shared/carousel-section";
import { Heading } from "@/components/shared/typography/heading";

interface CartAddonsCarouselProps {
  products: HttpTypes.StoreProduct[];
  isEmptyCart: boolean;
  regionId: string;
}

export function CartAddonsCarousel({
  products,
  isEmptyCart,
  regionId,
}: CartAddonsCarouselProps) {
  const slides = products.map((item) => (
    <div className="w-95" key={item.id}>
      <AddonsItem regionId={regionId} variant="cart" {...item} />
    </div>
  ));

  return (
    <div>
      <CarouselSection
        showButtons
        slides={slides}
        title={
          <Heading font="serif" mobileSize="lg" tag="h3">
            {isEmptyCart ? "You might like" : "You might also like"}
          </Heading>
        }
        variant="cart"
      />
    </div>
  );
}
