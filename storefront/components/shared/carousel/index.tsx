"use client";

import type {EmblaCarouselType, EmblaOptionsType} from "embla-carousel";
import type {ReactNode} from "react";

import {cx} from "cva";
import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";

import {Cta} from "../button";
import {NextButton, PrevButton, usePrevNextButtons} from "./buttons";

type Props = {
  cta?: {
    href: string | undefined;
    text: string | undefined;
  };
  disableDesktopDrag?: boolean;
  options?: EmblaOptionsType;
  showButtons?: boolean;
  showProgress?: boolean;
  slides: React.JSX.Element[] | undefined;
  title?: ReactNode;
  variant?: "cart" | "default";
};

export default function EmblaCarousel(props: Props) {
  const {
    cta,
    disableDesktopDrag = false,
    options,
    showButtons = true,
    showProgress = false,
    slides,
    title,
    variant = "default",
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    breakpoints: {"(min-width: 1024px)": {watchDrag: !disableDesktopDrag}},
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
      <div
        className={cx("mb-xs flex items-center justify-between", {
          "px-m lg:px-xl": variant === "default",
          "px-s": variant === "cart",
        })}
      >
        {title}
        {showButtons && (
          <div className="hidden gap-2 lg:flex">
            <PrevButton
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
              size={variant === "default" ? "sm" : "xs"}
            />
            <NextButton
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
              size={variant === "default" ? "sm" : "xs"}
            />
          </div>
        )}
      </div>
      <div
        className={cx("overflow-hidden", {
          "px-m lg:px-xl": variant === "default",
          "px-s": variant === "cart",
        })}
        ref={emblaRef}
      >
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
