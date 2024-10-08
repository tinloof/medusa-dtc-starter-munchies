import type {EmblaCarouselType} from "embla-carousel";
import type {ComponentPropsWithRef} from "react";

import React, {useCallback, useEffect, useState} from "react";

import IconButton from "../icons-button";

type UsePrevNextButtonsType = {
  nextBtnDisabled: boolean;
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
  prevBtnDisabled: boolean;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    nextBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
    prevBtnDisabled,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export function PrevButton(props: PropType) {
  return <IconButton icon="ArrowLeft" size="sm" type="button" {...props} />;
}

export function NextButton(props: PropType) {
  return <IconButton icon="ArrowRight" size="sm" type="button" {...props} />;
}
