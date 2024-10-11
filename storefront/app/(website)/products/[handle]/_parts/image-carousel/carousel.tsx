"use client";

import {cx} from "cva";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  createContext,
  useContext,
} from "react";

import {useCarousel} from "./use-carousel";

type CarouselParams = Parameters<typeof useCarousel>["0"];
type CarouselReturnType = ReturnType<typeof useCarousel>;

type CarouselRootProps = PropsWithChildren<CarouselParams>;

type CarouselSlidesProps = HTMLAttributes<HTMLDivElement>;

const CarouselContext = createContext<
  (CarouselParams & CarouselReturnType) | null
>(null);

function Root(props: CarouselRootProps) {
  const {children, ...carouselProps} = props;
  const carousel = useCarousel(carouselProps);

  return (
    <CarouselContext.Provider value={{...carousel, ...carouselProps}}>
      {children}
    </CarouselContext.Provider>
  );
}

function useCarouselContext() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel must be a child of Carousel Root");
  }
  return context;
}

function Slides(props: CarouselSlidesProps) {
  const {children, className, ...rest} = props;
  const carouselContext = useCarouselContext();

  if (!carouselContext) {
    throw new Error("Carousel Slides must be a child of Carousel Root");
  }
  return (
    <div
      className={cx(className, "scroll-smooth")}
      {...rest}
      ref={carouselContext.scrollContainerRef}
    >
      {children}
    </div>
  );
}

function Slide({
  className,
  index,
  ...rest
}: {index: number} & HTMLAttributes<HTMLDivElement>) {
  const carouselContext = useCarouselContext();

  return (
    <div
      {...rest}
      aria-roledescription="Slide"
      className={cx(className, "carousel-slide", {
        "focal-image": carouselContext.focalSlideIndex === index,
      })}
      data-slide-number={index + 1}
      id={`carousel-item-${index + 1}`}
      ref={(el) => {
        carouselContext.slideRefs.current[index] = el as HTMLDivElement;
      }}
      tabIndex={-1}
    />
  );
}

export {Root, Slide, Slides, useCarouselContext};
