"use client";
import type Select from "@/components/shared/select";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {cx} from "cva";
import {parseAsArrayOf, parseAsString, useQueryState} from "nuqs";
import {type ComponentProps, useState} from "react";

import DropDown from "./drop-down";

export function useMultiFilter(name: string) {
  const [state, setState] = useQueryState(
    name,
    parseAsArrayOf(parseAsString).withOptions({shallow: false}),
  );

  const setFilter = (value: string) => {
    setState((prev) => {
      if (prev && prev.includes(value)) {
        const values = prev.filter((item) => item !== value);
        return values.length > 0 ? values : null;
      }
      return prev ? [value, ...prev] : [value];
    });
  };

  return {filter: state, setFilter};
}

export default function FilterSelect(
  props: {name: string; placeholder: string} & Omit<
    ComponentProps<typeof Select>,
    "setOption" | "variant"
  >,
) {
  const {filter, setFilter} = useMultiFilter(props.name);

  const [isOpen, setOpen] = useState(false);

  return (
    <DropDown isOpen={isOpen} placeholder={props.placeholder} setOpen={setOpen}>
      <div className="group flex w-full flex-col gap-2 rounded p-xs py-2">
        {props.options.map((option) => {
          const selected = filter?.includes(option.value);
          return (
            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg px-s py-xs hover:bg-secondary disabled:pointer-events-none"
              key={option.value}
              onClick={() => setFilter(option.value)}
            >
              <div className="flex !size-4 items-center justify-center rounded-[4px] border border-accent">
                <Icon
                  className={cx(
                    "!size-3 shrink-0 transform opacity-0 transition-transform duration-300",
                    {"opacity-100": selected},
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
            </button>
          );
        })}
      </div>
    </DropDown>
  );
}
