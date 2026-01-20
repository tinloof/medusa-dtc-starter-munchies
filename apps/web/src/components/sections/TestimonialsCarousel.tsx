import CarouselSection from "@/components/shared/CarouselSection";

interface Testimonial {
  _id: string;
  author?: string;
  quote?: string;
}

interface Props {
  title?: string;
  testimonials?: Testimonial[] | null;
}

export default function TestimonialsCarousel({ title, testimonials }: Props) {
  const slides = testimonials?.map((testimonial) => (
    <TestimonialCard
      key={testimonial._id}
      author={testimonial.author}
      text={testimonial.quote}
    />
  ));

  return (
    <CarouselSection
      slides={slides}
      title={
        <h3 className="text-center font-serif font-normal leading-[120%] text-heading-lg tracking-[-0.8px] lg:text-heading-3xl lg:tracking-[-1.28px]">
          {title}
        </h3>
      }
    />
  );
}

function TestimonialCard(props: {
  author: string | undefined;
  text: string | undefined;
}) {
  return (
    <div className="flex h-full min-h-[340px] w-[88vw] max-w-[450px] cursor-pointer flex-col items-start justify-start gap-lg rounded-lg border border-accent px-xl py-lg lg:min-h-[400px]">
      <div className="font-medium font-sans leading-[150%] text-body-xl lg:text-body-2xl">
        {props.text}
      </div>
      <div className="font-medium font-sans leading-[150%] text-body-xl">
        {props.author}
      </div>
    </div>
  );
}
