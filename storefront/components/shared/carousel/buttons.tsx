import type {EmblaCarouselType} from "embla-carousel";

import {useCallback, useEffect, useState} from "react";

import type {IconButtonProps} from "../icons-button";

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

type Props = Omit<IconButtonProps, "icon" | "type">;

export function PrevButton({size = "sm", ...props}: Props) {
  return <IconButton icon="ArrowLeft" size={size} type="button" {...props} />;
}

export function NextButton({size = "sm", ...props}: Props) {
  return <IconButton icon="ArrowRight" size={size} type="button" {...props} />;
}
