"use client";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {useOutsideClick} from "@/hooks/use-outside-click";
import {cx} from "cva";
import {type PropsWithChildren, useState} from "react";

type Props = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  id?: string;
  placeholder: string;
}>;

export default function DropDown({
  children,
  className,
  disabled = false,
  id,
  placeholder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative z-[15] h-full w-fit">
      <div
        className={cx(
          (className = "rounded-t-lg border border-white"),
          {
            "!border-border-grey border": isOpen,
          },
          className,
        )}
        id={id}
        ref={ref}
      >
        <button
          className={cx(
            "flex w-fit items-center justify-between gap-lg bg-background px-s py-[6px] outline-none",
            "rounded-lg border-[1.5px] border-accent",
          )}
          disabled={disabled}
          onClick={() => {
            !disabled && setIsOpen((bool) => !bool);
          }}
        >
          <div className="flex w-full items-center justify-between gap-6 py-2">
            <Body font="sans" mobileSize="base">
              <h3 className="body-m min-w-[100px] text-start">{placeholder}</h3>
            </Body>
            <Icon
              className={cx(
                "transition-transforms data-[size=open] duration-300",
                {
                  "rotate-180": isOpen,
                },
              )}
              name="AccordionTop"
            />
          </div>
        </button>
        <div
          className={cx(
            "border-border-grey absolute left-0 z-50 my-1 w-[390px] origin-top cursor-pointer overflow-y-scroll rounded-lg rounded-b-lg border-[1.5px] border-accent bg-background transition-[max-height]",
            {
              hidden: !isOpen,
            },
          )}
          style={{
            maxHeight: isOpen ? 300 : 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
