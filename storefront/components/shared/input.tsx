import {cx} from "cva";
import {forwardRef} from "react";

export default forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({className, placeholder, required, type, ...props}, ref) {
  return (
    <input
      className={cx(
        className,
        "rounded-lg border-[1.5px] border-accent bg-transparent px-[16px] py-[11px] font-medium outline-none placeholder:font-medium placeholder:text-accent placeholder:opacity-60",
        {
          "size-4 border-2 border-accent bg-transparent p-1 accent-accent outline-none":
            type === "checkbox",
        },
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
});
