import type {VariantProps} from "cva";

import {cva} from "cva";

export const labelStyles = cva("", {
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
      display: "font-display font-normal leading-[110%] uppercase",
      sans: "font-sans font-medium leading-[110%]",
      serif: "font-serif font-normal leading-[110%]",
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
type LabelProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof labelStyles>;

export default function Label({
  children,
  className,
  desktopSize,
  font,
  mobileSize,
  ...rest
}: LabelProps) {
  return (
    <div
      className={labelStyles({className, desktopSize, font, mobileSize})}
      {...rest}
    >
      {children}
    </div>
  );
}
