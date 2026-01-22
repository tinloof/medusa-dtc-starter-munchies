import type { HttpTypes } from "@medusajs/types";
import CarouselSection from "../shared/CarouselSection";
import ProductCard from "../shared/ProductCard";
import Heading from "../shared/typography/Heading";

interface FeaturedProductsCarouselProps {
  countryCode?: string;
  products: HttpTypes.StoreProduct[];
  title?: string;
  cta?: {
    href: string | undefined;
    text: string | undefined;
  };
}

export default function FeaturedProductsCarousel({
  countryCode,
  products,
  title,
  cta,
}: FeaturedProductsCarouselProps) {
  const slides = products.map((product, index) => (
    <ProductCard countryCode={countryCode} index={index} key={product.id} product={product} />
  ));

  return (
    <CarouselSection
      cta={cta}
      slides={slides}
      title={
        title ? (
          <Heading
            className="text-center"
            desktopSize="3xl"
            mobileSize="lg"
            tag="h3"
          >
            {title}
          </Heading>
        ) : undefined
      }
    />
  );
}
