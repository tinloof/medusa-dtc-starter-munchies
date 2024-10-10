"use client";
import type Select from "@/components/shared/select";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {cx} from "cva";
import {parseAsArrayOf, parseAsString, useQueryState} from "nuqs";
import {type ComponentProps} from "react";

import DropDown from "./drop-down";

export default function FilterSelect(
  props: {name: string; placeholder: string} & Omit<
    ComponentProps<typeof Select>,
    "setOption" | "variant"
  >,
) {
  const [filter, setFilter] = useQueryState(
    props.name,
    parseAsArrayOf(parseAsString),
  );

  const setOption = (value: string) => {
    setFilter(
      (prev) => {
        if (prev && prev.includes(value)) {
          const values = prev.filter((item) => item !== value);
          return values.length > 0 ? values : null;
        }
        return prev ? [value, ...prev] : [value];
      },
      {shallow: true},
    );
  };

  return (
    <DropDown placeholder={props.placeholder}>
      {props.options.map((option) => {
        const selected = filter?.includes(option.value);
        return (
          <button
            className="flex cursor-pointer items-center gap-2 rounded-lg px-s py-xs hover:bg-secondary disabled:pointer-events-none"
            key={option.value}
            onClick={() => setOption(option.value)}
          >
            <div className="flex !size-4 items-center justify-center rounded-[4px] border border-accent">
              <Icon
                className={cx(
                  "!size-3 shrink-0 transform opacity-0 transition-transform duration-300",
                  {"opacity-100": selected},
                )}
                name="Check"
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
    </DropDown>
  );
}
