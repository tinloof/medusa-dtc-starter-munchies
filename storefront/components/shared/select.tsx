"use client";

import * as RadixSelect from "@radix-ui/react-select";
import {cx} from "cva";
import {useState} from "react";

import Icon from "./icon";
import Body from "./typography/body";

type Option = {label: string; value: string};

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

  if (options.length === 0) return null;

  return (
    <RadixSelect.Root
      onOpenChange={setOpen}
      onValueChange={setOption}
      open={open}
      value={value!}
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
          },
        )}
      >
        <Body
          font="sans"
          mobileSize={
            variant === "outline"
              ? "2xl"
              : ["basic", "filter"].includes(variant)
                ? "base"
                : undefined
          }
        >
          <RadixSelect.Value placeholder={placeholder} />
        </Body>
        <RadixSelect.Icon className="flex-shrink-0">
          <Icon
            className={cx(
              "transition-transforms data-[size=open] min-w-4 duration-300",
              {
                "rotate-180": open,
              },
            )}
            name="AccordionTop"
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={cx(
            "z-[100] my-1 max-h-[296px] w-[--radix-select-trigger-width] origin-top rounded-lg border-[1.5px] border-accent bg-background p-xs data-[state=closed]:animate-select-close data-[state=open]:animate-select-open",
            {
              "data-[state=open]": open,
            },
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
        "cursor-pointer rounded-lg px-s py-xs data-[disabled]:pointer-events-none data-[highlighted]:bg-secondary data-[state=checked]:bg-accent data-[state=checked]:text-background data-[highlighted]:outline-none",
        className,
      )}
      {...props}
    >
      <Body className="truncate text-nowrap" font="sans" mobileSize="base">
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </Body>
    </RadixSelect.Item>
  );
}
