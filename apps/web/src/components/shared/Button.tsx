"use client";

import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import type { ComponentProps } from "react";

import Icon from "./Icon";

export const buttonStyles = cva(
  cx(
    "relative flex w-fit items-center justify-center whitespace-nowrap rounded-[999px] font-serif leading-[150%] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ),
  {
    defaultVariants: {
      size: "xl",
      variant: "primary",
    },
    variants: {
      loading: {
        true: "pointer-events-none",
      },
      size: {
        lg: "h-[72px] px-9 text-body-6xl tracking-[-1px]",
        md: "h-[62px] px-7 text-body-4xl",
        sm: "h-10 px-5 text-body-xl",
        xl: "h-20 px-11 text-body-8xl tracking-[-1px]",
      },
      variant: {
        outline:
          "border-[1.5px] border-accent bg-transparent text-accent hover:bg-accent hover:text-background disabled:border-accent disabled:bg-transparent disabled:text-accent group-hover:bg-accent group-hover:text-background",
        primary:
          "border-[1.5px] border-accent bg-accent text-background hover:bg-background hover:text-accent disabled:border-accent disabled:bg-accent disabled:text-background group-hover:bg-accent group-hover:text-background",
      },
    },
  }
);

export type ButtonProps = {
  loading?: boolean;
} & ComponentProps<"button"> &
  VariantProps<typeof buttonStyles>;

export function Cta({
  children,
  className,
  disabled,
  loading,
  size,
  variant = "primary",
  ...rest
}: ButtonProps) {
  const loadingIconName =
    variant === "primary" ? "LoadingPrimary" : "LoadingAccent";
  return (
    <button
      className={buttonStyles({ className, loading, size, variant })}
      disabled={disabled}
      type="button"
      {...rest}
    >
      <span className={cx(loading && "opacity-0")}>{children}</span>
      {loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon
            className={cx("animate-spin-loading", {
              "size-5": size === "sm",
              "size-8": size === "md",
              "size-10": size === "lg" || size === "xl",
            })}
            name={loadingIconName}
          />
        </div>
      ) : null}
    </button>
  );
}
