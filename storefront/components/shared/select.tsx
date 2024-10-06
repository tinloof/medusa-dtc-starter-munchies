"use client";

import * as RadixSelect from "@radix-ui/react-select";
import {cx} from "cva";
import {useState} from "react";

import Body from "./body";
import Icon from "./icon";

export default function Select() {
  const [open, setOpen] = useState(false);
  const items = [
    {label: "4-Pack", value: "4-Pack"},
    {label: "6-Pack", value: "6-Pack"},
    {label: "8-Pack", value: "8-Pack"},
  ];
  return (
    <RadixSelect.Root onOpenChange={setOpen} open={open}>
      <RadixSelect.Trigger className="flex w-fit items-center justify-between gap-lg rounded-lg border-[1.5px] border-accent bg-background px-s py-[6px] outline-none">
        <Body font="sans" mobileSize="2xl">
          <RadixSelect.Value placeholder="4-Pack" />
        </Body>
        <RadixSelect.Icon className="flex-shrink-0">
          <Icon
            className={cx(
              "transition-transforms data-[size=open] duration-300",
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
            "z-50 my-1 max-h-[296px] w-[--radix-select-trigger-width] origin-top rounded-lg border-[1.5px] border-accent bg-background p-xs data-[state=closed]:animate-select-close data-[state=open]:animate-select-open",
            {
              "data-[state=open]": open,
            },
          )}
          position="popper"
        >
          <RadixSelect.Viewport className="flex flex-col">
            {items.map((item) => (
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
}: React.PropsWithChildren<RadixSelect.SelectItemProps>) {
  return (
    <RadixSelect.Item
      className={cx(
        "cursor-pointer rounded-lg px-s py-xs data-[disabled]:pointer-events-none data-[highlighted]:bg-secondary data-[state=checked]:bg-accent data-[state=checked]:text-background data-[highlighted]:outline-none",
        className,
      )}
      {...props}
    >
      <Body font="sans" mobileSize="base">
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </Body>
    </RadixSelect.Item>
  );
}
