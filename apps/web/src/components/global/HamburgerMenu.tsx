"use client";

import type { Header } from "@packages/sanity/types";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cx } from "class-variance-authority";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import Body from "@/components/shared/typography/Body";
import Label from "@/components/shared/typography/Label";
import Heading from "@/components/shared/typography/Heading";
import { SanityImage } from "@/components/shared/SanityImage";
import LocalizedLink from "@/components/shared/LocalizedLink";
import CountrySelectorDialog, { type Country } from "./CountrySelectorDialog";

type DropdownType = Extract<
  NonNullable<Header["navigation"]>[number],
  { _type: "dropdown" }
>;

interface HamburgerMenuProps {
  navigation: Header["navigation"];
  countries?: Country[];
}

export default function HamburgerMenu({
  navigation,
  countries = [],
}: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeMenuState, setActiveMenu] = useState<string | undefined>(
    undefined
  );

  const portalContainer =
    typeof document !== "undefined"
      ? document.getElementById("navigation-portal")
      : null;


  const isMenuActive = navigation?.some(
    (menu) => menu._key === activeMenuState && menu._type === "dropdown"
  );
  const activeMenu = navigation?.find(
    (menu) => menu._key === activeMenuState && menu._type === "dropdown"
  ) as DropdownType | undefined;

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger
        aria-label="Menu"
        className="flex size-6 shrink-0 items-center justify-center lg:hidden"
        onClick={() => setActiveMenu(undefined)}
      >
        {open ? <CloseIcon /> : <HamburgerIcon />}
      </Dialog.Trigger>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Content className="w-screen items-end justify-end overflow-x-hidden bg-background">
          <VisuallyHidden.Root>
            <Dialog.Title>Menu</Dialog.Title>
          </VisuallyHidden.Root>

          {/* Main menu */}
          <div
            className={cx(
              "scrollbar-hide fixed left-0 flex h-[calc(100dvh-var(--header-height))] w-screen flex-1 flex-col items-start overflow-x-hidden overflow-y-scroll bg-background transition-all duration-300",
              {
                "-translate-x-full": isMenuActive,
                "translate-x-0": !isMenuActive,
              }
            )}
          >
            <div className="flex h-auto w-full flex-col">
              {navigation?.map((item) => (
                <NavMenuItem
                  item={item}
                  key={item._key}
                  setActiveMenu={setActiveMenu}
                  setOpen={setOpen}
                />
              ))}
            </div>
            {/* Country Selector - Mobile */}
            {countries.length > 0 && (
              <div className="p-m">
                <CountrySelectorDialog countries={countries} />
              </div>
            )}
          </div>

          {/* Dropdown submenu */}
          <div
            className={cx(
              "scrollbar-hide fixed left-0 h-[calc(100dvh-var(--header-height))] w-screen transform overflow-x-hidden overflow-y-scroll bg-background transition-all duration-300",
              {
                "translate-x-0": isMenuActive,
                "translate-x-full": !isMenuActive,
              }
            )}
          >
            <div className="h-auto w-full">
              <button
                className="flex items-center justify-start gap-s p-m"
                onClick={() => setActiveMenu(undefined)}
                type="button"
              >
                <ArrowLeftIcon />
                <Body font="sans" mobileSize="2xl">
                  {activeMenu?.title}
                </Body>
              </button>
              {activeMenu && (
                <DropdownList activeMenu={activeMenu} setOpen={setOpen} />
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NavMenuItem({
  item,
  setActiveMenu,
  setOpen,
}: {
  item: NonNullable<Header["navigation"]>[number];
  setActiveMenu: (key: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  if (item._type === "link") {
    return (
      <>
        {item.cta?.link ? (
          <LocalizedLink
            className="p-m"
            href={item.cta.link}
            onClick={() => setOpen(false)}
          >
            <Body font="sans" mobileSize="2xl">
              {item.cta.label}
            </Body>
          </LocalizedLink>
        ) : null}
      </>
    );
  }

  if (item._type === "dropdown") {
    return (
      <button
        className="flex w-full items-center justify-between p-m text-left"
        onClick={() => setActiveMenu(item._key)}
        type="button"
      >
        <Body font="sans" mobileSize="2xl">
          {item.title}
        </Body>
        <ArrowRightIcon />
      </button>
    );
  }
  return null;
}

function DropdownList({
  activeMenu,
  setOpen,
}: {
  activeMenu: DropdownType;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex h-full w-full flex-col items-start gap-xl pb-lg">
      {activeMenu?.columns?.map((item) => (
        <div
          className="flex flex-col items-start justify-start gap-s px-m"
          key={item._key}
        >
          <Body font="sans" mobileSize="base">
            {item.title}
          </Body>
          {item.links?.map((link) => {
            if (!link.link) {
              return null;
            }
            return (
              <LocalizedLink
                className="flex w-full items-start justify-start gap-2 py-1"
                href={link.link}
                key={link._key}
                onClick={() => setOpen(false)}
              >
                <Label className="font-medium" font="sans" mobileSize="2xl">
                  {link.label}
                </Label>
              </LocalizedLink>
            );
          })}
        </div>
      ))}

      {/* Cards section */}
      {activeMenu?.cards && activeMenu.cards.length > 0 && (
        <div className="scrollbar-hide flex w-full gap-xs overflow-x-scroll">
          {activeMenu.cards.map((card) => (
            <div
              className="flex w-55 min-w-40 max-w-55 shrink-0 flex-col items-center gap-xs rounded-lg first:ml-m last:mr-m"
              key={card._key}
            >
              {card.image ? (
                <SanityImage
                  className="aspect-square max-h-55 w-55 min-w-40 rounded-lg"
                  data={card.image}
                />
              ) : (
                <div className="aspect-square w-full rounded-lg bg-accent" />
              )}

              <Heading
                className="text-center"
                font="serif"
                mobileSize="xs"
                tag="h5"
              >
                {card.title}
              </Heading>
              {card.cta?.link ? (
                <LocalizedLink
                  className="mt-xs rounded-lg border border-accent px-4 py-2 text-center font-sans text-sm font-medium transition-colors hover:bg-accent hover:text-background"
                  href={card.cta.link}
                  onClick={() => setOpen(false)}
                >
                  {card.cta.label}
                </LocalizedLink>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Icons
function HamburgerIcon() {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      className="size-8"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 8L12 16L20 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-8"
      viewBox="0 0 32 32"
      fill="none">
      <path d="M12 24L20 16L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
