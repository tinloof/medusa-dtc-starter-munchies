"use client";
import {Cta} from "@/components/shared/button";
import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {cx} from "cva";
import {usePathname, useRouter} from "next/navigation";
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import DropDown from "../drop-down";

type Props = PropsWithChildren;

export default function MobileFilterDropdown({children}: Props) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const clearSearchParams = useCallback(() => {
    router.push(pathname);
    setOpen(false);
  }, [router, pathname]);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowTopArrow(container.scrollTop > 0);
      setShowBottomArrow(
        container.scrollHeight - container.clientHeight >
          container.scrollTop + 1,
      );
    }
  };

  useEffect(() => {
    handleScroll();
  }, [isOpen]);

  const scrollBy = (amount: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({behavior: "smooth", top: amount});
    }
  };
  return (
    <DropDown isOpen={isOpen} placeholder="Filter" setOpen={setOpen}>
      <div
        className="relative max-h-[360px] w-full overflow-y-auto rounded"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        <div className="sticky top-0">
          <div
            className={cx(
              "absolute left-0 top-0 flex w-full cursor-pointer items-center justify-center border-b-[1.5px] border-accent bg-background transition-all duration-300",
              {
                "translate-y-[-100%]": !showTopArrow,
              },
            )}
            onClick={() => scrollBy(-250)}
          >
            <Icon className="my-1 size-6" name="AccordionBottom" />
          </div>
        </div>
        {children}
        <div className="sticky bottom-0 h-[25.5px] overflow-hidden">
          <div
            className={cx(
              "sticky bottom-0 left-0 flex w-full cursor-pointer items-center justify-center border-t-[1.5px] border-accent bg-background transition-all duration-300",
              {
                "translate-y-[100%]": !showBottomArrow,
              },
            )}
            onClick={() => scrollBy(250)}
          >
            <Icon className="my-1 size-6" name="AccordionTop" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 my-2 flex w-[calc(100vw-40px)] flex-col justify-center gap-s px-xs">
        <Cta className="w-full" onClick={() => setOpen(false)} size="md">
          Show Results
        </Cta>
        <button onClick={() => clearSearchParams()}>
          <Body className="underline" font="sans" mobileSize="sm">
            Clear all
          </Body>
        </button>
      </div>
    </DropDown>
  );
}

export function useClearSearchParams() {}
