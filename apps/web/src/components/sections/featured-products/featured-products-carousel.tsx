import type { HttpTypes } from "@medusajs/types";
import { CarouselSection } from "@/components/shared/carousel-section";
import { ProductCard } from "@/components/shared/product-card";
import { Heading } from "@/components/shared/typography/heading";
import type { ModularPageSection } from "../types";

interface FeaturedProductsCarouselProps {
  products: HttpTypes.StoreProduct[];
  cta: ModularPageSection<"section.featuredProducts">["cta"];
  title: ModularPageSection<"section.featuredProducts">["title"];
}

export function FeaturedProductsCarousel(props: FeaturedProductsCarouselProps) {
  const slides = props.products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <CarouselSection
      cta={{ href: props.cta?.link, text: props.cta?.label }}
      slides={slides}
      title={
        <Heading
          className="text-center"
          desktopSize="3xl"
          mobileSize="lg"
          tag="h3"
        >
          {props.title}
        </Heading>
      }
    />
  );
}
