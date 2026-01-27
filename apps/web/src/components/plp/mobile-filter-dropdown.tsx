import { cx } from "class-variance-authority";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cta } from "@/components/shared/button";
import { Icon } from "@/components/shared/icon";
import { getLocalizedHref } from "@/lib/utils/get-localized-href";
import type { Option } from "../shared/select";
import { Body } from "../shared/typography/body";
import { Accordion } from "./accordion";
import { DropDown } from "./dropdown";

interface MobileFilterDropdownProps {
  searchParams: string;
  pathname: string;
  collectionOptions: Option[];
  categoryOptions: Option[];
  countryCode: string;
  defaultCountryCode: string;
}

function getClearUrl(
  searchParams: string,
  countryCode: string,
  defaultCountryCode: string
): string {
  const newParams = new URLSearchParams(searchParams);
  newParams.delete("collection");
  newParams.delete("category");
  const queryString = newParams.toString();
  return queryString
    ? `?${queryString}`
    : getLocalizedHref({
        href: "/products",
        countryCode,
        defaultCountryCode,
      });
}

export function MobileFilterDropdown({
  searchParams,
  pathname,
  collectionOptions,
  categoryOptions,
  countryCode,
  defaultCountryCode,
}: MobileFilterDropdownProps) {
  const [isOpen, setOpen] = useState(false);

  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowTopArrow(container.scrollTop > 0);
      setShowBottomArrow(
        container.scrollHeight - container.clientHeight >
          container.scrollTop + 1
      );
    }
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  const scrollBy = (amount: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ behavior: "smooth", top: amount });
    }
  };
  return (
    <DropDown isOpen={isOpen} placeholder="Filter" setOpen={setOpen}>
      <div
        className="relative max-h-90 w-full overflow-y-auto rounded"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        <div className="sticky top-0">
          <div
            className={cx(
              "absolute top-0 left-0 flex w-full cursor-pointer items-center justify-center border-accent border-b-[1.5px] bg-background transition-all duration-300",
              {
                "-translate-y-full": !showTopArrow,
              }
            )}
            onClick={() => scrollBy(-250)}
          >
            <Icon className="my-1 size-6" name="AccordionBottom" />
          </div>
        </div>
        <div className="flex flex-col gap-xs p-xs">
          <Accordion
            heading="Collections"
            name="collection"
            options={collectionOptions}
            pathname={pathname}
            searchParams={searchParams.toString()}
          />
          <Accordion
            heading="Categories"
            name="category"
            options={categoryOptions}
            pathname={pathname}
            searchParams={searchParams.toString()}
          />
        </div>
        <div className="sticky bottom-0 h-[25.5px] overflow-hidden">
          <div
            className={cx(
              "sticky bottom-0 left-0 flex w-full cursor-pointer items-center justify-center border-accent border-t-[1.5px] bg-background transition-all duration-300",
              {
                "translate-y-full": !showBottomArrow,
              }
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
        <a
          className="text-center"
          href={getClearUrl(searchParams, countryCode, defaultCountryCode)}
        >
          <Body className="underline" font="sans" mobileSize="sm">
            Clear all
          </Body>
        </a>
      </div>
    </DropDown>
  );
}
