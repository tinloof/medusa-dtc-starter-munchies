import { cx } from "class-variance-authority";
import { useState } from "react";

type Option = { label: string; value: string };

interface SelectProps {
  className?: string;
  options: Option[];
  placeholder?: string;
  setOption: (value: string) => void;
  value?: string | null;
}

export default function Select({
  className,
  options,
  placeholder,
  setOption,
  value,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  if (options.length === 0) {
    return null;
  }

  const selectedLabel = options.find((opt) => opt.value === (value || placeholder))?.label || placeholder;

  return (
    <div className={cx("relative", className)}>
      <button
        className="flex w-full items-center justify-between gap-lg truncate rounded-lg border-[1.5px] border-accent bg-background px-s py-[6px] outline-none"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="font-medium font-sans leading-[150%] text-body-2xl">
          {selectedLabel}
        </span>
        <img
          className={cx("min-w-4 transition-transform duration-300", {
            "rotate-180": open,
          })}
          src="/icons/accordion-top.svg"
          alt="Toggle"
        />
      </button>

      {open && (
        <div className="absolute left-0 z-10 my-1 max-h-[296px] w-full origin-top rounded-lg border-[1.5px] border-accent bg-background p-xs">
          <div className="flex flex-col">
            {options.map((item) => (
              <button
                className={cx(
                  "cursor-pointer rounded-lg px-s py-xs text-left hover:bg-secondary",
                  (value || placeholder) === item.value && "bg-accent text-background"
                )}
                key={item.value}
                onClick={() => {
                  setOption(item.value);
                  setOpen(false);
                }}
                type="button"
              >
                <span className="truncate text-nowrap font-medium font-sans leading-[150%] text-body-base">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
