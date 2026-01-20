import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const headingStyles = cva("", {
  defaultVariants: {
    font: "serif",
    mobileSize: "base",
  },
  variants: {
    desktopSize: {
      "2xl": "lg:text-heading-2xl lg:tracking-[-1.12px]",
      "2xs": "lg:text-heading-2xs",
      "3xl": "lg:text-heading-3xl lg:tracking-[-1.28px]",
      "4xl": "lg:text-heading-4xl",
      "5xl": "lg:text-heading-5xl lg:tracking-[-1.6px]",
      "6xl": "lg:text-heading-6xl lg:tracking-[-1.76px]",
      "7xl": "lg:text-heading-7xl lg:tracking-[-1.92px]",
      "8xl": "lg:text-heading-8xl",
      base: "lg:text-heading-base",
      lg: "lg:text-heading-lg",
      sm: "lg:text-heading-sm",
      xl: "lg:text-heading-xl lg:tracking-[-0.96px]",
      xs: "lg:text-heading-xs",
    },
    font: {
      display: "font-display font-normal uppercase leading-[100%]",
      sans: "font-medium font-sans leading-[110%]",
      serif: "font-normal font-serif italic leading-[110%]",
    },
    mobileSize: {
      "2xl": "text-heading-2xl tracking-[-1.12px]",
      "2xs": "text-heading-2xs",
      "3xl": "text-heading-3xl tracking-[-1.28px]",
      "4xl": "text-heading-4xl",
      "5xl": "text-heading-5xl tracking-[-1.6px]",
      "6xl": "text-heading-6xl tracking-[-1.76px]",
      "7xl": "text-heading-7xl tracking-[-1.92px]",
      "8xl": "text-heading-8xl",
      base: "text-heading-base tracking-[-0.64px]",
      lg: "text-heading-lg tracking-[-0.8px]",
      sm: "text-heading-sm tracking-[-0.56px]",
      xl: "text-heading-xl tracking-[-0.96px]",
      xs: "text-heading-xs tracking-[-0.48px]",
    },
  },
});

type HeadingVariants = VariantProps<typeof headingStyles>;

interface HeadingProps extends HeadingVariants {
  className?: string;
  children?: ReactNode;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export default function Heading({
  className,
  font,
  mobileSize,
  desktopSize,
  children,
  tag: Tag = "h2",
}: HeadingProps) {
  return (
    <Tag className={headingStyles({ font, mobileSize, desktopSize, className })}>
      {children}
    </Tag>
  );
}
