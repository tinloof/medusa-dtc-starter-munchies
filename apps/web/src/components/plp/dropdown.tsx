import { cx } from "class-variance-authority";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Body } from "@/components/shared/typography/body";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";

type Props = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  id?: string;
  isOpen: boolean;
  placeholder: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>;

export function DropDown({
  children,
  className,
  disabled = false,
  id,
  isOpen,
  placeholder,
  setOpen,
}: Props) {
  const ref = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  return (
    <div className="relative z-15 h-full w-fit">
      <div
        className={cx(
          "rounded-t-lg border border-white",
          {
            "border-border-grey!": isOpen,
          },
          className
        )}
        id={id}
        ref={ref}
      >
        <button
          className={cx(
            "flex w-fit items-center justify-between gap-lg bg-background px-s py-1.5 outline-none",
            "rounded-lg border-[1.5px] border-accent"
          )}
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setOpen((bool) => !bool);
            }
          }}
          type="button"
        >
          <div className="flex w-full items-center justify-between gap-6 py-2">
            <Body font="sans" mobileSize="base">
              <h3 className="body-m min-w-25 text-start">{placeholder}</h3>
            </Body>
            <Caret isOpen={isOpen} />
          </div>
        </button>
        <div
          className={cx(
            "absolute left-0 z-50 my-1 origin-top cursor-pointer overflow-y-scroll rounded-lg rounded-b-lg border-[1.5px] border-accent bg-background",
            {
              hidden: !isOpen,
            }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Caret({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={cx("data-[size=open] transition-transforms duration-300", {
        "rotate-180": isOpen,
      })}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Caret</title>
      <path
        d="M6 9L12 15L18 9"
        stroke="#FF5227"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
