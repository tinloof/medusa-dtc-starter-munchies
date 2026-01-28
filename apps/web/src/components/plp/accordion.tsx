import { cx } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/generated/Icon";
import { ACCORDION_TOP, CHECK } from "@/generated/icons";
import { buildFilterUrl, getFilterValues } from "./filter-select";

export function Accordion(props: {
  heading: string;
  name: string;
  options: { label: string; value: string }[];
  searchParams: string;
  pathname: string;
}) {
  const searchParams = new URLSearchParams(props.searchParams);
  const filter = getFilterValues(searchParams, props.name);

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: TODO
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col justify-between">
        <button
          className="flex items-center justify-between px-s py-2.5 text-left transition-all duration-300"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          <p>{props.heading}</p>
          <Icon
            className={cx(
              "data-[size=open] transition-transforms duration-300",
              {
                "rotate-180": isOpen,
              }
            )}
            href={ACCORDION_TOP}
          />
        </button>
        <div
          className="flex flex-col gap-2 overflow-hidden"
          ref={contentRef}
          style={{
            height: isOpen ? (height ?? "auto") : 0,
            transformOrigin: "top",
            transition: "height 0.5s",
          }}
        >
          {props.options.map((option) => {
            const selected = filter?.includes(option.value);
            const href = buildFilterUrl(
              props.pathname,
              searchParams,
              props.name,
              option.value
            );

            return (
              <a
                className="flex items-center gap-2 px-s py-2.5"
                href={href}
                key={option.value}
                type="button"
              >
                <div className="flex size-4! items-center justify-center rounded-sm border border-accent text-lg">
                  <Icon
                    className={cx(
                      "size-3! shrink-0 transform opacity-0 transition-transform duration-300",
                      { "opacity-100": selected }
                    )}
                    href={CHECK}
                  />
                </div>
                {option.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
