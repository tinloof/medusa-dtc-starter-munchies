"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { cx } from "class-variance-authority";
import { useMemo, useState } from "react";

import Icon from "./Icon";
import Body from "./typography/Body";

type Option = { label: string; value: string };

export default function Select({
  className,
  options,
  placeholder,
  setOption,
  value,
  variant,
}: {
  className?: string;
  options: Option[];
  placeholder?: string;
  setOption: (value: string) => void;
  value?: null | string;
  variant: "basic" | "filter" | "outline";
}) {
  const [open, setOpen] = useState(false);

  const mobileSize = useMemo(() => {
    if (variant === "outline") {
      return "2xl";
    }
    if (["basic", "filter"].includes(variant)) {
      return "base";
    }
    return null;
  }, [variant]);

  if (options.length === 0) {
    return null;
  }

  return (
    <RadixSelect.Root
      onOpenChange={setOpen}
      onValueChange={setOption}
      open={open}
      value={value ?? undefined}
    >
      <RadixSelect.Trigger
        className={cx(
          className,
          "flex items-center justify-between gap-lg truncate bg-background px-s py-[6px] outline-none",
          {
            "rounded-lg border-[1.5px] border-accent": [
              "filter",
              "outline",
            ].includes(variant),
          }
        )}
      >
        <Body font="sans" mobileSize={mobileSize}>
          <RadixSelect.Value placeholder={placeholder} />
        </Body>
        <RadixSelect.Icon className="shrink-0">
          <Icon
            className={cx(
              "min-w-4 transition-transform duration-300",
              {
                "rotate-180": open,
              }
            )}
            name="AccordionTop"
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={cx(
            "z-100 my-1 max-h-[296px] w-[var(--radix-select-trigger-width)] origin-top rounded-lg border-[1.5px] border-accent bg-background p-xs",
            {
              "data-[state=open]": open,
            }
          )}
          position="popper"
        >
          <RadixSelect.Viewport className="flex flex-col">
            {options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

function SelectItem({
  children,
  className,
  ...props
}: RadixSelect.SelectItemProps) {
  return (
    <RadixSelect.Item
      className={cx(
        "cursor-pointer rounded-lg px-s py-xs data-disabled:pointer-events-none data-[state=checked]:bg-accent data-highlighted:bg-secondary data-[state=checked]:text-background data-highlighted:outline-none",
        className
      )}
      {...props}
    >
      <Body className="truncate text-nowrap" font="sans" mobileSize="base">
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </Body>
    </RadixSelect.Item>
  );
}
