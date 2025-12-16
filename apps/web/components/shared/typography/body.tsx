import type {VariantProps} from "cva";

import {cva} from "cva";

export const bodyStyles = cva("", {
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
      base: "lg:text-body-base ",
      lg: "lg:text-body-lg",
      sm: "lg:text-body-sm",
      xl: "lg:text-body-xl",
      xs: "lg:text-body-xs",
    },
    font: {
      display: "font-display font-normal",
      sans: "font-sans font-medium leading-[150%]",
      serif: "font-serif font-normal leading-[150%]",
    },
    mobileSize: {
      "2xl": "text-body-2xl",
      "2xs": "text-body-2xs",
      "3xl": "text-body-3xl",
      "4xl": "text-body-4xl",
      "5xl": "text-body-5xl",
      "6xl": "text-body-6xl",
      "8xl": "text-body-8xl",
      base: "text-body-base ",
      lg: "text-body-lg",
      sm: "text-body-sm",
      xl: "text-body-xl",
      xs: "text-body-xs",
    },
  },
});
type BodyProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof bodyStyles>;

export default function Body({
  children,
  className,
  desktopSize,
  font,
  mobileSize,
  ...rest
}: BodyProps) {
  return (
    <div
      className={bodyStyles({className, desktopSize, font, mobileSize})}
      {...rest}
    >
      {children}
    </div>
  );
}
