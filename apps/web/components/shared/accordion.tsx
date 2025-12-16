"use client";

import {cx} from "cva";
import {useEffect, useRef, useState} from "react";

import Body from "./typography/body";
import Heading from "./typography/heading";

export default function Accordion({
  border = true,
  initialOpen = null,
  items,
  type = "faq",
}: {
  border?: boolean;
  initialOpen: null | string;
  items: {content: string; id: string; title: string}[];
  type?: "faq" | "product";
}) {
  const [openItemId, setOpenItemId] = useState<null | string>(initialOpen);

  useEffect(() => {
    setOpenItemId(initialOpen);
  }, [initialOpen]);

  return (
    <div>
      <div className="flex flex-col">
        {items.map((item) => (
          <AccordionItem
            border={border}
            key={item.id}
            type={type}
            {...item}
            isOpen={openItemId === item.id}
            toggleOpen={() =>
              setOpenItemId(openItemId === item.id ? null : item.id)
            }
          />
        ))}
      </div>
    </div>
  );
}

function AccordionItem({
  border = true,
  content,
  id,
  isOpen,
  title,
  toggleOpen,
  type = "faq",
}: {
  border?: boolean;
  content: string;
  id?: string;
  isOpen: boolean;
  title: string;
  toggleOpen: () => void;
  type?: "faq" | "product";
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <button
      className={cx("cursor-pointer border-accent pb-xs text-start", {
        "border-b": border,
        "border-none": !border,
        "pt-3": type === "faq",
        "pt-lg": type === "product",
      })}
      id={id}
      onClick={toggleOpen}
    >
      <div className="mb-s flex items-start justify-between gap-s">
        {type === "faq" ? (
          <Body desktopSize="xl" font="sans" mobileSize="lg">
            {title}
          </Body>
        ) : (
          <Heading desktopSize="lg" font="serif" mobileSize="base" tag="h4">
            {title}
          </Heading>
        )}
        <div className="group relative h-8 w-8 shrink-0 rounded-full border-[1.5px] border-accent bg-background transition-colors duration-300 hover:bg-accent">
          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-colors duration-300 group-hover:bg-background" />
          <span
            className={cx(
              "absolute left-1/2 top-1/2 h-3 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-all duration-300 group-hover:bg-background",
              isOpen ? "rotate-90" : "rotate-0",
            )}
          />
        </div>
      </div>
      <div
        className="overflow-hidden transition-[height] duration-500"
        ref={contentRef}
        style={{height: isOpen ? (height ?? 0) + 16 : 0}}
      >
        <Body
          desktopSize="base"
          font="sans"
          mobileSize={type === "faq" ? "sm" : "base"}
        >
          {content}
        </Body>
      </div>
    </button>
  );
}
