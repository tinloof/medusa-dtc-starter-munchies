import type {RefObject} from "react";

import {useEffect, useRef} from "react";

export const useOutsideClick = <T extends HTMLElement>(
  callback: () => void,
  initRef = null,
): RefObject<T | null> => {
  const ref = useRef<T>(initRef);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);

  return ref;
};
