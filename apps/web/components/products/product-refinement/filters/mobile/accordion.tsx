"use client";

import Icon from "@/components/shared/icon";
import {cx} from "cva";
import {useEffect, useRef, useState} from "react";

import {useMultiFilter} from "../filter-select";

export default function Accordion({
  heading,
  name,
  options,
}: {
  heading: string;
  name: string;
  options: {label: string; value: string}[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const {filter, setFilter} = useMultiFilter(name);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col justify-between">
        <button
          className="flex items-center justify-between px-s py-[10px] text-left transition-all duration-300"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p>{heading}</p>
          <Icon
            className={cx(
              "transition-transforms data-[size=open] duration-300",
              {
                "rotate-180": isOpen,
              },
            )}
            name="AccordionTop"
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
          {options.map(({label, value}) => {
            const selected = filter?.includes(value);

            return (
              <button
                className="flex items-center gap-2 px-s py-[10px]"
                key={value}
                onClick={() => setFilter(value)}
              >
                <div className="flex size-4! items-center justify-center rounded-[4px] border border-accent text-lg">
                  <Icon
                    className={cx(
                      "size-3! shrink-0 transform opacity-0 transition-transform duration-300",
                      {"opacity-100": selected},
                    )}
                    name="Check"
                  />
                </div>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
