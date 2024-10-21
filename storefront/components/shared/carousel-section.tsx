"use client";

import type {EmblaOptionsType} from "embla-carousel";
import type {ReactNode} from "react";

import {cx} from "cva";

import {Link} from "./button";
import {
  NextButton,
  PrevButton,
  Root,
  SlidesWrapper,
  useCarousel,
} from "./carousel";
import IconButton from "./icons-button";

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

export default function CarouselSection(props: Props) {
  const {
    cta,
    disableDesktopDrag,
    options,
    showButtons = true,
    showProgress = false,
    slides,
    title,
    variant = "default",
  } = props;

  if (!slides) return null;

  return (
    <Root
      options={{
        ...options,
        breakpoints: {"(min-width: 1024px)": {watchDrag: !disableDesktopDrag}},
        containScroll: "trimSnaps",
        dragFree: true,
      }}
      slidesCount={slides.length}
    >
      <section className="mx-auto max-w-max-screen py-2xl">
        <div
          className={cx("mb-xs flex items-center justify-between", {
            "px-m lg:px-xl": variant === "default",
            "px-s": variant === "cart",
          })}
        >
          {title}
          {showButtons && <Buttons variant={variant} />}
        </div>
        <SlidesWrapper
          className={cx({
            "px-m lg:px-xl": variant === "default",
            "px-s": variant === "cart",
          })}
        >
          <div className="-ml-2 flex touch-pan-y touch-pinch-zoom items-stretch">
            {slides.map((slide, index) => (
              <div className="flex-1 py-1 pl-2" key={index}>
                {slide}
              </div>
            ))}
          </div>
        </SlidesWrapper>

        {showProgress && <ProgressBar />}
        {cta?.text && (
          <div className="mt-2xl px-m lg:px-xl">
            <Link
              className="w-full"
              href={cta.href}
              size="xl"
              variant="outline"
            >
              {cta.text}
            </Link>
          </div>
        )}
      </section>
    </Root>
  );
}

function Buttons({variant}: {variant: "cart" | "default"}) {
  return (
    <div className="hidden gap-2 lg:flex">
      <PrevButton asChild>
        <IconButton
          icon="ArrowLeft"
          size={variant === "default" ? "sm" : "xs"}
          type="button"
        />
      </PrevButton>
      <NextButton asChild>
        <IconButton
          icon="ArrowRight"
          size={variant === "default" ? "sm" : "xs"}
          type="button"
        />
      </NextButton>
    </div>
  );
}

function ProgressBar() {
  const {scrollProgress} = useCarousel();

  return (
    <div className="relative mx-auto mt-2xl h-[2px] w-[215px] self-center justify-self-end overflow-hidden bg-[#FFD2C7] lg:hidden">
      <div
        className="absolute bottom-0 left-[-100%] top-0 w-full bg-accent transition-transform duration-300 ease-out"
        style={{transform: `translateX(${scrollProgress}%)`}}
      />
    </div>
  );
}
