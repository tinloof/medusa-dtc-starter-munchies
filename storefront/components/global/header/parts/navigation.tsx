"use client";

import type {Header} from "@/types/sanity.generated";

import {Link} from "@/components/shared/button";
import {SanityImage} from "@/components/shared/sanity-image";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import Label from "@/components/shared/typography/label";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {cx} from "cva";
import NextLink from "next/link";
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
              <NextLink
                className={cx(
                  "h-full whitespace-nowrap px-5 py-[14.5px] transition-opacity duration-300 hover:!opacity-100 group-hover:opacity-50",
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
              </NextLink>
            );
          } else if (item._type === "dropdown") {
            return (
              <NavigationMenu.Item key={item._key}>
                <NavigationMenu.Trigger
                  className={cx(
                    "whitespace-nowrap px-5 py-[14.5px] transition-all duration-300 hover:!opacity-100 group-hover:opacity-50 data-[state=open]:opacity-100",
                    {
                      "opacity-50": !!openDropdown,
                    },
                  )}
                >
                  <Body font="sans" mobileSize="lg">
                    {item.title}
                  </Body>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-0 z-[30] w-full bg-background px-xl py-2xl data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  <Content {...item} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }
        })}
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full flex-1 justify-center overflow-hidden bg-transparent">
        <NavigationMenu.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden border-b border-accent bg-background transition-[width,_height] duration-300 data-[state=closed]:animate-exitToTop data-[state=open]:animate-enterFromTop" />
      </div>
    </NavigationMenu.Root>
  );
}

function Content({cards, columns}: DropdownType) {
  const [hoveredKey, setHoveredKey] = useState<null | string | undefined>(null);

  return (
    <RemoveScroll>
      <div className="relative flex items-start justify-between gap-xl">
        <div className="group flex flex-wrap items-start justify-start gap-lg">
          {columns?.map((link) => {
            return (
              <div
                className="flex min-w-[270px] flex-col items-start justify-start"
                key={link._key}
              >
                <Body className="pb-s" font="sans" mobileSize="base">
                  {link.title}
                </Body>
                {link.links?.map((link) => {
                  if (!link?.link) return null;
                  return (
                    <NextLink
                      className={cx(
                        "py-xs opacity-100 transition-opacity duration-300 last:pb-0 group-hover:opacity-50",
                        {
                          "!opacity-100": hoveredKey === link._key,
                        },
                      )}
                      href={link.link}
                      key={link._key}
                      onMouseEnter={() => setHoveredKey(link._key)}
                      onMouseLeave={() => setHoveredKey(null)}
                    >
                      <Label font="sans" mobileSize="lg">
                        {link.label}
                      </Label>
                    </NextLink>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="scrollbar-hide flex flex-wrap items-stretch justify-start gap-lg">
          {cards?.map((card) => {
            return <Product key={card._key} {...card} />;
          })}
        </div>
      </div>
    </RemoveScroll>
  );
}

function Product({
  cta,
  image,
  title,
}: NonNullable<DropdownType["cards"]>[number]) {
  return (
    <div className="flex w-[220px] min-w-[160px] max-w-[220px] shrink-0 flex-col items-center gap-xs rounded-lg">
      {image ? (
        <SanityImage
          className="aspect-square max-h-[220px] w-[220px] min-w-[160px] rounded-lg"
          data={image}
        />
      ) : (
        <div className="aspect-square w-full rounded-lg bg-accent" />
      )}

      <Heading className="text-center" font="serif" mobileSize="xs" tag="h5">
        {title}
      </Heading>
      {cta && (
        <Link className="mt-xs" href={cta?.link} size="sm" variant="outline">
          {cta?.label}
        </Link>
      )}
    </div>
  );
}