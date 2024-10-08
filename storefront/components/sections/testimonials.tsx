import React from "react";

import type {ModularPageSection} from "./types";

import EmblaCarousel from "../shared/carousel";
import Body from "../shared/typography/body";

export default function Testimonials(
  props: ModularPageSection<"section.testimonials">,
) {
  const slides = props.testimonials?.map((testimonial) => (
    <TestimonialCard
      author={testimonial.author}
      key={testimonial._id}
      text={testimonial.quote}
    />
  ));
  return (
    <section {...props.rootHtmlAttributes}>
      <EmblaCarousel slides={slides} title={props.title} />
    </section>
  );
}

function TestimonialCard(props: {
  author: string | undefined;
  text: string | undefined;
}) {
  return (
    <div className="flex h-full min-h-[340px] w-[390px] cursor-pointer flex-col items-start justify-start gap-lg rounded-lg border border-accent px-xl py-lg lg:min-h-[400px] lg:w-[450px]">
      <Body desktopSize="4xl" font="sans" mobileSize="3xl">
        {props.text}
      </Body>
      <Body font="sans" mobileSize="xl">
        {props.author}
      </Body>
    </div>
  );
}
