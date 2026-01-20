import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const bodyStyles = cva("", {
  defaultVariants: {
    font: "serif",
    mobileSize: "base",
  },
  variants: {
    desktopSize: {
      "2xl": "lg:text-body-2xl",
      "2xs": "lg:text-body-2xs",
      "4xl": "lg:text-body-4xl",
      "5xl": "lg:text-body-5xl",
      "6xl": "lg:text-body-6xl",
      "8xl": "lg:text-body-8xl",
      base: "lg:text-body-base",
      lg: "lg:text-body-lg",
      sm: "lg:text-body-sm",
      xl: "lg:text-body-xl",
      xs: "lg:text-body-xs",
    },
    font: {
      display: "font-display font-normal",
      sans: "font-medium font-sans leading-[150%]",
      serif: "font-normal font-serif leading-[150%]",
    },
    mobileSize: {
      "2xl": "text-body-2xl",
      "2xs": "text-body-2xs",
      "3xl": "text-body-3xl",
      "4xl": "text-body-4xl",
      "5xl": "text-body-5xl",
      "6xl": "text-body-6xl",
      "8xl": "text-body-8xl",
      base: "text-body-base",
      lg: "text-body-lg",
      sm: "text-body-sm",
      xl: "text-body-xl",
      xs: "text-body-xs",
    },
  },
});

type BodyVariants = VariantProps<typeof bodyStyles>;

interface BodyProps extends BodyVariants {
  className?: string;
  children?: ReactNode;
}

export default function Body({
  className,
  font,
  mobileSize,
  desktopSize,
  children,
}: BodyProps) {
  return (
    <div className={bodyStyles({ font, mobileSize, desktopSize, className })}>
      {children}
    </div>
  );
}
