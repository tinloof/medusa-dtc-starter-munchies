import type {SelectHTMLAttributes} from "react";

import {ChevronUpDown} from "@medusajs/icons";
import {clx} from "@medusajs/ui";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type NativeSelectProps = {
  errors?: Record<string, unknown>;
  placeholder?: string;
  touched?: Record<string, unknown>;
} & SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {children, className, defaultValue, placeholder = "Select...", ...props},
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <div
          className={clx(
            "text-base-regular border-ui-border-base bg-ui-bg-subtle hover:bg-ui-bg-field-hover relative flex items-center rounded-md border",
            className,
            {
              "text-ui-fg-muted": isPlaceholder,
            },
          )}
          onBlur={() => innerRef.current?.blur()}
          onFocus={() => innerRef.current?.focus()}
        >
          <select
            defaultValue={defaultValue}
            ref={innerRef}
            {...props}
            className="flex-1 appearance-none border-none bg-transparent px-4 py-2.5 outline-none transition-colors duration-150"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <ChevronUpDown />
          </span>
        </div>
      </div>
    );
  },
);

NativeSelect.displayName = "NativeSelect";

export default NativeSelect;
