import type {VariantProps} from "cva";
import type {LinkProps} from "next/link";
import type {ComponentProps} from "react";

import {cva, cx} from "cva";

import Icon from "./icon";
import LocalizedLink from "./localized-link";

export const styles = cva(
  cx(
    "flex font-serif relative items-center whitespace-nowrap leading-[150%] justify-center rounded-[999px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-background w-fit",
    "disabled:opacity-50 disabled:cursor-not-allowed ",
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
        lg: "text-body-6xl px-9 h-[72px] tracking-[-1px]",
        md: "text-body-4xl px-7 h-[62px]",
        sm: "text-body-xl px-5 h-10",
        xl: "text-body-8xl px-11 h-20 tracking-[-1px]",
      },
      variant: {
        outline:
          "bg-transparent text-accent border-[1.5px] border-accent hover:bg-accent hover:text-background group-hover:bg-accent group-hover:text-background disabled:bg-transparent disabled:text-accent disabled:border-accent",
        primary:
          "bg-accent text-background border-[1.5px] border-accent hover:text-accent hover:bg-background group-hover:bg-accent group-hover:text-background disabled:bg-accent disabled:text-background disabled:border-accent",
      },
    },
  },
);

export type ButtonProps = {
  loading?: boolean;
} & ComponentProps<"button"> &
  VariantProps<typeof styles>;

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
      className={styles({className, loading, size, variant})}
      disabled={disabled}
      {...rest}
    >
      <span className={cx(loading && "opacity-0")}>{children}</span>
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon
            className={cx("animate-spin-loading", {
              "size-5": size === "sm",
              "size-8": size === "md",
              "size-10": size === "lg" || size === "xl",
            })}
            name={loadingIconName}
          />
        </div>
      )}
    </button>
  );
}
type StyleProps = VariantProps<typeof styles>;

export function Link({
  children,
  className,
  href,
  prefetch = true,
  ref,
  renderAsChild,
  size,
  variant = "primary",
  ...rest
}: {
  prefetch?: LinkProps["prefetch"];
} & {
  renderAsChild?: boolean;
} & ComponentProps<"a"> &
  StyleProps) {
  if (renderAsChild) {
    return (
      <div
        className={styles({
          className,
          size,
          variant,
        })}
      >
        {children}
      </div>
    );
  }
  return (
    <LocalizedLink
      className={styles({
        className,
        size,
        variant,
      })}
      href={href ?? "/"}
      prefetch={prefetch}
      ref={ref}
      {...rest}
    >
      {children}
    </LocalizedLink>
  );
}
