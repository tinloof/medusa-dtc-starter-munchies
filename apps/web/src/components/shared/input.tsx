import { cx } from "class-variance-authority";
import type { RefObject } from "react";

export function Input({
  className,
  placeholder,
  required,
  type,
  ref,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: RefObject<HTMLInputElement | null>;
}) {
  return (
    <input
      className={cx(
        className,
        "rounded-lg border-[1.5px] border-accent bg-transparent px-4 py-2.75 font-medium outline-none placeholder:font-medium placeholder:text-accent placeholder:opacity-60",
        {
          "size-4 p-1 accent-accent outline-none": type === "checkbox",
        }
      )}
      placeholder={
        placeholder ? placeholder + (required ? "*" : "") : undefined
      }
      ref={ref}
      required={required}
      type={type}
      {...props}
    />
  );
}
