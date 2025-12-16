import type {VariantProps} from "cva";

import {cva} from "cva";

export const headingStyles = cva("", {
  defaultVariants: {
    font: "serif",
    mobileSize: "2xl",
  },
  variants: {
    desktopSize: {
      "2xl": "lg:text-heading-2xl",
      "3xl": "lg:text-heading-3xl",
      "5xl": "lg:text-heading-5xl",
      "6xl": "lg:text-heading-6xl",
      "7xl": "lg:text-heading-7xl",
      "8xl": "lg:text-heading-8xl",
      base: "lg:text-heading-base",
      lg: "lg:text-heading-lg",
      sm: "lg:text-heading-sm",
      xl: "lg:text-heading-xl",
      xs: "lg:text-heading-xs",
    },
    font: {
      display: "font-display font-normal uppercase leading-[120%]",
      sans: "font-sans font-medium leading-[120%]",
      serif: "font-serif font-normal leading-[120%]",
    },
    mobileSize: {
      "2xl": "text-heading-2xl text-pretty tracking-[-1.12px]",
      "3xl": "text-heading-3xl text-pretty tracking-[-1.28px]",
      "5xl": "lg:text-heading-5xl lg:tracking-[-1.6px]",
      "6xl": "text-heading-6xl tracking-[-2px]",
      "7xl": "text-heading-7xl tracking-[-2px]",
      "8xl": "text-heading-8xl tracking-[-2px]",
      base: "text-heading-base tracking-[-0.64px]",
      lg: "text-heading-lg tracking-[-0.8px]",
      sm: "text-heading-sm tracking-[-0.52px]",
      xl: "text-heading-xl tracking-[-0.96px]",
      xs: "text-heading-xs tracking-[-0.48px]",
    },
  },
});

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & VariantProps<typeof headingStyles>;
export default function Heading({
  children,
  className,
  desktopSize,
  font,
  id,
  mobileSize,
  tag,
  ...props
}: HeadingProps) {
  const Tag = tag;
  return (
    <Tag
      className={headingStyles({className, desktopSize, font, mobileSize})}
      id={id}
      {...props}
    >
      {children}
    </Tag>
  );
}
