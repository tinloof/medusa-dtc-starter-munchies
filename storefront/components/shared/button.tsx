import type {VariantProps} from "cva";
import type {LinkProps} from "next/link";
import type {ComponentProps} from "react";

import {cva, cx} from "cva";
import NextLink from "next/link";

import Icon from "./icon";

export const styles = cva(
  cx(
    "flex font-serif relative items-center whitespace-nowrap leading-[150%] justify-center rounded-[999px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-background w-fit",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ),
  {
    compoundVariants: [
      {
        className:
          "bg-transparent text-accent border-accent hover:bg-transparent hover:text-accent",
        disabled: true,
        variant: "outline",
      },
      {
        className:
          "bg-accent text-background border-accent hover:text-background hover:bg-accent",
        disabled: true,
        variant: "primary",
      },
    ],
    defaultVariants: {
      size: "xl",
      variant: "primary",
    },
    variants: {
      disabled: {
        false: "",
        true: "opacity-50 cursor-not-allowed",
      },
      loading: {
        true: "pointer-events-none",
      },
      size: {
        lg: "text-body-6xl px-9 h-[72px]",
        md: "text-body-4xl px-7 h-[62px]",
        sm: "text-body-xl px-5 h-10",
        xl: "text-body-8xl px-11 h-20",
      },
      variant: {
        outline:
          "bg-transparent text-accent border-[1.5px] border-accent hover:bg-accent hover:text-background ",
        primary:
          "bg-accent text-background border-[1.5px] border-accent hover:text-accent hover:bg-background ",
      },
    },
  },
);

type ButtonProps = {
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
            className="animate-spin-loading size-10"
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
  disabled,
  href,
  prefetch = true,
  ref,
  variant = "primary",
  ...rest
}: {
  prefetch?: LinkProps["prefetch"];
} & ComponentProps<"a"> &
  StyleProps) {
  return (
    <NextLink
      className={styles({className, disabled, variant})}
      href={href ?? "/"}
      prefetch={prefetch}
      ref={ref}
      {...rest}
    >
      {children}
    </NextLink>
  );
}