"use client";
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel";
import type {EmblaViewportRefType} from "embla-carousel-react";
import type {ComponentProps, JSX, PropsWithChildren} from "react";

import {Slot} from "@radix-ui/react-slot";
import {cx} from "cva";
import useEmblaCarousel from "embla-carousel-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CarouselContextType = {
  api?: EmblaCarouselType;
  ref: EmblaViewportRefType;
  scrollProgress: number;
};

type CarouselRootProps = PropsWithChildren<{
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  slidesCount: number;
}>;

type CarouselButtonsState = {
  nextDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;
  prevDisabled: boolean;
};

type SlidesWrapperProps = Omit<ComponentProps<"div">, "ref">;

type SlidesProps = {
  content: JSX.Element[];
  itemProps: Omit<ComponentProps<"div">, "key">;
  wrapperDiv: ComponentProps<"div">;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel must be a child of Carousel Root");
  return context;
}

export const useCarouselButtons = (): CarouselButtonsState => {
  const {api} = useCarousel();

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onPrev = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const onNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (api) {
      onSelect(api);
      api.on("reInit", onSelect).on("select", onSelect);
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
  const {children, options, plugins, slidesCount} = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const defaultProgress = 1 / slidesCount;

  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <CarouselContext.Provider
      value={{api: emblaApi, ref: emblaRef, scrollProgress}}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export function SlidesWrapper(props: SlidesWrapperProps) {
  const {children, className, ...passThrough} = props;
  const {ref} = useCarousel();
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

export function Slides({content, itemProps, wrapperDiv}: SlidesProps) {
  const {className: wrapperClassName, ...passThroughWrapper} = wrapperDiv;
  const {className: itemClassName, ...passThroughItemProps} = itemProps;

  return (
    <div className={cx("flex", wrapperClassName)} {...passThroughWrapper}>
      {content.map((item) => {
        return (
          <div
            className={cx("flex-1", itemClassName)}
            key={item.key}
            {...passThroughItemProps}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

type ButtonProps = {asChild?: boolean} & Omit<
  ComponentProps<"button">,
  "disabled" | "onClick"
>;

const getComp = (asChild?: boolean) => (asChild ? Slot : "button");

export function NextButton({asChild, ...props}: ButtonProps) {
  const {nextDisabled, onNext} = useCarouselButtons();
  const Comp = getComp(asChild);

  return <Comp disabled={nextDisabled} onClick={onNext} {...props} />;
}

export function PrevButton({asChild, ...props}: ButtonProps) {
  const {onPrev, prevDisabled} = useCarouselButtons();
  const Comp = getComp(asChild);

  return <Comp disabled={prevDisabled} onClick={onPrev} {...props} />;
}
