import { CarouselSection } from "@/components/shared/carousel-section";
import { Body } from "@/components/shared/typography/body";
import { Heading } from "@/components/shared/typography/heading";
import type { ModularPageSection } from "../types";

export function TestimonialsCarousel(
  props: ModularPageSection<"section.testimonials">
) {
  const slides = props.testimonials?.map((testimonial) => (
    <TestimonialCard
      author={testimonial.author}
      key={testimonial._id}
      text={testimonial.quote}
    />
  ));
  return (
    <CarouselSection
      slides={slides}
      title={
        <Heading
          className="text-center"
          desktopSize="3xl"
          mobileSize="lg"
          tag="h2"
        >
          {props.title}
        </Heading>
      }
    />
  );
}

function TestimonialCard(props: {
  author: string | undefined;
  text: string | undefined;
}) {
  return (
    <div className="flex h-full min-h-85 w-[88vw] max-w-112.5 cursor-pointer flex-col items-start justify-start gap-lg rounded-lg border border-accent px-xl py-lg lg:min-h-100">
      <Body desktopSize="2xl" font="sans" mobileSize="xl">
        {props.text}
      </Body>
      <Body font="sans" mobileSize="xl">
        {props.author}
      </Body>
    </div>
  );
}
