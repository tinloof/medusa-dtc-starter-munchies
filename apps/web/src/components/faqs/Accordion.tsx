import { cx } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

interface AccordionProps {
  border?: boolean;
  initialOpen: string | null;
  items: { content: string; id: string; title: string }[];
}

export default function Accordion({
  border = true,
  initialOpen = null,
  items,
}: AccordionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(initialOpen);

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
            {...item}
            isOpen={openItemId === item.id}
            toggleOpen={() => setOpenItemId(openItemId === item.id ? null : item.id)}
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
}: {
  border?: boolean;
  content: string;
  id?: string;
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
  }, []);

  return (
    <button
      className={cx("cursor-pointer border-accent pb-xs text-start pt-3", {
        "border-b": border,
        "border-none": !border,
      })}
      id={id}
      onClick={toggleOpen}
      type="button"
    >
      <div className="mb-s flex items-start justify-between gap-s">
        <div className="font-medium font-sans leading-[150%] text-body-lg lg:text-body-xl">
          {title}
        </div>
        <div className="group relative h-8 w-8 shrink-0 rounded-full border-[1.5px] border-accent bg-background transition-colors duration-300 hover:bg-accent">
          <span className="absolute top-1/2 left-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-colors duration-300 group-hover:bg-background" />
          <span
            className={cx(
              "absolute top-1/2 left-1/2 h-3 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-all duration-300 group-hover:bg-background",
              isOpen ? "rotate-90" : "rotate-0"
            )}
          />
        </div>
      </div>
      <div
        className="overflow-hidden transition-[height] duration-500"
        ref={contentRef}
        style={{ height: isOpen ? (height ?? 0) + 16 : 0 }}
      >
        <div className="font-medium font-sans leading-[150%] text-body-sm lg:text-body-base">
          {content}
        </div>
      </div>
    </button>
  );
}
