"use client";

import {cx} from "cva";
import {useEffect, useRef, useState} from "react";

import Body from "./typography/body";
import Heading from "./typography/heading";

export default function Accordion({
  items,
}: {
  items: {content: string; id: string; title: string}[];
}) {
  const [openItemId, setOpenItemId] = useState<null | string>(null);

  return (
    <div>
      <div className="flex flex-col">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
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
  content,
  isOpen,
  title,
  toggleOpen,
}: {
  content: string;
  isOpen: boolean;
  title: string;
  toggleOpen: () => void;
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
      className="cursor-pointer border-b border-accent pb-xs pt-lg text-start"
      onClick={toggleOpen}
    >
      <div className="flex items-center justify-between">
        <Heading
          className="mb-s"
          desktopSize="lg"
          font="serif"
          mobileSize="base"
          tag="h4"
        >
          {title}
        </Heading>
        <div className="group relative h-8 w-8 rounded-full border-[1.5px] border-accent bg-background transition-colors duration-300 hover:bg-accent">
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
        <Body font="sans" mobileSize="base">
          {content}
        </Body>
      </div>
    </button>
  );
}
