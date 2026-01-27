import { cx } from "class-variance-authority";
import {
  type ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/shared/icon";
import type { Select } from "@/components/shared/select";
import { Body } from "@/components/shared/typography/body";
import { DropDown } from "./dropdown";

export function getFilterValues(
  params: URLSearchParams,
  name: string
): string[] {
  const value = params.get(name);
  return value ? value.split(",").filter(Boolean) : [];
}

export function buildFilterUrl(
  pathname: string,
  currentParams: URLSearchParams,
  name: string,
  value: string
): string {
  const params = new URLSearchParams(currentParams);
  const current = getFilterValues(params, name);

  let newValues: string[];
  if (current.includes(value)) {
    newValues = current.filter((v) => v !== value);
  } else {
    newValues = [...current, value];
  }

  if (newValues.length > 0) {
    params.set(name, newValues.join(","));
  } else {
    params.delete(name);
  }

  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function FilterSelect(
  props: {
    name: string;
    pathname: string;
    placeholder: string;
    searchParams: string;
  } & Omit<ComponentProps<typeof Select>, "setOption" | "variant">
) {
  const searchParams = new URLSearchParams(props.searchParams);
  const filter = getFilterValues(searchParams, props.name);

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
    <DropDown isOpen={isOpen} placeholder={props.placeholder} setOpen={setOpen}>
      <div
        className="relative max-h-80 w-full overflow-y-auto rounded"
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
            <Icon className="size-6" name="AccordionBottom" />
          </div>
        </div>
        <div className="group flex w-full flex-col gap-2 p-xs">
          {props.options.length === 0 && (
            <Body className="w-full">No filters to select</Body>
          )}
          {props.options.map((option) => {
            const selected = filter.includes(option.value);
            const href = buildFilterUrl(
              props.pathname,
              searchParams,
              props.name,
              option.value
            );
            return (
              <a
                className="flex cursor-pointer items-center gap-2 rounded-lg px-s py-xs hover:bg-secondary"
                href={href}
                key={option.value}
              >
                <div className="flex size-4! items-center justify-center rounded-sm border border-accent">
                  <Icon
                    className={cx(
                      "size-3! shrink-0 transform opacity-0 transition-transform duration-300",
                      { "opacity-100": selected }
                    )}
                    height={24}
                    name="Check"
                    width={24}
                  />
                </div>
                <Body
                  className="truncate text-nowrap text-left"
                  font="sans"
                  mobileSize="base"
                >
                  {option.label}
                </Body>
              </a>
            );
          })}
        </div>
        <div className="sticky bottom-0 -mt-[25.5px] h-[25.5px] overflow-hidden">
          <div
            className={cx(
              "sticky bottom-0 left-0 flex w-full cursor-pointer items-center justify-center border-accent border-t-[1.5px] bg-background transition-all duration-300",
              {
                "translate-y-full": !showBottomArrow,
              }
            )}
            onClick={() => scrollBy(250)}
          >
            <Icon className="size-6" name="AccordionTop" />
          </div>
        </div>
      </div>
    </DropDown>
  );
}
