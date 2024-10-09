"use client";

import type {Header} from "@/types/sanity.generated";

import Body from "@/components/shared/typography/body";
import Label from "@/components/shared/typography/label";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {cx} from "cva";
import Link from "next/link";
import {useState} from "react";
import {RemoveScroll} from "react-remove-scroll";

type DropdownType = Extract<
  NonNullable<Header["navigation"]>[number],
  {_type: "dropdown"}
>;

export default function Navigation({data}: {data: Header}) {
  const [openDropdown, setOpenDropdown] = useState<string>("");

  const handleValueChange = (value: string) => {
    setOpenDropdown(value);
  };

  return (
    <NavigationMenu.Root
      className="z-20 hidden lg:block"
      onValueChange={handleValueChange}
      value={openDropdown}
    >
      <NavigationMenu.List className="group flex items-center justify-start">
        {data.navigation?.map((item) => {
          if (item._type === "link") {
            if (!item.cta?.link) return null;
            return (
              <Link
                className={cx(
                  "h-full px-5 py-[14.5px] hover:!opacity-100 group-hover:opacity-50",
                  {
                    "opacity-50": !!openDropdown,
                  },
                )}
                href={item.cta?.link}
                key={item._key}
              >
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Body font="sans" mobileSize="lg">
                      {item.cta?.label}
                    </Body>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </Link>
            );
          } else if (item._type === "dropdown") {
            return (
              <NavigationMenu.Item key={item._key}>
                <NavigationMenu.Trigger
                  className={cx(
                    "px-5 py-[14.5px] transition-all duration-300 hover:!opacity-100 group-hover:opacity-50 data-[state=open]:opacity-100",
                    {
                      "opacity-50": !!openDropdown,
                    },
                  )}
                >
                  <Body font="sans" mobileSize="lg">
                    {item.title}
                  </Body>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft absolute left-0 top-0 z-[30] w-full bg-background px-xl py-2xl">
                  <Content {...item} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }
        })}
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full flex-1 justify-center overflow-hidden bg-transparent">
        <NavigationMenu.Viewport className="data-[state=closed]:animate-exitToTop data-[state=open]:animate-enterFromTop relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden bg-background transition-[width,_height] duration-300" />
      </div>
    </NavigationMenu.Root>
  );
}

function Content({columns}: DropdownType) {
  return (
    <RemoveScroll>
      <div className="relative flex items-start justify-between gap-xl">
        <div className="group flex items-start justify-start gap-lg">
          {columns?.map((link) => {
            return (
              <div
                className="flex min-w-[280px] flex-col items-start justify-start gap-s"
                key={link._key}
              >
                <Body font="sans" mobileSize="base">
                  {link.title}
                </Body>
                {link.links?.map((link) => {
                  if (!link?.link) return null;
                  return (
                    <Link href={link.link} key={link._key}>
                      <Label font="sans" mobileSize="lg">
                        {link.label}
                      </Label>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="h-full w-full bg-orange-300">Product</div>
      </div>
    </RemoveScroll>
  );
}
