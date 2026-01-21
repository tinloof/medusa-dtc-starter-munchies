"use client";

import type { Header } from "@packages/sanity/types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";

import Body from "@/components/shared/typography/Body";
import Heading from "@/components/shared/typography/Heading";
import Label from "@/components/shared/typography/Label";
import { SanityImage } from "@/components/shared/SanityImage";
import LocalizedLink from "@/components/shared/LocalizedLink";
import BottomBorder from "./BottomBorder";

type DropdownType = Extract<
  NonNullable<Header["navigation"]>[number],
  { _type: "dropdown" }
>;

export default function Navigation({ data }: { data: Header }) {
  const [openDropdown, setOpenDropdown] = useState<string>("");

  const handleValueChange = (value: string) => {
    setOpenDropdown(value);
  };

  // Close dropdown on navigation (popstate event)
  useEffect(() => {
    const handlePopState = () => {
      setOpenDropdown("");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <NavigationMenu.Root
      className="z-20 hidden lg:block"
      onValueChange={handleValueChange}
      value={openDropdown}
    >
      <NavigationMenu.List className="group flex items-center justify-start">
        {data.navigation?.map((item) => {
          if (item._type === "link") {
            if (!item.cta?.link) {
              return null;
            }
            return (
              <LocalizedLink
                className={cx(
                  "h-full whitespace-nowrap px-5 py-[14.5px] transition-opacity duration-300 hover:opacity-100! group-hover:opacity-50",
                  {
                    "opacity-50": !!openDropdown,
                  }
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
              </LocalizedLink>
            );
          }
          if (item._type === "dropdown") {
            return (
              <NavigationMenu.Item key={item._key}>
                <NavigationMenu.Trigger
                  className={cx(
                    "whitespace-nowrap px-5 py-[14.5px] transition-all duration-300 hover:opacity-100! group-hover:opacity-50 data-[state=open]:opacity-100",
                    {
                      "opacity-50": !!openDropdown,
                    }
                  )}
                >
                  <Body font="sans" mobileSize="lg">
                    {item.title}
                  </Body>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 z-30 w-full bg-background data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  <Content {...item} onClose={() => setOpenDropdown("")} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }
          return null;
        })}
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full flex-1 flex-col justify-center overflow-hidden bg-transparent">
        <BottomBorder dropdownOpen={!!openDropdown} />
        <NavigationMenu.Viewport className="relative mx-auto h-(--radix-navigation-menu-viewport-height) w-full origin-[top_center] overflow-hidden bg-background transition-[width,height] duration-300 data-[state=closed]:animate-exitToTop data-[state=open]:animate-enterFromTop" />
        <div
          className={cx(
            "relative w-full bg-accent transition-all duration-300",
            {
              "h-[1.5px] animate-enterFromTop": openDropdown,
              "h-0 animate-exitToTop": !openDropdown,
            }
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

function Content({
  cards,
  columns,
  onClose,
}: DropdownType & { onClose: () => void }) {
  const [hoveredKey, setHoveredKey] = useState<null | string | undefined>(null);

  return (
    <RemoveScroll>
      <div className="relative mx-auto flex max-w-max-screen items-start justify-between gap-xl px-xl py-2xl">
        <div className="group flex flex-wrap items-start justify-start gap-lg">
          {columns?.map((link) => (
            <div
              className="flex min-w-[270px] flex-col items-start justify-start"
              key={link._key}
            >
              <Body className="pb-s" font="sans" mobileSize="base">
                {link.title}
              </Body>
              {link.links?.map((_link) => {
                if (!_link?.link) {
                  return null;
                }
                return (
                  <LocalizedLink
                    className={cx(
                      "py-xs opacity-100 transition-opacity duration-300 last:pb-0 group-hover:opacity-50",
                      {
                        "opacity-100!": hoveredKey === _link._key,
                      }
                    )}
                    href={_link.link}
                    key={_link._key}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredKey(_link._key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <Label font="sans" mobileSize="lg">
                      {_link.label}
                    </Label>
                  </LocalizedLink>
                );
              })}
            </div>
          ))}
        </div>
        <div className="scrollbar-hide flex flex-wrap items-stretch justify-start gap-lg">
          {cards?.map((card) => (
            <Product key={card._key} {...card} onClose={onClose} />
          ))}
        </div>
      </div>
    </RemoveScroll>
  );
}

function Product({
  cta,
  image,
  title,
  onClose,
}: NonNullable<DropdownType["cards"]>[number] & { onClose: () => void }) {
  if (!cta?.link) {
    return null;
  }
  return (
    <div className="group relative flex w-[220px] min-w-[160px] max-w-[220px] shrink-0 flex-col items-center gap-xs rounded-lg">
      <LocalizedLink
        className="absolute inset-0 z-10"
        href={cta?.link}
        onClick={onClose}
      />
      {image ? (
        <SanityImage
          className="aspect-square max-h-[220px] w-[220px] min-w-[160px] cursor-pointer rounded-lg"
          data={image}
        />
      ) : (
        <div className="aspect-square w-full rounded-lg bg-accent" />
      )}

      <Heading className="text-center" font="serif" mobileSize="xs" tag="h5">
        {title}
      </Heading>
      {cta ? (
        <LocalizedLink
          className="mt-xs rounded-lg border border-accent px-4 py-2 text-center font-sans text-sm font-medium transition-colors hover:bg-accent hover:text-background"
          href={cta?.link}
          onClick={onClose}
        >
          {cta?.label}
        </LocalizedLink>
      ) : null}
    </div>
  );
}
