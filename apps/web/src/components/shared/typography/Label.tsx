import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const labelStyles = cva("", {
  defaultVariants: {
    font: "serif",
    mobileSize: "base",
  },
  variants: {
    desktopSize: {
      "2xl": "lg:text-label-2xl",
      "2xs": "lg:text-body-2xs",
      "6xl": "text-label-6xl",
      base: "lg:text-label-base",
      lg: "lg:text-label-lg",
      sm: "lg:text-label-sm",
      xs: "lg:text-label-xs",
    },
    font: {
      display: "font-display font-normal uppercase leading-[110%]",
      sans: "font-medium font-sans leading-[110%]",
      serif: "font-normal font-serif leading-[110%]",
    },
    mobileSize: {
      "2xl": "text-label-2xl",
      "2xs": "text-label-2xs tracking-[0.4px]",
      "6xl": "text-label-6xl tracking-[1.6px]",
      base: "text-label-base tracking-[0.64px]",
      lg: "text-label-lg tracking-[0.36px]",
      sm: "text-label-sm tracking-[0.56px]",
      xs: "text-label-xs tracking-[0.48px]",
    },
  },
});

type LabelVariants = VariantProps<typeof labelStyles>;

interface LabelProps extends LabelVariants {
  className?: string;
  children?: ReactNode;
}

export default function Label({
  className,
  font,
  mobileSize,
  desktopSize,
  children,
}: LabelProps) {
  return (
    <div className={labelStyles({ font, mobileSize, desktopSize, className })}>
      {children}
    </div>
  );
}
