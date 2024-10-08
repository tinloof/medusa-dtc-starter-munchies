"use client";

import type {EmblaCarouselType, EmblaOptionsType} from "embla-carousel";

import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";

import {Cta} from "../button";
import Heading from "../typography/heading";
import {NextButton, PrevButton, usePrevNextButtons} from "./buttons";

type PropType = {
  cta?: {
    href: string | undefined;
    text: string | undefined;
  };
  options?: EmblaOptionsType;
  showButtons?: boolean;
  showProgress?: boolean;
  slides: React.JSX.Element[] | undefined;
  title: string | undefined;
};

export default function EmblaCarousel(props: PropType) {
  const {
    cta,
    options,
    showButtons = true,
    showProgress = false,
    slides,
    title,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    nextBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  const defaultProgress = 1 / (slides?.length ?? 0);

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const progress = Math.max(
        defaultProgress,
        Math.min(1, emblaApi.scrollProgress()),
      );
      setScrollProgress(progress * 100);
    },
    [defaultProgress],
  );

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [emblaApi, onScroll]);

  if (!slides) return null;

  return (
    <section className="mx-auto max-w-max-screen py-2xl">
      <div className="mb-xs flex items-center justify-between px-m lg:px-xl">
        <Heading
          className="text-center"
          desktopSize="3xl"
          mobileSize="lg"
          tag="h3"
        >
          {title}
        </Heading>
        {showButtons && (
          <div className="hidden gap-2 lg:flex">
            <PrevButton
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
            />
            <NextButton
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
            />
          </div>
        )}
      </div>
      <div className="overflow-hidden px-m lg:px-xl" ref={emblaRef}>
        <div className="-ml-2 flex touch-pan-y touch-pinch-zoom items-stretch">
          {slides.map((slide, index) => (
            <div className="flex-1 pl-2" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showProgress && (
        <div className="relative mx-auto mt-2xl h-[2px] w-[215px] self-center justify-self-end overflow-hidden bg-[#FFD2C7] lg:hidden">
          <div
            className="absolute bottom-0 left-[-100%] top-0 w-full bg-accent transition-transform duration-300 ease-out"
            style={{transform: `translateX(${scrollProgress}%)`}}
          />
        </div>
      )}
      {cta?.text && (
        <div className="mt-2xl px-m lg:px-xl">
          <Cta className="w-full" size="xl" variant="outline">
            {cta.text}
          </Cta>
        </div>
      )}
    </section>
  );
}
