"use client";

import type {BlocksBody} from "@/utils/content/toc";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import Label from "@/components/shared/typography/label";
import {getPtComponentId} from "@/utils/ids";
import {toPlainText} from "@portabletext/react";
import * as RadixSelect from "@radix-ui/react-select";
import {cx} from "cva";
import {useState} from "react";

import LocalizedLink from "./localized-link";

type Props = {
  outlines: {block: BlocksBody; isSub: boolean}[];
};

export default function TocSelect({outlines}: Props) {
  const [open, setOpen] = useState(false);

  if (!outlines || outlines.length === 0) return null;

  const options = outlines.map((item, index) => ({
    key: index,
    label: toPlainText(item.block),
    value: getPtComponentId(item.block as any),
  }));

  return (
    <RadixSelect.Root onOpenChange={setOpen} open={open}>
      <RadixSelect.Trigger className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-accent bg-background px-s py-[19px] outline-none lg:hidden">
        <Label font="sans" mobileSize="base">
          <RadixSelect.Value placeholder="On this page" />
        </Label>
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
            "z-50 my-5 max-h-[320px] w-[--radix-select-trigger-width] origin-top rounded-lg border-[1.5px] border-accent bg-background p-xs data-[state=closed]:animate-select-close data-[state=open]:animate-select-open",
            {
              "data-[state=open]": open,
            },
          )}
          position="popper"
        >
          <RadixSelect.Viewport className="flex flex-col">
            {options.map((item) => (
              <SelectItem
                key={item.value}
                onClick={() => setOpen(false)}
                value={item.value}
              >
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
        "cursor-pointer rounded-lg px-s py-[9.5px] data-[disabled]:pointer-events-none data-[state=checked]:bg-accent data-[state=checked]:text-background data-[highlighted]:outline-none",
        className,
      )}
      {...props}
    >
      <LocalizedLink href={`#${props.value}`} scroll>
        <Body font="sans" mobileSize="base">
          <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        </Body>
      </LocalizedLink>
    </RadixSelect.Item>
  );
}
