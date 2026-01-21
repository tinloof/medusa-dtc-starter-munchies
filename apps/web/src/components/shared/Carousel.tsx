import { Slot } from "@radix-ui/react-slot";
import { cx } from "class-variance-authority";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from 'embla-carousel'
import type { ComponentProps, PropsWithChildren } from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CarouselContextType = {
  api?: any;
  ref: any;
  scrollProgress: number;
};

type CarouselRootProps = PropsWithChildren<{
  options?: EmblaOptionsType;
  slidesCount: number;
}>;

type CarouselButtonsState = {
  nextDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;
  prevDisabled: boolean;
};

type SlidesWrapperProps = Omit<ComponentProps<"div">, "ref">;

const CarouselContext = createContext<CarouselContextType | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel must be a child of Carousel Root");
  }
  return context;
}

export const useCarouselButtons = (): CarouselButtonsState => {
  const [_, api] = useEmblaCarousel();

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onPrev = useCallback(() => {
    if (api) {
      (api as any).scrollPrev();
    }
  }, [api]);

  const onNext = useCallback(() => {
    if (api) {
      (api as any).scrollNext();
    }
  }, [api]);

  const onSelect = useCallback(() => {
    if (api) {
      setPrevDisabled(!(api as any).canScrollPrev());
      setNextDisabled(!(api as any).canScrollNext());
    }
  }, [api]);

  useEffect(() => {
    if (api) {
      onSelect();
      (api as any).on("reInit", onSelect).on("select", onSelect);
    }
  }, [api, onSelect]);

  return {
    nextDisabled,
    onNext,
    onPrev,
    prevDisabled,
  };
};

export function Root(props: CarouselRootProps) {
  const { children, options, slidesCount } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const defaultProgress = 1 / slidesCount;

  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback(
    (_emblaApi: any) => {
      const progress = Math.max(
        defaultProgress,
        Math.min(1, _emblaApi.scrollProgress())
      );
      setScrollProgress(progress * 100);
    },
    [defaultProgress]
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onScroll(emblaApi);
    (emblaApi as any).on("reInit", onScroll).on("scroll", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <CarouselContext.Provider
      value={{ api: emblaApi, ref: emblaRef, scrollProgress }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export function SlidesWrapper(props: SlidesWrapperProps) {
  const { children, className, ...passThrough } = props;
  const { ref } = useCarousel();
  return (
    <div
      className={cx("overflow-hidden", className)}
      ref={ref}
      {...passThrough}
    >
      {children}
    </div>
  );
}

type ButtonProps = { asChild?: boolean } & Omit<
  ComponentProps<"button">,
  "disabled" | "onClick"
>;

const getComp = (asChild?: boolean) => (asChild ? Slot : "button");

export function NextButton({ asChild, ...props }: ButtonProps) {
  const { nextDisabled, onNext } = useCarouselButtons();
  const Comp = getComp(asChild);

  return <Comp disabled={nextDisabled} onClick={onNext} {...props} />;
}

export function PrevButton({ asChild, ...props }: ButtonProps) {
  const { onPrev, prevDisabled } = useCarouselButtons();
  const Comp = getComp(asChild);

  return <Comp disabled={prevDisabled} onClick={onPrev} {...props} />;
}
