import { cx } from "class-variance-authority";
import type { ReactNode } from "react";

// Using any for options type due to embla-carousel 9.x type issues
type EmblaOptionsType = any;

import {
  NextButton,
  PrevButton,
  Root,
  SlidesWrapper,
  useCarousel,
} from "./Carousel";
import IconButton from "./IconButton";

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
    disableDesktopDrag,
    options,
    showButtons = true,
    showProgress = false,
    slides,
    title,
    variant = "default",
  } = props;

  if (!slides) {
    return null;
  }

  return (
    <Root
      options={{
        ...options,
        breakpoints: {
          "(min-width: 1024px)": { watchDrag: !disableDesktopDrag },
        },
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
          {showButtons ? <Buttons variant={variant} /> : null}
        </div>
        <SlidesWrapper
          className={cx({
            "px-m lg:px-xl": variant === "default",
            "px-s": variant === "cart",
          })}
        >
          <div className="-ml-2 flex touch-pan-y touch-pinch-zoom items-stretch">
            {slides.map((slide, index) => (
              <div className="flex-1 py-1 pl-2" key={index.toString()}>
                {slide}
              </div>
            ))}
          </div>
        </SlidesWrapper>

        {showProgress ? <ProgressBar /> : null}
      </section>
    </Root>
  );
}

function Buttons({ variant }: { variant: "cart" | "default" }) {
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
  const { scrollProgress } = useCarousel();

  return (
    <div className="relative mx-auto mt-2xl h-[2px] w-[215px] self-center justify-self-end overflow-hidden bg-[#FFD2C7] lg:hidden">
      <div
        className="absolute top-0 bottom-0 -left-full w-full bg-accent transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${scrollProgress}%)` }}
      />
    </div>
  );
}
